'use client';

import Link from 'next/link';
import type { ServiceRow } from '@/types/database.types';

const HARDCODED_SESSIONS = [
  {
    slug: 'akashic-records',
    title: 'Akashic Records',
    image_url: '/images/session_akashic.jpg',
    short_description: 'A doorway into the deeper story of your experience. Explore patterns, relationships, recurring themes and questions beneath the surface.',
  },
  {
    slug: 'tarot',
    title: 'Tarot',
    image_url: '/images/session_tarot.jpg',
    short_description: 'The cards don\u2019t decide your story. They help you look at it differently \u2014 an intuitive mirror for decisions and transitions.',
  },
  {
    slug: 'numerology',
    title: 'Numerology',
    image_url: '/images/session_numerology.jpg',
    short_description: 'Numbers carry their own language and symbolism. Explore your personal numbers and cycles to uncover patterns within your journey.',
  },
  {
    slug: 'spiritual-guidance',
    title: 'Spiritual Guidance',
    image_url: '/images/session_guidance.png',
    short_description: 'Sometimes the most powerful shift begins with a conversation. A private, intuitive space to bring your questions and experiences.',
  },
  {
    slug: 'energy-healing',
    title: 'Energy & Healing',
    image_url: '/images/session_energy.jpg',
    short_description: 'A gentle practice for shifting, balancing and reconnecting. Create space to become more aware of your energy and restore balance.',
  },
];

export function SessionsSection({ services }: { services: ServiceRow[] }) {
  // Use DB services if all 5 available, otherwise fallback to exact 5 mock items with matching images
  const items = HARDCODED_SESSIONS.map((def) => {
    const fromDb = services.find((s) => s.slug === def.slug);
    return {
      slug: def.slug,
      title: def.title,
      image_url: def.image_url,
      short_description: def.short_description || fromDb?.short_description,
    };
  });

  return (
    <section id="sessions" className="bg-[#0B0F1E] py-24 px-6 relative border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <p
              className="text-xs tracking-[0.25em] uppercase font-mono font-medium mb-3"
              style={{ color: '#CFA56A' }}
            >
              EXPLORE THE SESSIONS
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.6rem] text-[#F6F3EE] leading-[1.18]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Different Practices. Different Portals.<br className="hidden sm:inline" />
              <span className="text-[#CFA56A] font-light"> One Journey &mdash; You.</span>
            </h2>
            <p className="text-sm sm:text-[14.5px] text-[#BAC2D6] font-light leading-relaxed pt-3">
              There is no single way to explore yourself. Sometimes the cards speak. Sometimes numbers reveal a pattern. Sometimes a conversation opens a door. And sometimes, simply looking at something from a different perspective changes everything. Choose what you&apos;re drawn to. Follow your curiosity. Begin wherever you feel called.
            </p>
          </div>

          <p className="text-xs tracking-[0.2em] uppercase font-mono text-[#CFA56A]/80 flex items-center gap-2">
            <span>✦</span>
            <span>DIFFERENT PORTALS &middot; ONE JOURNEY</span>
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((item) => (
            <div
              key={item.slug}
              className="group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[#CFA56A]/50"
              style={{
                backgroundColor: '#10162B',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Card Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#070A14] relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow space-y-3">
                <h3
                  className="text-lg text-[#F6F3EE] group-hover:text-[#CFA56A] transition-colors"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.title}
                </h3>

                <p className="text-xs text-[#8E9BB5] leading-relaxed flex-grow">
                  {item.short_description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/sessions/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#F6F3EE] group-hover:text-[#CFA56A] transition-colors"
                  >
                    <span>Learn more</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
