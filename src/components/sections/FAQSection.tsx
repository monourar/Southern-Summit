import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does remote 3D landscape architecture work?',
      a: 'You provide property boundaries, site photos, or drone video clips. Our spatial design team utilizes satellite GIS data to build an accurate 3D digital twin of your yard. All review sessions occur via interactive video consultations through Discovery, Concept Development, Immersive 3D Design, and your Final Design Package.'
    },
    {
      q: 'Can my local contractor build directly from your CAD packages?',
      a: 'Yes. Every master plan includes dimensioned hardscape layouts, pool depth profiles, material callout schedules, and lighting line diagrams formatted specifically for local masons, pool builders, and electrical contractors.'
    },
    {
      q: 'What if I want to adjust the design after seeing the 3D renders?',
      a: 'Every 3D design package includes two structured revision rounds. We fine-tune pool positions, plant species, hardscape paver choices, and pergola structures until every detail aligns with your vision.'
    },
    {
      q: 'Do you assist with selecting local builders or contractors?',
      a: 'Yes. We provide contractor presentation guidance and help evaluate local builder quotes to ensure your project stays within budget and matches our technical specifications.'
    }
  ];

  return (
    <section id="faq" className="snap-section-auto bg-[#F5F1EA] text-[#1C1A17] border-t border-[#1C1A17]/10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10 sm:mb-14">
          <span className="eyebrow eyebrow-light">Clear Answers</span>
          {/* Fix 2: Section headline keeps visual dominance on mobile */}
          <h2 className="section-title section-title-dark text-[2rem] sm:text-5xl">Frequently Asked Questions</h2>
        </div>

        {/* Fix 6: Larger touch targets (py-5 on mobile), more generous answer
            spacing, and slightly larger question text on mobile */}
        <div className="border-t border-b border-[#1C1A17]/15 divide-y divide-[#1C1A17]/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="transition-all duration-300">
                <button
                  id={`faq-btn-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 sm:py-7 text-left flex justify-between items-center gap-4 sm:gap-6 font-serif text-[1.125rem] sm:text-2xl text-[#1C1A17] hover:text-[#8F4D22] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none min-h-[52px]"
                >
                  <span className="leading-snug pr-2">{faq.q}</span>
                  <div className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-[#1C1A17]/20 flex items-center justify-center text-[#1C1A17] flex-shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-[#B5652E] text-[#B5652E] bg-[#B5652E]/10' : ''
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="pb-6 sm:pb-8 text-[13px] sm:text-base text-[#666055] leading-relaxed font-light pr-4 sm:pr-12 pt-2 border-t border-[#1C1A17]/5"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
