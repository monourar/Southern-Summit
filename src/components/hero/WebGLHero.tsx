import React, { useState } from 'react';
import { ArrowRight, SlidersHorizontal, Layers } from 'lucide-react';
import { ImageComparisonSlider } from '../common/ImageComparisonSlider';

interface WebGLHeroProps {
  onOpenConsultation: () => void;
}

export const WebGLHero: React.FC<WebGLHeroProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'dissolve' | 'photoreal'>('dissolve');

  return (
    /* Dynamic top offset: --header-height is set by Header's ResizeObserver.
       padding-top = header height + 40px breathing room ensures the hero title
       always starts below the navbar on every viewport and orientation. */
    <section
      id="hero-3d"
      className="snap-section-auto bg-[#1C1A17] relative overflow-hidden pb-16 sm:pb-20"
      style={{
        paddingTop: 'calc(var(--header-height, 80px) + 40px)',
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B5652E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Header Content */}
      <div className="container mx-auto relative z-10 text-center max-w-4xl mb-8 sm:mb-12">
        {/* Eyebrow — hidden on very small screens to reduce clutter */}
        <div className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24211D] border border-[#F5F1EA]/10 mb-6 backdrop-blur-md">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A39E93]">
            Virtual Landscape Architecture &amp; 3D Spatial Design
          </span>
        </div>

        {/* Hero headline stays large and commanding on mobile.
            text-[2.75rem] ≈ 44px — much larger than body text-base (16px).
            line-height loosened to 1.15 on mobile via CSS. */}
        <h1 className="font-serif text-[2.75rem] sm:text-7xl lg:text-8xl text-[#F5F1EA] font-normal leading-[1.15] sm:leading-[1.08] tracking-tight mb-5 sm:mb-4">
          We Engineer{' '}
          <br className="hidden sm:block" />
          <span className="italic">Extraordinary</span>
          <br className="sm:hidden" />{' '}
          Outdoor Living
        </h1>

        {/* Subhead — slightly smaller on mobile, tight to headline */}
        <p className="text-[15px] sm:text-xl text-[#A39E93] max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-8">
          Photorealistic 3D CAD master plans for luxury pools, outdoor culinary kitchens, and estate grounds — designed remotely and built by turn-key local contractors.
        </p>

        {/* CTA — full-width on mobile for easy thumb tap */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-10">
          <button
            onClick={onOpenConsultation}
            className="btn-primary w-full sm:w-auto px-8 py-4 shadow-xl shadow-[#B5652E]/25"
          >
            <span>Start Your 3D Master Plan</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Toggle pills — collapsed to compact icon-only on mobile,
              full labels visible only on sm+ screens */}
          <div role="tablist" aria-label="Hero View Mode" className="inline-flex items-center p-1 rounded-full bg-[#24211D]/80 border border-[#F5F1EA]/10 gap-1">
            <button
              role="tab"
              aria-selected={activeTab === 'dissolve'}
              aria-label="Blueprint Dissolve View"
              onClick={() => setActiveTab('dissolve')}
              className={`min-h-[44px] px-3 sm:px-5 py-2 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === 'dissolve'
                  ? 'bg-[#A05A28] text-[#F5F1EA] font-semibold shadow-md'
                  : 'text-[#A39E93] hover:text-[#F5F1EA]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Blueprint Dissolve</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'photoreal'}
              aria-label="Dusk Realization View"
              onClick={() => setActiveTab('photoreal')}
              className={`min-h-[44px] px-3 sm:px-5 py-2 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTab === 'photoreal'
                  ? 'bg-[#A05A28] text-[#F5F1EA] font-semibold shadow-md'
                  : 'text-[#A39E93] hover:text-[#F5F1EA]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Dusk Realization</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero image — taller aspect ratio on mobile (aspect-[3/4] ≈ portrait)
          so the architectural subject isn't awkwardly landscape-cropped at narrow width.
          Corner labels hidden on mobile, only drag handle visible. */}
      <div className="container mx-auto relative z-10">
        {activeTab === 'dissolve' ? (
          <ImageComparisonSlider
            beforeImage="/images/hero_cad_blueprint-1376.jpg"
            afterImage="/images/hero_backyard_night-1376.jpg"
            beforeBase="hero_cad_blueprint"
            afterBase="hero_backyard_night"
            sizes="(min-width: 768px) 1200px, 100vw"
            beforeFetchPriority="high"
            beforeLabel="CAD Blueprint Specification"
            afterLabel="Completed Estate Sanctuary"
            heightClass="aspect-[3/4] sm:aspect-auto sm:h-[460px] md:h-[620px] lg:h-[680px]"
            accentColor="#38BDF8"
            ariaLabel="CAD Blueprint to finished photorealism cross dissolve"
            hideLabelsOnMobile
          />
        ) : (
          <div className="w-full aspect-[3/4] sm:aspect-auto sm:h-[460px] md:h-[620px] lg:h-[680px] rounded-xl overflow-hidden border border-[#F5F1EA]/15 shadow-2xl relative">
            <picture>
              <source srcSet="/images/hero_backyard_night-768.webp 768w, /images/hero_backyard_night-1376.webp 1376w" type="image/webp" sizes="(min-width: 768px) 1200px, 100vw" />
              <source srcSet="/images/hero_backyard_night-1376.jpg" type="image/jpeg" sizes="(min-width: 768px) 1200px, 100vw" />
              <img
                src="/images/hero_backyard_night-1376.jpg"
                alt="Architectural Dusk Realization"
                width="1376"
                height="768"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </picture>
            {/* Caption only on sm+ */}
            <div className="hidden sm:block absolute bottom-6 left-6 z-20 bg-[#1C1A17]/85 backdrop-blur-md p-5 rounded-lg border border-[#F5F1EA]/10 max-w-md">
              <span className="text-xs uppercase tracking-widest text-[#D8A370] font-semibold block mb-1">Architectural Dusk Realization</span>
              <h2 className="font-serif text-3xl text-[#F5F1EA]">The Highland Estate Sanctuary</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
