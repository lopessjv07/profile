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
    "hero.cta_work": "Ver meus serviços",
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
    "services.s1.title": "Landing Pages de Alta Conversão",
    "services.s1.desc": "Páginas focadas em transformar visitantes em clientes. Otimizadas para maximizar o retorno do seu investimento em tráfego pago, garantindo que você não perca vendas por lentidão ou design confuso.",
    "services.s1.b1": "Carregamento ultrarrápido",
    "services.s1.b2": "Maior taxa de conversão",
    "services.s1.b3": "Perfeito para Google/Meta Ads",

    "services.s2.title": "Sites Institucionais e Corporativos",
    "services.s2.desc": "Criação de presença digital para empresas que buscam autoridade no mercado. Um site profissional que transmite confiança e garante que sua empresa seja encontrada com facilidade.",
    "services.s2.b1": "Melhor ranqueamento no Google",
    "services.s2.b2": "Transmite autoridade e confiança",
    "services.s2.b3": "Design focado no seu cliente",

    "services.s3.title": "Plataformas Web e SaaS Sob Medida",
    "services.s3.desc": "Ferramentas sob medida para simplificar processos do seu negócio. Transformo problemas complexos em plataformas fáceis de usar que economizam tempo e dinheiro da sua equipe.",
    "services.s3.b1": "Redução de custos operacionais",
    "services.s3.b2": "Automação de processos manuais",
    "services.s3.b3": "Escalável para o seu crescimento",

    "projects.title": "Projetos em Destaque",
    "projects.subtitle": "Produtos reais com decisões técnicas e visão de negócio.",
    "projects.problem": "Problema",
    "projects.solution": "Solução",
    "projects.highlights": "Destaques",
    "projects.viewProject": "Ver projeto",

    "footer.title": "Vamos construir o seu próximo projeto?",
    "footer.subtitle": "Construo sites rápidos, escaláveis e de alta performance focados em resultados reais de negócios.",
    "footer.cta": "Iniciar um Projeto",
    "footer.secondary_cta": "Ver Meus Projetos",
    "footer.copy": "Todos os direitos reservados.",

    "services.hero.title": "Landing pages que transformam tráfego pago em cliente",
    "services.hero.subtitle": "Você roda tráfego. Eu faço a página converter.",
    "services.hero.cta": "Se tua campanha já tá rodando, me chama — dá pra melhorar isso rápido.",

    "services.problems.title": "Problemas que estão matando suas campanhas:",
    "services.problems.p1": "Página lenta aumentando teu custo por lead",
    "services.problems.p2": "Layout bonito que não converte",
    "services.problems.p3": "Dev que atrasa e te queima com cliente",
    "services.problems.p4": "",
    "services.problems.p5": "",

    "services.agency.badge": "Parcerias com Agências",
    "services.agency.title": "Precisa de um dev confiável pra tocar teus projetos?",
    "services.agency.desc": "Entrego em white-label, sem risco com cliente e com prazo definido.",
    "services.agency.h1": "White-Label & Sem Risco de Captação",
    "services.agency.h2": "Entrega Previsível",
    "services.agency.h3": "Sites Rápidos e Otimizados para SEO",
    "services.agency.cta": "Vamos Ser Parceiros",

    "services.list.title": "Meus Serviços",
    "services.list.landing": "Landing Pages",
    "services.list.landing.desc": "Páginas rápidas, estruturadas pra conversão e alinhadas com tua campanha",
    "services.list.landing.cta": "Precisa de uma página que performa? Me chama",

    "services.list.business": "White-label",
    "services.list.business.desc": "Desenvolvimento sob sua marca, sem risco com cliente",
    "services.list.business.cta": "Quer um dev confiável por trás? Me chama",

    "services.list.maintenance": "Manutenção",
    "services.list.maintenance.desc": "Correção rápida e suporte pra não deixar campanha morrer",
    "services.list.maintenance.cta": "Deu problema no site? Resolvo rápido",

    "services.process.title": "Processo de Execução Previsível",
    "services.process.p1.title": "1. Descoberta Técnica",
    "services.process.p1.desc": "Alinhamos requisitos, arquitetura e cronograma. Sem adivinhações.",
    "services.process.p2.title": "2. Desenvolvimento Confiável",
    "services.process.p2.desc": "Construo de forma limpa e mantenho você atualizado. Você nunca fica no escuro.",
    "services.process.p3.title": "3. QA & Entrega",
    "services.process.p3.desc": "Testes rigorosos garantem zero surpresas no lançamento. Entrega no prazo, sempre.",

    "services.recent.title": "Projetos Recentes",
    "services.recent.carwash": "Site de Lava Rápido",
    "services.recent.carwash.desc": "Landing page pra lavação — focada em gerar leads diretos via WhatsApp a partir de tráfego pago",
    "services.recent.hairsalon": "Site de Salão de Beleza",
    "services.recent.hairsalon.desc": "Presença digital moderna e elegante para agendamentos em um salão de alto padrão.",
    "services.recent.cleaning": "Site de Limpeza Corporativa",
    "services.recent.cleaning.desc": "Plataforma projetada para maximizar SEO local e confiança em serviços de limpeza.",
    "services.recent.autorepair": "Site de Oficina Mecânica",
    "services.recent.autorepair.desc": "Site pra mecânica local — estruturado pra converter tráfego em clientes",
    "services.recent.divinaluz": "Assistência Familiar",
    "services.recent.divinaluz.desc": "Landing page de assistência e plano familiar — focada 100% na captação de leads",
    "services.recent.cta": "Ver Projeto",

    "services.why.title": "Por Que Ser Meu Parceiro?",
    "services.why.f1": "Foco na Execução",
    "services.why.f1.desc": "Não apenas escrevo código; resolvo problemas de negócio e foco em ROI.",
    "services.why.f2": "Mentalidade de Agência",
    "services.why.f2.desc": "Entendo de gestão de clientes, margens e da importância dos prazos.",
    "services.why.f3": "Comunicação Proativa",
    "services.why.f3.desc": "Atualizações diretas e claras. Sem sumiços ou silêncio prolongado.",
    "services.why.f4": "Performance em Primeiro Lugar",
    "services.why.f4.desc": "Todo projeto já nasce otimizado para velocidade, SEO e escalabilidade.",

    "services.cta.title": "Pronto para construir o seu site?",
    "services.cta.subtitle": "Vamos trabalhar juntos para criar algo incrível que entregue resultados reais.",
    "services.cta.btn": "Tem tráfego rodando? Vamos melhorar sua conversão",

    "contact.hero.available": "Disponível para novos projetos",
    "contact.hero.title": "Vamos Trabalhar Juntos",
    "contact.hero.subtitle": "Tem um projeto em mente? Adoraria saber mais sobre ele.",
    "contact.hero.desc": "Ajudo empresas a construir sites rápidos, escaláveis e de alta performance usando tecnologias modernas como Next.js, React e arquitetura web moderna.",
    "contact.hero.trust": "Normalmente respondo em até 24 horas.",
    "contact.hero.cta": "Enviar uma Mensagem",
    "contact.hero.cta2": "Me Envie um Email",

    "contact.methods.title": "Formas de Contato",
    "contact.methods.subtitle": "Escolha a opção que funciona melhor para você.",
    "contact.email.title": "Email",
    "contact.email.label": "Contato principal",
    "contact.email.value": "contact@lopessdev.com",
    "contact.email.desc": "Melhor opção para consultas de projetos e discussões de negócios.",
    "contact.email.btn": "Enviar Email",
    "contact.linkedin.title": "LinkedIn",
    "contact.linkedin.desc": "Conecte-se comigo profissionalmente e acompanhe meu trabalho.",
    "contact.linkedin.btn": "Conectar",
    "contact.whatsapp.title": "WhatsApp",
    "contact.whatsapp.desc": "Comunicação rápida para discutir detalhes do projeto.",
    "contact.whatsapp.btn": "Iniciar Conversa",

    "contact.form.title": "Conte-me Sobre Seu Projeto",
    "contact.form.subtitle": "Preencha o formulário abaixo e retornarei em até 24 horas.",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.type": "Tipo de Projeto",
    "contact.form.type.landing": "Landing Page",
    "contact.form.type.business": "Site Corporativo",
    "contact.form.type.webapp": "Aplicação Web",
    "contact.form.type.redesign": "Redesign de Site",
    "contact.form.type.other": "Outro",
    "contact.form.budget": "Faixa de Orçamento (opcional)",
    "contact.form.budget.1": "$500 – $1.000",
    "contact.form.budget.2": "$1.000 – $3.000",
    "contact.form.budget.3": "$3.000+",
    "contact.form.message": "Mensagem",
    "contact.form.submit": "Enviar Mensagem",
    "contact.form.note": "Sem compromisso. Apenas me conte sobre seu projeto e retornarei com ideias.",

    "contact.trust.title": "Com Quem Eu Trabalho",
    "contact.trust.desc": "Trabalho com startups, empreendedores e pequenas empresas que precisam de sites modernos e de alta performance focados em resultados reais.",
    "contact.trust.p1": "Sites rápidos otimizados para performance",
    "contact.trust.p2": "Arquitetura web moderna e escalável",
    "contact.trust.p3": "Código limpo e de fácil manutenção",
    "contact.trust.p4": "Construído com Next.js e React",

    "contact.cta.title": "Pronto para iniciar seu projeto?",
    "contact.cta.subtitle": "Se você precisa de um site rápido, moderno e escalável, vamos construir algo incrível juntos.",
    "contact.cta.btn": "Iniciar um Projeto",
    "contact.cta.btn2": "Ver Meus Projetos",

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
    "hero.cta_work": "View my services",
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

    "projects.title": "Featured Projects",
    "projects.subtitle": "Real products with technical decisions and business vision.",
    "projects.problem": "Problem",
    "projects.solution": "Solution",
    "projects.highlights": "Highlights",
    "projects.viewProject": "View project",

    "footer.title": "Let's build your next project?",
    "footer.subtitle": "I build fast, scalable, and high-performance websites focused on real business results.",
    "footer.cta": "Start a Project",
    "footer.secondary_cta": "View My Work",
    "footer.copy": "All rights reserved.",

    "services.hero.title": "Reliable Web Execution for Marketing Agencies & Teams",
    "services.hero.subtitle": "I build fast, high-converting websites and scalable applications—so you can focus on strategy, design, and closing deals.",
    "services.hero.cta": "Start a Project",

    "services.problems.title": "Technical Bottlenecks I Eliminate for Agencies",
    "services.problems.p1": "Missed deadlines that frustrate your clients",
    "services.problems.p2": "\"Finished\" sites that are full of bugs and perform poorly",
    "services.problems.p3": "Developers who disappear or communicate poorly",
    "services.problems.p4": "Scope creep due to lack of technical planning",
    "services.problems.p5": "Slow, bloated websites that hurt your campaign ROI",

    "services.agency.badge": "Agency Partnerships",
    "services.agency.title": "Looking for a Reliable Dev Partner?",
    "services.agency.desc": "I act as a high-performance tech arm for agencies. I provide 100% white-label, NDA-friendly development with a focus on code quality and speed.",
    "services.agency.h1": "White-Label & Poaching-Free",
    "services.agency.h2": "Predictable Delivery",
    "services.agency.h3": "Performant, SEO-Optimized Builds",
    "services.agency.cta": "Let's Partner Up",

    "services.list.title": "My Services",
    "services.list.landing": "High-Performance Landing Pages",
    "services.list.landing.desc": "Pixel-perfect, ultra-fast landing pages optimized to maximize your ad spend ROI.",
    "services.list.landing.f1": "Ultra-fast loading times",
    "services.list.landing.f2": "Flawless mobile experience",
    "services.list.landing.f3": "Maximized ad campaign ROI",
    "services.list.landing.f4": "Pixel-perfect implementation",
    "services.list.landing.cta": "Start a Project",

    "services.list.business": "White-Label Corporate Sites",
    "services.list.business.desc": "Scalable business websites built under your agency's brand. Deliver premium web experiences without in-house overhead.",
    "services.list.business.f1": "Maintain your margins",
    "services.list.business.f2": "No in-house developer overhead",
    "services.list.business.f3": "High-performance architecture",
    "services.list.business.f4": "Easy for clients to edit",
    "services.list.business.cta": "Start a Project",

    "services.list.saas": "Custom Web Applications",
    "services.list.saas.desc": "Bespoke tools, client portals, and SaaS solutions. Solving complex client requirements when off-the-shelf software fails.",
    "services.list.saas.f1": "Complex logic & workflows",
    "services.list.saas.f2": "Custom API integrations",
    "services.list.saas.f3": "Secure & scalable architecture",
    "services.list.saas.f4": "Built to spec",
    "services.list.saas.cta": "Start a Project",

    "services.list.maintenance": "Ongoing Maintenance",
    "services.list.maintenance.desc": "Keeping your clients' sites fast, secure, and bug-free post-launch. Predictable support you can count on.",
    "services.list.maintenance.f1": "Proactive security updates",
    "services.list.maintenance.f2": "Fast bug resolution",
    "services.list.maintenance.f3": "Performance monitoring",
    "services.list.maintenance.f4": "Reliable SLA",
    "services.list.maintenance.cta": "Request Maintenance",

    "services.process.title": "Predictable Execution Process",
    "services.process.p1.title": "1. Technical Discovery",
    "services.process.p1.desc": "We align on requirements, architecture, and timeline. No guesswork, no creeping scopes.",
    "services.process.p2.title": "2. Reliable Build",
    "services.process.p2.desc": "I build cleanly and keep you updated proactively. You're never left in the dark.",
    "services.process.p3.title": "3. QA & Handoff",
    "services.process.p3.desc": "Rigorous testing ensures zero surprises at launch. Delivery on time, every time.",

    "services.recent.title": "Recent Projects",
    "services.recent.carwash": "Car Wash Website",
    "services.recent.carwash.desc": "A fast, conversion-driven website for a local premium car wash service.",
    "services.recent.hairsalon": "Hair Salon Website",
    "services.recent.hairsalon.desc": "Modern and elegant online booking presence for an upscale salon.",
    "services.recent.cleaning": "Cleaning Business Website",
    "services.recent.cleaning.desc": "Service inquiry platform designed to maximize local SEO and trust.",
    "services.recent.autorepair": "Auto Repair Website",
    "services.recent.autorepair.desc": "Professional website for an auto repair shop, focused on attracting local customers and building trust.",
    "services.recent.cta": "View Project",

    "services.why.title": "Why Partner With Me?",
    "services.why.f1": "Execution-Oriented",
    "services.why.f1.desc": "I don't just write code; I solve business problems and focus on ROI.",
    "services.why.f2": "Agency-Minded",
    "services.why.f2.desc": "I understand client management, margins, and the importance of deadlines.",
    "services.why.f3": "Proactive Communication",
    "services.why.f3.desc": "Direct, clear updates. No disappearing acts or radio silence.",
    "services.why.f4": "Performance First",
    "services.why.f4.desc": "Every build is optimized for speed, SEO, and scalability out of the box.",

    "services.cta.title": "Ready to build a website that actually grows your business?",
    "services.cta.subtitle": "Let's create a fast, modern, and effective website tailored to your business goals.",
    "services.cta.btn": "Start a Project",

    "contact.hero.available": "Available for new projects",
    "contact.hero.title": "Let's Work Together",
    "contact.hero.subtitle": "Have a project in mind? I'd love to hear about it.",
    "contact.hero.desc": "I help businesses build fast, scalable and high-performance websites using modern technologies like Next.js, React and modern web architecture.",
    "contact.hero.trust": "I usually respond within 24 hours.",
    "contact.hero.cta": "Send a Message",
    "contact.hero.cta2": "Email Me",

    "contact.methods.title": "Ways to Contact Me",
    "contact.methods.subtitle": "Choose the option that works best for you.",
    "contact.email.title": "Email",
    "contact.email.label": "Primary contact method",
    "contact.email.value": "contact@lopessdev.com",
    "contact.email.desc": "Best option for project inquiries and business discussions.",
    "contact.email.btn": "Send Email",
    "contact.linkedin.title": "LinkedIn",
    "contact.linkedin.desc": "Connect with me professionally and follow my work.",
    "contact.linkedin.btn": "Connect",
    "contact.whatsapp.title": "WhatsApp",
    "contact.whatsapp.desc": "Quick communication for discussing project details.",
    "contact.whatsapp.btn": "Start Chat",

    "contact.form.title": "Tell Me About Your Project",
    "contact.form.subtitle": "Fill out the form below and I'll get back to you within 24 hours.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.type": "Project Type",
    "contact.form.type.landing": "Landing Page",
    "contact.form.type.business": "Business Website",
    "contact.form.type.webapp": "Web Application",
    "contact.form.type.redesign": "Website Redesign",
    "contact.form.type.other": "Other",
    "contact.form.budget": "Budget Range (optional)",
    "contact.form.budget.1": "$500 – $1,000",
    "contact.form.budget.2": "$1,000 – $3,000",
    "contact.form.budget.3": "$3,000+",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.form.note": "No commitment required. Just tell me about your project and I'll get back to you with ideas.",

    "contact.trust.title": "Who I Work With",
    "contact.trust.desc": "I work with startups, entrepreneurs and small businesses that need modern, high-performance websites focused on real business results.",
    "contact.trust.p1": "Fast websites optimized for performance",
    "contact.trust.p2": "Modern scalable web architecture",
    "contact.trust.p3": "Clean and maintainable code",
    "contact.trust.p4": "Built with Next.js and React",

    "contact.cta.title": "Ready to start your project?",
    "contact.cta.subtitle": "If you need a fast, modern and scalable website, let's build something great together.",
    "contact.cta.btn": "Start a Project",
    "contact.cta.btn2": "View My Work",

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
