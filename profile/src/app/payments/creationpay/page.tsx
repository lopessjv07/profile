"use client";

import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer.tsx/Footer";
import styles from "./creationpay.module.css";

interface PaymentLinkData {
  id: string;
  slug: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  url: string;
  totalPayments?: number;
  paidCount?: number;
}

export default function CreationPayPage() {
  // Form state
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generated link state
  const [generatedLink, setGeneratedLink] = useState<PaymentLinkData | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Links history
  const [links, setLinks] = useState<PaymentLinkData[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  // Load existing links on mount
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLinksLoading(true);
    try {
      const res = await fetch("/api/payments/create-link");
      const data = await res.json();
      if (data.success) {
        setLinks(data.links);
      }
    } catch {
      console.error("Erro ao carregar links");
    } finally {
      setLinksLoading(false);
    }
  };

  // Format amount input (BRL)
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d,\.]/g, "");
    setAmount(raw);
  };

  // Parse amount to float
  const parseAmount = (value: string): number => {
    // Handle Brazilian format: 1.500,00 or 1500,00
    const cleaned = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleaned) || 0;
  };

  // Create payment link
  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedLink(null);

    const parsedAmount = parseAmount(amount);
    if (parsedAmount <= 0) {
      setError("Informe um valor válido maior que zero.");
      setIsLoading(false);
      return;
    }

    if (!description.trim()) {
      setError("Informe uma descrição para a cobrança.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/payments/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedAmount,
          description: description.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar link de pagamento.");
      }

      setGeneratedLink(data.paymentLink);
      setLinks((prev) => [data.paymentLink, ...prev]);
      showToast("✓ Link de pagamento criado com sucesso!");

      // Clear form
      setAmount("");
      setDescription("");
    } catch (err: any) {
      setError(err.message || "Erro ao criar link.");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy link to clipboard
  const copyLink = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopySuccess(true);
    showToast("✓ Link copiado para a área de transferência!");
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Cancel a link
  const cancelLink = async (id: string) => {
    try {
      const res = await fetch(`/api/payments/create-link?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLinks((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: "CANCELLED" } : l))
        );
        showToast("Link cancelado com sucesso.");
      }
    } catch {
      showToast("Erro ao cancelar link.");
    }
  };

  // Show toast notification
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format BRL
  const formatBRL = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "ACTIVE": return styles.statusActive;
      case "PAID": return styles.statusPaid;
      case "CANCELLED": return styles.statusCancelled;
      case "EXPIRED": return styles.statusExpired;
      default: return styles.statusActive;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE": return "● Ativo";
      case "PAID": return "● Pago";
      case "CANCELLED": return "● Cancelado";
      case "EXPIRED": return "● Expirado";
      default: return status;
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.wrapper}>
          {/* Page Title */}
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>
              Criar <span className={styles.textHighlight}>Cobrança</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Defina o valor e gere um link único de pagamento para enviar ao seu cliente.
            </p>
          </div>

          <div className={styles.creationGrid}>
            {/* Left Column - Form */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>💰</span>
                Nova Cobrança
              </h3>

              {error && (
                <div className={styles.errorMessage}>
                  <span style={{ fontSize: "1.2rem" }}>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleCreateLink}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Valor da Cobrança</label>
                  <div className={styles.amountContainer}>
                    <span className={styles.amountPrefix}>R$</span>
                    <input
                      type="text"
                      className={`${styles.formControl} ${styles.amountInput}`}
                      placeholder="0,00"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Descrição do Serviço</label>
                  <textarea
                    className={`${styles.formControl} ${styles.textarea}`}
                    placeholder="Ex: Desenvolvimento de Landing Page Premium, Consultoria técnica, Manutenção mensal..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                  {isLoading ? (
                    <>
                      <div className={styles.spinner}></div>
                      Gerando Link...
                    </>
                  ) : (
                    "🔗 Gerar Link de Pagamento"
                  )}
                </button>
              </form>

              {/* Generated Link Display */}
              {generatedLink && (
                <div className={styles.linkSuccess}>
                  <div className={styles.linkSuccessTitle}>
                    <span>✓</span> Link gerado — {formatBRL(generatedLink.amount)}
                  </div>
                  <div className={styles.linkDisplay}>
                    <span className={styles.linkUrl}>
                      {window.location.origin}{generatedLink.url}
                    </span>
                    <button
                      onClick={() => copyLink(generatedLink.url)}
                      className={`${styles.copyBtn} ${copySuccess ? styles.copySuccess : ""}`}
                    >
                      {copySuccess ? "Copiado! ✓" : "Copiar"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Links History */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>📋</span>
                Links Criados
              </h3>

              <div className={styles.linksContainer}>
                {linksLoading ? (
                  <>
                    <div className={styles.skeleton}></div>
                    <div className={styles.skeleton}></div>
                    <div className={styles.skeleton}></div>
                  </>
                ) : links.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🔗</div>
                    <p className={styles.emptyText}>
                      Nenhum link criado ainda.<br />
                      Crie sua primeira cobrança ao lado.
                    </p>
                  </div>
                ) : (
                  links.map((link) => (
                    <div key={link.id} className={styles.linkItem}>
                      <div className={styles.linkItemInfo}>
                        <div className={styles.linkItemDesc}>{link.description}</div>
                        <div className={styles.linkItemMeta}>
                          <span className={`${styles.statusBadge} ${getStatusClass(link.status)}`}>
                            {getStatusLabel(link.status)}
                          </span>
                          <span>{formatDate(link.createdAt)}</span>
                          {link.totalPayments !== undefined && link.totalPayments > 0 && (
                            <span>
                              {link.paidCount}/{link.totalPayments} pago(s)
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={styles.linkItemAmount}>
                        {formatBRL(link.amount)}
                      </span>
                      <div className={styles.linkItemActions}>
                        <button
                          className={styles.iconBtn}
                          onClick={() => copyLink(link.url)}
                          title="Copiar link"
                        >
                          📋
                        </button>
                        <button
                          className={styles.iconBtn}
                          onClick={() => window.open(link.url, "_blank")}
                          title="Abrir link"
                        >
                          ↗
                        </button>
                        {link.status === "ACTIVE" && (
                          <button
                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                            onClick={() => cancelLink(link.id)}
                            title="Cancelar link"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Toast Notification */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
