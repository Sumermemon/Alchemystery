import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedServiceBySlug, getPublishedServices } from '@/lib/repositories/service.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const services = await getPublishedServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [service, settings] = await Promise.all([
      getPublishedServiceBySlug(slug),
      getSiteSettings(),
    ]);
    if (!service) return { title: 'Session Not Found' };
    const brandName = settings.brand_name || 'Alchemystery';
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://alchemystery.in').replace(/\/$/, '');
    return {
      title: `${service.seo_title ?? service.title} | ${brandName}`,
      description: service.seo_description ?? service.short_description ?? undefined,
      alternates: {
        canonical: `${baseUrl}/sessions/${service.slug}`,
      },
      openGraph: {
        title: `${service.seo_title ?? service.title} | ${brandName}`,
        description: service.seo_description ?? service.short_description ?? undefined,
        url: `${baseUrl}/sessions/${service.slug}`,
        images: service.image_url ? [service.image_url] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${service.title} | ${brandName}`,
        description: service.short_description ?? undefined,
      },
    };
  } catch {
    return { title: 'Session' };
  }
}

export default async function SessionDetailPage({ params }: Props) {
  const { slug } = await params;

  let service = null;
  try {
    service = await getPublishedServiceBySlug(slug);
  } catch {
    // DB not yet configured
  }

  if (!service) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(61,44,92,0.2) 0%, transparent 100%)',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207,165,106,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Back link */}
          <Link
            href="/sessions"
            className="inline-flex items-center gap-2 text-xs text-[var(--color-muted)] tracking-widest uppercase hover:text-[var(--color-ivory)] transition-colors mb-10"
          >
            ← All Sessions
          </Link>

          <p className="text-[var(--color-gold)] text-xs tracking-[0.3em] uppercase mb-6">
            Session
          </p>

          <h1
            className="text-5xl md:text-6xl mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {service.title}
          </h1>

          {service.short_description && (
            <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              {service.short_description}
            </p>
          )}

          {/* Meta pills */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {service.duration_minutes && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--color-muted)',
                }}
              >
                <span style={{ color: 'var(--color-gold)' }}>◎</span>
                {service.duration_minutes} minutes
              </div>
            )}
            {service.price_display && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  backgroundColor: 'rgba(207,165,106,0.08)',
                  border: '1px solid rgba(207,165,106,0.2)',
                  color: 'var(--color-gold)',
                }}
              >
                {service.price_display}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image */}
      {service.image_url && (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.06)]">
            <img
              src={service.image_url}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        {service.description ? (
          <div
            className="rounded-2xl p-8 md:p-12 border mb-16"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <MarkdownRenderer content={service.description} />
          </div>
        ) : (
          <div
            className="rounded-2xl p-8 md:p-12 border mb-16 text-center"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-[var(--color-muted)] leading-relaxed max-w-xl mx-auto">
              {service.short_description || `A one-to-one ${service.title} session with Isha, offered online.`}
            </p>
          </div>
        )}

        {/* Booking CTA */}
        <div
          className="text-center py-16 px-8 rounded-2xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(61,44,92,0.2) 0%, rgba(11,15,30,0.4) 100%)',
            borderColor: 'rgba(207,165,106,0.2)',
          }}
        >
          <div
            className="text-3xl mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            ✦
          </div>
          <h2
            className="text-2xl md:text-3xl mb-4"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}
          >
            Ready to Begin?
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-sm mx-auto">
            Reach out to book this session or ask any questions you may have.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={`/connect?session=${encodeURIComponent(service.title)}`}
              className="inline-block px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] transition-all duration-300"
            >
              Book this Session
            </Link>
            <Link
              href="/sessions"
              className="inline-block px-8 py-4 border border-[rgba(255,255,255,0.12)] text-[var(--color-muted)] text-xs tracking-[0.2em] uppercase hover:border-[var(--color-ivory)] hover:text-[var(--color-ivory)] transition-all duration-300"
            >
              All Sessions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
