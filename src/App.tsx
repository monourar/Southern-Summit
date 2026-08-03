import React, { useState, Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WebGLHero } from './components/hero/WebGLHero';
import { Positioning } from './components/sections/Positioning';
import { ProcessTimeline } from './components/sections/ProcessTimeline';
import { Testimonials } from './components/sections/Testimonials';
import { PortfolioGrid } from './components/sections/PortfolioGrid';
import { BuilderPartnership } from './components/sections/BuilderPartnership';
import { FAQSection } from './components/sections/FAQSection';
import { CustomCursor } from './components/common/CustomCursor';

// Fix 4 (unused JS): below-the-fold, interactivity-gated components are code-split
// so their JS only downloads when the user actually opens them. The estimator sits
// mid-page and the modal renders null when closed, so neither needs to be in the
// initial bundle.
const MasterPlanEstimator = lazy(() =>
  import('./components/sections/MasterPlanEstimator').then((m) => ({ default: m.MasterPlanEstimator }))
);
const ConsultationModal = lazy(() =>
  import('./components/modals/ConsultationModal').then((m) => ({ default: m.ConsultationModal }))
);

export function App() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  const handleOpenConsultation = () => {
    setConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setConsultationOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1C1A17] text-[#F5F1EA] selection:bg-[#B5652E] selection:text-[#F5F1EA] relative">
      {/* Part 3: Global Architectural Grain/Noise Overlay */}
      <svg className="grain-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Hardware-Accelerated Lerp Cursor Ring */}
      <CustomCursor />

      {/* Architectural Fixed Header */}
      <Header onOpenConsultation={handleOpenConsultation} />

      {/* Core WebGL Centerpiece Hero & Section Navigation */}
      <main>
        <WebGLHero onOpenConsultation={handleOpenConsultation} />
        <Positioning />
        <ProcessTimeline onOpenConsultation={handleOpenConsultation} />
        <Testimonials />
        <Suspense fallback={null}>
          <MasterPlanEstimator onOpenConsultation={handleOpenConsultation} />
        </Suspense>
        <PortfolioGrid onOpenConsultation={handleOpenConsultation} />
        <BuilderPartnership onOpenConsultation={handleOpenConsultation} />
        <FAQSection />
      </main>

      {/* Architectural Footer */}
      <Footer />

      {/* Proposal Consultation Request Modal */}
      <Suspense fallback={null}>
        <ConsultationModal
          isOpen={consultationOpen}
          onClose={handleCloseConsultation}
        />
      </Suspense>
    </div>
  );
}

export default App;
