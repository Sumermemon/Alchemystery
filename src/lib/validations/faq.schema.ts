import { z } from 'zod';
import { STATUS } from '@/constants/status';

const statusEnum = z.enum([STATUS.DRAFT, STATUS.PUBLISHED, STATUS.ARCHIVED]);

export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required').max(500),
  answer: z.string().min(1, 'Answer is required'),
  category: z.string().max(100).nullable().optional(),
  sort_order: z.number().int().min(0).default(0),
  status: statusEnum.default(STATUS.DRAFT),
});

export type FaqFormData = z.infer<typeof faqSchema>;
