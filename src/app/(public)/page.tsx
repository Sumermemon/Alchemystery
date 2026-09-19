import type { Metadata } from 'next';
import { getPublishedPageBySlug } from '@/lib/repositories/page.repository';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { getPublishedServices } from '@/lib/repositories/service.repository';
import { getPublishedTestimonials } from '@/lib/repositories/testimonial.repository';
import { getPublishedBlogPosts } from '@/lib/repositories/blog.repository';
import { siteConfig } from '@/config/site';

// Sections
import { HeroSection } from '@/components/home/hero-section';
import { PracticeSection } from '@/components/home/practice-section';
import { SessionsSection } from '@/components/home/sessions-section';
import { BioSection } from '@/components/home/bio-section';
import { StepsSection } from '@/components/home/steps-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { InsightsSection } from '@/components/home/insights-section';
import { CtaSection } from '@/components/home/cta-section';

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPublishedPageBySlug('home'),
    getSiteSettings()
  ]);
  
  const brandName = settings.brand_name || 'Alchemystery';

  if (!page) {
    return {
      title: `${siteConfig.defaultMeta.title} | ${brandName}`,
      description: siteConfig.defaultMeta.description,
    };
  }

  return {
    title: page.seo_title ? `${page.seo_title} | ${brandName}` : `${page.title} | ${brandName}`,
    description: page.seo_description || siteConfig.defaultMeta.description,
    openGraph: page.og_image_url ? { images: [page.og_image_url] } : undefined,
  };
}

export default async function HomePage() {
  const [services, testimonials, posts, settings] = await Promise.all([
    getPublishedServices(),
    getPublishedTestimonials(),
    getPublishedBlogPosts(),
    getSiteSettings(),
  ]);

  const brandName = settings.brand_name || siteConfig.name;
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: brandName,
    description: siteConfig.defaultMeta.description,
    url: baseUrl,
    founder: {
      '@type': 'Person',
      name: siteConfig.practitioner.name,
      jobTitle: siteConfig.practitioner.title,
    },
    priceRange: '₹₹',
    areaServed: 'IN',
    knowsAbout: [
      'Tarot Reading',
      'Akashic Records',
      'Spiritual Guidance',
      'Inner Work',
      'Energy Reading',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Spiritual Practices & Sessions',
      itemListElement: services.map((s, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.short_description || undefined,
          url: `${baseUrl}/sessions/${s.slug}`,
        },
        position: idx + 1,
      })),
    },
    sameAs: [
      siteConfig.social.instagram,
    ].filter(Boolean),
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <PracticeSection />
      <SessionsSection services={services} />
      <BioSection />
      <StepsSection />
      <TestimonialsSection testimonials={testimonials} />
      <InsightsSection posts={posts} />
      <CtaSection />
    </>
  );
}
