import Link from 'next/link';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { getNavigationItems } from '@/lib/repositories/navigation.repository';

/**
 * Public website layout.
 * Wraps all public-facing pages with the site header and footer.
 */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, headerLinks, footerLinks] = await Promise.all([
    getSiteSettings(),
    getNavigationItems('header'),
    getNavigationItems('footer'),
  ]);

  const brandName = settings.brand_name || 'Alchemystery';
  const footerText = settings.footer_text || `© ${new Date().getFullYear()} ${brandName}`;

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
