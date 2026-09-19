import { z } from 'zod';
import { STATUS } from '@/constants/status';

const statusEnum = z.enum([STATUS.DRAFT, STATUS.PUBLISHED, STATUS.ARCHIVED]);

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().max(500).nullable().optional(),
  content: z.string().nullable().optional(),
  cover_image_url: z.string().url().nullable().optional(),
  author_name: z.string().max(200).nullable().optional(),
  status: statusEnum.default(STATUS.DRAFT),
  published_at: z.string().datetime().nullable().optional(),
  seo_title: z.string().max(70).nullable().optional(),
  seo_description: z.string().max(160).nullable().optional(),
  og_image_url: z.string().url().nullable().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
