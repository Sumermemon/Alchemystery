/**
 * Authentication and session types for the application.
 * These extend / wrap Supabase's own auth types for application use.
 */

import type { User } from '@supabase/supabase-js';
import type { ProfileRow } from './database.types';
import type { Role } from '@/constants/roles';

/** The complete authenticated user context used in server components and middleware */
export interface AuthUser {
  supabaseUser: User;
  profile: ProfileRow;
}

/** Minimal user info safe to pass to client components */
export interface ClientSafeUser {
  id: string;
  email: string | undefined;
  displayName: string | null;
  role: Role;
  avatarUrl: string | null;
}

/** Converts a full AuthUser to a safe, serialisable version for client components */
export function toClientSafeUser(authUser: AuthUser): ClientSafeUser {
  return {
    id: authUser.supabaseUser.id,
    email: authUser.supabaseUser.email,
    displayName: authUser.profile.display_name,
    role: authUser.profile.role,
    avatarUrl: authUser.profile.avatar_url,
  };
}

/** Result shape for auth service operations */
export type AuthResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
