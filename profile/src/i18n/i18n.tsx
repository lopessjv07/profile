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
    "hero.tagline": "Construo sites ultrarrápidos que convertem tráfego em clientes.",
    "hero.techs": "Construído para velocidade, SEO e conversões.",
    "hero.cta": "Iniciar um projeto",

    "about.title": "Sobre mim",
    "about.p1":
      "Sou um desenvolvedor fullstack com foco em negócios. Meu objetivo não é apenas escrever código — é entender a sua operação e criar soluções que gerem resultados reais.",
    "about.p2": 
      "Com sólida base em arquitetura de software, garanto que o seu projeto seja seguro, rápido e pronto para crescer junto com a sua empresa. Crio plataformas robustas sem dores de cabeça técnicas no futuro.",
    "about.p3":
      "Transformo problemas complexos em sistemas fáceis de usar, automatizando processos para que sua equipe ganhe tempo e você possa focar no que importa: escalar suas vendas.",

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
    "nav.projects": "Projects",
    "nav.stack": "Stack",
    "nav.contact": "Contact",

    "hero.greeting": "Hi, I'm",
    "hero.tagline": "I build ultra-fast websites that turn traffic into customers.",
    "hero.techs": "Built for speed, SEO and conversions.",
    "hero.cta": "Start a project",

    "about.title": "About me",
    "about.p1":
      "I'm a business-minded fullstack developer. My goal isn't just to deliver lines of code — it's to understand your operation and create solutions that drive real business results.",
    "about.p2":
      "With a solid foundation in software architecture, I ensure your project is secure, lightning-fast, and ready to scale alongside your company. I build robust platforms to prevent technical headaches in the future.",
    "about.p3":
      "I transform complex problems into easy-to-use systems, automating processes so your team saves time and you can focus on what matters most: scaling your operations and sales.",

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
