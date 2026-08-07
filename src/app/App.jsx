import { HeroSection } from '../features/hero/HeroSection';
import { BenefitsSection } from '../features/benefits/BenefitsSection';
import { ProcessSection } from '../features/process/ProcessSection';
import { CTASection } from '../features/cta/CTASection';

function App() {
  return (
    <div className="app-shell">
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}

export default App;
