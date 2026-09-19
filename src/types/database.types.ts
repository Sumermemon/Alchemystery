/**
 * Hand-authored Supabase database types.
 *
 * In a production workflow these would be generated via:
 *   npx supabase gen types typescript --project-id <id> > src/types/database.types.ts
 *
 * For Phase 1, these are hand-authored to match the migration schema exactly.
 * Regenerate after any schema changes.
 */

import type { ContentStatus } from '@/constants/status';
import type { Role } from '@/constants/roles';

// ---------------------------------------------------------------------------
// Row types — shape of a single database row
// ---------------------------------------------------------------------------

export interface ProfileRow {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceRow {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  duration_minutes: number | null;
  price_display: string | null; // e.g. "₹2,500" — display string, not a numeric amount
  image_url: string | null;
  sort_order: number;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageRow {
  id: string;
  title: string;
  slug: string;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageSectionRow {
  id: string;
  page_id: string;
  section_key: string; // e.g. "hero", "intro", "cta"
  heading: string | null;
  subheading: string | null;
  body: string | null;   // rich text / markdown
  image_url: string | null;
  cta_label: string | null;
  cta_url: string | null;
  sort_order: number;
  status: ContentStatus;
  metadata: Record<string, unknown> | null; // flexible extra data per section type
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  author_name: string;
  author_initials: string | null;
  content: string;
  service_id: string | null;
  status: ContentStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;   // markdown / rich text
  cover_image_url: string | null;
  author_name: string | null;
  status: ContentStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRow {
  id: string;
  key: string;           // e.g. "brand_name", "contact_email"
  value: unknown;        // jsonb — string, number, boolean, or object
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface NavigationItemRow {
  id: string;
  label: string;
  href: string;
  location: 'header' | 'footer';
  sort_order: number;
  is_external: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaAssetRow {
  id: string;
  bucket: string;
  storage_path: string;
  file_name: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  uploaded_by: string | null; // references profiles.id
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Insert types — used when creating new rows (id, timestamps omitted)
// ---------------------------------------------------------------------------

export type InsertService = Omit<ServiceRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertBlogPost = Omit<BlogPostRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertFaq = Omit<FaqRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertTestimonial = Omit<TestimonialRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertPage = Omit<PageRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertPageSection = Omit<PageSectionRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertNavigationItem = Omit<NavigationItemRow, 'id' | 'created_at' | 'updated_at'>;
export type InsertMediaAsset = Omit<MediaAssetRow, 'id' | 'created_at' | 'updated_at'>;

// ---------------------------------------------------------------------------
// Update types — all fields optional except id
// ---------------------------------------------------------------------------

export type UpdateService = Partial<InsertService> & { id: string };
export type UpdateBlogPost = Partial<InsertBlogPost> & { id: string };
export type UpdateFaq = Partial<InsertFaq> & { id: string };
export type UpdateTestimonial = Partial<InsertTestimonial> & { id: string };
export type UpdatePage = Partial<InsertPage> & { id: string };
export type UpdatePageSection = Partial<InsertPageSection> & { id: string };
