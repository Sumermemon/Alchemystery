'use client';

import Link from 'next/link';
import type { ServiceRow } from '@/types/database.types';

export function SessionsSection({ services }: { services: ServiceRow[] }) {
  return (
    <section className="bg-[var(--color-midnight)] py-24 px-6 relative border-t border-[rgba(255,255,255,0.02)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              OUR SESSIONS
            </p>
            <h2 className="text-4xl md:text-5xl leading-[1.2]" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ivory)' }}>
              Explore the Sessions
            </h2>
          </div>
          <p className="text-[var(--color-slate-muted)] text-xs tracking-[0.2em] uppercase font-medium">
            DIFFERENT PATHS. A DEEPER YOU.
          </p>
        </div>

        {/* Horizontal Scroll / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col h-full bg-[#151E3D] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-colors">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#060913] relative">
                {service.image_url ? (
                  <img 
                    src={service.image_url} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-gold)] opacity-30" style={{ fontFamily: 'var(--font-serif)' }}>
                    Alchemystery
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl mb-3 text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                  {service.title}
                </h3>
                <p className="text-[var(--color-slate-muted)] text-sm line-clamp-3 mb-6 font-medium leading-relaxed flex-grow">
                  {service.short_description}
                </p>
                <Link 
                  href={`/sessions/${service.slug}`}
                  className="text-[var(--color-ivory)] text-xs tracking-widest uppercase font-semibold group-hover:text-[var(--color-gold)] transition-colors flex items-center gap-2 mt-auto"
                >
                  Learn more <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
