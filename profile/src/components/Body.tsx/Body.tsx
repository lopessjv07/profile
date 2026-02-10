import "./Body.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const projects = [
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
    label: "Produto Real",
    title: "Chamou",
    subtitle: "Plataforma de vagas instantâneas",
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
    link: "https://github.com/lopessjv07",
  },
];

const stackItems = {
  Frontend: ["React", "TypeScript", "Next.js", "HTML/CSS"],
  Backend: ["Node.js", "Prisma", "REST APIs"],
  "Banco de Dados": ["PostgreSQL"],
  Outros: ["Git", "Python", "TensorFlow"],
};

function Body() {
  return (
    <main>
      {/* ──── Hero ──── */}
      <section className="hero" id="hero">
        <div className="container">
          <p className="hero__greeting">Olá, eu sou</p>
          <h1 className="hero__name">
            João Vitor <span className="hero__accent">Lopes</span>
          </h1>
          <p className="hero__tagline">
            Construo produtos digitais do zero — da arquitetura ao deploy.
          </p>
          <div className="hero__actions">
            <a href="#projetos" className="btn btn--primary">
              Ver projetos <FontAwesomeIcon icon={faArrowDown} />
            </a>
            <a
              href="https://github.com/lopessjv07"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              GitHub <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </section>

      {/* ──── Sobre ──── */}
      <section className="about" id="sobre">
        <div className="container">
          <h2 className="section__title">Sobre mim</h2>
          <div className="about__content">
            <p>
              Dev fullstack com mentalidade de produto. Não só codifico — eu
              modelo, projeto e entrego sistemas completos em produção.
            </p>
            <p>
              Formado em Técnico em Desenvolvimento de Sistemas pelo{" "}
              <strong>Senai</strong>, com base sólida em lógica, estrutura de
              dados e arquitetura web. Trabalho com{" "}
              <strong>React, Node.js, TypeScript e Prisma</strong>.
            </p>
            <p>
              Meu foco não é só escrever código — é entender o problema,
              modelar a solução e entregar algo que funcione de verdade.
            </p>
          </div>
        </div>
      </section>

      {/* ──── Projetos ──── */}
      <section className="projects" id="projetos">
        <div className="container">
          <h2 className="section__title">Projetos</h2>
          <p className="section__subtitle">
            Produtos reais com decisões técnicas e visão de negócio.
          </p>

          <div className="projects__grid">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__header">
                  <span className="project-card__label">{project.label}</span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                </div>

                <div className="project-card__body">
                  <div className="project-card__section">
                    <h4>Problema</h4>
                    <p>{project.problem}</p>
                  </div>

                  <div className="project-card__section">
                    <h4>Solução</h4>
                    <p>{project.solution}</p>
                  </div>

                  <div className="project-card__section">
                    <h4>Destaques</h4>
                    <ul>
                      {project.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="project-card__footer">
                  <div className="project-card__stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    Ver projeto{" "}
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Stack ──── */}
      <section className="stack" id="stack">
        <div className="container">
          <h2 className="section__title">Stack</h2>
          <div className="stack__grid">
            {Object.entries(stackItems).map(([category, techs]) => (
              <div key={category} className="stack__group">
                <h3 className="stack__category">{category}</h3>
                <div className="stack__pills">
                  {techs.map((tech) => (
                    <span key={tech} className="pill pill--lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Body;
