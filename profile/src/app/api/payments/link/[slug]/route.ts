import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET - Buscar dados de um link de pagamento pelo slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const paymentLink = await prisma.paymentLink.findUnique({
      where: { slug },
    });

    if (!paymentLink) {
      return Response.json(
        { error: "Link de pagamento não encontrado." },
        { status: 404 }
      );
    }

    if (paymentLink.status === "CANCELLED") {
      return Response.json(
        { error: "Este link de pagamento foi cancelado." },
        { status: 410 }
      );
    }

    if (paymentLink.status === "EXPIRED") {
      return Response.json(
        { error: "Este link de pagamento expirou." },
        { status: 410 }
      );
    }

    return Response.json({
      success: true,
      link: {
        id: paymentLink.id,
        slug: paymentLink.slug,
        amount: paymentLink.amount,
        description: paymentLink.description,
        status: paymentLink.status,
      },
    });
  } catch (error: any) {
    console.error("❌ [Get Link Error]:", error);
    return Response.json(
      { error: "Erro ao buscar link de pagamento." },
      { status: 500 }
    );
  }
}
