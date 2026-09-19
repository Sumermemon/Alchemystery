'use client';

import Link from 'next/link';
import { Sun, Moon, Sparkles } from 'lucide-react';

export function PracticeSection() {
  return (
    <section className="py-24 px-6 relative" style={{ backgroundColor: '#F6F3EE', color: '#1A1F2C' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Sacred geometry emblem matching screenshot */}
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#A37D42]" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="45" strokeWidth="1.5" opacity="0.6" />
              <polygon points="50,5 95,50 50,95 5,50" strokeWidth="1.2" opacity="0.5" />
              <polygon points="18,18 82,18 82,82 18,82" strokeWidth="1.2" opacity="0.5" />
              <circle cx="50" cy="50" r="24" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.4" />
            </svg>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase font-mono font-semibold" style={{ color: '#A37D42' }}>
            THE PRACTICE
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.18]"
            style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}
          >
            Guidance for a<br />
            More Conscious Life
          </h2>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#555C6E] max-w-md">
            Alchemystery is a space for reflection, insight and inner alignment. Through ancient wisdom and intuitive practices, we explore what truly matters — with openness, compassion and a grounded approach.
          </p>

          <div className="pt-2">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors"
              style={{ color: '#A37D42' }}
            >
              <span>Our Approach</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Column — 3 Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-4">
          {/* Clarity */}
          <div className="space-y-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{
                borderColor: 'rgba(163, 125, 66, 0.4)',
                backgroundColor: 'rgba(163, 125, 66, 0.06)',
              }}
            >
              <Sun className="w-6 h-6" style={{ color: '#A37D42' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
              Clarity
            </h3>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#555C6E]">
              Create space to understand what you&apos;re experiencing.
            </p>
          </div>

          {/* Perspective */}
          <div className="space-y-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{
                borderColor: 'rgba(163, 125, 66, 0.4)',
                backgroundColor: 'rgba(163, 125, 66, 0.06)',
              }}
            >
              <Moon className="w-6 h-6" style={{ color: '#A37D42' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
              Perspective
            </h3>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#555C6E]">
              Explore patterns, questions and possibilities.
            </p>
          </div>

          {/* Alignment */}
          <div className="space-y-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{
                borderColor: 'rgba(163, 125, 66, 0.4)',
                backgroundColor: 'rgba(163, 125, 66, 0.06)',
              }}
            >
              {/* Lotus icon SVG */}
              <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ color: '#A37D42' }} fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 4C10 8 7 13 4 15C7 16 10 15 12 19C14 15 17 16 20 15C17 13 14 8 12 4Z" />
                <path d="M12 12C9 13 7 14 5 18C8 18.5 10 18 12 21C14 18 16 18.5 19 18C17 14 15 13 12 12Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
              Alignment
            </h3>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#555C6E]">
              Reconnect with what feels meaningful and intentional.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
