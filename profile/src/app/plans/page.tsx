"use client";

import { useState } from "react";
import styles from "./plans.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer.tsx/Footer";

export default function LPLensPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const whatsappLink = "https://wa.me/5547992008256?text=Ol%C3%A1%2C%20gostaria%20de%20contratar%20a%20infraestrutura%20de%20elite%20para%20minhas%20p%C3%A1ginas.";

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.wrapper}>
          <br />
          <br />
          <h1 className={styles.heroTitle}>
            Pare de queimar o orçamento dos seus anúncios com <span className={styles.textHighlight}>páginas lentas.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Nossa solução: Código Puro em Next.js hospedado em infraestrutura de servidores VPS privados para máxima estabilidade e conversão.
          </p>
          <a href="#planos" className={styles.ctaBtn}>
            Garantir Infraestrutura de Elite
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.wrapper}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Carregamento Instantâneo</h3>
              <p className={styles.benefitDesc}>Construído com Código Puro, sem construtores pesados ou plugins que atrasam a página. Ideal para não perder leads.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Estabilidade 24/7</h3>
              <p className={styles.benefitDesc}>Hospedagem em container privado (VPS). Sem quedas em picos de tráfego durante os seus lançamentos.</p>
            </div>
            <div className={styles.benefitCard}>
              <h3 className={styles.benefitTitle}>Suporte Dedicado</h3>
              <p className={styles.benefitDesc}>Atendimento direto com a equipe de engenharia. Alterações e manutenções tratadas com prioridade absoluta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className={styles.plans}>
        <div className={styles.wrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Escolha a <span className={styles.textHighlight}>Sua Estrutura</span></h2>
            <p className={styles.sectionSubtitle}>Planos desenvolvidos para escalar a operação de Gestores e Agências.</p>
          </div>

          <div className={styles.plansGrid}>
            {/* Start Plan */}
            <article className={styles.planCard}>
              <h3 className={styles.planName}>Plano Start</h3>
              <div className={styles.planPrice}>
                R$ 150<span className={styles.planPeriod}>/mês</span>
              </div>
              <p className={styles.planDesc}>Focado em Landing Pages e Funis de Venda de alta conversão.</p>
              
              <ul className={styles.planFeatures}>
                <li className={styles.featureItem}>Criação de 1 LP em código puro</li>
                <li className={styles.featureItem}>Hospedagem premium em VPS</li>
                <li className={styles.featureItem}>Certificado SSL grátis</li>
                <li className={styles.featureItem}>Até 5 alterações mensais de conteúdo existente</li>
              </ul>
              
              <div className={styles.planAction}>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.planBtn}>
                  Quero saber mais
                </a>
                <p className={styles.planFidelity}>
                  <a href="/regrasAdes%C3%A3o%26termosDeServi%C3%A7o.pdf" target="_blank" rel="noopener noreferrer">Ver termos de adesão</a>
                </p>
              </div>
            </article>

            {/* Business Plan */}
            <article className={styles.planCard}>
              <h3 className={styles.planName}>Plano Business</h3>
              <div className={styles.planPrice}>
                R$ 200<span className={styles.planPeriod}>/mês</span>
              </div>
              <p className={styles.planDesc}>Ideal para Sites Institucionais e consolidação de marca.</p>
              
              <ul className={styles.planFeatures}>
                <li className={styles.featureItem}>Criação de site com até 4 páginas</li>
                <li className={styles.featureItem}>Hospedagem premium em VPS</li>
                <li className={styles.featureItem}>Certificado SSL grátis</li>
                <li className={styles.featureItem}>Até 5 alterações mensais de conteúdo existente</li>
              </ul>
              
              <div className={styles.planAction}>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.planBtn}>
                  Quero saber mais
                </a>
                <p className={styles.planFidelity}>
                  <a href="/regrasAdes%C3%A3o%26termosDeServi%C3%A7o.pdf" target="_blank" rel="noopener noreferrer">Ver termos de adesão</a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.wrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Perguntas <span className={styles.textHighlight}>Frequentes</span></h2>
          </div>
          
          <div className={styles.faqContainer}>
            <div className={`${styles.accordionItem} ${activeFaq === 0 ? styles.active : ''}`}>
              <button className={styles.accordionHeader} onClick={() => toggleFaq(0)}>
                O que acontece se eu precisar de mais páginas ou novas rotas (/outra-coisa) depois?
              </button>
              <div className={styles.accordionContent}>
                <p className={styles.accordionText}>Qualquer nova página criada ou nova rota é tratada sob uma taxa avulsa a partir de R$ 100 por nova página criada. Assim garantimos que o plano mensal se mantenha justo para o escopo inicial contratado.</p>
              </div>
            </div>

            <div className={`${styles.accordionItem} ${activeFaq === 1 ? styles.active : ''}`}>
              <button className={styles.accordionHeader} onClick={() => toggleFaq(1)}>
                Quem compra o domínio?
              </button>
              <div className={styles.accordionContent}>
                <p className={styles.accordionText}>Por questões de segurança jurídica e para garantir que a propriedade da marca seja exclusivamente sua, o domínio é registrado no CPF ou CNPJ do cliente. Nós fazemos apenas o apontamento de DNS para a nossa infraestrutura.</p>
              </div>
            </div>

            <div className={`${styles.accordionItem} ${activeFaq === 2 ? styles.active : ''}`}>
              <button className={styles.accordionHeader} onClick={() => toggleFaq(2)}>
                Como funciona o suporte e alterações?
              </button>
              <div className={styles.accordionContent}>
                <p className={styles.accordionText}>Oferecemos um limite de 5 solicitações de alterações de textos ou imagens já existentes no site por mês. Qualquer alteração solicitada tem um prazo de execução e entrega de até 24 horas úteis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
