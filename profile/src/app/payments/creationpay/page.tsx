"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/payments/auth", { method: "DELETE" });
      if (res.ok) {
        window.location.href = "/payments/login";
      } else {
        showToast("Erro ao encerrar sessão.");
      }
    } catch {
      showToast("Erro de rede ao sair.");
    }
  };

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
            <br /><br /><br />
            <h1 className={styles.pageTitle}>
              Criar <span className={styles.textHighlight}>Cobrança</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Defina o valor e gere um link único de pagamento para enviar ao seu cliente.
            </p>
            <div className={styles.adminNav}>
              <Link href="/payments/clients" className={styles.navLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Histórico de Clientes
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sair do Painel
              </button>
            </div>
          </div>

          <div className={styles.creationGrid}>
            {/* Left Column - Form */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </span>
                Nova Cobrança
              </h3>

              {error && (
                <div className={styles.errorMessage}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
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
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                      Gerar Link de Pagamento
                    </>
                  )}
                </button>
              </form>

              {/* Generated Link Display */}
              {generatedLink && (
                <div className={styles.linkSuccess}>
                  <div className={styles.linkSuccessTitle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Link gerado — {formatBRL(generatedLink.amount)}
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
                <span className={styles.cardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </span>
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
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, margin: '0 auto 16px', display: 'block' }}>
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        </button>
                        <button
                          className={styles.iconBtn}
                          onClick={() => window.open(link.url, "_blank")}
                          title="Abrir link"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </button>
                        {link.status === "ACTIVE" && (
                          <button
                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                            onClick={() => cancelLink(link.id)}
                            title="Cancelar link"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
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
