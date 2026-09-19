'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  href: string;
  is_external?: boolean;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        id="mobile-nav-toggle"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
      >
        <span
          className="block w-6 h-px bg-[var(--color-ivory)] transition-all duration-300 origin-center"
          style={{
            transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block w-6 h-px bg-[var(--color-ivory)] transition-all duration-300"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block w-6 h-px bg-[var(--color-ivory)] transition-all duration-300 origin-center"
          style={{
            transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: 'rgba(11, 15, 30, 0.98)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(255,255,255,0.06)]">
          <span
            className="text-[var(--color-gold)] text-sm tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Menu
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-ivory)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 pt-8 gap-1">
          {items.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                target={item.is_external ? '_blank' : undefined}
                rel={item.is_external ? 'noopener noreferrer' : undefined}
                className="group flex items-center py-4 border-b border-[rgba(255,255,255,0.04)] transition-colors duration-200"
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <span
                  className="text-base tracking-wide transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--color-gold)' : 'var(--color-ivory)',
                    opacity: isActive ? 1 : 0.8,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="ml-auto text-[var(--color-gold)] text-xs">●</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto px-6 pb-10">
          <Link
            href="/connect"
            className="block w-full text-center py-3 border border-[var(--color-gold)] text-[var(--color-gold)] text-sm tracking-widest uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
