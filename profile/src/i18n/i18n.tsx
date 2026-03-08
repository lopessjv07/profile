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
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.stack": "Stack",
    "nav.contact": "Contato",

    "hero.greeting": "Olá, eu sou",
    "hero.tagline": "Desenvolvedor Full-Stack construindo aplicações web e sites corporativos de alta performance.",
    "hero.techs": "Ajudo empresas e equipes a construir plataformas web rápidas, escaláveis e modernas.",
    "hero.cta_work": "Ver meu trabalho",
    "hero.cta_about": "Sobre",

    "about.title": "Sobre mim",
    "about.p1":
      "Sou o Lopes, um desenvolvedor focado em construir aplicações web rápidas e escaláveis usando tecnologias modernas.",
    "about.p2":
      "Trabalho com tecnologias web modernas para construir aplicações rápidas, escaláveis e confiáveis. Minha stack foca nos ecossistemas JavaScript e TypeScript, utilizando ferramentas como Next.js, React e Node.js, combinadas com bancos de dados como PostgreSQL.",
    "about.p3":
      "Meu objetivo é criar soluções bem arquitetadas que sejam performáticas, fáceis de manter e construídas para escalar.",

    "performance.title": "Por que meus sites performam melhor",
    "performance.subtitle": "Velocidade do site afeta diretamente as conversões.",
    "performance.point1": "Carregam em menos de 1 segundo",
    "performance.point2": "Construídos para SEO",
    "performance.point3": "Maior taxa de conversão",
    "performance.point4": "Arquitetura escalável",
    "performance.conclusion": "Sites lentos perdem clientes. Eu construo sites que carregam instantaneamente e convertem tráfego em receita.",

    "services.title": "Serviços",
    "services.s1.title": "High-Conversion Landing Pages",
    "services.s1.desc": "Páginas focadas em transformar visitantes em clientes. Otimizadas para maximizar o retorno do seu investimento em tráfego pago, garantindo que você não perca vendas por lentidão ou design confuso.",
    "services.s1.b1": "Carregamento ultrarrápido",
    "services.s1.b2": "Maior taxa de conversão",
    "services.s1.b3": "Perfeito para Google/Meta Ads",

    "services.s2.title": "Institutional & Brand Websites",
    "services.s2.desc": "Criação de presença digital para empresas que buscam autoridade no mercado. Um site profissional que transmite confiança e garante que sua empresa seja encontrada com facilidade.",
    "services.s2.b1": "Melhor ranqueamento no Google",
    "services.s2.b2": "Transmite autoridade e confiança",
    "services.s2.b3": "Design focado no seu cliente",

    "services.s3.title": "Custom Web Platforms & SaaS",
    "services.s3.desc": "Ferramentas sob medida para simplificar processos do seu negócio. Transformo problemas complexos em plataformas fáceis de usar que economizam tempo e dinheiro da sua equipe.",
    "services.s3.b1": "Redução de custos operacionais",
    "services.s3.b2": "Automação de processos manuais",
    "services.s3.b3": "Escalável para o seu crescimento",

    "projects.title": "Projetos",
    "projects.subtitle": "Produtos reais com decisões técnicas e visão de negócio.",
    "projects.problem": "Problema",
    "projects.solution": "Solução",
    "projects.highlights": "Destaques",
    "projects.viewProject": "Ver projeto",

    "footer.title": "Let's build your next project?",
    "footer.subtitle": "I build fast, scalable, and high-performance websites focused on real business results.",
    "footer.cta": "Start a Project",
    "footer.secondary_cta": "View My Work",

    "services.hero.title": "Websites e Aplicações Web Focados em Performance",
    "services.hero.subtitle": "Construo sites rápidos, escaláveis e modernos para empresas e startups.",
    "services.hero.cta": "Iniciar um Projeto",

    "services.list.title": "Meus Serviços",
    "services.list.landing": "Landing Pages",
    "services.list.landing.desc": "Landing pages de alta performance otimizadas para converter visitantes em clientes.",
    "services.list.landing.f1": "Carregamento ultrarrápido",
    "services.list.landing.f2": "Estrutura otimizada para SEO",
    "services.list.landing.f3": "Design mobile-first",
    "services.list.landing.f4": "Layout focado em conversão",
    "services.list.landing.cta": "Iniciar um Projeto",

    "services.list.business": "Sites Corporativos",
    "services.list.business.desc": "Sites profissionais para empresas que desejam uma forte presença online.",
    "services.list.business.f1": "Design personalizado",
    "services.list.business.f2": "Alta performance",
    "services.list.business.f3": "Pronto para SEO",
    "services.list.business.f4": "Arquitetura escalável",
    "services.list.business.cta": "Iniciar um Projeto",

    "services.list.saas": "Desenvolvimento de SaaS",
    "services.list.saas.desc": "Desenvolvimento de plataformas web escaláveis e produtos SaaS.",
    "services.list.saas.f1": "Desenvolvimento full-stack",
    "services.list.saas.f2": "Sistemas de autenticação",
    "services.list.saas.f3": "Integração de banco de dados",
    "services.list.saas.f4": "Arquitetura escalável",
    "services.list.saas.cta": "Iniciar um Projeto",

    "services.list.maintenance": "Manutenção de Sites",
    "services.list.maintenance.desc": "Atualizações e suporte técnico para manter sites seguros e otimizados.",
    "services.list.maintenance.f1": "Correção de bugs",
    "services.list.maintenance.f2": "Melhorias de performance",
    "services.list.maintenance.f3": "Atualizações contínuas",
    "services.list.maintenance.f4": "Suporte técnico",
    "services.list.maintenance.cta": "Solicitar Manutenção",

    "services.recent.title": "Projetos Recentes",
    "services.recent.carwash": "Site de Lava Rápido",
    "services.recent.carwash.desc": "Site rápido e focado em conversão para um serviço premium de lavagem automotiva.",
    "services.recent.hairsalon": "Site de Salão de Beleza",
    "services.recent.hairsalon.desc": "Presença digital moderna e elegante para agendamentos em um salão de alto padrão.",
    "services.recent.cleaning": "Site de Limpeza Corporativa",
    "services.recent.cleaning.desc": "Plataforma projetada para maximizar SEO local e confiança em serviços de limpeza.",
    "services.recent.cta": "Ver Projeto",

    "services.why.title": "Por Que Trabalhar Comigo",
    "services.why.f1": "Sites ultrarrápidos",
    "services.why.f2": "Estrutura SEO-ready",
    "services.why.f3": "Tecnologias modernas",
    "services.why.f4": "Design mobile-first",

    "services.cta.title": "Pronto para construir o seu site?",
    "services.cta.subtitle": "Vamos trabalhar juntos para criar algo incrível que entregue resultados reais.",
    "services.cta.btn": "Iniciar um Projeto",

    projects: [
      {
        id: "ordemo",
        label: "GTMetrix Grade A | 86% Performance",
        title: "Ordemo - Enterprise Business Management & SaaS",
        subtitle: "Arquitetura proprietária focada em segurança financeira.",
        problem:
          "Empresas gerenciam agenda, clientes e finanças em ferramentas separadas.",
        solution:
          "Uma plataforma SaaS unificada que centraliza as operações em um único sistema.",
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
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.contact": "Contact",

    "hero.greeting": "Hi, I'm",
    "hero.tagline": "Full-Stack Developer building high-performance web applications and business websites.",
    "hero.techs": "I help businesses and teams build fast, scalable and modern web platforms.",
    "hero.cta_work": "View my work",
    "hero.cta_about": "About",

    "about.title": "About me",
    "about.p1":
      "I'm Lopes, a developer focused on building fast and scalable web applications using modern technologies.",
    "about.p2":
      "I work with modern web technologies to build fast, scalable and reliable applications. My stack focuses on JavaScript and TypeScript ecosystems, using tools like Next.js, React and Node.js, combined with databases such as PostgreSQL.",
    "about.p3":
      "My goal is to create well-engineered solutions that are performant, maintainable and built to scale.",

    "performance.title": "Why my websites perform better",
    "performance.subtitle": "Website speed directly affects conversions.",
    "performance.point1": "Load under 1 second",
    "performance.point2": "Built for SEO",
    "performance.point3": "Higher conversion rate",
    "performance.point4": "Scalable architecture",
    "performance.conclusion": "Slow websites lose customers. I build websites that load instantly and convert traffic into revenue.",

    "services.title": "Services",
    "services.s1.title": "High-Conversion Landing Pages",
    "services.s1.desc": "Pages focused on turning visitors into customers. Optimized to maximize your return on ad spend, ensuring you don't lose sales due to slow loading or confusing design.",
    "services.s1.b1": "Faster loading pages",
    "services.s1.b2": "Higher conversion rates",
    "services.s1.b3": "Perfect for paid traffic (Ads)",

    "services.s2.title": "Institutional & Brand Websites",
    "services.s2.desc": "Creating a digital presence for businesses seeking market authority. A professional website that builds trust and ensures your company is easily found.",
    "services.s2.b1": "Better Google ranking",
    "services.s2.b2": "Builds brand authority",
    "services.s2.b3": "Customer-focused design",

    "services.s3.title": "Custom Web Platforms & SaaS",
    "services.s3.desc": "Custom tools to simplify your business processes. I transform complex problems into easy-to-use platforms that save your team time and money.",
    "services.s3.b1": "Reduced operational costs",
    "services.s3.b2": "Manual process automation",
    "services.s3.b3": "Scalable for growth",

    "projects.title": "Projects",
    "projects.subtitle": "Real products with technical decisions and business vision.",
    "projects.problem": "Problem",
    "projects.solution": "Solution",
    "projects.highlights": "Highlights",
    "projects.viewProject": "View project",

    "footer.title": "Let's build your next project?",
    "footer.subtitle": "I build fast, scalable, and high-performance websites focused on real business results.",
    "footer.cta": "Start a Project",
    "footer.secondary_cta": "View My Work",

    "services.hero.title": "High-performance websites built to bring more customers to your business",
    "services.hero.subtitle": "Fast, modern and scalable websites designed to convert visitors into customers.",
    "services.hero.cta": "Start a Project",

    "services.list.title": "My Services",
    "services.list.landing": "Landing Pages",
    "services.list.landing.desc": "High-performance landing pages designed to convert visitors into customers.",
    "services.list.landing.f1": "Fast loading performance",
    "services.list.landing.f2": "Conversion-focused layout",
    "services.list.landing.f3": "SEO optimized structure",
    "services.list.landing.f4": "Mobile-first design",
    "services.list.landing.cta": "Start a Project",

    "services.list.business": "Business Websites",
    "services.list.business.desc": "Professional websites for companies that want a strong online presence.",
    "services.list.business.f1": "Custom modern design",
    "services.list.business.f2": "High-performance architecture",
    "services.list.business.f3": "SEO-ready structure",
    "services.list.business.f4": "Scalable codebase",
    "services.list.business.cta": "Start a Project",

    "services.list.saas": "SaaS Development",
    "services.list.saas.desc": "Development of scalable web platforms and SaaS products.",
    "services.list.saas.f1": "Full-stack development",
    "services.list.saas.f2": "Authentication systems",
    "services.list.saas.f3": "Database integration",
    "services.list.saas.f4": "Scalable architecture",
    "services.list.saas.cta": "Start a Project",

    "services.list.maintenance": "Website Maintenance",
    "services.list.maintenance.desc": "Continuous improvements and technical support for your website.",
    "services.list.maintenance.f1": "Bug fixes",
    "services.list.maintenance.f2": "Performance optimization",
    "services.list.maintenance.f3": "Updates and improvements",
    "services.list.maintenance.f4": "Technical support",
    "services.list.maintenance.cta": "Request Maintenance",

    "services.recent.title": "Recent Projects",
    "services.recent.carwash": "Car Wash Website",
    "services.recent.carwash.desc": "A fast, conversion-driven website for a local premium car wash service.",
    "services.recent.hairsalon": "Hair Salon Website",
    "services.recent.hairsalon.desc": "Modern and elegant online booking presence for an upscale salon.",
    "services.recent.cleaning": "Cleaning Business Website",
    "services.recent.cleaning.desc": "Service inquiry platform designed to maximize local SEO and trust.",
    "services.recent.cta": "View Project",

    "services.why.title": "Why Work With Me",
    "services.why.f1": "Ultra-fast websites",
    "services.why.f2": "SEO-ready structure",
    "services.why.f3": "Mobile-first design",
    "services.why.f4": "Modern scalable technologies",

    "services.cta.title": "Ready to build your website?",
    "services.cta.subtitle": "Let's create a fast, modern and scalable website for your business.",
    "services.cta.btn": "Start a Project",

    projects: [
      {
        id: "ordemo",
        label: "GTMetrix Grade A | 86% Performance",
        title: "Ordemo - Enterprise Business Management & SaaS",
        subtitle: "Proprietary architecture focused on financial security.",
        problem:
          "Businesses manage scheduling, clients and finances in separate tools.",
        solution:
          "A unified SaaS platform that centralizes operations in a single system.",
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
const [lang, setLangState] = useState<Lang>("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "pt") {
        setLangState(stored);
      }
    } catch {
      /* SSR / privacy mode */
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang, isClient]);

  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string): string => {
    const val = translations[lang][key];
    if (typeof val === "string") return val;
    return key;
  };

  const tProjects = () => translations[lang].projects;

  if (!isClient) {
    return null; // Or a loading spinner, to avoid rendering mismatch before hydration
  }

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
