/**
 * Application-level content types.
 *
 * These are the types used by the public website and CMS components
 * after data has been fetched and transformed from raw database rows.
 * They may be a subset or enriched version of the raw database types.
 */

import type {
  ServiceRow,
  ServiceCategoryRow,
  BlogPostRow,
  FaqRow,
  TestimonialRow,
  PageRow,
  PageSectionRow,
  NavigationItemRow,
  SiteSettingRow,
} from './database.types';

// Re-export for convenient consumption in components
export type {
  ServiceRow as Service,
  ServiceCategoryRow as ServiceCategory,
  BlogPostRow as BlogPost,
  FaqRow as Faq,
  TestimonialRow as Testimonial,
  PageRow as Page,
  PageSectionRow as PageSection,
  NavigationItemRow as NavigationItem,
};

// ---------------------------------------------------------------------------
// Enriched / joined types
// ---------------------------------------------------------------------------

/** Service with its category data joined */
export interface ServiceWithCategory extends ServiceRow {
  category: ServiceCategoryRow | null;
}

/** Page with all of its sections joined */
export interface PageWithSections extends PageRow {
  sections: PageSectionRow[];
}

// ---------------------------------------------------------------------------
// Site settings typed map
// Provides strong typing when reading settings by key.
// ---------------------------------------------------------------------------

export interface SiteSettings {
  brand_name: string;
  website_title: string;
  tagline: string;
  contact_email: string;
  contact_phone: string | null;
  whatsapp: string | null;
  address: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  default_seo_title: string;
  default_seo_description: string;
  footer_text: string | null;
}

/**
 * Converts an array of SiteSettingRow records into the typed SiteSettings map.
 * Unknown keys are silently ignored.
 */
export function buildSiteSettings(rows: SiteSettingRow[]): Partial<SiteSettings> {
  return rows.reduce<Partial<SiteSettings>>((acc, row) => {
    return { ...acc, [row.key]: row.value };
  }, {});
}

// ---------------------------------------------------------------------------
// SEO metadata type used in Next.js Metadata generation
// ---------------------------------------------------------------------------

export interface PageSeoMeta {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

// ---------------------------------------------------------------------------
// Pagination helpers
// ---------------------------------------------------------------------------

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
