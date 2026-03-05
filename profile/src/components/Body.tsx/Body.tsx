"use client";

import { useEffect, useRef } from "react";
import "./Body.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../i18n/i18n";
import Services from "../Services";

function Body() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { t, tProjects } = useLanguage();

  const projects = tProjects();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--glow-x', `${e.clientX}px`);
        glowRef.current.style.setProperty('--glow-y', `${e.clientY + window.scrollY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="main-wrapper" ref={glowRef}>
      <div className="mouse-glow" />
      {/* ──── Hero ──── */}
      <section className="hero" id="hero">
        <div className="container">
          <p className="hero__greeting">{t("hero.greeting")}</p>
          <h1 className="hero__name">
            João Vitor <span className="hero__accent">Lopes</span>
          </h1>
          <p className="hero__tagline">
            {t("hero.tagline")}
          </p>
          <p className="hero__tagline" style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9em' }}>
            {t("hero.techs")}
          </p>
          <div className="hero__actions">
            <a href="#projetos" className="btn btn--primary">
              {t("hero.cta")} <FontAwesomeIcon icon={faArrowDown} />
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

      {/* ──── Serviços ──── */}
      <Services />

      {/* ──── Sobre ──── */}
      <section className="about" id="sobre">
        <div className="container">
          <h2 className="section__title">{t("about.title")}</h2>
          <div className="about__content">
            <p>{t("about.p1")}</p>
            <p>
              {t("about.p2.before")}
              <strong>{t("about.p2.school")}</strong>
              {t("about.p2.middle")}
              <strong>{t("about.p2.techs")}</strong>
              {t("about.p2.after")}
            </p>
            <p>{t("about.p3")}</p>
          </div>
        </div>
      </section>

      {/* ──── Projetos ──── */}
      <section className="projects" id="projetos">
        <div className="container">
          <h2 className="section__title">{t("projects.title")}</h2>
          <p className="section__subtitle">
            {t("projects.subtitle")}
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
                    <h4>{t("projects.problem")}</h4>
                    <p>{project.problem}</p>
                  </div>

                  <div className="project-card__section">
                    <h4>{t("projects.solution")}</h4>
                    <p>{project.solution}</p>
                  </div>

                  <div className="project-card__section">
                    <h4>{t("projects.highlights")}</h4>
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
                    {t("projects.viewProject")}{" "}
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
          <div className="stack__icons">
            <img
              src="https://skillicons.dev/icons?i=ubuntu,ts,py,postgres,nodejs,react,vite,nextjs&theme=dark"
              alt="Tech Stack: Ubuntu, TypeScript, Python, PostgreSQL, Node.js, React, Vite, Next.js"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Body;
