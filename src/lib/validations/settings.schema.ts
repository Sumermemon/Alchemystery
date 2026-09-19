import { z } from 'zod';

/**
 * Validates individual site setting values by key.
 * Settings are stored as JSON in the database, so each must be
 * validated before write to ensure type integrity.
 */
export const siteSettingValueSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
  description: z.string().nullable().optional(),
});

/**
 * Schema for the full settings form when editing multiple settings at once.
 * All fields are optional so partial updates are valid.
 */
export const siteSettingsFormSchema = z.object({
  brand_name: z.string().min(1).max(100).optional(),
  website_title: z.string().min(1).max(200).optional(),
  tagline: z.string().max(300).optional(),
  contact_email: z.string().email().optional(),
  contact_phone: z.string().max(20).nullable().optional(),
  whatsapp: z.string().max(20).nullable().optional(),
  address: z.string().max(500).nullable().optional(),
  instagram_url: z.string().url().nullable().optional(),
  facebook_url: z.string().url().nullable().optional(),
  youtube_url: z.string().url().nullable().optional(),
  logo_url: z.string().url().nullable().optional(),
  favicon_url: z.string().url().nullable().optional(),
  default_seo_title: z.string().max(70).optional(),
  default_seo_description: z.string().max(160).optional(),
  footer_text: z.string().max(500).nullable().optional(),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsFormSchema>;
