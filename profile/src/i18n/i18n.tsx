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
    "hero.tagline": "Construo produtos digitais do zero — da arquitetura ao deploy.",
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

    "projects.title": "Projetos",
    "projects.subtitle": "Produtos reais com decisões técnicas e visão de negócio.",
    "projects.problem": "Problema",
    "projects.solution": "Solução",
    "projects.highlights": "Destaques",
    "projects.viewProject": "Ver projeto",

    "footer.title": "Vamos conversar?",
    "footer.subtitle":
      "Se quiser trocar uma ideia sobre produto, código ou oportunidades — me chama.",

    projects: [
      {
        id: "ordemo",
        label: "Produto Real",
        title: "Ordemo",
        subtitle: "SaaS de gerenciamento multi-serviços",
        problem:
          "Negócios de serviços gerenciam agenda, finanças e clientes em ferramentas separadas — sem integração e com retrabalho constante.",
        solution:
          "Plataforma unificada que resolve agendamento, operação, controle financeiro e relacionamento com clientes em um único sistema.",
        highlights: [
          "Arquitetura escalável para multi-tenant",
          "Decisões técnicas complexas de modelagem",
          "Produto real com foco em resolver um problema de mercado",
        ],
        stack: ["React", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://ordemo.app/",
      },
      {
        id: "chamou",
        label: "Em Desenvolvimento",
        title: "Chamou",
        subtitle: "Plataforma de vagas instantâneas — em construção ativa",
        problem:
          "Empresas precisam de freelancers disponíveis agora, mas plataformas tradicionais são lentas e burocráticas.",
        solution:
          "Matching rápido entre freelancers disponíveis e empresas com demanda imediata, com UX simplificado e foco em velocidade.",
        highlights: [
          "Visão de produto — da ideia à arquitetura",
          "Modelagem completa do sistema e fluxo do usuário",
          "Frontend e backend desenvolvidos do zero",
        ],
        stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://chamou-preview.vercel.app/",
      },
      {
        id: "optic",
        label: "Projeto Técnico",
        title: "Optic",
        subtitle: "Automação e processamento inteligente",
        problem:
          "Análise e classificação manual consome tempo e está sujeita a erros em escala.",
        solution:
          "Pipeline automatizado com modelo de machine learning para classificação e processamento de dados de forma eficiente.",
        highlights: [
          "Domínio técnico em ML e automação",
          "Resolução de problemas complexos fora do web",
          "Capacidade de aprender e aplicar tecnologias novas",
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
    "hero.tagline": "I build digital products from scratch — from architecture to deploy.",
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

    "projects.title": "Projects",
    "projects.subtitle": "Real products with technical decisions and business vision.",
    "projects.problem": "Problem",
    "projects.solution": "Solution",
    "projects.highlights": "Highlights",
    "projects.viewProject": "View project",

    "footer.title": "Let's talk?",
    "footer.subtitle":
      "If you want to chat about product, code, or opportunities — reach out.",

    projects: [
      {
        id: "ordemo",
        label: "Real Product",
        title: "Ordemo",
        subtitle: "Multi-service management SaaS",
        problem:
          "Service businesses manage scheduling, finances, and clients across separate tools — with no integration and constant rework.",
        solution:
          "Unified platform that handles scheduling, operations, financial control, and customer relations in a single system.",
        highlights: [
          "Scalable multi-tenant architecture",
          "Complex technical modeling decisions",
          "Real product focused on solving a market problem",
        ],
        stack: ["React", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://ordemo.app/",
      },
      {
        id: "chamou",
        label: "In Development",
        title: "Chamou",
        subtitle: "Instant job platform — actively being built",
        problem:
          "Companies need freelancers available right now, but traditional platforms are slow and bureaucratic.",
        solution:
          "Fast matching between available freelancers and companies with immediate demand, with simplified UX and focus on speed.",
        highlights: [
          "Product vision — from idea to architecture",
          "Complete system modeling and user flow",
          "Frontend and backend built from scratch",
        ],
        stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://chamou-preview.vercel.app/",
      },
      {
        id: "optic",
        label: "Technical Project",
        title: "Optic",
        subtitle: "Automation and intelligent processing",
        problem:
          "Manual analysis and classification is time-consuming and error-prone at scale.",
        solution:
          "Automated pipeline with a machine learning model for efficient data classification and processing.",
        highlights: [
          "Technical mastery in ML and automation",
          "Solving complex problems beyond the web",
          "Ability to learn and apply new technologies",
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
