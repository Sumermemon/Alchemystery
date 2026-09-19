/**
 * Supabase Storage URL helpers.
 *
 * Centralises the construction of public storage URLs so they are
 * never built ad-hoc in components. If the CDN path or bucket structure
 * changes, only this file needs to be updated.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

/**
 * Returns the public URL for a file in a public Supabase Storage bucket.
 * @param bucket - The bucket name (use STORAGE_BUCKETS constants)
 * @param path   - The storage object path within the bucket
 */
export function getStorageUrl(bucket: string, path: string): string {
  if (!path) return '';
  // If the path is already a full URL, return it as-is
  if (path.startsWith('http')) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Returns a placeholder image URL for use when no image is set.
 * This is a local /public asset — replace with a real placeholder in production.
 */
export function getPlaceholderImageUrl(): string {
  return '/images/placeholder.jpg';
}
