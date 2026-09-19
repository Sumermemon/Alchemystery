import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPageBySlug } from '@/lib/repositories/page.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { PageRenderer } from '@/components/ui/page-renderer';

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPublishedPageBySlug('about'),
    getSiteSettings()
  ]);
  
  if (!page) {
    return { title: 'About' };
  }

  const brandName = settings.brand_name || 'Alchemystery';
  return {
    title: page.seo_title ? `${page.seo_title} | ${brandName}` : `${page.title} | ${brandName}`,
    description: page.seo_description || undefined,
    openGraph: page.og_image_url ? { images: [page.og_image_url] } : undefined,
  };
}

export default async function AboutPage() {
  const page = await getPublishedPageBySlug('about');
  
  if (!page) {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      notFound();
    }
    return null;
  }

  return (
    <>
      <div className="text-center pt-24 pb-12">
        <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">Meet Isha</p>
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          {page.title}
        </h1>
      </div>
      <PageRenderer page={page} />
    </>
  );
}
