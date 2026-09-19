'use client';

import Link from 'next/link';

export function BioSection() {
  return (
    <section className="bg-[#F6F3EE] text-[#1A1F2C] relative overflow-hidden py-16 lg:py-24 border-t border-[#CFA56A]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center px-6">
        
        {/* Left Text Content */}
        <div className="lg:col-span-5 relative z-10 space-y-6">
          <p className="text-[#CFA56A] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
            MEET ISHA
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.18] text-[#1A1F2C]" style={{ fontFamily: 'var(--font-serif)' }}>
            A Journey of Service<br />and Self-Discovery
          </h2>
          <p className="text-[#555C6E] text-sm sm:text-[15px] leading-relaxed font-normal">
            I&apos;m Isha Singasane, and Alchemystery is an extension of my deep passion for intuitive wisdom, spiritual exploration and human connection.
          </p>
          <p className="text-[#555C6E] text-sm sm:text-[15px] leading-relaxed font-normal">
            My work is about holding space — for your questions, insights, transitions and inner growth. I work with compassion, integrity and a grounded approach.
          </p>
          <div className="pt-2">
            <Link 
              href="/about" 
              className="inline-flex px-8 py-4 bg-[#CFA56A] text-[#0B0F1E] text-xs tracking-[0.16em] uppercase font-mono font-bold hover:brightness-110 transition-all items-center gap-3 rounded shadow-md"
            >
              <span>More About Isha</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* Center Image */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl relative border border-[#CFA56A]/30">
            <img 
              src="/images/isha_portrait.png" 
              alt="Isha Singasane — Founder & Spiritual Practitioner" 
              className="w-full h-full object-cover object-top"
            />
            {/* Soft vignette at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Quote Content */}
        <div className="lg:col-span-3 flex flex-col justify-center items-center text-center">
          <div className="max-w-[260px] mx-auto space-y-6">
            <p className="text-xl md:text-2xl italic leading-relaxed text-[#1A1F2C]" style={{ fontFamily: 'var(--font-serif)' }}>
              &ldquo;True wisdom is not found outside, but remembered within.&rdquo;
            </p>
            <div className="w-12 h-[1px] bg-[#CFA56A] mx-auto"></div>
            <div>
              <p className="text-2xl text-[#1A1F2C] italic mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                Isha Singasane
              </p>
              <p className="text-[#CFA56A] text-[10px] tracking-[0.25em] uppercase font-mono font-bold leading-normal">
                FOUNDER &<br />SPIRITUAL PRACTITIONER
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
