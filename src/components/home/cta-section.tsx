'use client';

import Link from 'next/link';
import { CelestialParticles } from '@/components/ui/celestial-particles';

export function CtaSection() {
  return (
    <section id="cta" className="relative bg-[#060913] py-32 px-6 overflow-hidden">
      {/* Abstract Background Texture/Glow */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-indigo)] rounded-[100%] blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, #6C3D8C 0%, #C9A84C 60%, transparent 80%)' }} />
      </div>

      {/* Subtle floating particles in CTA */}
      <CelestialParticles />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="text-center lg:text-left flex-1">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <span className="text-[#CFA56A] text-xs animate-star-twinkle">✦</span>
            <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#CFA56A]">
              BEGIN YOUR JOURNEY
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}>
            Perhaps This Is Your Time to Pause
          </h2>
          <p className="text-[var(--color-slate-muted)] text-lg mb-10 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Explore a session, ask a question, or simply begin a conversation. A safe space for clarity and grounded alignment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <Link 
              href="/sessions"
              className="group relative w-full sm:w-auto px-8 py-4 bg-[#CFA56A] text-[#0B0F1E] text-xs tracking-widest uppercase font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-3 overflow-hidden shadow-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">Explore Sessions</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              href="/connect"
              className="w-full sm:w-auto px-8 py-4 border border-[rgba(207,165,106,0.5)] text-[var(--color-ivory)] text-xs tracking-widest uppercase font-medium hover:bg-white/[0.06] hover:border-[#CFA56A] transition-all flex items-center justify-center"
            >
              Connect with Isha
            </Link>
          </div>
        </div>

        {/* Right Content (Vertical Text) */}
        <div className="hidden lg:flex flex-col items-end gap-3 text-[#CFA56A] text-xs tracking-[0.35em] uppercase font-mono">
          <span className="opacity-80">CLARITY</span>
          <span className="opacity-60">&bull;</span>
          <span className="opacity-80">HEALING</span>
          <span className="opacity-60">&bull;</span>
          <span className="opacity-80">ALIGNMENT</span>
        </div>
      </div>
    </section>
  );
}
