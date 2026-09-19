import type { Metadata } from 'next';
import Link from 'next/link';
import { EnquiryForm } from './enquiry-form';
import { getPublishedServices } from '@/lib/repositories/service.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { siteConfig } from '@/config/site';
import { MessageCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name || siteConfig.name;
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  return {
    title: 'Connect & Inquire',
    description: 'Book a session or reach out to Isha at Alchemystery. Share what is on your mind — a conversation is always welcome.',
    alternates: {
      canonical: `${baseUrl}/connect`,
    },
    openGraph: {
      title: `Connect & Inquire | ${brandName}`,
      description: 'Book a session or reach out to Isha at Alchemystery. Share what is on your mind — a conversation is always welcome.',
      url: `${baseUrl}/connect`,
      siteName: brandName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Connect & Inquire | ${brandName}`,
      description: 'Book a session or reach out to Isha at Alchemystery.',
    },
  };
}

export default async function ConnectPage() {
  const [services, settings] = await Promise.all([
    getPublishedServices(),
    getSiteSettings(),
  ]);

  const availableSessionTitles = services.map((s) => s.title);
  const contactPhone = (settings.contact_phone as string) || '+919876543210';
  const cleanPhone = contactPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Isha, I would like to enquire about a session at Alchemystery.'
  )}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-28 md:py-36 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(61,44,92,0.25) 0%, transparent 100%)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207,165,106,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-6 font-mono">
            Sacred Exchange · Connect
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight text-[var(--color-ivory)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Perhaps This Is Your<br />
            <em className="text-[var(--color-gold)] italic">Time to Pause</em>
          </h1>
          <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Explore a session, ask a question, or simply begin a conversation. Isha personally reviews each inquiry and responds within 2–3 working days.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Sidebar — Context & Direct Booking */}
          <aside className="lg:col-span-2 space-y-8">
            {/* WhatsApp Quick Connect Card */}
            <div
              className="rounded-2xl p-6 border transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] relative overflow-hidden"
              style={{
                backgroundColor: 'rgba(201,168,76,0.04)',
                borderColor: 'rgba(201,168,76,0.2)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-ivory)]">
                    Quick Consultation via WhatsApp
                  </h3>
                  <p className="text-[11px] text-[var(--color-muted)]">Instant scheduling & inquiries</p>
                </div>
              </div>

              <p className="text-xs text-[var(--color-muted)] mb-5 leading-relaxed">
                Prefer direct messaging? Connect directly with Isha on WhatsApp for expedited slot availability.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-medium tracking-wide transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(37, 211, 102, 0.12)',
                  color: '#25D366',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* What to Include */}
            <div className="space-y-4">
              <h2
                className="text-base uppercase tracking-widest text-[var(--color-gold)] font-mono text-xs"
              >
                ✦ What to Include in Your Note
              </h2>
              <ul className="space-y-3 text-[var(--color-muted)] text-xs sm:text-sm leading-relaxed">
                {[
                  'The offering you feel called toward (or choose "Not sure yet")',
                  'What clarity, guidance, or emotional shift you are seeking',
                  'Any specific questions or life transitions you are navigating',
                  'Your general time zone for online appointment coordination',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] text-xs mt-0.5 flex-shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offerings overview */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <h3 className="text-xs uppercase tracking-widest text-[var(--color-ivory)] font-mono">
                Active Offerings
              </h3>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/sessions/${s.slug}`}
                    className="inline-block px-3 py-1 rounded-full text-xs border border-white/10 bg-white/[0.02] text-[var(--color-muted)] hover:text-[var(--color-gold)] hover:border-[rgba(201,168,76,0.3)] transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Reassurance note */}
            <div
              className="text-xs text-[var(--color-muted)] leading-relaxed italic border-l-2 pl-4 py-1"
              style={{ borderColor: 'rgba(207,165,106,0.4)' }}
            >
              &ldquo;All sessions are held in a safe, non-judgmental space online via Zoom or Google Meet. Session recordings are available upon request.&rdquo;
            </div>
          </aside>

          {/* Right Form Container */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8 md:p-12 border relative"
              style={{
                backgroundColor: 'rgba(11, 15, 30, 0.7)',
                borderColor: 'rgba(201, 168, 76, 0.15)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div className="mb-8">
                <span className="text-[11px] text-[var(--color-gold)] uppercase tracking-widest font-mono">
                  Inquiry Portal
                </span>
                <h2
                  className="text-2xl sm:text-3xl text-[var(--color-ivory)] mt-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Send a Message
                </h2>
              </div>

              <EnquiryForm availableSessions={availableSessionTitles} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
