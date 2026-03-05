"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../../i18n/i18n";

function Header() {
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => setLang(lang === "pt" ? "en" : "pt");

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__logo">
          <img src="/logo.png" alt="LopesDev" className="header__logo-img" />
        </a>

        <nav className="header__nav">
          <a href="#sobre" className="header__link">
            {t("nav.about")}
          </a>
          <a href="#projetos" className="header__link">
            {t("nav.projects")}
          </a>
          <a href="#stack" className="header__link">
            {t("nav.stack")}
          </a>
          <a href="#contato" className="header__link">
            {t("nav.contact")}
          </a>
        </nav>

        <div className="header__actions">
          <button
            className="header__lang-toggle"
            onClick={toggleLang}
            aria-label="Toggle language"
            title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {lang === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </button>

          <div className="header__social">
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
        </div>
      </div>
    </header>
  );
}

export default Header;
