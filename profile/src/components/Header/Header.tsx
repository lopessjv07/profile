import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__logo">
          <img src="/logo.png" alt="LopesDev" className="header__logo-img" />
        </a>

        <nav className="header__nav">
          <a href="#sobre" className="header__link">
            Sobre
          </a>
          <a href="#projetos" className="header__link">
            Projetos
          </a>
          <a href="#stack" className="header__link">
            Stack
          </a>
          <a href="#contato" className="header__link">
            Contato
          </a>
        </nav>

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
    </header>
  );
}

export default Header;
