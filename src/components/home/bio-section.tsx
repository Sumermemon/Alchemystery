'use client';

import Link from 'next/link';

export function BioSection() {
  return (
    <section className="bg-[var(--color-ivory)] text-[#0B0F1E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Text Content */}
        <div className="lg:col-span-5 px-6 py-24 relative z-10">
          <p className="text-[var(--color-gold-100)] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">
            MEET ISHA
          </p>
          <h2 className="text-4xl md:text-5xl leading-[1.2] mb-8" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>
            A Journey of Service<br />and Self-Discovery
          </h2>
          <p className="text-[#4a5568] text-sm md:text-base leading-relaxed mb-6 font-medium">
            I'm Isha Singasane, and Alchemystery is an extension of my deep passion for intuitive wisdom, spiritual exploration and human connection.
          </p>
          <p className="text-[#4a5568] text-sm md:text-base leading-relaxed mb-10 font-medium">
            My work is about holding space — for your questions, insights, transitions and inner growth. I work with compassion, integrity and a grounded approach.
          </p>
          <Link 
            href="/about" 
            className="inline-flex px-8 py-4 bg-[var(--color-gold)] text-[#0B0F1E] text-sm tracking-widest uppercase font-bold hover:bg-[var(--color-gold-muted)] transition-colors items-center gap-3"
          >
            More About Isha <span>→</span>
          </Link>
        </div>

        {/* Center Image overlapping right */}
        <div className="lg:col-span-4 h-[400px] lg:h-[700px] w-full relative z-0">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" 
            alt="Isha Singasane" 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to blend edges if needed */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-transparent to-transparent hidden lg:block opacity-50"></div>
        </div>

        {/* Right Quote Content */}
        <div className="lg:col-span-3 px-6 py-24 lg:py-0 flex flex-col justify-center items-center text-center">
          <div className="max-w-[250px] mx-auto">
            <p className="text-xl md:text-2xl italic leading-relaxed mb-8 text-[#4a5568]" style={{ fontFamily: 'var(--font-serif)' }}>
              "True wisdom is not found outside, but remembered within."
            </p>
            <div className="w-12 h-[1px] bg-[var(--color-gold-100)] mx-auto mb-8"></div>
            <p className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E', fontStyle: 'italic' }}>
              Isha Singasane
            </p>
            <p className="text-[var(--color-gold-100)] text-[10px] tracking-[0.2em] uppercase font-bold">
              FOUNDER &<br />SPIRITUAL PRACTITIONER
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
