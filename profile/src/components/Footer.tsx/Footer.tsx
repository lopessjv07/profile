import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="footer__inner">
        <h2 className="footer__title">Vamos conversar?</h2>
        <p className="footer__subtitle">
          Se quiser trocar uma ideia sobre produto, código ou oportunidades —
          me chama.
        </p>

        <div className="footer__links">
          <a
            href="https://github.com/lopessjv07"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a
            href="mailto:joaovitor@email.com?subject=Contato via Portfólio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </a>
        </div>

        <p className="footer__copy">© 2026 João Vitor Lopes</p>
      </div>
    </footer>
  );
}

export default Footer;
