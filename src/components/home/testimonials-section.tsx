'use client';

import React from 'react';
import type { TestimonialRow } from '@/types/database.types';

const DEFAULT_TESTIMONIALS = [
  {
    content: "Working with Isha brought a clarity and calm that stayed with me long after our session ended. Her readings are deep, insightful, and profoundly grounding.",
    author_name: "R. S.",
  },
  {
    content: "The Akashic Records reading gave me answers to questions I had been holding for years. A truly transformative and sacred experience.",
    author_name: "Piyush M.",
  },
  {
    content: "Isha holds space with such genuine compassion and wisdom. Every conversation feels like returning to your true self.",
    author_name: "Ananya K.",
  },
];

export function TestimonialsSection({ testimonials }: { testimonials?: TestimonialRow[] }) {
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  const [index, setIndex] = React.useState(0);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  const current = items[index] || items[0];

  return (
    <section className="bg-[#0B0F1E] py-24 px-6 relative overflow-hidden border-t border-white/[0.04]">
      {/* Background celestial glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#8A5CF6]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Info */}
        <div className="lg:col-span-3">
          <p className="text-[#CFA56A] text-xs tracking-[0.25em] uppercase font-mono mb-4 font-medium">
            WORDS FROM THE COMMUNITY
          </p>
          <h2 className="text-3xl sm:text-4xl text-[#F6F3EE] leading-[1.2]" style={{ fontFamily: 'var(--font-serif)' }}>
            A Few Reflections
          </h2>
        </div>

        {/* Center Carousel/Quote */}
        <div className="lg:col-span-6 flex items-center justify-center px-4 relative z-10">
          <div className="text-center relative max-w-xl mx-auto">
            {/* Arrows */}
            <button 
              onClick={prev}
              aria-label="Previous reflection"
              className="absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#8E9BB5] hover:text-[#CFA56A] hover:border-[#CFA56A]/50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            <p className="text-xl md:text-2xl leading-relaxed italic mb-8 px-6 text-[#F6F3EE] min-h-[100px] flex items-center justify-center" style={{ fontFamily: 'var(--font-serif)' }}>
              &ldquo;{current.content}&rdquo;
            </p>
            <p className="text-[#8E9BB5] text-xs tracking-[0.25em] uppercase font-mono font-semibold">
              — {current.author_name}
            </p>

            <button 
              onClick={next}
              aria-label="Next reflection"
              className="absolute -right-6 sm:-right-10 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#8E9BB5] hover:text-[#CFA56A] hover:border-[#CFA56A]/50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Right Asset (Lotus) */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end items-center relative z-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.35)] border border-[#CFA56A]/20">
            <img 
              src="/images/lotus_glowing.jpg" 
              alt="Glowing Sacred Lotus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
