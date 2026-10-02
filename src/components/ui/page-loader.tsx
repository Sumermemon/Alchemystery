'use client';

import { useState, useEffect } from 'react';

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [contentFading, setContentFading] = useState(false);
  const [curtainLifting, setCurtainLifting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const totalDuration = 1250; // 1.25s smooth alchemical progression
    const stepInterval = 25; // 40 updates per second for buttery smoothness
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += stepInterval;
      const t = Math.min(1, elapsed / totalDuration);
      
      // Easing: Quartic ease-out for organic, fluid motion
      const eased = 1 - Math.pow(1 - t, 3.8);
      const current = Math.min(100, Math.round(eased * 100));
      setProgress(current);

      if (elapsed >= totalDuration) {
        clearInterval(timer);

        // Phase 1: Gracefully fade & soften center emblem + text (avoids overlapping ghost text)
        setTimeout(() => {
          setContentFading(true);

          // Phase 2: Slide the dark obsidian curtain up like silk
          setTimeout(() => {
            setCurtainLifting(true);
            document.body.style.overflow = originalOverflow;

            // Phase 3: Unmount entirely from the DOM
            setTimeout(() => {
              setRemoved(true);
            }, 650);
          }, 200);
        }, 120);
      }
    }, stepInterval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (removed) return null;

  return (
    <div
      id="alchemystery-loader"
      aria-label="Loading Alchemystery"
      role="status"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#070A14] select-none transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        curtainLifting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{
        backgroundColor: '#070A14',
      }}
    >
      {/* Background ambient cosmic violet-gold aura */}
      <div
        className="absolute w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(108,61,140,0.75) 0%, rgba(207,165,106,0.45) 45%, transparent 70%)',
          opacity: contentFading ? 0 : 0.35,
        }}
      />

      {/* Main Content (Fades out cleanly in Phase 1 before curtain lifts) */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto transition-all duration-300 ease-out ${
          contentFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Sacred Geometry Spinner & Monogram */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
          {/* Outer rotating celestial ring (12s rotation) */}
          <svg
            viewBox="0 0 120 120"
            className="absolute inset-0 w-full h-full text-[#CFA56A] animate-spin-medium"
            fill="none"
          >
            {/* Outer dotted circle */}
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 5"
              opacity="0.5"
            />
            {/* Concentric inner circles */}
            <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            {/* Hexagram / Star of sacred alignment */}
            <polygon
              points="60,8 105,86 15,86"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.45"
            />
            <polygon
              points="60,112 105,34 15,34"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.45"
            />
            {/* Golden cardinal points */}
            <circle cx="60" cy="4" r="2.5" fill="currentColor" />
            <circle cx="60" cy="116" r="2.5" fill="currentColor" />
            <circle cx="4" cy="60" r="2.5" fill="currentColor" />
            <circle cx="116" cy="60" r="2.5" fill="currentColor" />
          </svg>

          {/* Counter-rotating subtle inner glyph ring (9s reverse rotation) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full text-[#E0C088] animate-spin-reverse-medium opacity-65"
            fill="none"
          >
            <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 3" />
            <polygon points="50,14 86,50 50,86 14,50" stroke="currentColor" strokeWidth="0.8" />
          </svg>

          {/* Central Golden Monogram with soft breathing glow */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span
              className="text-2xl sm:text-3xl font-serif text-[#F6F3EE] tracking-tight drop-shadow-[0_0_14px_rgba(207,165,106,0.85)]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              A
            </span>
            <div className="w-4 h-[1px] bg-[#CFA56A] mt-0.5 opacity-90 shadow-[0_0_6px_rgba(207,165,106,0.8)]" />
          </div>
        </div>

        {/* Brand Name */}
        <h2
          className="text-sm sm:text-base font-light tracking-[0.34em] sm:tracking-[0.42em] uppercase text-[#F6F3EE] mb-1.5"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          A L C H E M Y S T E R Y
        </h2>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-serif italic text-[#CFA56A] tracking-wider mb-5 opacity-90">
          A Space for Your Inner Truth
        </p>

        {/* Shimmer Hairline Progress Bar */}
        <div className="relative w-44 sm:w-52 h-[2px] bg-white/[0.1] rounded-full overflow-hidden mb-2.5 shadow-inner">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#A37D42] via-[#CFA56A] to-[#FFF3D6] shadow-[0_0_10px_rgba(207,165,106,0.7)] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-[11px] font-mono tracking-widest text-[#CFA56A] opacity-90 font-medium">
          {progress}%
        </span>
      </div>
    </div>
  );
}
