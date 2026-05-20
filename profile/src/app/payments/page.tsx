"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer.tsx/Footer";
import styles from "./payments.module.css";

// Helper components for icons to keep it pure and dependency-free
const PixIcon = () => (
  <svg className={styles.methodIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
  </svg>
);

const CardIcon = () => (
  <svg className={styles.methodIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

const BoletoIcon = () => (
  <svg className={styles.methodIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h2v12H4zm3 0h1v12H7zm2 0h2v12H9zm3 0h1v12h-1zm2 0h3v12h-3zm4 0h1v12h-1zm2 0h2v12h-2z" />
  </svg>
);

function CheckoutFormContent() {
  const searchParams = useSearchParams();
  
  // Plan State (Read from query parameter default or allow toggle)
  const [selectedPlan, setSelectedPlan] = useState<"start" | "business">("start");
  
  // Payment Info States
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD" | "BOLETO">("PIX");
  
  // Customer Data States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [addressNumber, setAddressNumber] = useState("");

  // Credit Card States
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // UI Flow States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<any | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Sync selected plan with URL parameters on mount
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam === "business") {
      setSelectedPlan("business");
    } else {
      setSelectedPlan("start");
    }
  }, [searchParams]);

  // Input Masking utilities
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      // CPF: 000.000.000-00
      setCpfCnpj(
        raw
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      );
    } else {
      // CNPJ: 00.000.000/0000-00
      setCpfCnpj(
        raw
          .replace(/^(\d{2})(\d)/, "$1.$2")
          .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/\.(\d{3})(\d)/, ".$1/$2")
          .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
      );
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 10) {
      setPhone(raw.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2"));
    } else {
      setPhone(raw.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2"));
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCep(raw.replace(/(\d{5})(\d{3})$/, "$1-$2"));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(raw.replace(/(\d{4})(?=\d)/g, "$1 "));
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length <= 2) {
      setCardExpiry(raw);
    } else {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    }
  };

  // Clipboard Copia e Cola function
  const copyPixCode = () => {
    if (checkoutSuccess?.pix?.payload) {
      navigator.clipboard.writeText(checkoutSuccess.pix.payload);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const copyBoletoCode = () => {
    if (checkoutSuccess?.boleto?.identificationField) {
      navigator.clipboard.writeText(checkoutSuccess.boleto.identificationField);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Submit Handler
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic Validation
    if (!name || !email || !cpfCnpj || !phone) {
      setError("Por favor, preencha todos os dados pessoais obrigatórios.");
      setIsLoading(false);
      return;
    }

    if (paymentMethod === "CREDIT_CARD") {
      if (!cardHolder || !cardNumber || !cardExpiry || !cardCvv || !cep || !addressNumber) {
        setError("Por favor, preencha todos os dados do cartão e o endereço de cobrança.");
        setIsLoading(false);
        return;
      }
    }

    // Split expiry date into month & year
    let expiryMonth = "";
    let expiryYear = "";
    if (paymentMethod === "CREDIT_CARD" && cardExpiry) {
      const parts = cardExpiry.split("/");
      expiryMonth = parts[0];
      expiryYear = parts[1] ? `20${parts[1]}` : ""; // Convert 26 to 2026
    }

    const payload = {
      plan: selectedPlan,
      paymentMethod,
      customer: {
        name,
        email,
        cpfCnpj,
        phone,
        cep,
        addressNumber
      },
      ...(paymentMethod === "CREDIT_CARD" ? {
        creditCard: {
          holderName: cardHolder,
          number: cardNumber,
          expiryMonth,
          expiryYear,
          cvv: cardCvv
        }
      } : {})
    };

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro ao processar o seu pagamento.");
      }

      console.log("Checkout Success Response:", data);
      setCheckoutSuccess(data);
    } catch (err: any) {
      console.error("Checkout Error:", err);
      setError(err.message || "Erro de conexão. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const planPrice = selectedPlan === "business" ? 200.00 : 150.00;
  const planName = selectedPlan === "business" ? "Plano Business" : "Plano Start";

  // Success views rendering
  if (checkoutSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        
        {checkoutSuccess.billingType === "PIX" && (
          <>
            <h2 className={styles.successTitle}>Seu pedido está aguardando <span className={styles.textHighlight}>Pagamento</span></h2>
            <p className={styles.successText}>
              Escaneie o código QR abaixo com o app do seu banco ou copie o código Pix para finalizar a contratação do seu <strong>{planName}</strong>.
            </p>

            <div className={styles.pixSection}>
              {checkoutSuccess.pix?.encodedImage ? (
                <div className={styles.qrCodeWrapper}>
                  <img
                    src={`data:image/png;base64,${checkoutSuccess.pix.encodedImage}`}
                    alt="Pix QR Code"
                    className={styles.qrCodeImg}
                  />
                </div>
              ) : (
                <p style={{ color: "#ff4b4b", marginBottom: "20px" }}>QR Code temporariamente indisponível. Utilize o código Pix abaixo.</p>
              )}

              <p className={styles.pixInstructions}>
                Copie a linha de código Pix abaixo e utilize a opção "Pix Copia e Cola" no aplicativo do seu banco:
              </p>

              {checkoutSuccess.pix?.payload && (
                <div className={styles.copiaColaContainer}>
                  <span className={styles.copiaColaText}>{checkoutSuccess.pix.payload}</span>
                  <button
                    onClick={copyPixCode}
                    className={`${styles.copyBtn} ${copySuccess ? styles.copySuccess : ""}`}
                  >
                    {copySuccess ? "Copiado! ✓" : "Copiar"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {checkoutSuccess.billingType === "BOLETO" && (
          <>
            <h2 className={styles.successTitle}>Boleto Gerado com <span className={styles.textHighlight}>Sucesso!</span></h2>
            <p className={styles.successText}>
              Seu boleto bancário para contratação do <strong>{planName}</strong> foi gerado e já está registrado. O processamento bancário de boletos pode levar de 1 a 2 dias úteis para compensação após o pagamento.
            </p>

            <div className={styles.pixSection}>
              <p className={styles.pixInstructions} style={{ fontWeight: 700, color: "#ffffff", marginBottom: "16px" }}>
                Código de Barras (Linha Digitável):
              </p>

              {checkoutSuccess.boleto?.identificationField ? (
                <div className={styles.copiaColaContainer}>
                  <span className={styles.copiaColaText}>{checkoutSuccess.boleto.identificationField}</span>
                  <button
                    onClick={copyBoletoCode}
                    className={`${styles.copyBtn} ${copySuccess ? styles.copySuccess : ""}`}
                  >
                    {copySuccess ? "Copiado! ✓" : "Copiar Código"}
                  </button>
                </div>
              ) : (
                <p style={{ color: "#a0a0a0", marginBottom: "20px" }}>Código de barras disponível no boleto impresso.</p>
              )}

              <p className={styles.pixInstructions} style={{ fontSize: "0.85rem", color: "#a0a0a0", margin: "0" }}>
                Você pode copiar a linha digitável acima para pagar pelo seu internet banking ou celular, ou clicar no botão abaixo para imprimir o documento original.
              </p>
            </div>
          </>
        )}

        {checkoutSuccess.billingType === "CREDIT_CARD" && (
          <>
            <h2 className={styles.successTitle}>Pagamento Processado com <span className={styles.textHighlight}>Sucesso!</span></h2>
            <p className={styles.successText}>
              Parabéns! Sua infraestrutura de elite para o <strong>{planName}</strong> está sendo criada. O status atual do seu pagamento no Asaas é: <strong>{checkoutSuccess.status === "CONFIRMED" || checkoutSuccess.status === "RECEIVED" ? "Aprovado" : checkoutSuccess.status}</strong>.
            </p>
          </>
        )}

        <div className={styles.actionRow}>
          {checkoutSuccess.bankSlipUrl && (
            <a href={checkoutSuccess.bankSlipUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              Visualizar / Imprimir Boleto
            </a>
          )}
          {checkoutSuccess.invoiceUrl && (
            <a href={checkoutSuccess.invoiceUrl} target="_blank" rel="noopener noreferrer" className={styles.invoiceBtn}>
              Ver Fatura no Asaas
            </a>
          )}
          <a href="/plans" className={styles.primaryBtn} style={checkoutSuccess.bankSlipUrl ? { backgroundColor: "transparent", color: "#a0a0a0", border: "1px solid rgba(255, 255, 255, 0.15)", boxShadow: "none" } : undefined}>
            Voltar para Planos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutGrid}>
      {/* Checkout Form */}
      <form onSubmit={handleCheckoutSubmit} className={styles.checkoutCard}>
        {error && (
          <div className={styles.errorMessage}>
            <span style={{ fontSize: "1.2rem" }}>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Personal Info */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.stepNumber}>1</span>
            Dados Pessoais
          </h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>NOME COMPLETO</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="Ex: João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGrid2} style={{ display: "grid", gap: "16px" }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>E-MAIL</label>
                <input
                  type="email"
                  className={styles.formControl}
                  placeholder="Ex: joao@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>CELULAR / WHATSAPP</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>CPF OU CNPJ</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="000.000.000-00 ou 00.000.000/0000-00"
                value={cpfCnpj}
                onChange={handleCpfCnpjChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Step 2: Payment Method */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.stepNumber}>2</span>
            Forma de Pagamento
          </h3>

          <div className={styles.paymentSelector}>
            <div
              className={`${styles.methodCard} ${paymentMethod === "PIX" ? styles.methodCardActive : ""}`}
              onClick={() => setPaymentMethod("PIX")}
            >
              <PixIcon />
              <span className={styles.methodLabel}>Pix (Imediato)</span>
            </div>

            <div
              className={`${styles.methodCard} ${paymentMethod === "BOLETO" ? styles.methodCardActive : ""}`}
              onClick={() => setPaymentMethod("BOLETO")}
            >
              <BoletoIcon />
              <span className={styles.methodLabel}>Boleto Bancário</span>
            </div>

            <div
              className={`${styles.methodCard} ${paymentMethod === "CREDIT_CARD" ? styles.methodCardActive : ""}`}
              onClick={() => setPaymentMethod("CREDIT_CARD")}
            >
              <CardIcon />
              <span className={styles.methodLabel}>Cartão de Crédito</span>
            </div>
          </div>
        </div>

        {/* Step 3: Conditional Details (Credit Card + Address) */}
        {paymentMethod === "CREDIT_CARD" && (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.stepNumber}>3</span>
              Dados do Cartão e Faturamento
            </h3>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>NOME NO CARTÃO</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Nome exatamente como impresso"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>NÚMERO DO CARTÃO</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
              </div>

              <div className={styles.formGrid2} style={{ display: "grid", gap: "16px" }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>VALIDADE (MM/AA)</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={handleCardExpiryChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>CÓD. SEGURANÇA (CVV)</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="CVV"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGrid2} style={{ display: "grid", gap: "16px" }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CEP DE COBRANÇA</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="00000-000"
                    value={cep}
                    onChange={handleCepChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>NÚMERO DA RESIDÊNCIA</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Ex: 123"
                    value={addressNumber}
                    onChange={(e) => setAddressNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isLoading ? (
            <>
              <div className={styles.spinner}></div>
              Processando Checkout...
            </>
          ) : (
            `Garantir Infraestrutura do ${planName}`
          )}
        </button>
      </form>

      {/* Plan Summary Column */}
      <aside className={`${styles.checkoutCard} ${styles.summaryCard}`}>
        <h3 className={styles.sectionTitle}>Resumo da Assinatura</h3>

        <div className={styles.planSelectorContainer}>
          <span className={styles.label}>PLANO SELECIONADO</span>
          
          <div className={styles.planOptions}>
            <div
              className={`${styles.planOption} ${selectedPlan === "start" ? styles.planOptionActive : ""}`}
              onClick={() => setSelectedPlan("start")}
            >
              <div className={styles.planOptionInfo}>
                <span className={styles.planOptionName}>Plano Start</span>
                <span className={styles.planOptionDesc}>Ideal para 1 Landing Page</span>
              </div>
              <span className={styles.planOptionPrice}>R$ 150<span style={{ fontSize: "0.8rem", color: "#a0a0a0" }}>/mês</span></span>
            </div>

            <div
              className={`${styles.planOption} ${selectedPlan === "business" ? styles.planOptionActive : ""}`}
              onClick={() => setSelectedPlan("business")}
            >
              <div className={styles.planOptionInfo}>
                <span className={styles.planOptionName}>Plano Business</span>
                <span className={styles.planOptionDesc}>Site com até 4 páginas</span>
              </div>
              <span className={styles.planOptionPrice}>R$ 200<span style={{ fontSize: "0.8rem", color: "#a0a0a0" }}>/mês</span></span>
            </div>
          </div>
        </div>

        <div className={styles.receiptDetails}>
          <div className={styles.receiptRow}>
            <span>{planName}</span>
            <span>R$ {planPrice.toFixed(2).replace(".", ",")}</span>
          </div>
          <div className={styles.receiptRow}>
            <span>Instalação e DNS</span>
            <span style={{ color: "#00ff88", fontWeight: "bold" }}>Grátis</span>
          </div>
          <div className={`${styles.receiptRow} ${styles.totalRow}`}>
            <span>Total Mensal</span>
            <span className={styles.totalPrice}>R$ {planPrice.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.wrapper}>
          <div className={styles.titleSection}>
            <br /><br />
            <h1 className={styles.pageTitle}>
              Checkout <span className={styles.textHighlight}>Transparente</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Finalize sua contratação com segurança absoluta no container privado da nossa infraestrutura.
            </p>
          </div>

          <Suspense fallback={<div style={{ color: "#ffffff", textAlign: "center", padding: "80px 0" }}>Carregando dados do checkout...</div>}>
            <CheckoutFormContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
