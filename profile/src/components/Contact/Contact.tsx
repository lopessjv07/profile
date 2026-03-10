"use client";

import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faWhatsapp, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../../i18n/i18n";

function Contact() {
  const { t } = useLanguage();

  return (
    <main className="contact-page">
      {/* ──── Hero Section ──── */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__content">
            <h1 className="contact-hero__title">{t("contact.hero.title")}</h1>
            <p className="contact-hero__subtitle">{t("contact.hero.subtitle")}</p>
            <p className="contact-hero__desc">{t("contact.hero.desc")}</p>
          </div>
        </div>
      </section>

      {/* ──── Contact Methods ──── */}
      <section className="contact-methods">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "40px" }}>
            {t("contact.methods.title")}
          </h2>
          <div className="contact-grid">
            {/* Email */}
            <div className="contact-card">
              <div className="contact-card__icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3 className="contact-card__title">{t("contact.email.title")}</h3>
              <span className="contact-card__value">{t("contact.email.value")}</span>
              <p className="contact-card__desc">{t("contact.email.desc")}</p>
              <a href="mailto:hello@lopessdev.com?subject=Project Inquiry" className="contact-card__btn">
                {t("contact.email.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            {/* LinkedIn */}
            <div className="contact-card">
              <div className="contact-card__icon">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <h3 className="contact-card__title">{t("contact.linkedin.title")}</h3>
              <p className="contact-card__desc">{t("contact.linkedin.desc")}</p>
              <a href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/" target="_blank" rel="noopener noreferrer" className="contact-card__btn">
                {t("contact.linkedin.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact-card">
              <div className="contact-card__icon">
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
              <h3 className="contact-card__title">{t("contact.whatsapp.title")}</h3>
              <p className="contact-card__desc">{t("contact.whatsapp.desc")}</p>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="contact-card__btn">
                {t("contact.whatsapp.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            {/* Discord */}
            <div className="contact-card">
              <div className="contact-card__icon">
                <FontAwesomeIcon icon={faDiscord} />
              </div>
              <h3 className="contact-card__title">{t("contact.discord.title")}</h3>
              <p className="contact-card__desc">{t("contact.discord.desc")}</p>
              <a href="#" className="contact-card__btn">
                {t("contact.discord.btn")} <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Contact Form ──── */}
      <section className="contact-form-section">
        <div className="container">
          <h2 className="section__title" style={{ textAlign: "center", marginBottom: "0" }}>
            {t("contact.form.title")}
          </h2>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              const type = (form.elements.namedItem("type") as HTMLSelectElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
              const subject = encodeURIComponent(`Project Inquiry: ${type}`);
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\n${message}`);
              window.location.href = `mailto:hello@lopessdev.com?subject=${subject}&body=${body}`;
            }}
          >
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-name">{t("contact.form.name")}</label>
              <input className="contact-form__input" type="text" id="contact-name" name="name" required />
            </div>

            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-email">{t("contact.form.email")}</label>
              <input className="contact-form__input" type="email" id="contact-email" name="email" required />
            </div>

            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-type">{t("contact.form.type")}</label>
              <select className="contact-form__select" id="contact-type" name="type" required>
                <option value="">{t("contact.form.type")}</option>
                <option value="Landing Page">{t("contact.form.type.landing")}</option>
                <option value="Business Website">{t("contact.form.type.business")}</option>
                <option value="Web Application">{t("contact.form.type.webapp")}</option>
                <option value="Other">{t("contact.form.type.other")}</option>
              </select>
            </div>

            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-message">{t("contact.form.message")}</label>
              <textarea className="contact-form__textarea" id="contact-message" name="message" required></textarea>
            </div>

            <button type="submit" className="btn btn--primary btn--large contact-form__submit">
              {t("contact.form.submit")} <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <p className="contact-form__note">{t("contact.form.note")}</p>
          </form>
        </div>
      </section>

      {/* ──── Footer CTA ──── */}
      <section className="contact-cta">
        <div className="container">
          <h2 className="contact-cta__title">{t("contact.cta.title")}</h2>
          <p className="contact-cta__subtitle">{t("contact.cta.subtitle")}</p>
          <a href="mailto:hello@lopessdev.com?subject=Project Inquiry" className="btn btn--primary btn--large">
            {t("contact.cta.btn")} <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Contact;
