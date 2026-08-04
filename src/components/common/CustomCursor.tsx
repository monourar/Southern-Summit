import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = reducedMotionQuery.matches;
    if (prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let isClicking = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, .interactive')) {
        isHovered = true;
      } else {
        isHovered = false;
      }
    };

    const render = () => {
      // Smooth lerp follow
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;

      const size = isHovered ? 56 : 24;
      const scale = isClicking ? 0.85 : 1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - size / 2}px, ${currentY - size / 2}px, 0) scale(${scale})`;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
        cursorRef.current.style.borderColor = isHovered ? '#B5652E' : 'rgba(245, 241, 234, 0.4)';
        cursorRef.current.style.backgroundColor = isHovered ? 'rgba(181, 101, 46, 0.15)' : 'transparent';
        cursorRef.current.style.boxShadow = isHovered ? '0 0 20px rgba(181, 101, 46, 0.35)' : 'none';
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause the loop while the tab is hidden; resume when it becomes visible again
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!reducedMotionQuery.matches) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Stop the loop if reduced motion is enabled mid-session; resume if disabled
    const onReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        cancelAnimationFrame(animationFrameId);
      } else if (!document.hidden) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotionQuery.addEventListener('change', onReducedMotionChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block transition-colors duration-200"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-1 h-1 bg-[#B5652E] rounded-full hidden md:block"
      />
    </>
  );
};
