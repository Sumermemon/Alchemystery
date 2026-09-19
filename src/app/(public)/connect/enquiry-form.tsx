'use client';

import { useState, useTransition } from 'react';
import { submitEnquiry } from './actions';

const SESSION_OPTIONS = [
  'Akashic Records',
  'Tarot',
  'Numerology',
  'Spiritual Guidance',
  'Energy & Healing',
  'Not sure yet',
];

export function EnquiryForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await submitEnquiry({
        name: data.get('name') as string,
        email: data.get('email') as string,
        session_type: data.get('session_type') as string || undefined,
        message: data.get('message') as string,
      });

      if (result.success) {
        setState('success');
        form.reset();
      } else {
        setState('error');
        setErrorMsg(result.error || 'Something went wrong.');
      }
    });
  }

  if (state === 'success') {
    return (
      <div
        className="text-center py-16 px-8 rounded-2xl border"
        style={{ borderColor: 'rgba(207,165,106,0.3)', backgroundColor: 'rgba(207,165,106,0.05)' }}
      >
        <div className="text-4xl mb-6">✦</div>
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
          Thank You
        </h2>
        <p className="text-[var(--color-muted)] mb-8 leading-relaxed max-w-md mx-auto">
          Your message has been received. Isha will be in touch with you within 2–3 working days.
        </p>
        <button
          onClick={() => setState('idle')}
          className="text-sm text-[var(--color-gold)] underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="enquiry-name"
            className="block text-xs tracking-widest uppercase text-[var(--color-muted)]"
          >
            Your Name <span className="text-[var(--color-gold)]">*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="How shall we address you?"
            className="w-full bg-transparent border-b border-[rgba(255,255,255,0.15)] py-3 text-[var(--color-ivory)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="enquiry-email"
            className="block text-xs tracking-widest uppercase text-[var(--color-muted)]"
          >
            Email Address <span className="text-[var(--color-gold)]">*</span>
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            className="w-full bg-transparent border-b border-[rgba(255,255,255,0.15)] py-3 text-[var(--color-ivory)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
          />
        </div>
      </div>

      {/* Session type */}
      <div className="space-y-2">
        <label
          htmlFor="enquiry-session"
          className="block text-xs tracking-widest uppercase text-[var(--color-muted)]"
        >
          Session Type <span className="text-[var(--color-muted)] normal-case tracking-normal">(optional)</span>
        </label>
        <select
          id="enquiry-session"
          name="session_type"
          className="w-full bg-transparent border-b border-[rgba(255,255,255,0.15)] py-3 text-[var(--color-ivory)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors appearance-none cursor-pointer"
          style={{ backgroundColor: 'transparent' }}
          defaultValue=""
        >
          <option value="" style={{ backgroundColor: '#0b0f1e' }}>Select a session type…</option>
          {SESSION_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ backgroundColor: '#0b0f1e' }}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="enquiry-message"
          className="block text-xs tracking-widest uppercase text-[var(--color-muted)]"
        >
          Your Message <span className="text-[var(--color-gold)]">*</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={5}
          placeholder="Share what's on your mind, or simply say hello…"
          className="w-full bg-transparent border-b border-[rgba(255,255,255,0.15)] py-3 text-[var(--color-ivory)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {state === 'error' && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="group relative inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <span className="text-base">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
