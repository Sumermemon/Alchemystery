/**
 * Static site configuration — used as fallback values when
 * site_settings have not yet been fetched from Supabase, or when
 * running in environments where the database is unavailable.
 *
 * In production, all user-facing values should come from site_settings
 * managed by the Super Admin in the CMS. This file is NOT the source
 * of truth for content — only for structural defaults.
 */
export const siteConfig = {
  name: 'Alchemystery',
  domain: 'alchemystery.in',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://alchemystery.in',
  practitioner: {
    name: 'Isha Singasane',
    title: 'Founder & Spiritual Practitioner',
  },
  defaultMeta: {
    title: 'Alchemystery — A Space for Your Inner Truth',
    description:
      'Alchemystery brings together intuitive and spiritual practices to help you explore life\'s questions with greater awareness and perspective.',
    ogImage: '/og-default.jpg',
  },
  social: {
    instagram: 'https://instagram.com/alchemystery',
    facebook: null as string | null,
    youtube: null as string | null,
  },
} as const;
