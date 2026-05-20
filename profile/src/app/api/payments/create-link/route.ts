import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

// POST - Criar um novo link de pagamento
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description } = body;

    if (!amount || amount <= 0) {
      return Response.json(
        { error: "Valor inválido. Informe um valor positivo." },
        { status: 400 }
      );
    }

    if (!description || description.trim() === "") {
      return Response.json(
        { error: "Descrição é obrigatória." },
        { status: 400 }
      );
    }

    // Gerar slug único baseado em timestamp + random
    const slug = generateSlug();

    const paymentLink = await prisma.paymentLink.create({
      data: {
        slug,
        amount: parseFloat(amount),
        description: description.trim(),
        status: "ACTIVE",
      },
    });

    return Response.json({
      success: true,
      paymentLink: {
        id: paymentLink.id,
        slug: paymentLink.slug,
        amount: paymentLink.amount,
        description: paymentLink.description,
        status: paymentLink.status,
        createdAt: paymentLink.createdAt,
        url: `/payments/pay/${paymentLink.slug}`,
      },
    });
  } catch (error: any) {
    console.error("❌ [Create Link Error]:", error);
    return Response.json(
      { error: "Erro interno ao criar link de pagamento." },
      { status: 500 }
    );
  }
}

// GET - Listar todos os links de pagamento
export async function GET() {
  try {
    const links = await prisma.paymentLink.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { payments: true },
        },
        payments: {
          select: {
            status: true,
          },
        },
      },
    });

    const formattedLinks = links.map((link) => ({
      id: link.id,
      slug: link.slug,
      amount: link.amount,
      description: link.description,
      status: link.status,
      createdAt: link.createdAt,
      url: `/payments/pay/${link.slug}`,
      totalPayments: link._count.payments,
      paidCount: link.payments.filter(
        (p) => p.status === "CONFIRMED" || p.status === "RECEIVED"
      ).length,
    }));

    return Response.json({ success: true, links: formattedLinks });
  } catch (error: any) {
    console.error("❌ [List Links Error]:", error);
    return Response.json(
      { error: "Erro ao buscar links de pagamento." },
      { status: 500 }
    );
  }
}

// DELETE - Cancelar/excluir um link de pagamento
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "ID do link é obrigatório." },
        { status: 400 }
      );
    }

    await prisma.paymentLink.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return Response.json({ success: true, message: "Link cancelado." });
  } catch (error: any) {
    console.error("❌ [Delete Link Error]:", error);
    return Response.json(
      { error: "Erro ao cancelar link." },
      { status: 500 }
    );
  }
}

function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const timestamp = Date.now().toString(36);
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `pay-${timestamp}-${random}`;
}
