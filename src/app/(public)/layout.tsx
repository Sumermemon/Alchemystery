import Link from 'next/link';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { getNavigationItems } from '@/lib/repositories/navigation.repository';
import { MobileNav } from '@/components/ui/mobile-nav';

/**
 * Public website layout.
 * Wraps all public-facing pages with the site header and footer.
 */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, headerLinksRaw, footerLinksRaw] = await Promise.all([
    getSiteSettings(),
    getNavigationItems('header'),
    getNavigationItems('footer'),
  ]);

  const defaultHeaderLinks = [
    { id: 'nav-practice', label: 'The Practice', href: '/practice', is_external: false, location: 'header' as const, sort_order: 1, created_at: '', updated_at: '' },
    { id: 'nav-sessions', label: 'Sessions', href: '/sessions', is_external: false, location: 'header' as const, sort_order: 2, created_at: '', updated_at: '' },
    { id: 'nav-about', label: 'About Isha', href: '/about', is_external: false, location: 'header' as const, sort_order: 3, created_at: '', updated_at: '' },
    { id: 'nav-insights', label: 'Insights', href: '/insights', is_external: false, location: 'header' as const, sort_order: 4, created_at: '', updated_at: '' },
    { id: 'nav-connect', label: 'Connect', href: '/connect', is_external: false, location: 'header' as const, sort_order: 5, created_at: '', updated_at: '' },
  ];

  const defaultFooterLinks = [
    { id: 'foot-practice', label: 'The Practice', href: '/practice', is_external: false, location: 'footer' as const, sort_order: 1, created_at: '', updated_at: '' },
    { id: 'foot-sessions', label: 'Sessions', href: '/sessions', is_external: false, location: 'footer' as const, sort_order: 2, created_at: '', updated_at: '' },
    { id: 'foot-about', label: 'About', href: '/about', is_external: false, location: 'footer' as const, sort_order: 3, created_at: '', updated_at: '' },
    { id: 'foot-insights', label: 'Insights', href: '/insights', is_external: false, location: 'footer' as const, sort_order: 4, created_at: '', updated_at: '' },
    { id: 'foot-faq', label: 'FAQ', href: '/faq', is_external: false, location: 'footer' as const, sort_order: 5, created_at: '', updated_at: '' },
    { id: 'foot-connect', label: 'Connect', href: '/connect', is_external: false, location: 'footer' as const, sort_order: 6, created_at: '', updated_at: '' },
  ];

  const headerLinks = headerLinksRaw.length > 0 ? headerLinksRaw : defaultHeaderLinks;
  const footerLinks = footerLinksRaw.length > 0 ? footerLinksRaw : defaultFooterLinks;

  const brandName = settings.brand_name || 'Alchemystery';
  const footerText = settings.footer_text || `© ${new Date().getFullYear()} ${brandName} · All Sacred Rights Reserved`;

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)]"
        style={{ backgroundColor: 'rgba(11, 15, 30, 0.9)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="text-[var(--color-gold)] text-sm tracking-[0.15em] uppercase hover:opacity-80 transition-opacity" 
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {brandName}
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {headerLinks.map((item) => (
              <Link 
                key={item.id} 
                href={item.href}
                target={item.is_external ? '_blank' : undefined}
                rel={item.is_external ? 'noopener noreferrer' : undefined}
                className="text-[var(--color-muted)] text-sm tracking-wide hover:text-[var(--color-ivory)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Nav */}
          <MobileNav items={headerLinks} />
        </div>
      </header>


      <main role="main" className="pt-16">
        {children}
      </main>

      <footer
        role="contentinfo"
        className="border-t border-[var(--color-border-subtle)] py-12 mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          {footerLinks.length > 0 && (
            <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-6 mb-8">
              {footerLinks.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.href}
                  target={item.is_external ? '_blank' : undefined}
                  rel={item.is_external ? 'noopener noreferrer' : undefined}
                  className="text-[var(--color-muted)] text-sm tracking-wide hover:text-[var(--color-ivory)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          
          <p className="text-[var(--color-muted)] text-xs tracking-widest uppercase">
            {footerText}
          </p>
        </div>
      </footer>
    </>
  );
}
