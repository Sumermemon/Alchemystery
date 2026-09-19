/**
 * Content lifecycle statuses for CMS-managed entities.
 * The public website only renders 'published' content.
 */
export const STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type ContentStatus = (typeof STATUS)[keyof typeof STATUS];
