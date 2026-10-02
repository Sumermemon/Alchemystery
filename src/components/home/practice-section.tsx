'use client';

import Link from 'next/link';

export function PracticeSection() {
  return (
    <section id="practice" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#F1EDE2', color: '#1A1F2C' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column — Sacred Geometry & Heading Block matching Image 2 */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-start gap-4 sm:gap-8">
            {/* Sacred Geometry Emblem matching exact screenshot 2 */}
            <div className="flex-shrink-0 w-20 h-24 sm:w-28 sm:h-32 relative flex items-center justify-center">
              <svg
                viewBox="0 0 120 140"
                className="w-full h-full text-[#A37D42] transition-transform duration-700 hover:rotate-6"
                fill="none"
                stroke="currentColor"
              >
                {/* Vertical Axis Needle piercing through top and bottom */}
                <line x1="60" y1="12" x2="60" y2="128" strokeWidth="1.2" opacity="0.85" />
                
                {/* Diamond Star Tips on top and bottom needle ends */}
                <path d="M60 4 L62.5 12 L60 16 L57.5 12 Z" fill="currentColor" stroke="none" />
                <path d="M60 136 L62.5 128 L60 124 L57.5 128 Z" fill="currentColor" stroke="none" />

                {/* Horizontal Axis Line */}
                <line x1="16" y1="70" x2="104" y2="70" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />

                {/* Outer Sacred Circle */}
                <circle cx="60" cy="70" r="44" strokeWidth="1.2" opacity="0.85" />

                {/* Sacred 3D Merkaba / Polyhedron Crystal Facets */}
                {/* Upper Pyramid Structure */}
                <polygon points="60,28 88,70 32,70" strokeWidth="1.1" opacity="0.75" />
                <line x1="60" y1="28" x2="60" y2="70" strokeWidth="1" opacity="0.7" />
                
                {/* Lower Inverted Pyramid Structure */}
                <polygon points="60,112 88,70 32,70" strokeWidth="1.1" opacity="0.75" />
                <line x1="60" y1="112" x2="60" y2="70" strokeWidth="1" opacity="0.7" />

                {/* Internal Crystalline Star Facets */}
                <line x1="60" y1="28" x2="74" y2="86" strokeWidth="0.9" opacity="0.6" />
                <line x1="60" y1="28" x2="46" y2="86" strokeWidth="0.9" opacity="0.6" />
                <line x1="60" y1="112" x2="74" y2="54" strokeWidth="0.9" opacity="0.6" />
                <line x1="60" y1="112" x2="46" y2="54" strokeWidth="0.9" opacity="0.6" />
                
                {/* Inner Diamond / Heart of the Merkaba */}
                <polygon points="60,54 74,70 60,86 46,70" strokeWidth="1" opacity="0.8" />
                <circle cx="60" cy="70" r="2.5" fill="currentColor" />
              </svg>
            </div>

            {/* Heading and Category Tag */}
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-xs tracking-[0.25em] uppercase font-mono font-semibold" style={{ color: '#A37D42' }}>
                THE PRACTICE
              </p>

              <h2
                className="text-2xl sm:text-3xl lg:text-[2.6rem] leading-[1.18] sm:leading-[1.15]"
                style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}
              >
                Guidance for a<br />
                More Conscious Life
              </h2>
            </div>
          </div>

          {/* Description Copy */}
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#555C6E] max-w-lg pt-1">
            Alchemystery is a space for reflection, insight and inner alignment. Through ancient wisdom and intuitive practices, we explore what truly matters — with openness, compassion and a grounded approach.
          </p>

          {/* Action Link (Title case matching screenshot 2) */}
          <div className="pt-2">
            <Link
              href="/practice"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] transition-colors"
              style={{ color: '#A37D42' }}
            >
              <span>Our Approach</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column — 3 Pillars (Clarity, Perspective, Alignment with Lotus) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-4">
          
          {/* 1. Clarity (Sun) */}
          <div className="group space-y-4 transition-transform duration-300 hover:-translate-y-1">
            <div
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-[#A37D42] group-hover:shadow-[0_0_24px_rgba(163,125,66,0.18)]"
              style={{
                borderColor: 'rgba(163, 125, 66, 0.35)',
                backgroundColor: '#FAF7F2',
              }}
            >
              {/* Sacred Radiant Sun SVG matching Image 2 */}
              <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#A37D42] transition-transform duration-500 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="24" cy="24" r="6.5" strokeWidth="1.4" fill="currentColor" fillOpacity="0.08" />
                {/* 4 Cardinal Rays */}
                <line x1="24" y1="9" x2="24" y2="13.5" strokeLinecap="round" />
                <line x1="24" y1="34.5" x2="24" y2="39" strokeLinecap="round" />
                <line x1="9" y1="24" x2="13.5" y2="24" strokeLinecap="round" />
                <line x1="34.5" y1="24" x2="39" y2="24" strokeLinecap="round" />
                {/* 4 Diagonal Rays */}
                <line x1="14" y1="14" x2="17" y2="17" strokeLinecap="round" />
                <line x1="31" y1="31" x2="34" y2="34" strokeLinecap="round" />
                <line x1="34" y1="14" x2="31" y2="17" strokeLinecap="round" />
                <line x1="17" y1="31" x2="14" y2="34" strokeLinecap="round" />
                {/* 4 Minor Star Accent Dots */}
                <circle cx="24" cy="6" r="0.75" fill="currentColor" />
                <circle cx="24" cy="42" r="0.75" fill="currentColor" />
                <circle cx="6" cy="24" r="0.75" fill="currentColor" />
                <circle cx="42" cy="24" r="0.75" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-lg font-medium" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
              Clarity
            </h3>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#555C6E]">
              Create space to understand what you&apos;re experiencing.
            </p>
          </div>

          {/* 2. Perspective (Crescent Moon) */}
          <div className="group space-y-4 transition-transform duration-300 hover:-translate-y-1">
            <div
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-[#A37D42] group-hover:shadow-[0_0_24px_rgba(163,125,66,0.18)]"
              style={{
                borderColor: 'rgba(163, 125, 66, 0.35)',
                backgroundColor: '#FAF7F2',
              }}
            >
              {/* Sacred Crescent Moon SVG matching Image 2 */}
              <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#A37D42] transition-transform duration-500 group-hover:-rotate-6" fill="none">
                <path
                  d="M26 13 C19 14.5 15 21 16 28 C17 33.5 21.5 37 27.5 36 C24 32.5 23 26.5 26.5 20.5 C28.5 16.5 31.5 14.5 33.5 13.5 C31 12.8 28.5 12.8 26 13 Z"
                  fill="#A37D42"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium" style={{ fontFamily: 'var(--font-serif)', color: '#1A1F2C' }}>
              Perspective
            </h3>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#555C6E]">
              Explore patterns, questions and possibilities.
            </p>
          </div>

          {/* 3. Alignment (Sacred Lotus Flower) */}
          <div className="group space-y-4 transition-transform duration-300 hover:-translate-y-1">
            <div
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-[#A37D42] group-hover:shadow-[0_0_24px_rgba(163,125,66,0.18)]"
              style={{
                borderColor: 'rgba(163, 125, 66, 0.35)',
                backgroundColor: '#FAF7F2',
              }}
            >
              {/* Sacred Lotus Blossom SVG matching Image 2 */}
              <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#A37D42] transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="1.3">
                {/* Central Petal */}
                <path d="M24 11 C20.5 17 19.5 23 24 33 C28.5 23 27.5 17 24 11 Z" fill="currentColor" fillOpacity="0.08" />
                {/* Inner Left Petal */}
                <path d="M23 18 C16.5 19 13 23 13 28 C17 31 21 29 23 33" strokeLinecap="round" />
                {/* Inner Right Petal */}
                <path d="M25 18 C31.5 19 35 23 35 28 C31 31 27 29 25 33" strokeLinecap="round" />
                {/* Outer Lower Left Petal */}
                <path d="M14 28 C8.5 29 6 33 9 35 C14.5 37 19 33 23 34" strokeLinecap="round" />
                {/* Outer Lower Right Petal */}
                <path d="M34 28 C39.5 29 42 33 39 35 C33.5 37 29 33 25 34" strokeLinecap="round" />
                {/* Base curve */}
                <path d="M18 36 C21 38 27 38 30 36" strokeLinecap="round" />
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
