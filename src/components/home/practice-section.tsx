'use client';

import Link from 'next/link';
import { Sun, Moon, Flower } from 'lucide-react';

export function PracticeSection() {
  return (
    <section className="bg-[var(--color-ivory)] text-[#0B0F1E] py-24 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-5">
          <p className="text-[var(--color-gold-100)] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">
            THE PRACTICE
          </p>
          <h2 className="text-4xl md:text-5xl mb-6 leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>
            Guidance for a<br />More Conscious Life
          </h2>
          <p className="text-[#4a5568] text-sm md:text-base leading-relaxed mb-8 max-w-md font-medium">
            Alchemystery is a space for reflection, insight and inner
            alignment. Through ancient wisdom and intuitive practices,
            we explore what truly matters — with openness, compassion
            and a grounded approach.
          </p>
          <Link 
            href="/about" 
            className="text-[var(--color-gold-100)] text-sm tracking-widest uppercase font-bold hover:text-[var(--color-gold-muted)] transition-colors inline-flex items-center gap-2"
          >
            Our Approach <span>→</span>
          </Link>
        </div>

        {/* Right Columns (Icons) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 lg:pt-8">
          {/* Clarity */}
          <div>
            <div className="w-16 h-16 rounded-full border border-[#d4b86a]/30 flex items-center justify-center mb-6">
              <Sun className="w-6 h-6 text-[var(--color-gold-100)] stroke-[1.5]" />
            </div>
            <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>Clarity</h3>
            <p className="text-[#4a5568] text-sm leading-relaxed font-medium">
              Create space to understand what you're experiencing.
            </p>
          </div>

          {/* Perspective */}
          <div>
            <div className="w-16 h-16 rounded-full border border-[#d4b86a]/30 flex items-center justify-center mb-6">
              <Moon className="w-6 h-6 text-[var(--color-gold-100)] stroke-[1.5]" />
            </div>
            <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>Perspective</h3>
            <p className="text-[#4a5568] text-sm leading-relaxed font-medium">
              Explore patterns, questions and possibilities.
            </p>
          </div>

          {/* Alignment */}
          <div>
            <div className="w-16 h-16 rounded-full border border-[#d4b86a]/30 flex items-center justify-center mb-6">
              <Flower className="w-6 h-6 text-[var(--color-gold-100)] stroke-[1.5]" />
            </div>
            <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)', color: '#0B0F1E' }}>Alignment</h3>
            <p className="text-[#4a5568] text-sm leading-relaxed font-medium">
              Reconnect with what feels meaningful and intentional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
