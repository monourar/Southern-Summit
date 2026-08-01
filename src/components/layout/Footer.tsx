import React from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
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
    scrollToSection(id);
  };

  return (
    <footer className="snap-section-auto bg-[#141210] border-t border-[#F5F1EA]/10 pt-24 pb-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Col with Uploaded Logo Mark */}
          <div className="lg:col-span-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3.5 group text-decoration-none mb-6 focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded p-1"
            >
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

            <p className="text-sm text-[#A39E93] max-w-sm mb-6 leading-relaxed">
              Virtual landscape architecture &amp; 3D spatial design studio engineering custom pool sanctuaries, outdoor kitchens, and master plans for residential estates.
            </p>

            {/* Social Media Link */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61576544911474#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Southern Summit Outdoor on Facebook"
                className="w-10 h-10 rounded-full border border-[#F5F1EA]/15 flex items-center justify-center text-[#A39E93] hover:text-[#F5F1EA] hover:border-[#B5652E] hover:bg-[#B5652E]/10 transition-all focus-visible:ring-2 focus-visible:ring-[#B5652E]"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[#B5652E] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A39E93]">
              <li><a href="#hero-3d" onClick={(e) => handleNavClick(e, 'hero-3d')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">3D Spatial Lens</a></li>
              <li><a href="#positioning" onClick={(e) => handleNavClick(e, 'positioning')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Proof &amp; Transformation</a></li>
              <li><a href="#process" onClick={(e) => handleNavClick(e, 'process')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Design Process</a></li>
              <li><a href="#estimator" onClick={(e) => handleNavClick(e, 'estimator')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Plan Architect Estimator</a></li>
              <li><a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Architectural Portfolio</a></li>
            </ul>
          </div>

          {/* Partnerships Col */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[#B5652E] font-semibold mb-4">
              Partnerships
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A39E93]">
              <li><a href="#builders" onClick={(e) => handleNavClick(e, 'builders')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Custom Home Builders</a></li>
              <li><a href="#builders" onClick={(e) => handleNavClick(e, 'builders')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Luxury Pool Contractors</a></li>
              <li><a href="#builders" onClick={(e) => handleNavClick(e, 'builders')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Architectural Firms</a></li>
              <li><a href="#builders" onClick={(e) => handleNavClick(e, 'builders')} className="hover:text-[#F5F1EA] transition-colors focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded">Developer White-Labeling</a></li>
            </ul>
          </div>

          {/* Authentic Clickable Studio Contact Col */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-[#B5652E] font-semibold mb-4">
              Studio Contact
            </h4>
            <div className="space-y-3.5 text-sm text-[#A39E93]">
              <a
                href="mailto:southernsummitoutdoor@gmail.com"
                className="inline-flex items-center gap-2.5 hover:text-[#F5F1EA] transition-colors group focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded whitespace-nowrap max-w-full"
              >
                <Mail className="w-4 h-4 text-[#B5652E] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="whitespace-nowrap text-xs sm:text-sm">southernsummitoutdoor@gmail.com</span>
              </a>

              <a
                href="tel:8655565065"
                className="flex items-center gap-2.5 hover:text-[#F5F1EA] transition-colors group focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#B5652E] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="whitespace-nowrap">(865) 556-5065</span>
              </a>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#B5652E] flex-shrink-0" />
                <span>Serving Estates Nationwide</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#F5F1EA]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#A39E93]">
          <span>&copy; {new Date().getFullYear()} Southern Summit Outdoor. All rights reserved.</span>
          <span>Crafted with Architectural Precision &amp; 3D Spatial Technology</span>
        </div>
      </div>
    </footer>
  );
};
