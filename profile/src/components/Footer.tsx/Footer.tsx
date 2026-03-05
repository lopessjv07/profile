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
        <h2 className="footer__title">{t("footer.title")}</h2>
        <p className="footer__subtitle">
          {t("footer.subtitle")}
        </p>

        <div className="footer__links">
          <a
            href="mailto:hi@lopessdev.net?subject=Contato via Portfólio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} /> hi@lopessdev.net
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a
            href="https://github.com/lopessjv07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
        </div>

        <p className="footer__copy">© 2026 João Vitor Lopes</p>
      </div>
    </footer>
  );
}

export default Footer;
