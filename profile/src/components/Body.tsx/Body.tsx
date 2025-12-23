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
          
          <h3>Desenvolvedor Fullstack Júnior com foco em Front-end</h3>
        </div>

        <section className="about" id="sobre" aria-labelledby="about-title">
          <div className="about__header">
            <h2 className="about__title" id="about-title">
              Sobre
            </h2>
            <p className="about__subtitle">
              Desenvolvedor web focado em frontend, com visão de produto e
              atenção à experiência do usuário.
            </p>
          </div>

          <div className="about__content">
            <article className="about__block about__block--who">
              <h3 className="about__heading">Quem eu sou?</h3>
              <p className="about__text">
                Sou João Vitor Lopes, desenvolvedor web com foco em frontend,
                apaixonado por criar interfaces claras, funcionais e bem
                estruturadas. Tenho perfil prático, gosto de resolver problemas
                reais e transformar ideias em produtos que funcionam de verdade.
                Meu foco não é só escrever código, mas entender o contexto, o
                usuário e o objetivo por trás de cada solução.
              </p>
            </article>

            <article className="about__block about__block--what">
              <h3 className="about__heading">O que eu faço?</h3>
              <p className="about__text">
                Atuo no desenvolvimento de aplicações web modernas, criando
                interfaces responsivas, interativas e bem organizadas. Trabalho
                principalmente com JavaScript e TypeScript, utilizando React
                para construção de interfaces, além de HTML e CSS puro, com
                atenção especial à estrutura, semântica e experiência do usuário
                (UX/UI).
              </p>
            </article>

            <article className="about__block about__block--stack">
              <h3 className="about__heading">Stack e abordagem técnica</h3>
              <p className="about__text">
                No backend, utilizo Node.js para construir APIs e lógicas de
                negócio, com Prisma como ORM para modelagem e acesso ao banco de
                dados. Meu foco é escrever código limpo, legível e escalável,
                entendendo o “porquê” das decisões técnicas e não apenas
                aplicando ferramentas por tendência.
              </p>
            </article>

            <article className="about__block about__block--education">
              <h3 className="about__heading">Formação e base</h3>
              <p className="about__text">
                Tenho formação técnica em Desenvolvimento de Sistemas, o que me
                deu uma base sólida em lógica de programação, estrutura de
                dados, banco de dados e desenvolvimento web. Essa base me
                permite aprender novas tecnologias com rapidez e adaptar
                soluções conforme a necessidade do projeto.
              </p>
            </article>

            <article className="about__block about__block--project">
              <h3 className="about__heading">O projeto Chamou</h3>
              <p className="about__text">
                Atualmente estou desenvolvendo o Chamou, uma plataforma de vagas
                instantâneas que conecta empresas a pessoas disponíveis para
                trabalhos rápidos. O projeto nasceu da identificação de um
                problema real: a dificuldade de encontrar mão de obra imediata
                e, ao mesmo tempo, oportunidades rápidas de renda. No Chamou,
                sou responsável pela idealização, arquitetura, frontend e
                backend.
              </p>
            </article>

            <article className="about__block about__block--purpose">
              <h3 className="about__heading">Visão e propósito</h3>
              <p className="about__text">
                Meu objetivo como desenvolvedor é evoluir constantemente,
                construir produtos úteis e participar de projetos que gerem
                impacto real. Valorizo simplicidade, clareza e eficiência —
                tanto no código quanto nas interfaces. Este portfólio representa
                não só o que eu já construí, mas principalmente como eu penso e
                resolvo problemas.
              </p>
            </article>
          </div>

          <div className="sendMe">
            
          </div>
        </section>
      </div>
    </>
  );
}

export default Body;
