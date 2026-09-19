import { z } from 'zod';
import { STATUS } from '@/constants/status';

const statusEnum = z.enum([STATUS.DRAFT, STATUS.PUBLISHED, STATUS.ARCHIVED]);

export const testimonialSchema = z.object({
  author_name: z.string().min(1, 'Author name is required').max(200),
  author_initials: z.string().max(5).nullable().optional(),
  content: z.string().min(1, 'Testimonial content is required').max(2000),
  service_id: z.string().uuid('Service ID must be a valid UUID (or leave it blank)').nullable().optional(),
  status: statusEnum.default(STATUS.DRAFT),
  sort_order: z.number().int().min(0).default(0),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;
