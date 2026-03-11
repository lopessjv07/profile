"use client";

import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../i18n/i18n";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer" id="contato">
      <div className="footer__inner">
        <div className="footer__cta-section">
          <h2 className="footer__title">{t("footer.title")}</h2>
          <p className="footer__subtitle">
            {t("footer.subtitle")}
          </p>
          <div className="footer__actions">
            <a href="mailto:contact@lopessdev.com?subject=Start a Project" className="btn btn--primary btn--large">
              {t("footer.cta")} <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a href="#projetos" className="btn btn--outline btn--large">
              {t("footer.secondary_cta")}
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__links">
            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/lopessjv07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <p className="footer__copy">© {new Date().getFullYear()} João Vitor Lopes. {t("footer.copy")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
