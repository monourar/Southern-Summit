import React, { useState } from 'react';
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortfolioGridProps {
  onOpenConsultation?: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onOpenConsultation }) => {
  const [filter, setFilter] = useState<'all' | 'pools' | 'kitchens' | 'master'>('all');
  const [activeSlide, setActiveSlide] = useState(0);

  const projects = [
    {
      id: 1,
      category: 'pools',
      title: 'The Highland Sanctuary',
      tag: 'Custom Heated Pool & Spa',
      image: '/images/portfolio_1_highland.jpg',
      location: 'Nashville, TN',
      spec: '6,500 sq ft Estate Ground'
    },
    {
      id: 2,
      category: 'kitchens',
      title: 'The Culinary Pavilion',
      tag: 'Outdoor Kitchen & Dining Bar',
      image: '/images/portfolio_2_culinary.jpg',
      location: 'Atlanta, GA',
      spec: 'Thermally Modified Timber'
    },
    {
      id: 3,
      category: 'master',
      title: 'Oakridge Estate Master Plan',
      tag: 'Full 1.5 Acre Multi-Zone Plan',
      image: '/images/after_backyard.jpg',
      location: 'Charlotte, NC',
      spec: '1.5 Acre Master CAD'
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="snap-section-auto bg-[#F5F1EA] text-[#1C1A17] border-t border-[#1C1A17]/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="eyebrow eyebrow-light">Selected Works</span>
            {/* Fix 2: Section headline keeps visual dominance on mobile */}
            <h2 className="section-title section-title-dark text-[2rem] sm:text-5xl">Architectural Portfolio</h2>
          </div>

          {/* Category Filter Tabs — horizontal scroll on mobile */}
          <div role="tablist" aria-label="Portfolio Category Filters" className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-none -mx-1 px-1 pb-2 border-b border-[#1C1A17]/15">
            {(['all', 'pools', 'kitchens', 'master'] as const).map((cat) => {
              const labels = { all: 'All Projects', pools: 'Custom Pools', kitchens: 'Outdoor Kitchens', master: 'Master Plans' };
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={filter === cat}
                  onClick={() => setFilter(cat)}
                  className={`min-h-[44px] px-3 py-2 text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold transition-all relative whitespace-nowrap flex-shrink-0 ${
                    filter === cat
                      ? 'text-[#1C1A17] after:content-[""] after:absolute after:bottom-[-9px] after:left-0 after:w-full after:h-[2px] after:bg-[#1C1A17]'
                      : 'text-[#666055] hover:text-[#1C1A17]'
                  }`}
                >
                  {labels[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {filteredProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={onOpenConsultation}
              tabIndex={0}
              role="button"
              aria-label={`View ${p.title} architectural specification`}
              className="group relative h-[450px] rounded-xl overflow-hidden border border-[#1C1A17]/15 shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none transition-all duration-500 hover:shadow-2xl hover:border-[#B5652E]/50"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width="600"
                height="450"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                <span className="bg-[#1C1A17]/85 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[#F5F1EA] font-semibold border border-[#F5F1EA]/10">
                  {p.tag}
                </span>
                <span className="bg-[#1C1A17]/85 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold border border-[#F5F1EA]/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B5652E]" /> {p.location}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/40 to-transparent p-8 flex flex-col justify-end transition-all duration-500">
                <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B5652E] mb-1 block">
                    {p.spec}
                  </span>
                  <h3 className="font-serif text-3xl text-[#F5F1EA] mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1EA] group-hover:text-[#B5652E] transition-colors pt-2 border-t border-[#F5F1EA]/15">
                    <span>Explore 3D Specification</span>
                    <ArrowUpRight className="w-4 h-4 text-[#B5652E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel: Fix 5 — Larger cards with portrait crop (aspect-[3/4]),
            full-bleed negative-margin carousel with generous card padding */}
        <div className="md:hidden">
          <div
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardWidth = el.clientWidth * 0.88 + 16; // card width + gap
              const index = Math.round(el.scrollLeft / cardWidth);
              setActiveSlide(Math.min(index, filteredProjects.length - 1));
            }}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 -mx-[var(--page-gutter)] px-[var(--page-gutter)] pb-4"
          >
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={onOpenConsultation}
                className="w-[88vw] flex-shrink-0 snap-center relative aspect-[3/4] rounded-xl overflow-hidden border border-[#1C1A17]/15 shadow-xl cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                {/* Simplified top bar on mobile — just category tag */}
                <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
                  <span className="bg-[#1C1A17]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-widest text-[#F5F1EA] font-semibold border border-[#F5F1EA]/10">
                    {p.tag}
                  </span>
                  <span className="bg-[#1C1A17]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold border border-[#F5F1EA]/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B5652E]" /> {p.location}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/30 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B5652E] mb-1 block">
                    {p.spec}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5F1EA] mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1EA] pt-2 border-t border-[#F5F1EA]/15">
                    <span>Explore 3D Specification</span>
                    <ArrowUpRight className="w-4 h-4 text-[#B5652E]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Dots */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {filteredProjects.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-6 bg-[#B5652E]' : 'w-2 bg-[#1C1A17]/20'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
