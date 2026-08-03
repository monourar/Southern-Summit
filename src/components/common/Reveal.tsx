import React, { useEffect, useRef, useState } from 'react';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Applies to the outer wrapper element */
  className?: string;
  /** Seconds before the animation starts */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Initial translateY offset in px */
  y?: number;
  /** Initial translateX offset in px */
  x?: number;
  /** IntersectionObserver rootMargin — mirrors framer-motion viewport.margin */
  margin?: string;
  /** 'translate' fades + slides; 'scaleY' grows vertically (timeline line) */
  mode?: 'translate' | 'scaleY' | 'fade';
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Lightweight scroll-reveal. Replaces framer-motion's whileInView with an
 * IntersectionObserver + CSS transition, producing the same fade/slide visuals
 * at ~1.5KB instead of a ~144KB animation library.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  margin = '-50px',
  mode = 'translate',
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  const hidden = mode === 'scaleY' ? { transform: 'scaleY(0)' } : { opacity: 0 };
  const shown =
    mode === 'scaleY'
      ? { transform: 'scaleY(1)' }
      : mode === 'fade'
        ? { opacity: 1 }
        : { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' };

  const initialTransform =
    mode === 'translate' ? `translate3d(${x}px, ${y}px, 0px)` : undefined;

  return (
    <div
      ref={ref}
      className={className}
      {...rest}
      style={{
        ...(mode === 'scaleY' ? { height: '100%', transformOrigin: 'top' } : {}),
        ...hidden,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: mode === 'scaleY' ? 'transform' : 'opacity, transform',
        ...(visible ? shown : initialTransform ? { transform: initialTransform } : {}),
      }}
    >
      {children}
    </div>
  );
};
