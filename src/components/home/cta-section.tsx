'use client';

import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="relative bg-[#060913] py-32 px-6 overflow-hidden">
      {/* Abstract Background Texture/Glow */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-indigo)] rounded-[100%] blur-[120px] mix-blend-screen pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="text-center lg:text-left flex-1">
          <h2 className="text-4xl md:text-5xl mb-6 leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}>
            Perhaps This Is Your Time to Pause
          </h2>
          <p className="text-[var(--color-slate-muted)] text-lg mb-10 font-medium max-w-2xl mx-auto lg:mx-0">
            Explore a session, ask a question, or simply begin a conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <Link 
              href="/sessions"
              className="w-full sm:w-auto px-8 py-4 bg-[var(--color-gold)] text-[#0B0F1E] text-sm tracking-widest uppercase font-bold hover:bg-[var(--color-gold-50)] transition-colors flex items-center justify-center gap-3"
            >
              Explore Sessions <span>→</span>
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 border border-[var(--color-slate-muted)] text-[var(--color-ivory)] text-sm tracking-widest uppercase font-bold hover:border-[var(--color-ivory)] transition-colors flex items-center justify-center"
            >
              Connect with Isha
            </Link>
          </div>
        </div>

        {/* Right Content (Vertical Text) */}
        <div className="hidden lg:flex flex-col items-end gap-2 text-[var(--color-gold-muted)] text-xs tracking-[0.3em] uppercase font-semibold">
          <span>CLARITY</span>
          <span>HEALING</span>
          <span>ALIGNMENT</span>
        </div>

      </div>
    </section>
  );
}
