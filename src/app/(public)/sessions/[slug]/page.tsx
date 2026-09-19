import type { Metadata } from 'next';
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
    
    return {
      title: `${service.seo_title ?? service.title} | ${brandName}`,
      description: service.seo_description ?? service.short_description ?? undefined,
      openGraph: service.image_url ? { images: [service.image_url] } : undefined,
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
    // DB not yet configured — show placeholder
  }

  if (!service) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-24">
      <header className="text-center mb-16 space-y-6">
        {service.category && (
          <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase">
            {service.category}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          {service.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-[var(--color-muted)] text-sm tracking-wide">
          {service.duration_minutes && <span>{service.duration_minutes} min</span>}
          {service.duration_minutes && service.price_display && <span className="text-[var(--color-gold)]">•</span>}
          {service.price_display && <span>{service.price_display}</span>}
        </div>
      </header>

      {service.image_url && (
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-16 border border-[rgba(255,255,255,0.06)]">
          <img 
            src={service.image_url} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {service.long_description && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-8 md:p-12">
          <MarkdownRenderer content={service.long_description} />
        </div>
      )}
      
      {/* Booking CTA will be added here in a later phase */}
    </article>
  );
}
