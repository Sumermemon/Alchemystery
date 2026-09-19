import type { Metadata } from 'next';
import { EnquiryForm } from './enquiry-form';

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Book a session or reach out to Isha at Alchemystery. Share what is on your mind — a conversation is always welcome.',
};

export default function ConnectPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-32 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(61,44,92,0.25) 0%, transparent 100%)',
        }}
      >
        {/* Decorative orb */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207,165,106,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p
            className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-6"
          >
            Connect
          </p>
          <h1
            className="text-5xl md:text-6xl mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Perhaps This Is Your<br />
            <em>Time to Pause</em>
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            Explore a session, ask a question, or simply begin a conversation.
            <br />
            Isha will respond within 2–3 working days.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left — info */}
          <aside className="lg:col-span-2 space-y-10">
            {/* What to include */}
            <div>
              <h2
                className="text-lg mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
              >
                What to Include
              </h2>
              <ul className="space-y-3 text-[var(--color-muted)] text-sm leading-relaxed">
                {[
                  'The type of session you are drawn to',
                  'What you are seeking — clarity, guidance, or simply an open conversation',
                  'Any specific questions you have in mind',
                  'Your time zone, for scheduling purposes',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[var(--color-gold)] mt-0.5 flex-shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }}
            />

            {/* Sessions overview */}
            <div>
              <h2
                className="text-lg mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
              >
                Available Sessions
              </h2>
              <ul className="space-y-2 text-[var(--color-muted)] text-sm">
                {[
                  'Akashic Records',
                  'Tarot',
                  'Numerology',
                  'Spiritual Guidance',
                  'Energy & Healing',
                ].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href="/sessions"
                className="inline-block mt-4 text-xs text-[var(--color-gold)] tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                View all sessions →
              </a>
            </div>

            {/* Note */}
            <p
              className="text-xs text-[var(--color-muted)] leading-relaxed italic border-l-2 pl-4"
              style={{ borderColor: 'rgba(207,165,106,0.3)' }}
            >
              &ldquo;All sessions are conducted online. Recordings are available on request.&rdquo;
            </p>
          </aside>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8 md:p-12 border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <h2
                className="text-2xl mb-8"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
              >
                Send a Message
              </h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
