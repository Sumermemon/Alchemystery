'use client';

import type { TestimonialRow } from '@/types/database.types';

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialRow[] }) {
  // If no testimonials, we can just skip or show a fallback.
  // The mockup shows one central quote. We'll use the first one.
  const testimonial = testimonials[0];

  if (!testimonial) return null;

  return (
    <section className="bg-[var(--color-midnight)] py-24 px-6 relative overflow-hidden border-t border-[rgba(255,255,255,0.02)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Info */}
        <div className="lg:col-span-3">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
            WORDS FROM THE COMMUNITY
          </p>
          <h2 className="text-4xl leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}>
            A Few Reflections
          </h2>
        </div>

        {/* Center Carousel/Quote */}
        <div className="lg:col-span-6 flex items-center justify-center px-4 relative z-10">
          <div className="text-center relative">
            {/* Arrows */}
            <button className="absolute left-[-2rem] top-1/2 -translate-y-1/2 text-[var(--color-slate-muted)] hover:text-[var(--color-gold)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            <p className="text-xl md:text-2xl leading-relaxed italic mb-8 px-6 text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>
              "{testimonial.quote}"
            </p>
            <p className="text-[var(--color-slate-muted)] text-sm tracking-widest uppercase font-semibold">
              — {testimonial.client_name}
            </p>

            <button className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-[var(--color-slate-muted)] hover:text-[var(--color-gold)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Right Asset (Lotus) */}
        <div className="lg:col-span-3 flex justify-end items-center opacity-70 relative z-0">
          <img 
            src="https://images.unsplash.com/photo-1601002341997-6a1ea03ff062?auto=format&fit=crop&q=80" 
            alt="Glowing Lotus" 
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mix-blend-screen"
            style={{ filter: 'hue-rotate(280deg) brightness(1.2)' }}
          />
        </div>

      </div>
    </section>
  );
}
