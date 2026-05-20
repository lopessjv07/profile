"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer.tsx/Footer";
import styles from "./pay.module.css";

// Icon components
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

interface LinkData {
  id: string;
  slug: string;
  amount: number;
  description: string;
  status: string;
}

export default function PayPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Link data
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD" | "BOLETO">("PIX");

  // Customer
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [addressNumber, setAddressNumber] = useState("");

  // Credit card
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<any | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch link data
  useEffect(() => {
    if (!slug) return;

    const fetchLink = async () => {
      try {
        const res = await fetch(`/api/payments/link/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Link não encontrado.");
        }

        setLinkData(data.link);
      } catch (err: any) {
        setPageError(err.message);
      } finally {
        setPageLoading(false);
      }
    };

    fetchLink();
  }, [slug]);

  // Input masks
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      setCpfCnpj(
        raw
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      );
    } else {
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

  // Clipboard
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

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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

    let expiryMonth = "";
    let expiryYear = "";
    if (paymentMethod === "CREDIT_CARD" && cardExpiry) {
      const parts = cardExpiry.split("/");
      expiryMonth = parts[0];
      expiryYear = parts[1] ? `20${parts[1]}` : "";
    }

    const payload = {
      slug,
      paymentMethod,
      customer: {
        name,
        email,
        cpfCnpj,
        phone,
        cep,
        addressNumber,
      },
      ...(paymentMethod === "CREDIT_CARD"
        ? {
            creditCard: {
              holderName: cardHolder,
              number: cardNumber,
              expiryMonth,
              expiryYear,
              cvv: cardCvv,
            },
          }
        : {}),
    };

    try {
      const res = await fetch("/api/payments/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao processar pagamento.");
      }

      setCheckoutSuccess(data);
    } catch (err: any) {
      setError(err.message || "Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format BRL
  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Loading state
  if (pageLoading) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Carregando dados da cobrança...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (pageError || !linkData) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>🔒</div>
            <h2 className={styles.errorTitle}>Link Indisponível</h2>
            <p className={styles.errorText}>
              {pageError || "Este link de pagamento não foi encontrado ou expirou."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Success
  if (checkoutSuccess) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.wrapper}>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>✓</div>

              {checkoutSuccess.billingType === "PIX" && (
                <>
                  <h2 className={styles.successTitle}>
                    Aguardando <span className={styles.textHighlight}>Pagamento</span>
                  </h2>
                  <p className={styles.successText}>
                    Escaneie o QR Code ou copie o código Pix para finalizar o pagamento de{" "}
                    <strong>{formatBRL(linkData.amount)}</strong>.
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
                      <p style={{ color: "#ff4b4b", marginBottom: "20px" }}>
                        QR Code temporariamente indisponível.
                      </p>
                    )}

                    <p className={styles.pixInstructions}>
                      Copie o código Pix abaixo e use &quot;Pix Copia e Cola&quot; no seu banco:
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
                  <h2 className={styles.successTitle}>
                    Boleto Gerado com <span className={styles.textHighlight}>Sucesso!</span>
                  </h2>
                  <p className={styles.successText}>
                    Seu boleto de <strong>{formatBRL(linkData.amount)}</strong> foi gerado. O
                    processamento pode levar 1-2 dias úteis.
                  </p>
                  <div className={styles.pixSection}>
                    {checkoutSuccess.boleto?.identificationField && (
                      <div className={styles.copiaColaContainer}>
                        <span className={styles.copiaColaText}>
                          {checkoutSuccess.boleto.identificationField}
                        </span>
                        <button
                          onClick={copyBoletoCode}
                          className={`${styles.copyBtn} ${copySuccess ? styles.copySuccess : ""}`}
                        >
                          {copySuccess ? "Copiado! ✓" : "Copiar Código"}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {checkoutSuccess.billingType === "CREDIT_CARD" && (
                <>
                  <h2 className={styles.successTitle}>
                    Pagamento <span className={styles.textHighlight}>Aprovado!</span>
                  </h2>
                  <p className={styles.successText}>
                    O pagamento de <strong>{formatBRL(linkData.amount)}</strong> foi processado com
                    sucesso. Status:{" "}
                    <strong>
                      {checkoutSuccess.status === "CONFIRMED" || checkoutSuccess.status === "RECEIVED"
                        ? "Aprovado"
                        : checkoutSuccess.status}
                    </strong>
                    .
                  </p>
                </>
              )}

              <div className={styles.actionRow}>
                {checkoutSuccess.bankSlipUrl && (
                  <a
                    href={checkoutSuccess.bankSlipUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryBtn}
                  >
                    Visualizar Boleto
                  </a>
                )}
                {checkoutSuccess.invoiceUrl && (
                  <a
                    href={checkoutSuccess.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.invoiceBtn}
                  >
                    Ver Fatura
                  </a>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main checkout form
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.wrapper}>
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>
              Pagamento <span className={styles.textHighlight}>Seguro</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Preencha seus dados e finalize o pagamento com total segurança.
            </p>
          </div>

          <div className={styles.checkoutGrid}>
            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.checkoutCard}>
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
                    <label className={styles.label}>Nome Completo</label>
                    <input
                      type="text"
                      className={styles.formControl}
                      placeholder="Ex: João Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGrid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>E-mail</label>
                      <input
                        type="email"
                        className={styles.formControl}
                        placeholder="Ex: joao@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Celular / WhatsApp</label>
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
                    <label className={styles.label}>CPF ou CNPJ</label>
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

              {/* Step 3: Credit Card Details */}
              {paymentMethod === "CREDIT_CARD" && (
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.stepNumber}>3</span>
                    Dados do Cartão e Faturamento
                  </h3>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nome no Cartão</label>
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
                      <label className={styles.label}>Número do Cartão</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                    </div>

                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Validade (MM/AA)</label>
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
                        <label className={styles.label}>CVV</label>
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

                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>CEP de Cobrança</label>
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
                        <label className={styles.label}>Número da Residência</label>
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
                    Processando...
                  </>
                ) : (
                  `Pagar ${formatBRL(linkData.amount)}`
                )}
              </button>

              <div className={styles.secureBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                Pagamento processado com criptografia SSL 256-bit
              </div>
            </form>

            {/* Summary Sidebar */}
            <aside className={`${styles.checkoutCard} ${styles.summaryCard}`}>
              <h3 className={styles.sectionTitle}>Resumo do Pagamento</h3>

              <div className={styles.receiptDetails}>
                <div className={styles.receiptRow}>
                  <span>Serviço</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>Cobrança Personalizada</span>
                </div>
                <div className={`${styles.receiptRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>{formatBRL(linkData.amount)}</span>
                </div>
              </div>

              <div className={styles.descriptionText}>
                <strong style={{ color: "#ffffff" }}>Descrição:</strong>
                <br />
                {linkData.description}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
