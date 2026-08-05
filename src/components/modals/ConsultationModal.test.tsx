import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { ConsultationModal } from './ConsultationModal';

const onClose = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  onClose.mockClear();
});

function openModal(): RenderResult {
  return render(<ConsultationModal isOpen onClose={onClose} />);
}

function submitForm(name: string, email: string) {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: email } });
  fireEvent.submit(screen.getByRole('button', { name: /submit 3d proposal request/i }).closest('form')!);
}

describe('ConsultationModal', () => {
  it('opens the mail client and shows the success view on submit', () => {
    const openMock = vi.fn().mockReturnValue(null);
    vi.stubGlobal('open', openMock);
    openModal();

    submitForm('Test Name', 'test@example.com');

    const url = openMock.mock.calls[0]?.[0];
    expect(url).toMatch(/^mailto:southernsummitoutdoor@gmail\.com\?subject=/);
    expect(url).toContain(encodeURIComponent('Test Name'));
    expect(url).toContain(encodeURIComponent('test@example.com'));
    expect(openMock).toHaveBeenCalledWith(url, '_self');
    expect(screen.getByText(/your 3d master plan request is ready/i)).toBeInTheDocument();
  });

  it('resets the form and success state when reopened', () => {
    vi.stubGlobal('open', vi.fn().mockReturnValue(null));
    const { rerender } = openModal();
    submitForm('Test Name', 'test@example.com');
    expect(screen.getByText(/your 3d master plan request is ready/i)).toBeInTheDocument();

    rerender(<ConsultationModal isOpen={false} onClose={onClose} />);
    rerender(<ConsultationModal isOpen onClose={onClose} />);

    expect(screen.getByText(/start your 3d master plan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
  });

  it('renders the fallback block with the studio email and a working copy button when no mail client opens', () => {
    vi.stubGlobal('open', vi.fn().mockReturnValue(null));
    vi.spyOn(document, 'hasFocus').mockImplementation(() => true);
    const clipboardWrite = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: clipboardWrite },
    });
    openModal();

    submitForm('Test Name', 'test@example.com');

    expect(screen.queryByText(/no email app opened automatically/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1201);
    });

    expect(screen.getByText(/no email app opened automatically/i)).toBeInTheDocument();
    const emailLink = screen.getByRole('link', { name: /southernsummitoutdoor@gmail\.com/i });
    expect(emailLink).toHaveAttribute('href', expect.stringMatching(/^mailto:southernsummitoutdoor@gmail\.com\?subject=/));
    expect(emailLink).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('Test Name')));

    fireEvent.click(screen.getByRole('button', { name: /copy the studio email instead/i }));
    expect(clipboardWrite).toHaveBeenCalledWith('southernsummitoutdoor@gmail.com');
  });

  it('traps Tab navigation inside the modal: Tab from last focusable wraps to first, Shift+Tab from first wraps to last', () => {
    vi.stubGlobal('open', vi.fn().mockReturnValue(null));
    const { container } = openModal();
    const dialog = screen.getByRole('dialog');

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.getAttribute('tabindex') !== '-1');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    expect(first).toBeDefined();
    expect(last).toBeDefined();

    // Tab from last → wraps to first
    last.focus();
    fireEvent.keyDown(container.firstChild as Element, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    // Shift+Tab from first → wraps to last
    first.focus();
    fireEvent.keyDown(container.firstChild as Element, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('does not move focus when the modal is closed', () => {
    vi.stubGlobal('open', vi.fn().mockReturnValue(null));
    render(<ConsultationModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(document.activeElement).toBe(document.body);
  });
});
