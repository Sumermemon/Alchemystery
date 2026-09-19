/**
 * Converts a string to a URL-safe slug.
 * e.g. "Akashic Records" → "akashic-records"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove non-word characters
    .replace(/[\s_-]+/g, '-')   // replace spaces/underscores/hyphens with single hyphen
    .replace(/^-+|-+$/g, '');   // strip leading/trailing hyphens
}
