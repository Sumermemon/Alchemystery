import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedServices } from '@/lib/repositories/service.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name || 'Alchemystery';
  return {
    title: `Sessions | ${brandName}`,
    description: 'Explore sessions offered by Alchemystery — Akashic Records, Tarot, Numerology, Spiritual Guidance, and Energy Healing.',
  };
}

export default async function SessionsPage() {
  const services = await getPublishedServices();

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-24">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">Our Sessions</p>
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          Explore the Sessions
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link 
            key={service.id} 
            href={`/sessions/${service.slug}`}
            className="group block rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            {service.image_url ? (
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={service.image_url} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] w-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                <span className="text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-serif)' }}>Alchemystery</span>
              </div>
            )}
            <div className="p-8">
              {service.category && (
                <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">
                  {service.category}
                </p>
              )}
              <h2 className="text-2xl mb-4 group-hover:text-[var(--color-ivory)] transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                {service.title}
              </h2>
              <p className="text-[var(--color-muted)] text-sm line-clamp-3 mb-6">
                {service.short_description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-ivory)]">{service.price_display}</span>
                {service.duration_minutes && (
                  <span className="text-[var(--color-muted)]">{service.duration_minutes} min</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {services.length === 0 && (
        <div className="text-center py-24 text-[var(--color-muted)]">
          No sessions available at the moment.
        </div>
      )}
    </div>
  );
}
