const benefits = [
  { title: 'Performance', text: 'Carregamento rápido e foco em conversão.' },
  { title: 'Escalabilidade', text: 'Cada feature funciona isolada e pode crescer.' },
  { title: 'Experiência', text: 'Layout impecável para gerar confiança e ação.' }
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="section">
      <div className="container">
        <h2>Por que esta solução funciona?</h2>
        <div className="cards-grid">
          {benefits.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
