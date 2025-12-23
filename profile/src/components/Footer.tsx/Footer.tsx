import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <h3 className="nameFooter">João Vitor Lopes — Desenvolvedor Web</h3>
        <br />
        <a className="linkTo" href="https://github.com/lopessjv07">
          GitHub
        </a>
        <a
          className="linkTo"
          href="https://www.linkedin.com/in/jo%C3%A3o-vitor-lopes-467714312/"
        >
          LinkedIn
        </a>
        <a
          className="linkTo"
          href="mailto:joaovitor@email.com?subject=Contato via Portfólio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>

        <p className="copyYear">© 2025 João Vitor Lopes</p>
      </footer>
    </>
  );
}

export default Footer;
