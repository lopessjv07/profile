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
      case "PIX": return "⚡ Pix";
      case "CREDIT_CARD": return "💳 Cartão";
      case "BOLETO": return "📄 Boleto";
      default: return method;
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
              <span className={styles.searchIcon}>🔍</span>
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
              ＋ Nova Cobrança
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
                <div className={styles.emptyIcon}>👥</div>
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
                          >
                            {expandedClient === client.id ? "▼" : "▶"}
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
