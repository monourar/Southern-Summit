import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ImageComparisonSlider } from './ImageComparisonSlider';

const baseProps = {
  beforeImage: '/images/hero_cad_blueprint-1376.jpg',
  afterImage: '/images/hero_backyard_night-1376.jpg',
};

describe('ImageComparisonSlider', () => {
  it('exposes a keyboard-operable slider with the WAI slider semantics', () => {
    const { container } = render(<ImageComparisonSlider {...baseProps} />);
    const slider = container.querySelector('[role="slider"]');
    expect(slider).not.toBeNull();
    expect(slider).toHaveAttribute('tabindex', '0');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(Number(slider?.getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(0);
    expect(Number(slider?.getAttribute('aria-valuenow'))).toBeLessThanOrEqual(100);
  });

  it('Home jumps to 0 and End jumps to 100, each around the default 50', () => {
    const { container } = render(<ImageComparisonSlider {...baseProps} />);
    const slider = container.querySelector('[role="slider"]') as HTMLElement;

    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider.getAttribute('aria-valuenow')).toBe('100');

    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider.getAttribute('aria-valuenow')).toBe('0');
  });

  it('ArrowRight/ArrowLeft step by 5 and clamp at both ends', () => {
    const { container } = render(<ImageComparisonSlider {...baseProps} />);
    const slider = container.querySelector('[role="slider"]') as HTMLElement;
    const start = Number(slider.getAttribute('aria-valuenow'));

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe(String(start + 5));

    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider.getAttribute('aria-valuenow')).toBe(String(start - 5));

    fireEvent.keyDown(slider, { key: 'Home' });
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, { key: 'End' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('100');
  });

  it('falls back to the provided beforeImage/afterImage when no base slugs are given', () => {
    const { container } = render(<ImageComparisonSlider {...baseProps} />);
    const imgs = Array.from(container.querySelectorAll('img'));
    const srcs = imgs.map((i) => i.getAttribute('src'));
    expect(srcs).toContain(baseProps.beforeImage);
    expect(srcs).toContain(baseProps.afterImage);
    // No <picture> wrapper should appear on the fallback path
    expect(container.querySelector('picture')).toBeNull();
  });
});
