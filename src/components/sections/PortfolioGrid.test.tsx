import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { PortfolioGrid } from './PortfolioGrid';

describe('PortfolioGrid', () => {
  beforeEach(() => {
    // jsdom has no layout engine; Element.scrollTo is undefined without a stub.
    // Capture calls so we can assert the carousel resets on filter change.
    Object.defineProperty(window.HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
    if (typeof IntersectionObserver === 'undefined') {
      class IO {
        observe() {} unobserve() {} disconnect() {}
      }
      vi.stubGlobal('IntersectionObserver', IO as unknown as typeof IntersectionObserver);
    }
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window.HTMLElement.prototype as unknown as Record<string, unknown>)['scrollTo'];
  });

  it('resets the carousel scroll position to 0 when the filter changes', () => {
    const { container, getByRole } = render(<PortfolioGrid />);
    const carousel = container.querySelector('.md\\:hidden [class*="snap-x"]') as HTMLElement;
    expect(carousel).not.toBeNull();
    const scrollSpy = window.HTMLElement.prototype.scrollTo as ReturnType<typeof vi.fn>;

    const poolsTab = getByRole('button', { name: 'Custom Pools' });
    fireEvent.click(poolsTab);
    expect(scrollSpy).toHaveBeenCalledWith({ left: 0 });
  });

  it('renders one carousel dot per project in the current filter', () => {
    const { container, getByRole } = render(<PortfolioGrid />);

    const countDots = () =>
      container.querySelectorAll('.md\\:hidden .flex.justify-center.items-center .h-2').length;

    // 3 projects in "All Projects" (the default)
    expect(countDots()).toBe(3);

    fireEvent.click(getByRole('button', { name: 'Custom Pools' }));
    expect(countDots()).toBe(1);

    fireEvent.click(getByRole('button', { name: 'All Projects' }));
    expect(countDots()).toBe(3);
  });
});
