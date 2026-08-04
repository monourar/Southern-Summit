import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { CustomCursor } from './CustomCursor';

type ChangeHandler = () => void;

interface MediaQueryMock {
  matches: boolean;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
}

function makeMediaQueryMock(matches: boolean): MediaQueryMock {
  return {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

function stubAnimationFrame(): {
  rAF: ReturnType<typeof vi.fn>;
  cAF: ReturnType<typeof vi.fn>;
} {
  const rAF = vi.fn().mockReturnValue(42);
  const cAF = vi.fn();
  vi.stubGlobal('requestAnimationFrame', rAF);
  vi.stubGlobal('cancelAnimationFrame', cAF);
  return { rAF, cAF };
}

function stubHidden(hidden: boolean): void {
  Object.defineProperty(window.document.constructor.prototype as unknown as object, 'hidden', {
    configurable: true,
    get: () => hidden,
  });
}

describe('CustomCursor', () => {
  beforeEach(() => {
    stubHidden(false);
    vi.stubGlobal('matchMedia', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('does not start the rAF loop when reduced motion is preferred', () => {
    (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      makeMediaQueryMock(true)
    );
    const { rAF, cAF } = stubAnimationFrame();

    const { container } = render(<CustomCursor />);

    expect(container.querySelectorAll('div')).toHaveLength(2);
    expect(rAF).not.toHaveBeenCalled();
    expect(cAF).not.toHaveBeenCalled();
  });

  it('cancels the rAF loop when the tab becomes hidden and resumes when visible', () => {
    (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      makeMediaQueryMock(false)
    );
    const { rAF, cAF } = stubAnimationFrame();

    render(<CustomCursor />);
    expect(rAF).toHaveBeenCalledTimes(1);

    stubHidden(true);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(cAF).toHaveBeenCalledWith(42);

    stubHidden(false);
    document.dispatchEvent(new Event('visibilitychange'));
    expect(rAF).toHaveBeenCalledTimes(2);
  });

  it('stops the loop when reduced motion is enabled mid-session', () => {
    const media = makeMediaQueryMock(false);
    (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(media);
    const { rAF, cAF } = stubAnimationFrame();

    render(<CustomCursor />);
    expect(rAF).toHaveBeenCalledTimes(1);

    media.matches = true;
    const changeHandler = media.addEventListener.mock.calls.find((c) => c[0] === 'change')?.[1] as ChangeHandler;
    changeHandler();
    expect(cAF).toHaveBeenCalledWith(42);
  });

  it('removes every listener and cancels the frame on unmount', () => {
    const media = makeMediaQueryMock(false);
    (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue(media);
    const { rAF, cAF } = stubAnimationFrame();

    const windowRemove = vi.spyOn(window, 'removeEventListener');
    const documentRemove = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(<CustomCursor />);
    expect(rAF).toHaveBeenCalledTimes(1);

    unmount();

    for (const event of ['mousemove', 'mousedown', 'mouseup', 'mouseover']) {
      expect(windowRemove).toHaveBeenCalledWith(event, expect.any(Function));
    }
    expect(documentRemove).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(media.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    expect(cAF).toHaveBeenCalledWith(42);
  });
});
