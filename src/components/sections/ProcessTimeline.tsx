import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../common/Reveal';

interface ProcessTimelineProps {
  onOpenConsultation: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenConsultation }) => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Spatial Capture',
      desc: 'You upload property boundaries, satellite GIS data, or drone footage. We host an initial video discovery session to outline your family lifestyle goals.'
    },
    {
      num: '02',
      title: 'Photorealistic 3D Architecture',
      desc: 'We render your complete estate in 3D CAD fidelity — detailing pool depth, travertine hardscape, outdoor kitchen counters, and ambient night lighting.'
    },
    {
      num: '03',
      title: 'Virtual Refinement Rounds',
      desc: 'Collaborate remotely across two structured review rounds to adjust plant palettes, fire feature positioning, and timber pergola structures.'
    },
    {
      num: '04',
      title: 'Contractor Handoff Package',
      desc: 'Receive comprehensive construction drawings, elevation callouts, and material quantity sheets ready for local builders to quote accurately.'
    }
  ];

  return (
    <section id="process" className="snap-section-auto bg-[#1C1A17] relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="eyebrow">The 4-Stage Architectural Journey</span>
          <h2 className="section-title text-[2rem] sm:text-5xl">From Vision to Turn-Key CAD Package</h2>
          <p className="text-base text-[#A39E93]">
            How we deliver a custom $200K+ outdoor sanctuary without a single intrusive home visit.
          </p>
        </div>

        {/* Desktop: Horizontal Grid */}
        <div className="hidden lg:block relative mb-12">
          <div className="absolute top-12 left-12 right-12 h-[1px] bg-[#B5652E]/30 z-0" />
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <Reveal
                key={idx}
                delay={idx * 0.12}
                duration={0.6}
                y={30}
                margin="-50px"
                className="bg-[#24211D] p-7 rounded-xl border border-[#F5F1EA]/10 hover:border-[#B5652E] transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-6xl text-[#B5652E] font-normal leading-none tracking-tight block mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5F1EA] mb-3 group-hover:text-[#D8A370] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#A39E93] leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F5F1EA]/10 text-[10px] uppercase tracking-[0.2em] text-[#A39E93] font-semibold">
                  Stage {step.num} — Specification
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Timeline with oversized numerals
            Numeral stays large (text-5xl ≈ 48px) as a strong visual anchor,
            even as card text scales down. gap-10 between cards for distinct steps. */}
        <div className="lg:hidden relative ml-8 sm:ml-10 pl-10 sm:pl-12 border-l-2 border-[#B5652E]/40 space-y-12 mb-12">
          <Reveal mode="scaleY" duration={0.8} className="absolute left-2 top-0 w-0.5 bg-[#B5652E]/40 origin-top" margin="-50px" />
            {steps.map((step, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.08}
              duration={0.5}
              y={0}
              x={-16}
              margin="-40px"
              className="relative bg-[#24211D] p-6 sm:p-8 rounded-2xl border border-[#F5F1EA]/10 flex flex-col justify-between min-h-[260px]"
            >
              {/* Timeline Node */}
              <Reveal mode="fade" duration={0.3} delay={idx * 0.08} className="absolute -left-4 top-6 w-3 h-3 rounded-full bg-[#B5652E]" />

              {/* Oversized numeral as visual anchor */}
              <span className="font-serif text-5xl text-[#B5652E]/10 font-normal leading-none tracking-tight block mb-1 pointer-events-none select-none">
                  {step.num}
                </span>

              <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1EA] font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#A39E93] leading-7">
                  {step.desc}
                </p>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <button onClick={onOpenConsultation} className="btn-primary w-full sm:w-auto">
            <span>Schedule Your Discovery Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
