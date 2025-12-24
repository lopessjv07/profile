import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="navLinks">
          <a href="https://www.instagram.com/lopessdev/" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/lopessjv07" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
