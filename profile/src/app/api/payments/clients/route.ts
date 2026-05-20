import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET - Listar todos os clientes com seus pagamentos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const method = searchParams.get("method") || "";

    // Build where clause for payments filtering
    const paymentWhere: any = {};
    if (status) paymentWhere.status = status;
    if (method) paymentWhere.method = method;

    const clients = await prisma.client.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
              { cpfCnpj: { contains: search.replace(/\D/g, "") } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        payments: {
          where: Object.keys(paymentWhere).length > 0 ? paymentWhere : undefined,
          orderBy: { createdAt: "desc" },
          include: {
            paymentLink: {
              select: {
                description: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    // Calcular totais
    const totalClients = clients.length;
    const allPayments = clients.flatMap((c) => c.payments);
    const totalReceived = allPayments
      .filter((p) => p.status === "CONFIRMED" || p.status === "RECEIVED")
      .reduce((sum, p) => sum + p.amount, 0);
    const totalPending = allPayments
      .filter((p) => p.status === "PENDING")
      .reduce((sum, p) => sum + p.amount, 0);

    return Response.json({
      success: true,
      clients,
      stats: {
        totalClients,
        totalPayments: allPayments.length,
        totalReceived,
        totalPending,
      },
    });
  } catch (error: any) {
    console.error("❌ [List Clients Error]:", error);
    return Response.json(
      { error: "Erro ao buscar clientes." },
      { status: 500 }
    );
  }
}
