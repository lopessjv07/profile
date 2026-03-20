import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBolt, faCode, faDesktop, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../i18n/i18n";

function Services() {
  const { t } = useLanguage();

  return (
    <main className="services-page">
      {/* ──── Hero Section ──── */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero__content">
            <h1 className="services-hero__title">{t("services.hero.title")}</h1>
            <p className="services-hero__subtitle">{t("services.hero.subtitle")}</p>
            <a href="/#contato" className="btn btn--primary btn--large services-hero__btn">
              {t("services.hero.cta")}
            </a>
          </div>
        </div>
      </section>

      {/* ──── Problems I Solve ──── */}
      <section className="services-why" style={{ paddingTop: "0" }}>
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {t("services.problems.title") || "Problems I Help Businesses Solve"}
          </h2>
          <div className="why-grid" style={{ gridTemplateColumns: "1fr" }}>
            <ul className="service-card__features" style={{ maxWidth: "600px", margin: "0 auto", gap: "16px" }}>
               <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.problems.p1") || "Slow websites that drive visitors away"}</li>
               <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.problems.p2") || "Outdated designs that hurt brand credibility"}</li>
               <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.problems.p3") || "Landing pages that fail to convert traffic into sales"}</li>
               <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.problems.p4") || "Websites that perform poorly on mobile devices"}</li>
               <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.problems.p5") || "Poor SEO architecture preventing Google rankings"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──── Services Grid ──── */}
      <section className="services-list" id="services-list">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {t("services.list.title")}
          </h2>
          <div className="services-grid">
            {/* Landing Pages */}
            <div className="service-card">
              <div className="service-card__icon">
                <FontAwesomeIcon icon={faDesktop} />
              </div>
              <h3 className="service-card__title">{t("services.list.landing")}</h3>
              <p className="service-card__desc">{t("services.list.landing.desc")}</p>
              <ul className="service-card__features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.landing.f1")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.landing.f2")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.landing.f3")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.landing.f4")}</li>
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/#contato" className="recent-card__link">
                  {t("services.list.landing.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>

            {/* Business Websites */}
            <div className="service-card">
              <div className="service-card__icon">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h3 className="service-card__title">{t("services.list.business")}</h3>
              <p className="service-card__desc">{t("services.list.business.desc")}</p>
              <ul className="service-card__features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.business.f1")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.business.f2")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.business.f3")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.business.f4")}</li>
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/#contato" className="recent-card__link">
                  {t("services.list.business.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>

            {/* SaaS Development */}
            <div className="service-card">
              <div className="service-card__icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h3 className="service-card__title">{t("services.list.saas")}</h3>
              <p className="service-card__desc">{t("services.list.saas.desc")}</p>
              <ul className="service-card__features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.saas.f1")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.saas.f2")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.saas.f3")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.saas.f4")}</li>
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/#contato" className="recent-card__link">
                  {t("services.list.saas.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>

            {/* Maintenance */}
            <div className="service-card">
              <div className="service-card__icon">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <h3 className="service-card__title">{t("services.list.maintenance")}</h3>
              <p className="service-card__desc">{t("services.list.maintenance.desc")}</p>
              <ul className="service-card__features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.maintenance.f1")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.maintenance.f2")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.maintenance.f3")}</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" /> {t("services.list.maintenance.f4")}</li>
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/#contato" className="recent-card__link">
                  {t("services.list.maintenance.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Portfolio Preview (Recent Projects) ──── */}
      <section className="services-recent">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {t("services.recent.title")}
          </h2>
          <div className="recent-grid">
            {/* Project 1 */}
            <a href="https://lavacarjlle.vercel.app/en" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="recent-card">
              <div className="recent-card__image-placeholder">
                <img src="/carwash-preview.png" alt="Car Wash Website Preview" />
              </div>
              <div className="recent-card__content">
                <h3 className="recent-card__title">{t("services.recent.carwash")}</h3>
                <p className="recent-card__desc">{t("services.recent.carwash.desc")}</p>
                <span className="recent-card__link">
                  {t("services.recent.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </span>
              </div>
            </div>
            </a>

            {/* Project 2 */}
            <div className="recent-card">
              <div className="recent-card__image-placeholder"></div>
              <div className="recent-card__content">
                <h3 className="recent-card__title">{t("services.recent.hairsalon")}</h3>
                <p className="recent-card__desc">{t("services.recent.hairsalon.desc")}</p>
                <a href="/#projetos" className="recent-card__link">
                  {t("services.recent.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="recent-card">
              <div className="recent-card__image-placeholder"></div>
              <div className="recent-card__content">
                <h3 className="recent-card__title">{t("services.recent.cleaning")}</h3>
                <p className="recent-card__desc">{t("services.recent.cleaning.desc")}</p>
                <a href="/#projetos" className="recent-card__link">
                  {t("services.recent.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Why Work With Me ──── */}
      <section className="services-why">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {t("services.why.title")}
          </h2>
          <div className="why-grid">
            <div className="why-card">
              <FontAwesomeIcon icon={faBolt} className="why-icon" />
              <h3 style={{ marginBottom: "8px" }}>{t("services.why.f1")}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.why.f1.desc") || "Because faster sites rank better and sell more."}</p>
            </div>
            <div className="why-card">
              <FontAwesomeIcon icon={faCheck} className="why-icon" />
              <h3 style={{ marginBottom: "8px" }}>{t("services.why.f2")}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.why.f2.desc") || "To provide a seamless, premium experience for your users."}</p>
            </div>
            <div className="why-card">
              <FontAwesomeIcon icon={faCode} className="why-icon" />
              <h3 style={{ marginBottom: "8px" }}>{t("services.why.f3")}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.why.f3.desc") || "Clean, maintainable code that grows with your business."}</p>
            </div>
            <div className="why-card">
              <FontAwesomeIcon icon={faDesktop} className="why-icon" />
              <h3 style={{ marginBottom: "8px" }}>{t("services.why.f4")}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.why.f4.desc") || "Direct access to me so you always know your project's status."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──── How the Process Works ──── */}
      <section className="services-why" style={{ paddingTop: "0" }}>
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {t("services.process.title") || "How the Process Works"}
          </h2>
          <div className="why-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            <div className="why-card">
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--green-brand)", marginBottom: "16px" }}>01</div>
              <h3 style={{ marginBottom: "8px" }}>{t("services.process.p1.title") || "1. Project Discussion"}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.process.p1.desc") || "Understanding your business goals, target audience, and requirements."}</p>
            </div>
            <div className="why-card">
              <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--green-brand)", marginBottom: "16px" }}>02</div>
              <h3 style={{ marginBottom: "8px" }}>{t("services.process.p2.title") || "2. Design & Development"}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.process.p2.desc") || "Building a fast, modern, and highly scalable website."}</p>
            </div>
            <div className="why-card">
               <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--green-brand)", marginBottom: "16px" }}>03</div>
              <h3 style={{ marginBottom: "8px" }}>{t("services.process.p3.title") || "3. Launch & Optimization"}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{t("services.process.p3.desc") || "Deploying the site to the world and ensuring peak performance."}</p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}

export default Services;
