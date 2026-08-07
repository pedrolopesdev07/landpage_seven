export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Arquitetura feature-based</span>
          <h1>Transforme sua presença digital em uma máquina de crescimento.</h1>
          <p>Construímos páginas de alta conversão com estratégia, design e automação em uma única experiência.</p>
          <div className="actions">
            <a className="button primary" href="#contato">Quero minha landing page</a>
            <a className="button secondary" href="#benefits">Ver benefícios</a>
          </div>
        </div>
        <div className="hero-card">
          <h3>Resultados em 3 passos</h3>
          <ul>
            <li>Estratégia clara e posicionamento</li>
            <li>Interface elegante e rápida</li>
            <li>Captura de leads com automação</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
