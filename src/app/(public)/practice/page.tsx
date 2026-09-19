import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedServices } from '@/lib/repositories/service.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';

import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name || siteConfig.name;
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  return {
    title: 'The Practice',
    description: 'Explore the spiritual modalities offered at Alchemystery — Akashic Records, Tarot, Numerology, Energy Healing and spiritual guidance.',
    alternates: {
      canonical: `${baseUrl}/practice`,
    },
    openGraph: {
      title: `The Practice · Sacred Modalities | ${brandName}`,
      description: 'Explore the spiritual modalities offered at Alchemystery — Akashic Records, Tarot, Numerology, Energy Healing and spiritual guidance.',
      url: `${baseUrl}/practice`,
      siteName: brandName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `The Practice | ${brandName}`,
      description: 'Sacred modalities for intuitive exploration and spiritual self-discovery.',
    },
  };
}

const ICONS: Record<string, string> = {
  'akashic-records': '✦',
  'tarot': '◈',
  'numerology': '∞',
  'spiritual-guidance': '◉',
  'energy-healing': '❋',
};

export default async function PracticePage() {
  const [services, settings] = await Promise.all([
    getPublishedServices(),
    getSiteSettings(),
  ]);

  const brandName = settings.brand_name || 'Alchemystery';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-32 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(61,44,92,0.2) 0%, transparent 100%)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207,165,106,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-6">
            The Practice
          </p>
          <h1
            className="text-5xl md:text-6xl mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            A Space for Your<br />
            <em>Inner Truth</em>
          </h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl mx-auto">
            {brandName} is a quiet, dedicated practice for those seeking clarity, direction
            and a deeper connection to themselves. Through established spiritual modalities,
            Isha offers one-to-one sessions designed to meet you exactly where you are.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div
          className="rounded-2xl p-8 md:p-12 border mb-24"
          style={{
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '◎',
                title: 'Calm Space',
                body: 'Each session is held in a calm, non-judgmental environment — online, from wherever you are in the world.',
              },
              {
                icon: '◈',
                title: 'Guided by You',
                body: 'The session follows what is most alive for you at this time — a specific question, or simply an open conversation.',
              },
              {
                icon: '∿',
                title: '60 Minutes',
                body: 'Sessions are approximately 60 minutes. Recordings are available on request.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-3">
                <div
                  className="text-3xl mb-4"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-lg"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
                >
                  {item.title}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions grid */}
        <div className="mb-16">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-4 text-center">
            The Modalities
          </p>
          <h2
            className="text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Sessions Offered
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/sessions/${service.slug}`}
                className="group block rounded-xl border p-6 transition-all duration-300 hover:border-[rgba(207,165,106,0.4)] hover:bg-[rgba(207,165,106,0.03)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {ICONS[service.slug] || '✦'}
                </div>
                <h3
                  className="text-xl mb-2 group-hover:text-[var(--color-gold)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
                >
                  {service.title}
                </h3>
                {service.short_description && (
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">
                    {service.short_description}
                  </p>
                )}
                <span className="text-xs text-[var(--color-gold)] tracking-widest uppercase group-hover:gap-2 transition-all">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/connect"
            className="inline-block px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
}
