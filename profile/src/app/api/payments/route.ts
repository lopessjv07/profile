import { NextRequest } from "next/server";

// Server-side environment variable validation (Runtime validation)
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
// Default to sandbox for safe development unless production URL is specified
const ASAAS_API_URL = process.env.ASAAS_API_URL || "https://sandbox.asaas.com/api/v3";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify that the private API key is configured
    if (!ASAAS_API_KEY) {
      console.error("❌ CONFIGURATION ERROR: ASAAS_API_KEY is not defined in the environment variables.");
      return Response.json(
        { error: "Erro de configuração do servidor. A chave da API de pagamentos não está configurada." },
        { status: 500 }
      );
    }

    // 2. Parse and validate the incoming request body
    const body = await request.json();
    const { plan, paymentMethod, customer, creditCard } = body;

    if (!plan || !paymentMethod || !customer) {
      return Response.json(
        { error: "Dados incompletos fornecidos para o checkout." },
        { status: 400 }
      );
    }

    const { name, email, cpfCnpj, phone, cep, addressNumber } = customer;

    if (!name || !email || !cpfCnpj || !phone) {
      return Response.json(
        { error: "Por favor, preencha todos os campos obrigatórios do cliente." },
        { status: 400 }
      );
    }

    // Determine value based on selected plan
    const value = plan === "business" ? 200.00 : 150.00;
    const planName = plan === "business" ? "Plano Business" : "Plano Start";

    // Clean CPF/CNPJ and Phone to Asaas specifications (only numbers)
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanCep = cep ? cep.replace(/\D/g, "") : "";

    console.log(`[Checkout] Starting checkout for ${name} - Plan: ${planName} (${value} BRL) using ${paymentMethod}`);

    // 3. Find or Create Customer in Asaas
    let customerId = "";
    
    // Attempt to search for an existing customer with the same CPF/CNPJ
    const searchUrl = `${ASAAS_API_URL}/customers?cpfCnpj=${cleanCpfCnpj}`;
    const searchRes = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "access_token": ASAAS_API_KEY,
        "Content-Type": "application/json"
      }
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.data && searchData.data.length > 0) {
        customerId = searchData.data[0].id;
        console.log(`[Checkout] Existing customer found in Asaas: ${customerId}`);
      }
    }

    // If customer doesn't exist, create a new one
    if (!customerId) {
      console.log(`[Checkout] Creating a new customer in Asaas...`);
      const createCustomerRes = await fetch(`${ASAAS_API_URL}/customers`, {
        method: "POST",
        headers: {
          "access_token": ASAAS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          cpfCnpj: cleanCpfCnpj,
          mobilePhone: cleanPhone,
          notificationDisabled: true
        })
      });

      const createCustomerData = await createCustomerRes.json();
      
      if (!createCustomerRes.ok || createCustomerData.errors) {
        console.error("[Checkout] Error creating customer in Asaas:", createCustomerData.errors);
        const errMsg = createCustomerData.errors?.[0]?.description || "Falha ao criar cadastro no gateway.";
        return Response.json({ error: errMsg }, { status: 400 });
      }

      customerId = createCustomerData.id;
      console.log(`[Checkout] New customer created: ${customerId}`);
    }

    // 4. Build Payment payload
    const paymentPayload: any = {
      customer: customerId,
      billingType: paymentMethod, // 'PIX' or 'CREDIT_CARD'
      value: value,
      dueDate: new Date().toISOString().split("T")[0], // Today's date
      description: `${planName} - Infraestrutura de Elite LopesDev`,
    };

    // Add Credit Card details if applicable
    if (paymentMethod === "CREDIT_CARD") {
      if (!creditCard) {
        return Response.json(
          { error: "Dados do cartão de crédito são necessários." },
          { status: 400 }
        );
      }

      paymentPayload.creditCard = {
        holderName: creditCard.holderName,
        number: creditCard.number.replace(/\s/g, ""),
        expiryMonth: creditCard.expiryMonth,
        expiryYear: creditCard.expiryYear,
        ccv: creditCard.cvv
      };

      paymentPayload.creditCardHolderInfo = {
        name: name,
        email: email,
        cpfCnpj: cleanCpfCnpj,
        postalCode: cleanCep,
        addressNumber: addressNumber || "S/N",
        phone: cleanPhone
      };
    }

    // 5. Create Payment in Asaas
    console.log(`[Checkout] Creating payment on Asaas...`);
    const paymentRes = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "access_token": ASAAS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentPayload)
    });

    const paymentData = await paymentRes.json();

    if (!paymentRes.ok || paymentData.errors) {
      console.error("[Checkout] Asaas payment creation failed:", paymentData.errors);
      const errMsg = paymentData.errors?.[0]?.description || "Falha ao processar pagamento com o Asaas.";
      return Response.json({ error: errMsg }, { status: 400 });
    }

    console.log(`[Checkout] Payment created successfully. ID: ${paymentData.id}, Status: ${paymentData.status}`);

    // 6. Handle Pix Specifics (retrieve QR code and payload)
    if (paymentMethod === "PIX") {
      console.log(`[Checkout] Generating Pix QR Code...`);
      const qrRes = await fetch(`${ASAAS_API_URL}/payments/${paymentData.id}/pixQrCode`, {
        method: "GET",
        headers: {
          "access_token": ASAAS_API_KEY
        }
      });

      const qrData = await qrRes.json();

      if (!qrRes.ok || qrData.errors) {
        console.error("[Checkout] Pix QR code generation failed:", qrData.errors);
        return Response.json({
          success: true,
          paymentId: paymentData.id,
          billingType: "PIX",
          invoiceUrl: paymentData.invoiceUrl,
          pix: null,
          warning: "O pagamento foi gerado, mas ocorreu um problema ao gerar o QR Code instantâneo."
        });
      }

      return Response.json({
        success: true,
        paymentId: paymentData.id,
        billingType: "PIX",
        invoiceUrl: paymentData.invoiceUrl,
        pix: {
          encodedImage: qrData.encodedImage, // base64 QR Code image
          payload: qrData.payload, // copia e cola string
          expirationDate: qrData.expirationDate
        }
      });
    }

    // 7. Handle Boleto Specifics (retrieve barcode / linha digitável)
    if (paymentMethod === "BOLETO") {
      console.log(`[Checkout] Fetching Boleto barcode details...`);
      const fieldRes = await fetch(`${ASAAS_API_URL}/payments/${paymentData.id}/identificationField`, {
        method: "GET",
        headers: {
          "access_token": ASAAS_API_KEY
        }
      });

      const fieldData = await fieldRes.json();

      if (!fieldRes.ok || fieldData.errors) {
        console.error("[Checkout] Boleto barcode details query failed:", fieldData.errors);
        return Response.json({
          success: true,
          paymentId: paymentData.id,
          billingType: "BOLETO",
          invoiceUrl: paymentData.invoiceUrl,
          bankSlipUrl: paymentData.bankSlipUrl,
          boleto: null,
          warning: "Boleto gerado, mas não conseguimos obter o código de barras digitável instantaneamente."
        });
      }

      return Response.json({
        success: true,
        paymentId: paymentData.id,
        billingType: "BOLETO",
        invoiceUrl: paymentData.invoiceUrl,
        bankSlipUrl: paymentData.bankSlipUrl,
        boleto: {
          identificationField: fieldData.identificationField,
          nossoNumero: fieldData.nossoNumero,
          barCode: fieldData.barCode
        }
      });
    }

    // 8. Credit Card Responses
    return Response.json({
      success: true,
      paymentId: paymentData.id,
      billingType: "CREDIT_CARD",
      status: paymentData.status, // CONFIRMED, RECEIVED, etc.
      invoiceUrl: paymentData.invoiceUrl
    });

  } catch (error: any) {
    console.error("❌ [Checkout Route Handler Error]:", error);
    return Response.json(
      { error: "Erro interno no servidor ao processar o seu checkout. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
