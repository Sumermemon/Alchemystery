import Link from 'next/link';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { getNavigationItems } from '@/lib/repositories/navigation.repository';
import { MobileNav } from '@/components/ui/mobile-nav';
import { Logo } from '@/components/ui/logo';

/**
 * Public website layout matching exact mockups.
 */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, headerLinksRaw] = await Promise.all([
    getSiteSettings(),
    getNavigationItems('header'),
  ]);

  const defaultHeaderLinks = [
    { id: 'nav-home', label: 'Home', href: '/', is_external: false },
    { id: 'nav-practice', label: 'The Practice', href: '/practice', is_external: false },
    { id: 'nav-sessions', label: 'Sessions', href: '/sessions', is_external: false },
    { id: 'nav-about', label: 'About Isha', href: '/about', is_external: false },
    { id: 'nav-insights', label: 'Insights', href: '/insights', is_external: false },
    { id: 'nav-faq', label: 'FAQ', href: '/faq', is_external: false },
  ];

  const headerLinks = headerLinksRaw.length > 0 ? headerLinksRaw : defaultHeaderLinks;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F1E] text-[var(--color-ivory)]">
      {/* Header */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: 'rgba(11, 15, 30, 0.92)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7 lg:gap-8">
            {headerLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-xs tracking-[0.12em] uppercase text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA Button (Matches Mockup) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/connect"
              className="px-6 py-2.5 rounded text-xs font-semibold tracking-wider text-[#0B0F1E] transition-all duration-300 hover:brightness-110 shadow-sm"
              style={{
                backgroundColor: '#CFA56A',
              }}
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Navigation Toggle & Drawer */}
          <MobileNav items={headerLinks} />
        </div>
      </header>

      {/* Main Content */}
      <main role="main" className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer (Matches Mockup 1:1) */}
      <footer
        role="contentinfo"
        className="border-t relative py-12 px-6"
        style={{
          backgroundColor: '#070A14',
          borderColor: 'rgba(201, 168, 76, 0.25)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Monogram Logo */}
          <Logo size="sm" />

          {/* Middle: Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">Home</Link>
            <Link href="/practice" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">The Practice</Link>
            <Link href="/sessions" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">Sessions</Link>
            <Link href="/about" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">About Isha</Link>
            <Link href="/insights" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">Insights</Link>
            <Link href="/faq" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">FAQ</Link>
            <Link href="/connect" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">Contact</Link>
          </nav>

          {/* Right: Social icons + Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-[var(--color-muted)]">
            <div className="flex items-center gap-4 text-[var(--color-muted)]">
              <a href="https://instagram.com/alchemystery" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" title="Instagram" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" title="LinkedIn" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" title="YouTube" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
            <div className="text-center sm:text-right text-[11px] space-y-0.5 font-sans opacity-70">
              <p>© 2024 Alchemystery. All rights reserved.</p>
              <p className="italic font-serif text-[12px] text-[var(--color-gold)] opacity-80">Your journey. Your truth.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
