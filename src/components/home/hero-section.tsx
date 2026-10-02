'use client';

import Link from 'next/link';
import { CelestialParticles } from '@/components/ui/celestial-particles';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#070A14]">
      {/* 4K High-Definition Background Image with responsive WebP sources */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/hero_bg_4k.webp" media="(min-width: 1536px)" type="image/webp" />
          <source srcSet="/images/hero_bg.webp" type="image/webp" />
          <img
            src="/images/hero_bg.png"
            alt="Alchemystery Celestial Night Sky with Full Moon and Amethyst Crystals in 4K"
            className="w-full h-full object-cover object-center lg:object-right select-none pointer-events-none"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Ambient Amethyst Crystal Glow Pulse */}
        <div
          className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none animate-crystal-breath"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(207, 165, 106, 0.2) 40%, transparent 70%)',
          }}
        />

        {/* Celestial Moon Ambient Golden Aura */}
        <div
          className="absolute right-[15%] top-[8%] w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none animate-celestial-glow"
          style={{
            background: 'radial-gradient(circle, rgba(207, 165, 106, 0.28) 0%, rgba(108, 61, 140, 0.18) 50%, transparent 75%)',
          }}
        />

        {/* Soft gradient veil on left to guarantee crisp text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(7,10,20,0.94) 0%, rgba(7,10,20,0.82) 42%, rgba(7,10,20,0.25) 75%, transparent 100%)',
          }}
        />

        {/* Bottom edge blending */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(7,10,20,0.8) 100%)',
          }}
        />
      </div>

      {/* Floating 60fps Celestial Stardust Particles */}
      <CelestialParticles />

      {/* Sacred Geometry Golden Spiral & Celestial Alignment Diagram (Matching Exact Mockup) */}
      <div className="hidden lg:block absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 w-[520px] h-[620px] pointer-events-none z-10 select-none">
        <svg
          viewBox="0 0 500 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#CFA56A] opacity-90 animate-celestial-glow"
        >
          {/* Main Golden Celestial Circle */}
          <circle cx="280" cy="270" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
          <circle cx="280" cy="270" r="160" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
          <circle cx="280" cy="270" r="100" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
          
          {/* Vertical Celestial Axis with Planetary Alignment Nodes */}
          <line x1="280" y1="20" x2="280" y2="560" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
          <circle cx="280" cy="80" r="3.5" fill="currentColor" />
          <circle cx="280" cy="170" r="4.5" fill="currentColor" />
          <circle cx="280" cy="270" r="2.5" fill="currentColor" />
          <circle cx="280" cy="380" r="3.5" fill="currentColor" />

          {/* Golden Ratio Spiral (Fibonacci curve enveloping the crystals & moon) */}
          <path
            d="M280,270 A25,25 0 0,1 255,270 A50,50 0 0,1 280,220 A90,90 0 0,1 370,270 A150,150 0 0,1 280,420 A230,230 0 0,1 50,270 A330,330 0 0,1 280,-60"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.85"
          />

          {/* Concentric Golden Minor Arcs */}
          <path
            d="M280,110 A160,160 0 0,1 440,270"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.65"
          />
          <path
            d="M280,150 A120,120 0 0,1 400,270"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Cross Coordinate Alignment */}
          <line x1="120" y1="270" x2="440" y2="270" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.35" />

          {/* Sacred Mantra Vertical Text along the Golden Spiral Loop */}
          <g transform="translate(372, 215)">
            <text x="0" y="0" fill="#CFA56A" fontSize="11" letterSpacing="0.36em" fontFamily="monospace" fontWeight="600" opacity="0.95">YOUR</text>
            <text x="0" y="32" fill="#CFA56A" fontSize="11" letterSpacing="0.36em" fontFamily="monospace" fontWeight="600" opacity="0.95">JOURNEY</text>
            <text x="0" y="64" fill="#CFA56A" fontSize="11" letterSpacing="0.36em" fontFamily="monospace" fontWeight="600" opacity="0.95">YOUR</text>
            <text x="0" y="96" fill="#CFA56A" fontSize="11" letterSpacing="0.36em" fontFamily="monospace" fontWeight="600" opacity="0.95">TRUTH</text>
            <line x1="0" y1="115" x2="35" y2="115" stroke="#CFA56A" strokeWidth="1.5" opacity="0.9" />
          </g>
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — Headings & Actions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Subtitle tag */}
          <div className="flex items-center gap-2">
            <span className="text-[#CFA56A] text-xs animate-star-twinkle">✦</span>
            <p
              className="text-xs tracking-[0.28em] uppercase font-mono font-medium"
              style={{ color: '#CFA56A' }}
            >
              CLARITY &middot; HEALING &middot; ALIGNMENT
            </p>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] text-[#F6F3EE] leading-[1.12] sm:leading-[1.08] tracking-tight drop-shadow-md"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            A Space for<br />
            Your Inner Truth
          </h1>

          {/* Descriptive copy */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#BAC2D6] max-w-xl font-light leading-relaxed">
            Alchemystery brings together intuitive and spiritual practices to help you explore life&apos;s questions with greater awareness and perspective.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 pt-2">
            <Link
              href="/sessions"
              className="group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded text-xs font-semibold tracking-[0.16em] uppercase text-[#0B0F1E] transition-all duration-300 hover:brightness-110 shadow-lg overflow-hidden"
              style={{ backgroundColor: '#CFA56A' }}
            >
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">Explore Sessions</span>
              <span className="relative z-10 text-sm group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded text-xs font-medium tracking-[0.16em] uppercase text-[#F6F3EE] border transition-all duration-300 hover:bg-white/[0.06] hover:border-[#CFA56A]"
              style={{
                borderColor: 'rgba(207, 165, 106, 0.6)',
              }}
            >
              Meet Isha
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#8E9BB5] pt-2 font-mono flex items-center gap-2">
            <span style={{ color: '#CFA56A' }} className="animate-star-twinkle">✦</span>
            <span>ONLINE SESSIONS &middot; BY APPOINTMENT</span>
          </p>
        </div>
      </div>
    </section>
  );
}
