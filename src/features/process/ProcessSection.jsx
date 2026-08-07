const steps = [
  'Descobrimos a mensagem certa',
  'Estruturamos a jornada do visitante',
  'Entregamos a landing page pronta para vender'
];

export function ProcessSection() {
  return (
    <section className="section alt">
      <div className="container">
        <h2>Como o processo acontece</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
