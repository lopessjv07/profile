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
            <div className="recent-card">
              <div className="recent-card__image-placeholder"></div>
              <div className="recent-card__content">
                <h3 className="recent-card__title">{t("services.recent.carwash")}</h3>
                <p className="recent-card__desc">{t("services.recent.carwash.desc")}</p>
                <a href="/#projetos" className="recent-card__link">
                  {t("services.recent.cta")} <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "6px"}}/>
                </a>
              </div>
            </div>

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
              <h3>{t("services.why.f1")}</h3>
            </div>
            <div className="why-card">
              <FontAwesomeIcon icon={faCheck} className="why-icon" />
              <h3>{t("services.why.f2")}</h3>
            </div>
            <div className="why-card">
              <FontAwesomeIcon icon={faCode} className="why-icon" />
              <h3>{t("services.why.f3")}</h3>
            </div>
            <div className="why-card">
              <FontAwesomeIcon icon={faDesktop} className="why-icon" />
              <h3>{t("services.why.f4")}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Final CTA ──── */}
      <section className="services-cta">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="services-cta__title">{t("services.cta.title")}</h2>
          <p className="services-cta__subtitle">{t("services.cta.subtitle")}</p>
          <a href="/#contato" className="btn btn--primary btn--large">
            {t("services.cta.btn")}
          </a>
        </div>
      </section>
    </main>
  );
}

export default Services;
