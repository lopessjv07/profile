import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBolt, faCode, faDesktop, faArrowRight, faShieldHalved, faClock } from "@fortawesome/free-solid-svg-icons";
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
            <a href="/contact" className="btn btn--primary btn--large services-hero__btn">
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
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/contact" className="recent-card__link">
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
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/contact" className="recent-card__link">
                  {t("services.list.business.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
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
              <div style={{ marginTop: "auto", paddingTop: "24px" }}>
                <a href="/contact" className="recent-card__link">
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

            {/* Project 2 – Auto Repair */}
            <a href="https://lopesautorepair.com/en" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="recent-card">
              <div className="recent-card__image-placeholder">
                <img src="/autorepair-preview.png" alt="Auto Repair Website Preview" />
              </div>
              <div className="recent-card__content">
                <h3 className="recent-card__title">{t("services.recent.autorepair")}</h3>
                <p className="recent-card__desc">{t("services.recent.autorepair.desc")}</p>
                <span className="recent-card__link">
                  {t("services.recent.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </span>
              </div>
            </div>
            </a>

            {/* Project 3 – Divina Luz */}
            <a href="https://ld.divinaluz.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="recent-card">
              <div className="recent-card__image-placeholder">
                <img src="/divinaluz-preview.png" alt="Divina Luz Preview" />
              </div>
              <div className="recent-card__content">
                <h3 className="recent-card__title">{t("services.recent.divinaluz")}</h3>
                <p className="recent-card__desc">{t("services.recent.divinaluz.desc")}</p>
                <span className="recent-card__link">
                  {t("services.recent.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </span>
              </div>
            </div>
            </a>

          </div>
        </div>
      </section>

      {/* ──── Agency Partner CTA ──── */}
      <section className="services-agency">
        <div className="container">
          <div className="agency-card">
            <span className="agency-card__badge">{t("services.agency.badge")}</span>
            <h2 className="agency-card__title">{t("services.agency.title")}</h2>
            <p className="agency-card__text">{t("services.agency.desc")}</p>
            <div className="agency-card__highlights">
              <div className="agency-highlight">
                <FontAwesomeIcon icon={faShieldHalved} className="agency-highlight__icon" />
                <span>{t("services.agency.h1")}</span>
              </div>
              <div className="agency-highlight">
                <FontAwesomeIcon icon={faClock} className="agency-highlight__icon" />
                <span>{t("services.agency.h2")}</span>
              </div>
              <div className="agency-highlight">
                <FontAwesomeIcon icon={faBolt} className="agency-highlight__icon" />
                <span>{t("services.agency.h3")}</span>
              </div>
            </div>
            <a href="/contact" className="btn btn--primary btn--large agency-card__cta">
              {t("services.agency.cta")} <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "8px" }} />
            </a>
          </div>
        </div>
      </section>

      {/* ──── Final Benefits / Trust ──── */}
      <section className="services-benefits" style={{ paddingBottom: "80px", paddingTop: "0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", padding: "32px", background: "var(--surface-color)", borderRadius: "var(--border-radius-large)", border: "1px solid var(--border-color)", fontSize: "1.1rem", fontWeight: "600" }}>
            <span><FontAwesomeIcon icon={faBolt} style={{ color: "var(--green-brand)", marginRight: "8px" }}/>Entrega em até 5 dias</span>
            <span style={{ color: "var(--border-color)" }}>•</span>
            <span><FontAwesomeIcon icon={faCheck} style={{ color: "var(--green-brand)", marginRight: "8px" }}/>Foco em conversão (não só layout)</span>
            <span style={{ color: "var(--border-color)" }}>•</span>
            <span><FontAwesomeIcon icon={faClock} style={{ color: "var(--green-brand)", marginRight: "8px" }}/>Comunicação direta, sem enrolação</span>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Services;
