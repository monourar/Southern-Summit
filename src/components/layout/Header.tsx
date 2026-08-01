import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Measure dynamic header height and update CSS custom property --header-height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      updateHeaderHeight();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, [isScrolled]);

  // Handle Hash Navigation on Initial Page Load
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(targetId);
      }, 150);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const headerHeight = headerRef.current ? headerRef.current.getBoundingClientRect().height : 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(offsetPosition, 0),
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-[padding,background-color,border-color,box-shadow] duration-300 ease-out ${
        isScrolled
          ? 'py-3.5 bg-[#1C1A17]/90 backdrop-blur-md border-b border-[#F5F1EA]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-gradient-to-b from-[#1C1A17]/90 via-[#1C1A17]/40 to-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
        {/* Brand identity with Uploaded Logo Mark */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3.5 group text-decoration-none focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded p-1">
          <div className="w-11 h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Southern Summit Logo Mark"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-wider text-[#F5F1EA] font-medium uppercase">
              Southern Summit
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#B5652E] uppercase font-semibold">
              Outdoor Design Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#hero-3d"
            onClick={(e) => handleNavClick(e, 'hero-3d')}
            className="text-xs uppercase tracking-widest text-[#A39E93] hover:text-[#F5F1EA] transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
          >
            3D Spatial Lens
          </a>
          <a
            href="#positioning"
            onClick={(e) => handleNavClick(e, 'positioning')}
            className="text-xs uppercase tracking-widest text-[#A39E93] hover:text-[#F5F1EA] transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
          >
            Proof
          </a>
          <a
            href="#process"
            onClick={(e) => handleNavClick(e, 'process')}
            className="text-xs uppercase tracking-widest text-[#A39E93] hover:text-[#F5F1EA] transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
          >
            Process
          </a>
          <a
            href="#estimator"
            onClick={(e) => handleNavClick(e, 'estimator')}
            className="text-xs uppercase tracking-widest text-[#A39E93] hover:text-[#F5F1EA] transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
          >
            Plan Architect
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className="text-xs uppercase tracking-widest text-[#A39E93] hover:text-[#F5F1EA] transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
          >
            Portfolio
          </a>
          <a
            href="#builders"
            onClick={(e) => handleNavClick(e, 'builders')}
            className="text-xs uppercase tracking-widest text-[#A39E93] hover:text-[#F5F1EA] transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
          >
            For Builders
          </a>
        </nav>

        {/* Action button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="btn-primary"
          >
            <span>Start Your Design</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle with 44px Touch Target & ARIA attributes */}
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center text-[#F5F1EA] rounded bg-[#24211D] border border-[#F5F1EA]/10 hover:border-[#B5652E] focus-visible:ring-2 focus-visible:ring-[#B5652E]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#1C1A17] border-b border-[#F5F1EA]/10 px-6 py-6 space-y-4">
          <a
            href="#hero-3d"
            onClick={(e) => handleNavClick(e, 'hero-3d')}
            className="block text-sm uppercase tracking-wider text-[#A39E93] hover:text-[#F5F1EA] py-2"
          >
            3D Spatial Lens
          </a>
          <a
            href="#positioning"
            onClick={(e) => handleNavClick(e, 'positioning')}
            className="block text-sm uppercase tracking-wider text-[#A39E93] hover:text-[#F5F1EA] py-2"
          >
            Proof
          </a>
          <a
            href="#process"
            onClick={(e) => handleNavClick(e, 'process')}
            className="block text-sm uppercase tracking-wider text-[#A39E93] hover:text-[#F5F1EA] py-2"
          >
            Process
          </a>
          <a
            href="#estimator"
            onClick={(e) => handleNavClick(e, 'estimator')}
            className="block text-sm uppercase tracking-wider text-[#A39E93] hover:text-[#F5F1EA] py-2"
          >
            Plan Architect
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className="block text-sm uppercase tracking-wider text-[#A39E93] hover:text-[#F5F1EA] py-2"
          >
            Portfolio
          </a>
          <a
            href="#builders"
            onClick={(e) => handleNavClick(e, 'builders')}
            className="block text-sm uppercase tracking-wider text-[#A39E93] hover:text-[#F5F1EA] py-2"
          >
            For Builders
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="btn-primary w-full justify-center mt-4"
          >
            <span>Start Your Design</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
