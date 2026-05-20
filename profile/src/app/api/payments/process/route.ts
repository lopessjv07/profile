import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_URL = process.env.ASAAS_API_URL || "https://sandbox.asaas.com/api/v3";

// POST - Processar pagamento do cliente via link
export async function POST(request: NextRequest) {
  try {
    if (!ASAAS_API_KEY) {
      console.error("❌ ASAAS_API_KEY não configurada.");
      return Response.json(
        { error: "Erro de configuração do servidor." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { slug, paymentMethod, customer, creditCard } = body;

    // Validar link
    if (!slug) {
      return Response.json(
        { error: "Slug do link é obrigatório." },
        { status: 400 }
      );
    }

    const paymentLink = await prisma.paymentLink.findUnique({
      where: { slug },
    });

    if (!paymentLink || paymentLink.status !== "ACTIVE") {
      return Response.json(
        { error: "Link de pagamento inválido ou expirado." },
        { status: 400 }
      );
    }

    // Validar dados do cliente
    const { name, email, cpfCnpj, phone, cep, addressNumber } = customer;
    if (!name || !email || !cpfCnpj || !phone) {
      return Response.json(
        { error: "Preencha todos os dados pessoais obrigatórios." },
        { status: 400 }
      );
    }

    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanCep = cep ? cep.replace(/\D/g, "") : "";

    // 1. Salvar/Atualizar cliente no banco local
    let client = await prisma.client.findFirst({
      where: { cpfCnpj: cleanCpfCnpj },
    });

    if (client) {
      client = await prisma.client.update({
        where: { id: client.id },
        data: { name, email, phone: cleanPhone, cep: cleanCep, addressNumber },
      });
    } else {
      client = await prisma.client.create({
        data: {
          name,
          email,
          cpfCnpj: cleanCpfCnpj,
          phone: cleanPhone,
          cep: cleanCep,
          addressNumber,
        },
      });
    }

    // 2. Buscar/Criar customer no Asaas
    let asaasCustomerId = "";

    const searchRes = await fetch(
      `${ASAAS_API_URL}/customers?cpfCnpj=${cleanCpfCnpj}`,
      {
        method: "GET",
        headers: {
          access_token: ASAAS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.data && searchData.data.length > 0) {
        asaasCustomerId = searchData.data[0].id;
      }
    }

    if (!asaasCustomerId) {
      const createRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: {
          access_token: ASAAS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          cpfCnpj: cleanCpfCnpj,
          mobilePhone: cleanPhone,
          notificationDisabled: true,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok || createData.errors) {
        const errMsg = createData.errors?.[0]?.description || "Falha ao criar cliente no Asaas.";
        return Response.json({ error: errMsg }, { status: 400 });
      }
      asaasCustomerId = createData.id;
    }

    // 3. Criar cobrança no Asaas
    const paymentPayload: any = {
      customer: asaasCustomerId,
      billingType: paymentMethod,
      value: paymentLink.amount,
      dueDate: new Date().toISOString().split("T")[0],
      description: paymentLink.description,
    };

    if (paymentMethod === "CREDIT_CARD") {
      if (!creditCard) {
        return Response.json(
          { error: "Dados do cartão são obrigatórios." },
          { status: 400 }
        );
      }

      paymentPayload.creditCard = {
        holderName: creditCard.holderName,
        number: creditCard.number.replace(/\s/g, ""),
        expiryMonth: creditCard.expiryMonth,
        expiryYear: creditCard.expiryYear,
        ccv: creditCard.cvv,
      };

      paymentPayload.creditCardHolderInfo = {
        name,
        email,
        cpfCnpj: cleanCpfCnpj,
        postalCode: cleanCep,
        addressNumber: addressNumber || "S/N",
        phone: cleanPhone,
      };
    }

    const paymentRes = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        access_token: ASAAS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    const paymentData = await paymentRes.json();

    if (!paymentRes.ok || paymentData.errors) {
      const errMsg = paymentData.errors?.[0]?.description || "Falha ao processar pagamento.";
      return Response.json({ error: errMsg }, { status: 400 });
    }

    // 4. Salvar pagamento no banco local
    const payment = await prisma.payment.create({
      data: {
        clientId: client.id,
        linkId: paymentLink.id,
        method: paymentMethod,
        status: paymentData.status || "PENDING",
        amount: paymentLink.amount,
        asaasPaymentId: paymentData.id,
        asaasInvoiceUrl: paymentData.invoiceUrl,
      },
    });

    // 5. Atualizar status do link se necessário
    if (paymentData.status === "CONFIRMED" || paymentData.status === "RECEIVED") {
      await prisma.paymentLink.update({
        where: { id: paymentLink.id },
        data: { status: "PAID" },
      });
    }

    // 6. Retornar resposta baseada no método de pagamento
    if (paymentMethod === "PIX") {
      const qrRes = await fetch(
        `${ASAAS_API_URL}/payments/${paymentData.id}/pixQrCode`,
        {
          method: "GET",
          headers: { access_token: ASAAS_API_KEY },
        }
      );

      const qrData = await qrRes.json();

      return Response.json({
        success: true,
        paymentId: payment.id,
        billingType: "PIX",
        invoiceUrl: paymentData.invoiceUrl,
        pix: qrRes.ok && !qrData.errors
          ? {
              encodedImage: qrData.encodedImage,
              payload: qrData.payload,
              expirationDate: qrData.expirationDate,
            }
          : null,
      });
    }

    if (paymentMethod === "BOLETO") {
      const fieldRes = await fetch(
        `${ASAAS_API_URL}/payments/${paymentData.id}/identificationField`,
        {
          method: "GET",
          headers: { access_token: ASAAS_API_KEY },
        }
      );

      const fieldData = await fieldRes.json();

      return Response.json({
        success: true,
        paymentId: payment.id,
        billingType: "BOLETO",
        invoiceUrl: paymentData.invoiceUrl,
        bankSlipUrl: paymentData.bankSlipUrl,
        boleto: fieldRes.ok && !fieldData.errors
          ? {
              identificationField: fieldData.identificationField,
              nossoNumero: fieldData.nossoNumero,
              barCode: fieldData.barCode,
            }
          : null,
      });
    }

    // Cartão de crédito
    return Response.json({
      success: true,
      paymentId: payment.id,
      billingType: "CREDIT_CARD",
      status: paymentData.status,
      invoiceUrl: paymentData.invoiceUrl,
    });
  } catch (error: any) {
    console.error("❌ [Process Payment Error]:", error);
    return Response.json(
      { error: "Erro interno ao processar pagamento." },
      { status: 500 }
    );
  }
}
