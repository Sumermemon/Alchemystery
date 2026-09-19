import { z } from 'zod';
import { STATUS } from '@/constants/status';

const statusEnum = z.enum([STATUS.DRAFT, STATUS.PUBLISHED, STATUS.ARCHIVED]);

export const serviceSchema = z.object({
  category_id: z.string().uuid().nullable().optional(),
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  short_description: z.string().max(500).nullable().optional(),
  description: z.string().nullable().optional(),
  duration_minutes: z.number().int().positive().nullable().optional(),
  price_display: z.string().max(100).nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().min(0).default(0),
  status: statusEnum.default(STATUS.DRAFT),
  seo_title: z.string().max(70).nullable().optional(),
  seo_description: z.string().max(160).nullable().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
