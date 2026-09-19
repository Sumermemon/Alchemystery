'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image — exact user asset */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.png"
          alt="Alchemystery Celestial Night Sky and Amethyst Crystals"
          className="w-full h-full object-cover object-center lg:object-right"
        />
        {/* Soft gradient veil on left to guarantee text contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(11,15,30,0.92) 0%, rgba(11,15,30,0.75) 45%, rgba(11,15,30,0.2) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — Headings & Actions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Subtitle tag */}
          <p
            className="text-xs tracking-[0.28em] uppercase font-mono font-medium"
            style={{ color: '#CFA56A' }}
          >
            CLARITY &middot; HEALING &middot; ALIGNMENT
          </p>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] text-[#F6F3EE] leading-[1.08] tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            A Space for<br />
            Your Inner Truth
          </h1>

          {/* Descriptive copy */}
          <p className="text-base sm:text-lg md:text-xl text-[#BAC2D6] max-w-xl font-light leading-relaxed">
            Alchemystery brings together intuitive and spiritual practices to help you explore life&apos;s questions with greater awareness and perspective.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 pt-2">
            <Link
              href="/sessions"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded text-xs font-semibold tracking-[0.16em] uppercase text-[#0B0F1E] transition-all duration-300 hover:brightness-110 shadow-lg"
              style={{ backgroundColor: '#CFA56A' }}
            >
              <span>Explore Sessions</span>
              <span className="text-sm">→</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded text-xs font-medium tracking-[0.16em] uppercase text-[#F6F3EE] border transition-all duration-300 hover:bg-white/[0.06]"
              style={{
                borderColor: 'rgba(207, 165, 106, 0.6)',
              }}
            >
              Meet Isha
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#8E9BB5] pt-2 font-mono flex items-center gap-2">
            <span style={{ color: '#CFA56A' }}>✦</span>
            <span>ONLINE SESSIONS &middot; BY APPOINTMENT</span>
          </p>
        </div>

        {/* Right Column — Vertical Typography Accent (Matches Mockup) */}
        <div className="hidden lg:flex lg:col-span-4 justify-end items-center pr-4">
          <div className="flex flex-col items-end gap-2 text-right">
            <div
              className="text-xs tracking-[0.35em] uppercase leading-loose font-mono flex flex-col gap-1.5"
              style={{ color: '#CFA56A' }}
            >
              <span>YOUR</span>
              <span>JOURNEY</span>
              <span>YOUR</span>
              <span>TRUTH</span>
            </div>
            <div
              className="w-10 h-[1.5px] mt-4"
              style={{ backgroundColor: '#CFA56A' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
