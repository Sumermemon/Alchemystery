import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedPageBySlug } from '@/lib/repositories/page.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { siteConfig } from '@/config/site';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [page, settings] = await Promise.all([
      getPublishedPageBySlug(slug),
      getSiteSettings(),
    ]);

    if (!page) return { title: 'Page Not Found' };

    const brandName = settings.brand_name || siteConfig.name;
    const title = page.seo_title || `${page.title} | ${brandName}`;
    const description = page.seo_description || `Explore ${page.title} at ${brandName}.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        images: page.og_image_url ? [page.og_image_url] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: page.og_image_url ? [page.og_image_url] : undefined,
      },
    };
  } catch {
    return { title: 'Alchemystery' };
  }
}

export default async function DynamicCustomPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const sections = page.sections || [];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Header */}
      <section
        className="relative pt-32 pb-16 px-6 overflow-hidden text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(61,44,92,0.2) 0%, transparent 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alchemystery · Sanctuary</span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[var(--color-ivory)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {page.title}
          </h1>
          {page.seo_description && (
            <p className="text-[var(--color-muted)] text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              {page.seo_description}
            </p>
          )}
        </div>
      </section>

      {/* Social / OG Banner Image if available */}
      {page.og_image_url && (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-2xl">
            <img
              src={page.og_image_url}
              alt={page.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content & Page Sections */}
      <main className="max-w-4xl mx-auto px-6">
        {sections.length > 0 ? (
          <div className="space-y-16">
            {sections.map((section) => (
              <section
                key={section.id}
                className="rounded-2xl p-6 sm:p-10 border transition-all"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(201,168,76,0.15)',
                }}
              >
                {section.heading && (
                  <h2
                    className="text-2xl md:text-3xl text-[var(--color-ivory)] mb-3"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {section.heading}
                  </h2>
                )}
                {section.subheading && (
                  <p className="text-[var(--color-gold)] text-sm tracking-wide uppercase mb-6">
                    {section.subheading}
                  </p>
                )}
                {section.image_url && (
                  <div className="my-6 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] max-h-96">
                    <img
                      src={section.image_url}
                      alt={section.heading || page.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {section.body && (
                  <div className="mt-4">
                    <MarkdownRenderer content={section.body} />
                  </div>
                )}
                {section.cta_label && section.cta_url && (
                  <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                    <Link
                      href={section.cta_url}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--color-gold)',
                        color: '#0B0F1E',
                      }}
                    >
                      <span>{section.cta_label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          /* Graceful Welcome Sanctuary if page is newly created without sections yet */
          <div
            className="rounded-2xl p-8 md:p-12 text-center border space-y-6"
            style={{
              background: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(201,168,76,0.15)',
            }}
          >
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2
                className="text-2xl text-[var(--color-ivory)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                A Sanctuary in Becoming
              </h2>
              <p className="text-[var(--color-muted)] text-sm md:text-base max-w-lg mx-auto">
                This custom sanctuary space is currently active and published. Return soon or reach out directly to learn more about our intuitive offerings.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/sessions"
                className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: '#0B0F1E',
                }}
              >
                Explore Sessions
              </Link>
              <Link
                href="/connect"
                className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[var(--color-ivory)] border border-[rgba(255,255,255,0.2)] hover:border-[var(--color-gold)] transition-colors"
              >
                Connect & Inquire
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
