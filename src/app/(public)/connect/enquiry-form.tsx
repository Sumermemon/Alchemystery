'use client';

import { Suspense, useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitEnquiry } from './actions';
import { Sparkles, CheckCircle2, Send, ArrowRight, ShieldCheck } from 'lucide-react';

const DEFAULT_SESSION_OPTIONS = [
  'Akashic Records',
  'Tarot',
  'Numerology',
  'Spiritual Guidance',
  'Energy & Healing',
  'General Inquiry / Not Sure Yet',
];

interface EnquiryFormProps {
  availableSessions?: string[];
}

function EnquiryFormInner({ availableSessions = DEFAULT_SESSION_OPTIONS }: EnquiryFormProps) {
  const searchParams = useSearchParams();
  const sessionParam = searchParams.get('session');

  const [selectedSession, setSelectedSession] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-select session from query param if provided
  useEffect(() => {
    if (sessionParam) {
      const match = availableSessions.find(
        (s) => s.toLowerCase() === sessionParam.toLowerCase() ||
               s.toLowerCase().includes(sessionParam.toLowerCase())
      );
      if (match) {
        setSelectedSession(match);
      } else {
        setSelectedSession(sessionParam);
      }
    }
  }, [sessionParam, availableSessions]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get('name') as string) || '';
    const email = (data.get('email') as string) || '';
    const message = (data.get('message') as string) || '';
    const honeypot = (data.get('website') as string) || '';

    if (name.trim().length < 2) {
      setState('error');
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!email.includes('@')) {
      setState('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (message.trim().length < 5) {
      setState('error');
      setErrorMsg('Please write a brief message or question.');
      return;
    }

    startTransition(async () => {
      const result = await submitEnquiry({
        name,
        email,
        session_type: selectedSession || undefined,
        message,
        honeypot,
      });

      if (result.success) {
        setState('success');
        form.reset();
      } else {
        setState('error');
        setErrorMsg(result.error || 'Something went wrong. Please try again.');
      }
    });
  }

  if (state === 'success') {
    return (
      <div
        className="text-center py-12 px-6 rounded-2xl border relative overflow-hidden animate-fadeIn"
        style={{
          borderColor: 'rgba(201, 168, 76, 0.35)',
          backgroundColor: 'rgba(201, 168, 76, 0.05)',
        }}
      >
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center border"
          style={{
            borderColor: 'rgba(201, 168, 76, 0.4)',
            backgroundColor: 'rgba(201, 168, 76, 0.1)',
            boxShadow: '0 0 25px rgba(201, 168, 76, 0.2)',
          }}
        >
          <Sparkles className="w-7 h-7 text-[var(--color-gold)] animate-pulse" />
        </div>

        <h2
          className="text-2xl sm:text-3xl mb-3 text-[var(--color-ivory)]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Your Message Has Been Received
        </h2>

        <p className="text-[var(--color-muted)] text-sm mb-6 leading-relaxed max-w-md mx-auto">
          Thank you for taking this sacred step. Isha will review your thoughts and respond to your email within <strong>2–3 working days</strong> with available scheduling options.
        </p>

        {/* Preparation advice card */}
        <div
          className="max-w-md mx-auto p-4 rounded-xl text-left border mb-8 text-xs leading-relaxed"
          style={{
            backgroundColor: 'rgba(11, 15, 30, 0.6)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 text-[var(--color-gold)] font-medium mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Next Steps & Preparation</span>
          </div>
          <p className="text-[var(--color-muted)]">
            While waiting, feel free to jot down any specific questions or intentions you wish to explore during your consultation. All sessions are held in strict sacred confidence.
          </p>
        </div>

        <button
          onClick={() => setState('idle')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-gold)] hover:underline underline-offset-4 transition-all"
        >
          <span>Send another inquiry</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot anti-spam trap (invisible to human users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-field">Leave this empty</label>
        <input
          type="text"
          id="website-field"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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

      {/* Session type selector */}
      <div className="space-y-2">
        <label
          htmlFor="enquiry-session"
          className="block text-xs tracking-widest uppercase text-[var(--color-muted)]"
        >
          Session of Interest <span className="text-[var(--color-muted)] normal-case tracking-normal">(optional)</span>
        </label>
        <div className="relative">
          <select
            id="enquiry-session"
            name="session_type"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full bg-transparent border-b border-[rgba(255,255,255,0.15)] py-3 text-[var(--color-ivory)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors appearance-none cursor-pointer"
          >
            <option value="" style={{ backgroundColor: '#0b0f1e' }}>Select an offering…</option>
            {availableSessions.map((opt) => (
              <option key={opt} value={opt} style={{ backgroundColor: '#0b0f1e' }}>
                {opt}
              </option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[var(--color-muted)]">
            ▼
          </span>
        </div>
      </div>

      {/* Message input */}
      <div className="space-y-2">
        <label
          htmlFor="enquiry-message"
          className="block text-xs tracking-widest uppercase text-[var(--color-muted)]"
        >
          Your Intentions & Questions <span className="text-[var(--color-gold)]">*</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={5}
          placeholder="Share what brings you here, any questions you carry, or simply say hello…"
          className="w-full bg-transparent border-b border-[rgba(255,255,255,0.15)] py-3 text-[var(--color-ivory)] placeholder-[var(--color-muted)] text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Error alert */}
      {state === 'error' && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300">
          {errorMsg}
        </div>
      )}

      {/* Submit button */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: '0 0 15px rgba(201, 168, 76, 0.1)',
          }}
        >
          {isPending ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Transmitting…
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-[11px] text-[var(--color-muted)] italic">
          All inquiries are received privately and handled with deep care.
        </p>
      </div>
    </form>
  );
}

export function EnquiryForm(props: EnquiryFormProps) {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xs text-[var(--color-muted)]">Loading inquiry portal…</div>}>
      <EnquiryFormInner {...props} />
    </Suspense>
  );
}
