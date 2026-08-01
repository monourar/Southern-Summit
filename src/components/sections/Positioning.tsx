import React, { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ImageComparisonSlider } from '../common/ImageComparisonSlider';

export const Positioning: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [countPlans, setCountPlans] = useState(0);
  const [countPrecision, setCountPrecision] = useState(0);
  const [countStates, setCountStates] = useState(0);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let p = 0;
          const timerP = setInterval(() => { p += 15; if (p >= 500) { setCountPlans(500); clearInterval(timerP); } else { setCountPlans(p); } }, 30);
          let pr = 0;
          const timerPr = setInterval(() => { pr += 4; if (pr >= 100) { setCountPrecision(100); clearInterval(timerPr); } else { setCountPrecision(pr); } }, 40);
          let st = 0;
          const timerSt = setInterval(() => { st += 1; if (st >= 18) { setCountStates(18); clearInterval(timerSt); } else { setCountStates(st); } }, 80);
        }
      },
      { threshold: 0.25 }
    );
    if (statsSectionRef.current) observer.observe(statsSectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="positioning" className="snap-section-auto bg-[#F5F1EA] border-y border-[#1C1A17]/10 text-[#1C1A17] relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 lg:mb-16">
          
          {/* Left Column */}
          <div>
            <span className="eyebrow eyebrow-light">Architectural Studio Positioning</span>
            {/* Fix 2: Section headline keeps visual dominance on mobile —
                text-[2rem] (32px) vs body 15-16px = ~2× ratio */}
            <h2 className="section-title section-title-dark text-[2rem] sm:text-5xl lg:text-6xl mb-5">
              We Don't Mow Lawns. <br />
              <span className="italic font-serif text-[#1C1A17]">We Architect Estates.</span>
            </h2>

            <p className="text-[15px] sm:text-lg text-[#666055] leading-relaxed mb-6">
              Traditional landscaping companies sell inventory they happen to stock. Southern Summit operates as a virtual landscape architecture studio. We combine spatial 3D visualization, exact material engineering, and contractor-ready construction packages so you retain total control over your investment.
            </p>
          </div>

          {/* Right Column: Fix 5 — Full-bleed edge-to-edge slider on mobile
              with taller portrait crop (aspect-[3/4]) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#666055] font-semibold">Transformation Proof</span>
              <span className="text-[11px] text-[#666055] font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1C1A17]" /> Drag to Compare
              </span>
            </div>

            <div className="-mx-[var(--page-gutter)] sm:mx-0" style={{ width: 'calc(100% + var(--page-gutter) * 2)' }}>
              <ImageComparisonSlider
                beforeImage="/images/before_backyard.jpg"
                afterImage="/images/after_backyard.jpg"
                beforeLabel="Before Renovation"
                afterLabel="After 3D Master Plan"
                heightClass="aspect-[4/5] sm:aspect-auto sm:h-[440px]"
                accentColor="#B5652E"
                ariaLabel="Before and after renovation comparison slider"
              />
            </div>
          </div>

        </div>

        {/* Trust Stats */}
        <div ref={statsSectionRef} className="pt-8 sm:pt-12 border-t border-[#1C1A17]/10">
          {/* Fix 6: Stats stack vertically with generous spacing on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            <div className="border-l-2 border-[#1C1A17] pl-5">
              <div className="font-serif text-[3.5rem] sm:text-7xl lg:text-8xl text-[#1C1A17] font-normal leading-none mb-2">
                {countPlans}+
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#1C1A17] font-bold mb-1">
                Master Plans Designed
              </div>
              <p className="text-xs text-[#666055]">Turn-key CAD packages delivered</p>
            </div>

            <div className="border-l-2 border-[#1C1A17] pl-5">
              <div className="font-serif text-[3.5rem] sm:text-7xl lg:text-8xl text-[#1C1A17] font-normal leading-none mb-2">
                {countPrecision}%
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#1C1A17] font-bold mb-1">
                Remote Process Precision
              </div>
              <p className="text-xs text-[#666055]">Zero intrusive site visits required</p>
            </div>

            <div className="border-l-2 border-[#1C1A17] pl-5">
              <div className="font-serif text-[3.5rem] sm:text-7xl lg:text-8xl text-[#1C1A17] font-normal leading-none mb-2">
                {countStates}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#1C1A17] font-bold mb-1">
                States Served Remotely
              </div>
              <p className="text-xs text-[#666055]">Nationwide contractor network support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
