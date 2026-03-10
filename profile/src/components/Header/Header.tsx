"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../../i18n/i18n";

function Header() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => setLang(lang === "pt" ? "en" : "pt");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">
          <img src="/logo.png" alt="LopesDev" className="header__logo-img" />
        </a>

        <nav className="header__nav">
          <a href="/#sobre" className="header__link" suppressHydrationWarning>
            {t("nav.about")}
          </a>
          <a href="/services" className="header__link" suppressHydrationWarning>
            {t("nav.services")}
          </a>
          <a href="/#projetos" className="header__link" suppressHydrationWarning>
            {t("nav.projects")}
          </a>
          <a href="/#stack" className="header__link" suppressHydrationWarning>
            {t("nav.stack")}
          </a>
          <a href="/contact" className="header__link" suppressHydrationWarning>
            {t("nav.contact")}
          </a>
        </nav>

        <div className="header__actions">
          <button
            className="header__lang-toggle"
            onClick={toggleLang}
            aria-label="Toggle language"
            title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
            suppressHydrationWarning
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

          {/* Hamburger — mobile only */}
          <button
            className="header__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`header__hamburger-line ${menuOpen ? "header__hamburger-line--open" : ""}`} />
            <span className={`header__hamburger-line ${menuOpen ? "header__hamburger-line--open" : ""}`} />
            <span className={`header__hamburger-line ${menuOpen ? "header__hamburger-line--open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`header__mobile-menu ${menuOpen ? "header__mobile-menu--open" : ""}`}>
        <nav className="header__mobile-nav">
          <a href="/#sobre" className="header__mobile-link" onClick={closeMenu} suppressHydrationWarning>
            {t("nav.about")}
          </a>
          <a href="/services" className="header__mobile-link" onClick={closeMenu} suppressHydrationWarning>
            {t("nav.services")}
          </a>
          <a href="/#projetos" className="header__mobile-link" onClick={closeMenu} suppressHydrationWarning>
            {t("nav.projects")}
          </a>
          <a href="/#stack" className="header__mobile-link" onClick={closeMenu} suppressHydrationWarning>
            {t("nav.stack")}
          </a>
          <a href="/contact" className="header__mobile-link" onClick={closeMenu} suppressHydrationWarning>
            {t("nav.contact")}
          </a>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="header__overlay" onClick={closeMenu} />}
    </header>
  );
}

export default Header;
