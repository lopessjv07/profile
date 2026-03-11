"use client";

import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../../i18n/i18n";

function Contact() {
  const { t } = useLanguage();

  return (
    <main className="contact-page">
      {/* ──── Hero Section ──── */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__content">
            <span className="contact-hero__badge">
              <span className="contact-hero__badge-dot" />
              {t("contact.hero.available")}
            </span>
            <h1 className="contact-hero__title">{t("contact.hero.title")}</h1>
            <p className="contact-hero__subtitle">{t("contact.hero.subtitle")}</p>
            <p className="contact-hero__desc">{t("contact.hero.desc")}</p>
            <p className="contact-hero__trust">
              <FontAwesomeIcon icon={faClock} className="contact-hero__trust-icon" />
              {t("contact.hero.trust")}
            </p>
            <div className="contact-hero__actions">
              <a href="mailto:contact@lopessdev.com?subject=Project Inquiry" className="btn btn--primary btn--large">
                {t("contact.hero.cta")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <a href="mailto:contact@lopessdev.com?subject=Project Inquiry" className="btn btn--outline btn--large">
                {t("contact.hero.cta2")} <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Contact Methods ──── */}
      <section className="contact-methods">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center" }}>
            {t("contact.methods.title")}
          </h2>
          <p className="contact-methods__subtitle">{t("contact.methods.subtitle")}</p>
          <div className="contact-grid">
            {/* Email */}
            <div className="contact-card contact-card--primary">
              <div className="contact-card__header">
                <div className="contact-card__icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <span className="contact-card__label">{t("contact.email.label")}</span>
              </div>
              <h3 className="contact-card__title">{t("contact.email.title")}</h3>
              <span className="contact-card__value">{t("contact.email.value")}</span>
              <p className="contact-card__desc">{t("contact.email.desc")}</p>
              <a href="mailto:contact@lopessdev.com?subject=Project Inquiry" className="contact-card__btn">
                {t("contact.email.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            {/* LinkedIn */}
            <div className="contact-card">
              <div className="contact-card__header">
                <div className="contact-card__icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </div>
              </div>
              <h3 className="contact-card__title">{t("contact.linkedin.title")}</h3>
              <p className="contact-card__desc">{t("contact.linkedin.desc")}</p>
              <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/" target="_blank" rel="noopener noreferrer" className="contact-card__btn">
                {t("contact.linkedin.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact-card">
              <div className="contact-card__header">
                <div className="contact-card__icon">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </div>
              </div>
              <h3 className="contact-card__title">{t("contact.whatsapp.title")}</h3>
              <p className="contact-card__desc">{t("contact.whatsapp.desc")}</p>
              <a href="https://wa.me/5547992008256" target="_blank" rel="noopener noreferrer" className="contact-card__btn">
                {t("contact.whatsapp.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ──── Trust Section ──── */}
      <section className="contact-trust">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center" }}>
            {t("contact.trust.title")}
          </h2>
          <p className="contact-trust__desc">{t("contact.trust.desc")}</p>
          <ul className="contact-trust__list">
            <li><FontAwesomeIcon icon={faCheck} className="contact-trust__check" /> {t("contact.trust.p1")}</li>
            <li><FontAwesomeIcon icon={faCheck} className="contact-trust__check" /> {t("contact.trust.p2")}</li>
            <li><FontAwesomeIcon icon={faCheck} className="contact-trust__check" /> {t("contact.trust.p3")}</li>
            <li><FontAwesomeIcon icon={faCheck} className="contact-trust__check" /> {t("contact.trust.p4")}</li>
          </ul>
        </div>
      </section>

    </main>
  );
}

export default Contact;
