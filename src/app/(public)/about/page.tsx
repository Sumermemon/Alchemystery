import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/repositories/settings.repository';

import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name || siteConfig.name;
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  return {
    title: 'About Isha',
    description: 'Meet Isha — intuitive guide and practitioner at Alchemystery offering one-to-one sessions in Akashic Records, Tarot, Numerology and Spiritual Guidance.',
    alternates: {
      canonical: `${baseUrl}/about`,
    },
    openGraph: {
      title: `About Isha | ${brandName}`,
      description: 'Meet Isha — intuitive guide offering one-to-one sessions in Akashic Records, Tarot, Numerology and Spiritual Guidance.',
      url: `${baseUrl}/about`,
      siteName: brandName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `About Isha | ${brandName}`,
      description: 'Meet Isha — intuitive guide and practitioner at Alchemystery.',
    },
  };
}

const VALUES = [
  {
    icon: '◎',
    title: 'Deep Listening',
    body: 'Every session begins with presence — tuning in without agenda, to what truly matters for you right now.',
  },
  {
    icon: '✦',
    title: 'Genuine Care',
    body: "Isha's work is driven by authentic concern for your wellbeing — not performance, not predictions.",
  },
  {
    icon: '∿',
    title: 'Grounded Wisdom',
    body: 'Years of study across traditions combined with natural intuitive sensitivity, held lightly and offered with humility.',
  },
];

export default async function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-32 pb-0 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(61,44,92,0.2) 0%, transparent 100%)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207,165,106,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-24">
            {/* Left — Text */}
            <div className="space-y-8">
              <div>
                <p className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-4">
                  Meet Isha
                </p>
                <h1
                  className="text-5xl md:text-6xl leading-tight"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  About Isha
                </h1>
              </div>

              <p className="text-[var(--color-muted)] text-lg leading-relaxed">
                Isha is an intuitive guide and energy worker based in India.
                She works with individuals across the world, offering one-to-one sessions
                in Akashic Records, Tarot, Numerology, Spiritual Guidance and Energy Healing.
              </p>

              <blockquote
                className="pl-6 italic text-[var(--color-ivory)] text-xl leading-relaxed"
                style={{
                  borderLeft: '2px solid var(--color-gold)',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                &ldquo;My sessions are not about predictions. They are about perspective.&rdquo;
              </blockquote>

              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/connect"
                  className="inline-block px-8 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300"
                >
                  Book a Session
                </Link>
                <Link
                  href="/sessions"
                  className="inline-block px-8 py-3 border border-[rgba(255,255,255,0.15)] text-[var(--color-muted)] text-xs tracking-[0.2em] uppercase hover:border-[var(--color-ivory)] hover:text-[var(--color-ivory)] transition-all duration-300"
                >
                  View Sessions
                </Link>
              </div>
            </div>

            {/* Right — Isha Portrait */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-80 sm:w-96 h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-[#CFA56A]/30"
              >
                <img 
                  src="/images/isha_portrait.png" 
                  alt="Isha Singasane — Intuitive Guide & Practitioner" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="text-[#F6F3EE] text-xl font-medium" style={{ fontFamily: 'var(--font-serif)' }}>
                    Isha Singasane
                  </p>
                  <span className="text-xs text-[#CFA56A] tracking-[0.2em] uppercase font-mono">
                    Founder & Spiritual Practitioner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(207,165,106,0.3), transparent)' }}
        />
      </div>

      {/* Values / Approach */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-4">
            Her Approach
          </p>
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            What Guides Her Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="text-center p-8 rounded-xl border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="text-3xl mb-5"
                style={{ color: 'var(--color-gold)' }}
              >
                {v.icon}
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
              >
                {v.title}
              </h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>

        {/* Long bio */}
        <div className="max-w-3xl mx-auto space-y-6 text-[var(--color-muted)] leading-relaxed">
          <p>
            Isha's work is grounded in deep listening and genuine care. She creates a space
            where you can feel safe to explore, reflect and reconnect with the wisdom
            already present within you.
          </p>
          <p>
            Her approach draws from years of personal study and practice across multiple
            traditions, combined with a natural intuitive sensitivity that clients often
            describe as calming and clarifying.
          </p>
          <p>
            Sessions are conducted online and are available worldwide. Isha works with a
            small number of clients at any time to ensure each session receives her full
            presence and attention.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background: 'linear-gradient(0deg, rgba(61,44,92,0.15) 0%, transparent 100%)',
        }}
      >
        <p className="text-[var(--color-muted)] mb-8 max-w-md mx-auto">
          If you feel drawn to Isha&apos;s work, you are warmly invited to reach out.
        </p>
        <Link
          href="/connect"
          className="inline-block px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300"
        >
          Begin a Conversation
        </Link>
      </section>
    </div>
  );
}
