import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface MasterPlanEstimatorProps {
  onOpenConsultation: () => void;
}

export const MasterPlanEstimator: React.FC<MasterPlanEstimatorProps> = ({ onOpenConsultation }) => {
  const [scope, setScope] = useState<'standard' | 'estate'>('standard');
  const [hasPool, setHasPool] = useState(true);
  const [hasKitchen, setHasKitchen] = useState(true);
  const [hasFire, setHasFire] = useState(true);
  const [hasPergola, setHasPergola] = useState(false);
  const [hasLighting, setHasLighting] = useState(true);

  // Dynamic estimate calculation
  let baseDesignFee = scope === 'standard' ? 3000 : 4500;
  let minBuild = scope === 'standard' ? 45000 : 85000;
  let maxBuild = scope === 'standard' ? 80000 : 160000;

  if (hasPool) { baseDesignFee += 600; minBuild += 45000; maxBuild += 90000; }
  if (hasKitchen) { baseDesignFee += 400; minBuild += 20000; maxBuild += 40000; }
  if (hasFire) { baseDesignFee += 250; minBuild += 9000; maxBuild += 18000; }
  if (hasPergola) { baseDesignFee += 350; minBuild += 14000; maxBuild += 26000; }
  if (hasLighting) { baseDesignFee += 200; minBuild += 7000; maxBuild += 14000; }

  const features = [
    { label: 'Custom Heated Pool & Spa', state: hasPool, toggle: () => setHasPool(!hasPool) },
    { label: 'Outdoor Kitchen & Bar', state: hasKitchen, toggle: () => setHasKitchen(!hasKitchen) },
    { label: 'Sunken Fire Sanctuary', state: hasFire, toggle: () => setHasFire(!hasFire) },
    { label: 'Teak Timber Pergola', state: hasPergola, toggle: () => setHasPergola(!hasPergola) },
    { label: 'Architectural Lighting Grid', state: hasLighting, toggle: () => setHasLighting(!hasLighting) },
  ];

  return (
    <section id="estimator" className="snap-section-auto bg-[#24211D] border-t border-[#F5F1EA]/10">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-[#2E2924] to-[#1C1A17] p-5 sm:p-10 lg:p-12 rounded-xl border border-[#F5F1EA]/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Options Selector */}
            <div className="lg:col-span-7">
              <span className="eyebrow">Interactive Plan Architect</span>
              {/* Fix 2: Headline stays dominant on mobile */}
              <h2 className="section-title text-[1.7rem] sm:text-4xl lg:text-5xl mb-3 sm:mb-4">
                Calculate Your Design Investment
              </h2>
              <p className="text-[13px] sm:text-sm text-[#A39E93] mb-6 leading-relaxed">
                Select your preferred architectural features to estimate your custom 3D design package fee and expected turn-key contractor build budget range.
              </p>

              {/* 1. Scope Selection */}
              <div className="mb-6">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#A39E93] block mb-3">
                  1. Architectural Scope
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setScope('standard')}
                    className={`min-h-[52px] p-4 rounded-lg border text-left transition-all focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none ${
                      scope === 'standard'
                        ? 'border-[#B5652E] bg-[#B5652E]/10 text-[#F5F1EA]'
                        : 'border-[#F5F1EA]/10 bg-[#1C1A17]/40 text-[#A39E93] hover:border-[#F5F1EA]/30'
                    }`}
                  >
                    <span className="font-serif text-base font-semibold block text-[#F5F1EA]">Standard Master Plan</span>
                    <span className="text-[11px] text-[#A39E93]">Single-family suburban estate</span>
                  </button>
                  <button
                    onClick={() => setScope('estate')}
                    className={`min-h-[52px] p-4 rounded-lg border text-left transition-all focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none ${
                      scope === 'estate'
                        ? 'border-[#B5652E] bg-[#B5652E]/10 text-[#F5F1EA]'
                        : 'border-[#F5F1EA]/10 bg-[#1C1A17]/40 text-[#A39E93] hover:border-[#F5F1EA]/30'
                    }`}
                  >
                    <span className="font-serif text-base font-semibold block text-[#F5F1EA]">Multi-Zone Estate</span>
                    <span className="text-[11px] text-[#A39E93]">Large acre or multi-elevation grounds</span>
                  </button>
                </div>
              </div>

              {/* 2. Feature Toggles — Fix 6: grid on mobile (2 columns) instead of
                  flex-wrap to prevent awkward wrapping and ensure uniform pill sizes */}
              <div>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#A39E93] block mb-3">
                  2. Key Sanctuary Features
                </span>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                  {features.map((f) => (
                    <button
                      key={f.label}
                      onClick={f.toggle}
                      className={`min-h-[48px] px-3 sm:px-4 py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider border transition-all flex items-center justify-center gap-1.5 sm:gap-2 focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none ${
                        f.state ? 'border-[#B5652E] bg-[#B5652E]/15 text-[#F5F1EA]' : 'border-[#F5F1EA]/10 text-[#A39E93] hover:border-[#F5F1EA]/30'
                      }`}
                    >
                      {f.state && <Check className="w-3.5 h-3.5 text-[#B5652E] flex-shrink-0" />}
                      <span className="text-center leading-tight">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-5 bg-[#1C1A17] p-5 sm:p-8 rounded-xl border border-[#F5F1EA]/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A39E93] font-semibold block mb-2">
                  Estimated 3D Design Package
                </span>
                <div className="font-serif text-4xl sm:text-5xl text-[#B5652E] font-semibold mb-2">
                  ${baseDesignFee.toLocaleString()}
                </div>
                <p className="text-[11px] sm:text-xs text-[#A39E93] mb-5 leading-relaxed">
                  Includes full 3D CAD renders, material callout specs, contractor presentation package, &amp; 2 revision rounds.
                </p>

                <div className="pt-4 border-t border-[#F5F1EA]/10">
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#F5F1EA] font-semibold block mb-1">
                    Est. Contractor Build Range
                  </span>
                  <div className="font-serif text-2xl text-[#F5F1EA] font-medium">
                    ${(minBuild / 1000).toFixed(0)}k – ${(maxBuild / 1000).toFixed(0)}k+
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="btn-primary w-full justify-center mt-6"
              >
                <span>Request Custom 3D Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
