import { z } from 'zod';
import { STATUS } from '@/constants/status';

const statusEnum = z.enum([STATUS.DRAFT, STATUS.PUBLISHED, STATUS.ARCHIVED]);

export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  status: statusEnum.default(STATUS.DRAFT),
  seo_title: z.string().max(70).nullable().optional(),
  seo_description: z.string().max(160).nullable().optional(),
  og_image_url: z.string().url().nullable().optional(),
});

export const pageSectionSchema = z.object({
  page_id: z.string().uuid(),
  section_key: z.string().min(1).max(100),
  heading: z.string().max(300).nullable().optional(),
  subheading: z.string().max(500).nullable().optional(),
  body: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  cta_label: z.string().max(100).nullable().optional(),
  cta_url: z.string().max(500).nullable().optional(),
  sort_order: z.number().int().min(0).default(0),
  status: statusEnum.default(STATUS.DRAFT),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type PageFormData = z.infer<typeof pageSchema>;
export type PageSectionFormData = z.infer<typeof pageSectionSchema>;
