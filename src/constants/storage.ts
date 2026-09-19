/**
 * Supabase Storage bucket names.
 * Centralised here so bucket names are never magic strings in components.
 */
export const STORAGE_BUCKETS = {
  SERVICE_IMAGES: 'service-images',
  BLOG_IMAGES: 'blog-images',
  PROFILE_IMAGES: 'profile-images',
  SITE_ASSETS: 'site-assets',
  UPLOADS: 'uploads', // private staging bucket before categorisation
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
