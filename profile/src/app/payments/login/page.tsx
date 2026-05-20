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
          {error && <div className={styles.error}>⚠️ {error}</div>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha de Acesso</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
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
