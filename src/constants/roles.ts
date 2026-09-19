/**
 * User role identifiers used across the application.
 * Role authorization is enforced at the database level via RLS;
 * these constants are used for type-safe comparisons in server code only.
 */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
