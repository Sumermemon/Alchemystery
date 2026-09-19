import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Book a session or get in touch with Isha at Alchemystery.',
};

/** /connect — Built in Phase 8. Contact/booking functionality. */
export default function ConnectPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">Connect</p>
        <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Perhaps This Is Your Time to Pause
        </h1>
        <p className="text-[var(--color-muted)] mb-4">
          Explore a session, ask a question, or simply begin a conversation.
        </p>
        <p className="text-[var(--color-muted)] text-sm">Phase 8 · Booking/contact form coming soon</p>
      </div>
    </section>
  );
}
