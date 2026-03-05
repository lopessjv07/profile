"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

/* ═══════════════════════════════════════
   Types
   ═══════════════════════════════════════ */

export type Lang = "pt" | "en";

export interface Project {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  link: string;
}

interface Translations {
  [key: string]: string | Project[];
  projects: Project[];
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tProjects: () => Project[];
}

/* ═══════════════════════════════════════
   Translations
   ═══════════════════════════════════════ */

const translations: Record<Lang, Translations> = {
  pt: {
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.stack": "Stack",
    "nav.contact": "Contato",

    "hero.greeting": "Olá, eu sou",
    "hero.tagline": "Construo experiências web de alta performance que convertem visitantes em clientes.",
    "hero.techs": "Utilizando Next.js + Framer Motion para entregar velocidade extrema.",
    "hero.cta": "Ver projetos",

    "about.title": "Sobre mim",
    "about.p1":
      "Dev fullstack com mentalidade de produto. Não só codifico — eu modelo, projeto e entrego sistemas completos em produção.",
    "about.p2.before": "Formado em Técnico em Desenvolvimento de Sistemas pelo ",
    "about.p2.school": "Senai",
    "about.p2.middle": ", com base sólida em lógica, estrutura de dados e arquitetura web. Trabalho com ",
    "about.p2.techs": "React, Node.js, TypeScript e Prisma",
    "about.p2.after": ".",
    "about.p3":
      "Meu foco não é só escrever código — é entender o problema, modelar a solução e entregar algo que funcione de verdade.",

    "services.title": "Serviços",
    "services.s1.title": "High-Conversion Landing Pages",
    "services.s1.desc": "Desenvolvimento de páginas ultrarrápidas focadas em transformar visitantes em clientes. Otimizadas especificamente para campanhas de tráfego pago (Google/Meta Ads) com foco total em Core Web Vitals e conversão mobile.",
    "services.s1.tech": "Zero-runtime CSS & Next.js Image Optimization",

    "services.s2.title": "Institutional & Brand Websites",
    "services.s2.desc": "Criação de presença digital para empresas que buscam autoridade no mercado internacional. Sites escaláveis, com SEO técnico avançado e design minimalista que comunica profissionalismo e solidez.",
    "services.s2.tech": "Clean Code architecture & SSR",

    "services.s3.title": "Custom Web Platforms & SaaS",
    "services.s3.desc": "Desenvolvimento de softwares sob medida para automação de processos. De dashboards financeiros a sistemas de agendamento complexos. Transformo lógica de negócio em ferramentas digitais escaláveis e seguras.",
    "services.s3.tech": "Complex State Management & APIs",

    "projects.title": "Projetos",
    "projects.subtitle": "Produtos reais com decisões técnicas e visão de negócio.",
    "projects.problem": "Problema",
    "projects.solution": "Solução",
    "projects.highlights": "Destaques",
    "projects.viewProject": "Ver projeto",

    "footer.title": "Pronto para escalar seu próximo projeto?",
    "footer.subtitle":
      "Seja para um SaaS de alta performance, uma solução de IA ou uma landing page focada em conversão — vamos construir juntos.",

    projects: [
      {
        id: "ordemo",
        label: "GTMetrix Grade A | 86% Performance",
        title: "Ordemo - Enterprise Business Management & SaaS",
        subtitle: "Arquitetura proprietária focada em segurança financeira.",
        problem:
          "Negócios de serviços gerenciam agenda, finanças e clientes em ferramentas separadas — sem integração e com retrabalho constante.",
        solution:
          "Uma plataforma SaaS robusta desenhada para centralizar finanças, agendamentos e CRM em um único fluxo de trabalho. Focada em integridade de dados e performance crítica.",
        highlights: [
          "Arquitetura proprietária focada em segurança financeira",
          "Gestão de escala corporativa",
          "Alta performance de carregamento",
        ],
        stack: ["React", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://ordemo.app/",
      },
      {
        id: "chamou",
        label: "Escalabilidade e Conexão de Mercado",
        title: "Chamou - Professional Freelance Ecosystem",
        subtitle: "Marketplace de Duas Pontas (Clientes vs. Profissionais)",
        problem:
          "Empresas precisam de freelancers disponíveis agora, mas plataformas tradicionais são lentas e burocráticas.",
        solution:
          "Arquitetura de ecossistema para conexão de talentos. Desenvolvido com foco em UX fluida, gerenciamento de estados complexos e um sistema de 'matching' em tempo real.",
        highlights: [
          "Design e experiência do usuário impecáveis",
          "Animações fluidas com Framer Motion",
          "Performance focada em redes",
        ],
        stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://chamou-preview.vercel.app/",
      },
      {
        id: "optic",
        label: "Processamento e Segurança",
        title: "Optic - AI-Driven Community Intelligence",
        subtitle: "Bot inteligente para proteção de servidores no Discord.",
        problem:
          "Análise e classificação manual consome tempo e está sujeita a erros em escala.",
        solution:
          "Bot de moderação integrado ao Discord que utiliza Redes Neurais customizadas (.h5) Aliadas à IA para proteger comunidades em tempo real. Identifica padrões de ameaça e automatiza a segurança de servidores com milhares de membros de forma autônoma.",
        highlights: [
          "Segurança de comunidades com Inteligência Artificial",
          "Integração contínua como Bot do Discord",
          "Redes Neurais customizadas processadas em tempo real",
        ],
        stack: ["Python", "TensorFlow"],
        link: "https://optic-zeta.vercel.app/",
      },
    ],
  },

  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.contact": "Contact",

    "hero.greeting": "Hi, I'm",
    "hero.tagline": "I build high-performance web experiences that convert visitors into customers.",
    "hero.techs": "Using Next.js + Framer Motion to deliver extreme speed.",
    "hero.cta": "See projects",

    "about.title": "About me",
    "about.p1":
      "Fullstack developer with a product mindset. I don't just code — I model, design, and deliver complete systems in production.",
    "about.p2.before": "Graduated as a Systems Development Technician from ",
    "about.p2.school": "Senai",
    "about.p2.middle": ", with a solid foundation in logic, data structures, and web architecture. I work with ",
    "about.p2.techs": "React, Node.js, TypeScript, and Prisma",
    "about.p2.after": ".",
    "about.p3":
      "My focus isn't just writing code — it's understanding the problem, modeling the solution, and delivering something that truly works.",

    "services.title": "Services",
    "services.s1.title": "High-Conversion Landing Pages",
    "services.s1.desc": "Development of ultra-fast pages focused on turning visitors into customers. Optimized specifically for paid traffic campaigns (Google/Meta Ads) with a total focus on Core Web Vitals and mobile conversion.",
    "services.s1.tech": "Zero-runtime CSS & Next.js Image Optimization",

    "services.s2.title": "Institutional & Brand Websites",
    "services.s2.desc": "Creating digital presence for companies seeking authority in the international market. Scalable sites with advanced technical SEO and minimalist design communicating professionalism and solidity.",
    "services.s2.tech": "Clean Code architecture & SSR",

    "services.s3.title": "Custom Web Platforms & SaaS",
    "services.s3.desc": "Development of custom software for process automation. From financial dashboards to complex scheduling systems. I transform business logic into scalable and secure digital tools.",
    "services.s3.tech": "Complex State Management & APIs",

    "projects.title": "Projects",
    "projects.subtitle": "Real products with technical decisions and business vision.",
    "projects.problem": "Problem",
    "projects.solution": "Solution",
    "projects.highlights": "Highlights",
    "projects.viewProject": "View project",

    "footer.title": "Ready to scale your next project?",
    "footer.subtitle":
      "Whether you're looking for a high-performance SaaS, an AI-driven solution, or a conversion-focused landing page—let’s build it together.",

    projects: [
      {
        id: "ordemo",
        label: "GTMetrix Grade A | 86% Performance",
        title: "Ordemo - Enterprise Business Management & SaaS",
        subtitle: "Proprietary architecture focused on financial security.",
        problem:
          "Service businesses manage scheduling, finances, and clients across separate tools — with no integration and constant rework.",
        solution:
          "A robust SaaS platform designed to centralize finances, scheduling, and CRM into a single workflow. Focused on data integrity and mission-critical performance.",
        highlights: [
          "Proprietary architecture focused on financial security",
          "Enterprise-scale management",
          "High loading performance",
        ],
        stack: ["React", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://ordemo.app/",
      },
      {
        id: "chamou",
        label: "Scalability and Market Connection",
        title: "Chamou - Professional Freelance Ecosystem",
        subtitle: "Two-Sided Marketplace (Clients vs. Professionals)",
        problem:
          "Companies need freelancers available right now, but traditional platforms are slow and bureaucratic.",
        solution:
          "Ecosystem architecture for talent connection. Developed with a focus on fluid UX, complex state management, and a real-time 'matching' system.",
        highlights: [
          "Impeccable design and user experience",
          "Fluid animations with Framer Motion",
          "Network-focused performance",
        ],
        stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://chamou-preview.vercel.app/",
      },
      {
        id: "optic",
        label: "Processing and Security",
        title: "Optic - AI-Driven Community Intelligence",
        subtitle: "Intelligent AI-Bot for Discord server protection.",
        problem:
          "Manual analysis and classification is time-consuming and error-prone at scale.",
        solution:
          "Discord-integrated moderation bot leveraging AI and customized Neural Networks (.h5) to protect communities in real-time. Autonomously identifies threat patterns and automates security for servers with thousands of members.",
        highlights: [
          "Community security via Artificial Intelligence",
          "Seamless integration as a Discord Bot",
          "Real-time processing of Custom Neural Networks",
        ],
        stack: ["Python", "TensorFlow"],
        link: "https://optic-zeta.vercel.app/",
      },
    ],
  },
};

/* ═══════════════════════════════════════
   Context + Provider
   ═══════════════════════════════════════ */

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "pt") return stored;
    } catch {
      /* SSR / privacy mode */
    }
    return "pt";
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string): string => {
    const val = translations[lang][key];
    if (typeof val === "string") return val;
    return key;
  };

  const tProjects = () => translations[lang].projects;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tProjects }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
