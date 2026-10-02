'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';

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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll completely when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
      };
    }
  }, [isOpen]);

  // Handle escape key & window resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Full-screen overlay portal
  const menuOverlay = mounted && isOpen ? createPortal(
    <div
      id="mobile-nav-portal"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-[99999] bg-[#070A14] flex flex-col w-screen h-[100dvh] overflow-y-auto animate-fadeIn"
      style={{
        backgroundColor: '#070A14',
      }}
    >
      {/* Background ambient cosmic glow */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, #6C3D8C 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 h-20 border-b border-white/[0.08] flex-shrink-0">
        <Logo size="sm" />
        <button
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="w-10 h-10 rounded-full border border-[#CFA56A]/30 flex items-center justify-center text-[#CFA56A] hover:bg-[#CFA56A]/10 active:scale-95 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="relative z-10 flex-1 px-8 py-8 flex flex-col justify-center max-w-lg mx-auto w-full">
        <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-[#CFA56A]/70 mb-4">
          NAVIGATION
        </p>
        <nav aria-label="Mobile main navigation" className="flex flex-col space-y-2">
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            const indexStr = String(index + 1).padStart(2, '0');
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                target={item.is_external ? '_blank' : undefined}
                rel={item.is_external ? 'noopener noreferrer' : undefined}
                className={`group flex items-center py-3 border-b border-white/[0.04] transition-all duration-200 ${
                  isActive ? 'text-[#CFA56A]' : 'text-[#F6F3EE] hover:text-[#CFA56A]'
                }`}
              >
                <span className="text-xs font-mono text-[#CFA56A]/60 mr-4 tracking-widest">
                  {indexStr}
                </span>
                <span
                  className="text-2xl font-light tracking-wide transition-transform duration-200 group-hover:translate-x-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#CFA56A] shadow-[0_0_8px_#CFA56A]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions & Contact */}
      <div className="relative z-10 px-8 pb-10 pt-4 mt-auto border-t border-white/[0.08] max-w-lg mx-auto w-full space-y-4">
        <Link
          href="/connect"
          onClick={() => setIsOpen(false)}
          className="w-full py-3.5 px-6 rounded bg-[#CFA56A] text-[#0B0F1E] text-xs font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg"
        >
          <span>Book a Session</span>
          <span>→</span>
        </Link>

        {/* WhatsApp Quick Link */}
        <a
          href="https://wa.me/917904358826"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-6 rounded border border-white/[0.12] text-[#BAC2D6] text-xs font-mono tracking-wider flex items-center justify-center gap-2 hover:border-[#CFA56A]/50 hover:text-[#F6F3EE] transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>WhatsApp: +91 79043 58826</span>
        </a>

        {/* Brand Tagline */}
        <p className="text-center text-[11px] text-[#CFA56A]/80 italic font-serif pt-1">
          &ldquo;Your journey. Your truth.&rdquo;
        </p>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        id="mobile-nav-toggle"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-[#CFA56A]/40 transition-colors focus:outline-none"
      >
        <span
          className="block w-5 h-[1.5px] bg-[#CFA56A] transition-all duration-300 origin-center"
          style={{
            transform: isOpen ? 'translateY(5px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block w-5 h-[1.5px] bg-[#CFA56A] my-[3.5px] transition-all duration-300"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block w-5 h-[1.5px] bg-[#CFA56A] transition-all duration-300 origin-center"
          style={{
            transform: isOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Portal Dialog */}
      {menuOverlay}
    </>
  );
}
