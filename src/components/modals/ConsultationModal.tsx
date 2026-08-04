import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, Calendar, FileText } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [mailtoFailed, setMailtoFailed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'master-plan',
    budget: '$75k-$150k',
    notes: ''
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset the form on open; focus modal container and restore focus to the trigger on close
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setMailtoFailed(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'master-plan',
      budget: '$75k-$150k',
      notes: ''
    });
    const previousFocus = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    return () => {
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  // Trap Tab navigation inside the modal while it is open
  const handleTabTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  const subject = encodeURIComponent(`New 3D Master Plan Request — ${formData.name}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nPrimary Focus: ${formData.projectType}\nEst. Build Budget: ${formData.budget}\n\nProject Notes:\n${formData.notes || 'Not provided'}`
  );
  const mailtoUrl = `mailto:southernsummitoutdoor@gmail.com?subject=${subject}&body=${body}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(mailtoUrl, '_self');
    setSubmitted(true);

    // Heuristic: if the window never loses focus, assume no mail client handled it.
    const timer = window.setTimeout(() => {
      window.removeEventListener('blur', onBlur);
      if (document.hasFocus()) {
        setMailtoFailed(true);
      }
    }, 1200);
    const onBlur = () => {
      window.removeEventListener('blur', onBlur);
      clearTimeout(timer);
    };
    window.addEventListener('blur', onBlur);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/85 backdrop-blur-md overflow-y-auto"
      onKeyDown={handleTabTrap}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-xl bg-[#24211D] border border-[#F5F1EA]/15 rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto focus:outline-none"
      >
        {/* Close Button with 44px Touch Target & ARIA label */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close consultation modal"
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#1C1A17] border border-[#F5F1EA]/10 flex items-center justify-center text-[#A39E93] hover:text-[#F5F1EA] hover:border-[#B5652E] transition-all focus-visible:ring-2 focus-visible:ring-[#B5652E]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#B5652E]/20 border border-[#B5652E] flex items-center justify-center mx-auto text-[#B5652E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="eyebrow">Request Prepared</span>
              <h3 id="modal-title" className="font-serif text-3xl text-[#F5F1EA] mb-3">
                Your 3D Master Plan Request Is Ready
              </h3>
              <p className="text-sm text-[#A39E93] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#F5F1EA]">{formData.name}</strong>. Your email client has opened with the request pre-filled — press send and our senior spatial landscape architect will review your estate specifications.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1C1A17] border border-[#F5F1EA]/10 text-left space-y-2 text-xs text-[#A39E93]">
              <div className="flex justify-between">
                <span>Selected Focus:</span>
                <span className="text-[#F5F1EA] font-semibold uppercase">{formData.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span>Target Build Budget:</span>
                <span className="text-[#D8A370] font-semibold">{formData.budget}</span>
              </div>
            </div>

            {mailtoFailed && (
              <div className="p-4 rounded-xl bg-[#1C1A17] border border-[#B5652E]/40 text-left space-y-3 text-xs text-[#A39E93]">
                <p className="text-[#F5F1EA] font-semibold">No email app opened automatically?</p>
                <p>
                  Send your request manually to {' '}
                  <a
                    href={mailtoUrl}
                    className="text-[#D8A370] underline focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
                  >
                    southernsummitoutdoor@gmail.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('southernsummitoutdoor@gmail.com');
                  }}
                  className="text-[#D8A370] underline focus-visible:ring-2 focus-visible:ring-[#B5652E] rounded"
                >
                  Copy the studio email instead
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`mailto:southernsummitoutdoor@gmail.com?subject=${encodeURIComponent(`Priority Video Call Booking — ${formData.name}`)}`}
                className="btn-primary flex-1 justify-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Priority Video Call</span>
              </a>
              <button
                onClick={handleResetAndClose}
                className="btn-outline flex-1 justify-center"
              >
                <FileText className="w-4 h-4" />
                <span>Return to Studio</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="eyebrow">Virtual Design Consultation</span>
            <h3 id="modal-title" className="font-serif text-3xl text-[#F5F1EA] mb-2">
              Start Your 3D Master Plan
            </h3>
            <p className="text-xs text-[#A39E93] mb-6">
              Fill in your estate details below to receive a custom 3D CAD design proposal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input-name" className="block text-xs uppercase tracking-wider text-[#A39E93] mb-1 font-medium">
                  Full Name <span className="text-[#D8A370]">*</span>
                </label>
                <input
                  id="input-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alexander Sterling"
                  className="w-full bg-[#1C1A17] border border-[#F5F1EA]/10 rounded-lg px-4 py-3 text-sm text-[#F5F1EA] focus:outline-none focus:border-[#B5652E] focus:ring-1 focus:ring-[#B5652E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-email" className="block text-xs uppercase tracking-wider text-[#A39E93] mb-1 font-medium">
                    Email Address <span className="text-[#D8A370]">*</span>
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-[#1C1A17] border border-[#F5F1EA]/10 rounded-lg px-4 py-3 text-sm text-[#F5F1EA] focus:outline-none focus:border-[#B5652E] focus:ring-1 focus:ring-[#B5652E]"
                  />
                </div>
                <div>
                  <label htmlFor="input-phone" className="block text-xs uppercase tracking-wider text-[#A39E93] mb-1 font-medium">
                    Phone Number
                  </label>
                  <input
                    id="input-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 019-2834"
                    className="w-full bg-[#1C1A17] border border-[#F5F1EA]/10 rounded-lg px-4 py-3 text-sm text-[#F5F1EA] focus:outline-none focus:border-[#B5652E] focus:ring-1 focus:ring-[#B5652E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="input-projectType" className="block text-xs uppercase tracking-wider text-[#A39E93] mb-1 font-medium">
                    Primary Focus
                  </label>
                  <select
                    id="input-projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#1C1A17] border border-[#F5F1EA]/10 rounded-lg px-4 py-3 text-sm text-[#F5F1EA] focus:outline-none focus:border-[#B5652E] focus:ring-1 focus:ring-[#B5652E]"
                  >
                    <option value="master-plan">Full Estate Master Plan</option>
                    <option value="pool-spa">Custom Pool & Spa Sanctuary</option>
                    <option value="outdoor-kitchen">Outdoor Culinary Kitchen</option>
                    <option value="builder">Builder Partnership Track</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="input-budget" className="block text-xs uppercase tracking-wider text-[#A39E93] mb-1 font-medium">
                    Est. Build Budget
                  </label>
                  <select
                    id="input-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#1C1A17] border border-[#F5F1EA]/10 rounded-lg px-4 py-3 text-sm text-[#F5F1EA] focus:outline-none focus:border-[#B5652E] focus:ring-1 focus:ring-[#B5652E]"
                  >
                    <option value="$40k-$75k">$40k – $75k</option>
                    <option value="$75k-$150k">$75k – $150k</option>
                    <option value="$150k+">$150k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="input-notes" className="block text-xs uppercase tracking-wider text-[#A39E93] mb-1 font-medium">
                  Project Notes & Lot Features
                </label>
                <textarea
                  id="input-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your yard elevation, pool goals, or timeline..."
                  className="w-full bg-[#1C1A17] border border-[#F5F1EA]/10 rounded-lg px-4 py-3 text-sm text-[#F5F1EA] focus:outline-none focus:border-[#B5652E] focus:ring-1 focus:ring-[#B5652E]"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center mt-6">
                <span>Submit 3D Proposal Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
