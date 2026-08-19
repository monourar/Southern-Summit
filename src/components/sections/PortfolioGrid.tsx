import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Reveal } from '../common/Reveal';

interface PortfolioGridProps {
  onOpenConsultation?: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onOpenConsultation }) => {
  const [filter, setFilter] = useState<'all' | 'pools' | 'kitchens' | 'master'>('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSlide(0);
    carouselRef.current?.scrollTo({ left: 0 });
  }, [filter]);

  const projects = [
    {
      id: 1,
      base: 'portfolio_1_highland',
      category: 'pools',
      title: 'The Highland Sanctuary',
      tag: 'Custom Heated Pool & Spa',
      image: '/images/portfolio_1_highland-1024.jpg',
      location: 'Nashville, TN',
      spec: '6,500 sq ft Estate Ground'
    },
    {
      id: 2,
      base: 'portfolio_2_culinary',
      category: 'kitchens',
      title: 'The Culinary Pavilion',
      tag: 'Outdoor Kitchen & Dining Bar',
      image: '/images/portfolio_2_culinary-1024.jpg',
      location: 'Atlanta, GA',
      spec: 'Thermally Modified Timber'
    },
    {
      id: 3,
      base: 'after_backyard',
      category: 'master',
      title: 'Oakridge Estate Master Plan',
      tag: 'Full 1.5 Acre Multi-Zone Plan',
      image: '/images/after_backyard-1280.jpg',
      location: 'Charlotte, NC',
      spec: '1.5 Acre Master CAD'
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  // Widths are per-project: portfolio_* renders at 640/1024, after_backyard at
  // 512/768/1280 (matches scripts/optimize-images.mjs PHOTOS). Emitting widths
  // the pipeline never generates would 404 every visit.
  const imageSrcSet = (name: string) =>
    name === 'after_backyard'
      ? `/images/${name}-512.webp 512w, /images/${name}-768.webp 768w`
      : `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w`;
  const imageSizes = '(min-width: 768px) 425px, 88vw';

  return (
    <section id="portfolio" className="snap-section-auto bg-[#F5F1EA] text-[#1C1A17] border-t border-[#1C1A17]/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <span className="eyebrow eyebrow-light">Selected Works</span>
            <h2 className="section-title section-title-dark text-[2rem] sm:text-5xl">Architectural Portfolio</h2>
          </div>

          {/* Category Filter Tabs — horizontal scroll on mobile */}
          <div role="group" aria-label="Portfolio Category Filters" className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-none -mx-1 px-1 pb-2 border-b border-[#1C1A17]/15">
            {(['all', 'pools', 'kitchens', 'master'] as const).map((cat) => {
              const labels = { all: 'All Projects', pools: 'Custom Pools', kitchens: 'Outdoor Kitchens', master: 'Master Plans' };
              return (
                <button
                  key={cat}
                  aria-pressed={filter === cat}
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
            <Reveal
              key={p.id}
              delay={idx * 0.15}
              duration={0.6}
              y={30}
              margin="-40px"
              onClick={onOpenConsultation}
              tabIndex={0}
              role="button"
              aria-label={`View ${p.title} architectural specification`}
              className="group relative h-[450px] rounded-xl overflow-hidden border border-[#1C1A17]/15 shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none transition-all duration-500 hover:shadow-2xl hover:border-[#B5652E]/50"
            >
              <picture>
                <source srcSet={imageSrcSet(p.base)} type="image/webp" sizes={imageSizes} />
                <source srcSet={`/images/${p.base}-1024.jpg`} type="image/jpeg" sizes={imageSizes} />
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width="1024"
                  height="576"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </picture>

              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                <span className="bg-[#1C1A17]/85 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[#F5F1EA] font-semibold border border-[#F5F1EA]/10">
                  {p.tag}
                </span>
                <span className="bg-[#1C1A17]/85 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold border border-[#F5F1EA]/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D8A370]" /> {p.location}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/40 to-transparent p-8 flex flex-col justify-end transition-all duration-500">
                <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A370] mb-1 block">
                    {p.spec}
                  </span>
                  <h3 className="font-serif text-3xl text-[#F5F1EA] mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1EA] group-hover:text-[#D8A370] transition-colors pt-2 border-t border-[#F5F1EA]/15">
                    <span>Explore 3D Specification</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D8A370] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile Carousel: Larger cards with portrait crop (aspect-[3/4]),
            full-bleed negative-margin carousel with generous card padding */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenConsultation?.();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${p.title} architectural specification`}
                className="w-[88vw] flex-shrink-0 snap-center relative aspect-[3/4] rounded-xl overflow-hidden border border-[#1C1A17]/15 shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none"
              >
                <picture>
                  <source srcSet={imageSrcSet(p.base)} type="image/webp" sizes={imageSizes} />
                  <source srcSet={`/images/${p.base}-1024.jpg`} type="image/jpeg" sizes={imageSizes} />
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width="1024"
                    height="576"
                    className="w-full h-full object-cover"
                  />
                </picture>

                {/* Simplified top bar on mobile — just category tag */}
                <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
                  <span className="bg-[#1C1A17]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-widest text-[#F5F1EA] font-semibold border border-[#F5F1EA]/10">
                    {p.tag}
                  </span>
                  <span className="bg-[#1C1A17]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold border border-[#F5F1EA]/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D8A370]" /> {p.location}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/30 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D8A370] mb-1 block">
                    {p.spec}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5F1EA] mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1EA] pt-2 border-t border-[#F5F1EA]/15">
                    <span>Explore 3D Specification</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D8A370]" />
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
