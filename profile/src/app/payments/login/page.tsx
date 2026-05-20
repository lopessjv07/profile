"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/payments/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to admin panel
        router.push("/payments/creationpay");
        router.refresh();
      } else {
        setError(data.message || "Senha incorreta");
      }
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>
          Painel <span className={styles.textHighlight}>Lopes Pay</span>
        </h1>
        <p className={styles.subtitle}>
          Insira a senha mestra do administrador para prosseguir.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              <svg className={styles.errorIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha de Acesso</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type="password"
                className={styles.input}
                placeholder="Digite a senha do administrador..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Autenticando..." : "Entrar no Painel"}
          </button>
        </form>

        <Link href="/" className={styles.backLink}>
          ← Voltar para o Site principal
        </Link>
      </div>
    </div>
  );
}
