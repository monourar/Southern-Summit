import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  heightClass?: string;
  accentColor?: string;
  ariaLabel?: string;
  /** Hide corner text labels on mobile (<640px) — keeps drag handle visible */
  hideLabelsOnMobile?: boolean;
  /** Optional base names of the optimized image variants in /images (e.g. "hero_cad_blueprint").
      When provided, the slider renders picture with WebP srcset + resized JPEG fallback
      instead of a single full-resolution image. */
  beforeBase?: string;
  afterBase?: string;
  /** Sizes hint passed to the img/source elements */
  sizes?: string;
  /** LCP image hint — passed through to the before/after img */
  beforeFetchPriority?: 'high' | 'low' | 'auto';
  beforeLoading?: 'eager' | 'lazy';
}

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  heightClass = 'h-[480px]',
  accentColor = '#B5652E',
  ariaLabel = 'Before and after image comparison slider',
  hideLabelsOnMobile = false,
  beforeBase,
  afterBase,
  sizes = '(min-width: 768px) 1200px, 100vw',
  beforeFetchPriority = 'auto',
  beforeLoading = 'eager',
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(pos);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture lost
    }
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(prev + 5, 100));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  // Hide labels when slider handle overlaps them
  const showLeftLabel = sliderPos > 18;
  const showRightLabel = sliderPos < 82;

  // Label visibility class — hidden on mobile when hideLabelsOnMobile is set
  const labelHideClass = hideLabelsOnMobile ? 'hidden sm:block' : '';

  // WCAG AA badge colors: the cyan accent keeps its cyan fill but gets
  // near-black text (#1C1A17 on #38BDF8 = 8.10:1); the bronze accent gets the
  // accessible fill #A05A28 with light text (4.68:1) instead of #B5652E (3.83:1).
  const cyanAccent = accentColor === '#38BDF8';
  const badgeBg = cyanAccent ? '#38BDF8' : '#A05A28';
  const badgeText = cyanAccent ? '#1C1A17' : '#F5F1EA';

  const srcSet = (base: string, widths: number[]) =>
    widths.map((w) => `/images/${base}-${w}.webp ${w}w`).join(', ');
  const fallback = (base: string, width: number) => `/images/${base}-${width}.jpg`;
  const beforeWidths = beforeBase ? (beforeBase === 'before_backyard' ? [512, 768, 1280] : [512, 768, 1376]) : [];
  const afterWidths = afterBase ? (afterBase === 'after_backyard' ? [512, 768, 1280] : [512, 768, 1376]) : [];
  const beforeIntrinsic = beforeBase === 'before_backyard' ? { width: 1280, height: 714 } : { width: 1376, height: 768 };
  const afterIntrinsic = afterBase === 'after_backyard' ? { width: 1280, height: 714 } : { width: 1376, height: 768 };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden shadow-2xl select-none cursor-ew-resize focus-visible:ring-2 focus-visible:ring-[#B5652E] focus-visible:outline-none border border-[#F5F1EA]/15`}
    >
      {/* Right Side Base Layer (Visible from sliderPos% to 100%) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`
        }}
      >
        {beforeBase ? (
          <picture>
            <source srcSet={srcSet(beforeBase, beforeWidths)} type="image/webp" sizes={sizes} />
            <source srcSet={fallback(beforeBase, beforeIntrinsic.width)} type="image/jpeg" sizes={sizes} />
            <img
              src={fallback(beforeBase, beforeIntrinsic.width)}
              alt={beforeLabel}
              width={beforeIntrinsic.width}
              height={beforeIntrinsic.height}
              fetchPriority={beforeFetchPriority}
              loading={beforeLoading}
              className="w-full h-full object-cover pointer-events-none"
            />
          </picture>
        ) : (
          <img
            src={beforeImage}
            alt={beforeLabel}
            fetchPriority={beforeFetchPriority}
            loading={beforeLoading}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}
        {beforeLabel && showRightLabel && (
          <span className={`absolute top-4 right-4 z-20 bg-[#1C1A17]/90 backdrop-blur-md px-3.5 py-1.5 rounded text-[10px] uppercase tracking-widest text-[#F5F1EA] font-semibold border border-[#F5F1EA]/10 pointer-events-none transition-opacity duration-200 ${labelHideClass}`}>
            {beforeLabel}
          </span>
        )}
      </div>

      {/* Left Side Foreground Layer (Visible from 0 to sliderPos%) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
        }}
      >
        {afterBase ? (
          <picture>
            <source srcSet={srcSet(afterBase, afterWidths)} type="image/webp" sizes={sizes} />
            <source srcSet={fallback(afterBase, afterIntrinsic.width)} type="image/jpeg" sizes={sizes} />
            <img
              src={fallback(afterBase, afterIntrinsic.width)}
              alt={afterLabel}
              width={afterIntrinsic.width}
              height={afterIntrinsic.height}
              className="w-full h-full object-cover pointer-events-none"
            />
          </picture>
        ) : (
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}
        {afterLabel && showLeftLabel && (
          <span
            className={`absolute top-4 left-4 z-20 backdrop-blur-md px-3.5 py-1.5 rounded text-[10px] uppercase tracking-widest font-semibold shadow-lg pointer-events-none transition-opacity duration-200 ${labelHideClass}`}
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            {afterLabel}
          </span>
        )}
      </div>

      {/* Splitter Line */}
      <div
        className="absolute top-0 bottom-0 z-30 w-[2px] pointer-events-none transition-shadow"
        style={{
          left: `${sliderPos}%`,
          backgroundColor: accentColor,
          boxShadow: `0 0 12px ${accentColor}`
        }}
      />

      {/* Drag Handle — 48px on mobile (comfortable touch target), 44px on desktop.
          This is the only interactive element that needs to remain visible
          on mobile — labels are stripped, handle stays prominent. */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-white text-[#1C1A17] shadow-2xl border-2 flex items-center justify-center pointer-events-none z-40 transition-transform duration-200 ${
          isDragging ? 'scale-110 shadow-[0_0_25px_rgba(255,255,255,0.7)]' : 'hover:scale-105'
        }`}
        style={{ left: `${sliderPos}%`, borderColor: accentColor }}
      >
        <div className="flex items-center -space-x-1">
          <ChevronLeft className="w-4 h-4 text-[#1C1A17]" />
          <ChevronRight className="w-4 h-4 text-[#1C1A17]" />
        </div>
      </div>
    </div>
  );
};
