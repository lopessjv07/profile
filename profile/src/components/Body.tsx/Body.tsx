import "./Body.css";

function Body() {
  return (
    <>
      <div className="hero">
        <div className="presentation">
          <h1>
            <strong>
              Olá eu sou <b>João Vitor Lopes!</b>
            </strong>
          </h1>

          <div className="photo">
            <img className="foto" src="foto.png" alt="" />
          </div>
        </div>

        <section className="about" id="sobre" aria-labelledby="about-title">
          <h3>Desenvolvedor Fullstack Júnior com foco em Front-end</h3>

          <div className="about__content">
            <article className="about__block about__block--who">
              <h3 className="about__heading">Quem eu sou?</h3>
              <p className="about__text">
                Sou João Vitor Lopes, desenvolvedor web com foco em frontend.
                Gosto de criar interfaces claras e resolver problemas reais,
                pensando no usuário e no objetivo da solução.
              </p>
            </article>

            <article className="about__block about__block--what">
              <h3 className="about__heading">O que eu faço?</h3>
              <p className="about__text">
                Desenvolvo aplicações web modernas com interfaces responsivas e
                organizadas. Trabalho com JavaScript/TypeScript, React, HTML e
                CSS, com atenção à semântica e ao UX/UI.
              </p>
            </article>

            <article className="about__block about__block--stack">
              <h3 className="about__heading">Stack e abordagem técnica</h3>
              <p className="about__text">
                No backend, uso Node.js para APIs e regras de negócio, com
                Prisma para acesso e modelagem do banco. Busco código limpo e
                escalável, sempre entendendo o “porquê” das escolhas.
              </p>
            </article>

            <article className="about__block about__block--education">
              <h3 className="about__heading">Formação e base</h3>
              <p className="about__text">
                Tenho formação técnica em Desenvolvimento de Sistemas, com base
                em lógica, estrutura de dados, banco de dados e web. Isso
                facilita aprender rápido e adaptar soluções conforme o projeto.
              </p>
            </article>

            <article className="about__block about__block--project">
              <h3 className="about__heading">O projeto Chamou</h3>
              <p className="about__text">
                Estou desenvolvendo o Chamou, uma plataforma que conecta
                empresas e pessoas para trabalhos rápidos. Atuo na ideia,
                arquitetura e no desenvolvimento de frontend e backend.
              </p>
            </article>

            <article className="about__block about__block--purpose">
              <h3 className="about__heading">Visão e propósito</h3>
              <p className="about__text">
                Quero evoluir sempre e construir produtos úteis, com clareza e
                eficiência no código e na interface. Este portfólio mostra o que
                construo e como resolvo problemas.
              </p>
            </article>
          </div>

          <div className="sendMe"></div>
        </section>
      </div>
    </>
  );
}

export default Body;
