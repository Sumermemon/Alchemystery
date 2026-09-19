import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-xs tracking-[0.2em]' : size === 'lg' ? 'text-base tracking-[0.25em]' : 'text-sm tracking-[0.2em]';

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Monogram emblem */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--color-gold)] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Outer thin ring */}
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
        
        {/* Vertical sword/axis */}
        <line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
        <circle cx="50" cy="12" r="2" fill="currentColor" />
        <circle cx="50" cy="88" r="2" fill="currentColor" />
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />

        {/* Elegant I & S Monogram */}
        <path
          d="M 50 24 L 50 76"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* S curve */}
        <path
          d="M 62 34 C 62 26, 38 26, 38 38 C 38 52, 62 48, 62 62 C 62 74, 38 74, 38 66"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Brand Wordmark */}
      <span
        className={`text-[var(--color-gold)] uppercase font-normal ${textSize} transition-opacity group-hover:opacity-90`}
        style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.22em' }}
      >
        Alchemystery
      </span>
    </Link>
  );
}
