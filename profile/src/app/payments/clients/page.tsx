"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer.tsx/Footer";
import styles from "./clients.module.css";

interface Payment {
  id: string;
  method: string;
  status: string;
  amount: number;
  asaasPaymentId: string | null;
  asaasInvoiceUrl: string | null;
  createdAt: string;
  paymentLink: {
    description: string;
    slug: string;
  };
}

interface Client {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  cep: string | null;
  addressNumber: string | null;
  createdAt: string;
  payments: Payment[];
}

interface Stats {
  totalClients: number;
  totalPayments: number;
  totalReceived: number;
  totalPending: number;
}

export default function ClientsPage() {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/payments/auth", { method: "DELETE" });
      if (res.ok) {
        window.location.href = "/payments/login";
      }
    } catch {
      console.error("Erro ao encerrar sessão");
    }
  };
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalPayments: 0,
    totalReceived: 0,
    totalPending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  // Fetch clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (methodFilter) params.set("method", methodFilter);

      const res = await fetch(`/api/payments/clients?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setClients(data.clients);
        setStats(data.stats);
      }
    } catch {
      console.error("Erro ao carregar clientes");
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch when filters change (debounced for search)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchClients();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, statusFilter, methodFilter]);

  // Format helpers
  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatCpfCnpj = (raw: string) => {
    if (raw.length <= 11) {
      return raw
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return raw
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (raw: string) => {
    if (raw.length <= 10) {
      return raw.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    }
    return raw.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
  };

  // Status utils
  const getStatusClass = (status: string) => {
    switch (status) {
      case "CONFIRMED":
      case "RECEIVED":
        return styles.statusConfirmed;
      case "PENDING":
        return styles.statusPending;
      case "FAILED":
      case "OVERDUE":
        return styles.statusFailed;
      default:
        return styles.statusReceived;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "● Confirmado";
      case "RECEIVED": return "● Recebido";
      case "PENDING": return "● Pendente";
      case "FAILED": return "● Falhou";
      case "OVERDUE": return "● Atrasado";
      default: return status;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "PIX":
        return (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Pix
          </span>
        );
      case "CREDIT_CARD":
        return (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Cartão
          </span>
        );
      case "BOLETO":
        return (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Boleto
          </span>
        );
      default:
        return method;
    }
  };

  // Toggle expand
  const toggleExpand = (clientId: string) => {
    setExpandedClient((prev) => (prev === clientId ? null : clientId));
  };

  // Get total per client
  const getClientTotal = (client: Client) =>
    client.payments.reduce((sum, p) => sum + p.amount, 0);

  const getClientLastStatus = (client: Client) => {
    if (client.payments.length === 0) return "PENDING";
    return client.payments[0].status;
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.wrapper}>
          {/* Title */}
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>
              Histórico de <span className={styles.textHighlight}>Clientes</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Visualize todos os clientes e pagamentos da sua plataforma em tempo real.
            </p>
            <div className={styles.adminNav}>
              <Link href="/payments/creationpay" className={styles.navLink}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Criar Cobrança
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

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total de Clientes</span>
              <span className={`${styles.statValue} ${styles.statValueGreen}`}>
                {stats.totalClients}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Pagamentos Realizados</span>
              <span className={`${styles.statValue} ${styles.statValueBlue}`}>
                {stats.totalPayments}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Recebido</span>
              <span className={`${styles.statValue} ${styles.statValueYellow}`}>
                {formatBRL(stats.totalReceived)}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Pendente</span>
              <span className={`${styles.statValue} ${styles.statValueRed}`}>
                {formatBRL(stats.totalPending)}
              </span>
            </div>
          </div>

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Buscar por nome, email ou CPF/CNPJ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="PENDING">Pendente</option>
              <option value="CONFIRMED">Confirmado</option>
              <option value="RECEIVED">Recebido</option>
              <option value="FAILED">Falhou</option>
            </select>

            <select
              className={styles.filterSelect}
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="">Todos os Métodos</option>
              <option value="PIX">Pix</option>
              <option value="CREDIT_CARD">Cartão de Crédito</option>
              <option value="BOLETO">Boleto</option>
            </select>

            <Link href="/payments/creationpay" className={styles.navBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Nova Cobrança
            </Link>
          </div>

          {/* Table */}
          <div className={styles.tableContainer}>
            {isLoading ? (
              <div style={{ padding: "20px" }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={styles.skeleton}></div>
                ))}
              </div>
            ) : clients.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, margin: '0 auto 16px', display: 'block' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <h3 className={styles.emptyTitle}>Nenhum cliente encontrado</h3>
                <p className={styles.emptyText}>
                  {search || statusFilter || methodFilter
                    ? "Tente ajustar os filtros de busca."
                    : "Quando seus clientes realizarem pagamentos, aparecerão aqui."}
                </p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Cliente</th>
                    <th>Telefone</th>
                    <th>Pagamentos</th>
                    <th>Último Status</th>
                    <th>Total</th>
                    <th>Criado Em</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <>
                      <tr
                        key={client.id}
                        className={expandedClient === client.id ? styles.expandedRow : ""}
                      >
                        <td>
                          <button
                            className={styles.expandBtn}
                            onClick={() => toggleExpand(client.id)}
                            title="Ver pagamentos"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            {expandedClient === client.id ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"/>
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"/>
                              </svg>
                            )}
                          </button>
                        </td>
                        <td>
                          <div className={styles.clientCell}>
                            <span className={styles.clientName}>{client.name}</span>
                            <span className={styles.clientEmail}>{client.email}</span>
                            <span className={styles.clientCpf}>
                              {formatCpfCnpj(client.cpfCnpj)}
                            </span>
                          </div>
                        </td>
                        <td style={{ color: "#a0a0a0" }}>
                          {formatPhone(client.phone)}
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: "#ffffff" }}>
                            {client.payments.length}
                          </span>
                        </td>
                        <td>
                          {client.payments.length > 0 ? (
                            <span
                              className={`${styles.statusBadge} ${getStatusClass(
                                getClientLastStatus(client)
                              )}`}
                            >
                              {getStatusLabel(getClientLastStatus(client))}
                            </span>
                          ) : (
                            <span style={{ color: "#555555" }}>—</span>
                          )}
                        </td>
                        <td>
                          <span className={styles.amount}>
                            {formatBRL(getClientTotal(client))}
                          </span>
                        </td>
                        <td style={{ color: "#777777", fontSize: "0.85rem" }}>
                          {formatDate(client.createdAt)}
                        </td>
                      </tr>

                      {/* Expanded payments */}
                      {expandedClient === client.id && client.payments.length > 0 && (
                        <tr key={`${client.id}-expanded`}>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <div className={styles.expandedContent}>
                              <div className={styles.paymentsList}>
                                {client.payments.map((payment) => (
                                  <div key={payment.id} className={styles.paymentItem}>
                                    <div className={styles.paymentItemInfo}>
                                      <span className={styles.methodBadge}>
                                        {getMethodLabel(payment.method)}
                                      </span>
                                      <span
                                        className={`${styles.statusBadge} ${getStatusClass(
                                          payment.status
                                        )}`}
                                      >
                                        {getStatusLabel(payment.status)}
                                      </span>
                                      <span className={styles.paymentItemDesc}>
                                        {payment.paymentLink?.description || "—"}
                                      </span>
                                      <span className={styles.paymentItemDate}>
                                        {formatDate(payment.createdAt)}
                                      </span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                      <span className={styles.amount}>
                                        {formatBRL(payment.amount)}
                                      </span>
                                      {payment.asaasInvoiceUrl && (
                                        <a
                                          href={payment.asaasInvoiceUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          style={{
                                            color: "#64b4ff",
                                            fontSize: "0.8rem",
                                            textDecoration: "none",
                                          }}
                                        >
                                          Ver Fatura ↗
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
