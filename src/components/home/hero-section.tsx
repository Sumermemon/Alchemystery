'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80"
          alt="Night sky with moon and crystals"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1E] via-[#0B0F1E]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="col-span-1 lg:col-span-8">
          <p className="text-[var(--color-slate-muted)] text-xs tracking-[0.2em] uppercase mb-6 font-medium">
            CLARITY • HEALING • ALIGNMENT
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            A Space for<br />Your Inner Truth
          </h1>
          
          <p className="text-[var(--color-ivory)] text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
            Alchemystery brings together intuitive and spiritual<br className="hidden md:block" />
            practices to help you explore life's questions with<br className="hidden md:block" />
            greater awareness and perspective.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
            <Link 
              href="/sessions"
              className="w-full sm:w-auto px-8 py-4 bg-[var(--color-gold)] text-[#0B0F1E] text-sm tracking-widest uppercase font-semibold hover:bg-[var(--color-gold-50)] transition-colors flex items-center justify-center gap-3"
            >
              Explore Sessions <span>→</span>
            </Link>
            
            <Link 
              href="/about"
              className="w-full sm:w-auto px-8 py-4 border border-[var(--color-slate-muted)] text-[var(--color-ivory)] text-sm tracking-widest uppercase font-medium hover:border-[var(--color-ivory)] transition-colors flex items-center justify-center"
            >
              Meet Isha
            </Link>
          </div>
          
          <p className="text-[var(--color-slate-muted)] text-xs tracking-[0.15em] uppercase font-medium">
            • ONLINE SESSIONS • BY APPOINTMENT
          </p>
        </div>

        {/* Right Content (Vertical Text) */}
        <div className="hidden lg:flex col-span-4 justify-end items-center">
          <div className="text-[var(--color-gold)] text-sm tracking-[0.3em] uppercase leading-loose text-right flex flex-col gap-2">
            <span>YOUR</span>
            <span>JOURNEY</span>
            <span>YOUR</span>
            <span>TRUTH</span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)] self-end mt-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
