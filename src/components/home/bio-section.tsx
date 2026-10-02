'use client';

import Link from 'next/link';

export function BioSection() {
  return (
    <section 
      id="about"
      className="text-[#1A1F2C] relative overflow-hidden py-16 lg:py-24 border-t border-b border-[#A37D42]/15"
      style={{ backgroundColor: '#F1EDE2' }}
    >
      {/* Subtle organic parchment grain & watercolor wash in corners */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 select-none"
        style={{
          background: 'radial-gradient(circle at 10% 20%, rgba(200, 180, 150, 0.25) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(200, 180, 150, 0.25) 0%, transparent 40%)',
        }}
      />

      {/* Decorative corner flourishes matching mockup */}
      <div aria-hidden="true" className="absolute top-6 left-6 text-[#A37D42]/25 font-mono text-sm pointer-events-none select-none">
        ✦
      </div>
      <div aria-hidden="true" className="absolute top-6 right-6 text-[#A37D42]/25 font-mono text-sm pointer-events-none select-none">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column — Text Content */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[#A37D42] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
              MEET ISHA
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.14] text-[#1A1F2C]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              A Journey of Service<br />and Self-Discovery
            </h2>
            <div className="space-y-4 text-[#555C6E] text-sm sm:text-[14.5px] leading-relaxed max-w-md">
              <p>
                I&apos;m Isha Singasane, and Alchemystery is an extension of my deep passion for intuitive wisdom, spiritual exploration and human connection.
              </p>
              <p>
                My work is about holding space — for your questions, insights, transitions and inner growth. I work with compassion, integrity and a grounded approach.
              </p>
            </div>
            <div className="pt-2">
              <Link 
                href="/about" 
                className="group inline-flex items-center gap-2 px-6 py-3 rounded bg-[#C4A06A] text-[#1A1F2C] text-xs font-semibold tracking-wider hover:brightness-105 transition-all shadow-sm"
              >
                <span>More About Isha</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Center Column — Isha Portrait seamlessly integrated (NO box, NO border, NO drop shadow) */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center">
            <div 
              className="relative w-full max-w-[420px] aspect-[4/3] sm:aspect-[16/12] flex items-center justify-center"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              }}
            >
              <picture className="w-full h-full">
                <source srcSet="/images/isha_moon_banner.webp" type="image/webp" />
                <img 
                  src="/images/isha_moon_banner.jpg" 
                  alt="Isha Singasane — Founder & Spiritual Practitioner" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>

          {/* Right Column — Signature & Quote matching Image 2 */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-8 pl-0 lg:pl-2">
            {/* Signature & Title badge positioned to the right of Isha */}
            <div className="space-y-1">
              <p 
                className="text-3xl sm:text-4xl text-[#1A1F2C] leading-none" 
                style={{ fontFamily: 'var(--font-signature), cursive' }}
              >
                Isha Singasane
              </p>
              <p className="text-[#A37D42] text-[10px] tracking-[0.25em] uppercase font-mono font-semibold pt-1">
                FOUNDER &amp; SPIRITUAL PRACTITIONER
              </p>
            </div>

            {/* Editorial Wisdom Quote */}
            <div className="space-y-4">
              <p 
                className="text-lg sm:text-xl italic leading-relaxed text-[#1A1F2C]" 
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                &ldquo;True wisdom is not found outside, but remembered within.&rdquo;
              </p>
              <div className="w-10 h-[1.5px] bg-[#A37D42] opacity-80" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
