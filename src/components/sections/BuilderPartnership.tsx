import React from 'react';
import { Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

interface BuilderPartnershipProps {
  onOpenConsultation: () => void;
}

export const BuilderPartnership: React.FC<BuilderPartnershipProps> = ({ onOpenConsultation }) => {
  return (
    <section id="builders" className="snap-section-mandatory bg-gradient-to-r from-[#24211D] to-[#1C1A17] border-y border-[#F5F1EA]/10">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24211D] border border-[#F5F1EA]/10 mb-4 sm:mb-5">
              <Briefcase className="w-3.5 h-3.5 text-[#A39E93]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A39E93]">
                B2B Contractor Partnership Track
              </span>
            </div>

            <h2 className="section-title text-[1.85rem] sm:text-5xl mb-4 sm:mb-5">
              Empower Your Home Builds With 3D Architectural Visuals
            </h2>

            {/* Reduced mobile body text and tighter line-height to prevent
                this section from getting too tall on small screens */}
            <p className="text-sm sm:text-lg text-[#A39E93] leading-relaxed mb-5 sm:mb-6">
              Discover how Southern Summit helps custom home builders increase sales, save valuable time, and maximize profits through professional 3D outdoor living designs. Our photorealistic renderings, dimensional drawings, and dedicated design support serve as a seamless extension of your business—allowing your sales team to focus on closing projects.
            </p>

            <ul className="space-y-3 mb-5 sm:mb-6">
              <li className="flex items-center gap-3 text-sm text-[#F5F1EA]">
                <CheckCircle className="w-4 h-4 text-[#B5652E] flex-shrink-0" />
                <span>White-label 3D CAD renderings for client pitches</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#F5F1EA]">
                <CheckCircle className="w-4 h-4 text-[#B5652E] flex-shrink-0" />
                <span>Turn-key dimensional drawings &amp; material quantity sheets</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#F5F1EA]">
                <CheckCircle className="w-4 h-4 text-[#B5652E] flex-shrink-0" />
                <span>Priority 5-business-day CAD turnaround</span>
              </li>
            </ul>

            <button onClick={onOpenConsultation} className="btn-outline w-full sm:w-auto">
              <span>Request Builder Presentation Deck</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Portrait crop on mobile (aspect-[3/4]), auto height on desktop */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#F5F1EA]/15 shadow-2xl aspect-[3/4] sm:aspect-auto sm:h-[440px]">
              <picture>
                <source srcSet="/images/portfolio_2_culinary-640.webp 640w, /images/portfolio_2_culinary-1024.webp 1024w" type="image/webp" sizes="(min-width: 768px) 520px, 92vw" />
                <source srcSet="/images/portfolio_2_culinary-1024.jpg" type="image/jpeg" sizes="(min-width: 768px) 520px, 92vw" />
                <img
                  src="/images/portfolio_2_culinary-1024.jpg"
                  alt="Architectural Outdoor Pavilion and Material Blueprint"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="1024"
                  height="576"
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
