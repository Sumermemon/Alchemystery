/**
 * Authentication service — wraps Supabase auth operations and
 * couples them with application profile data.
 *
 * This is the only file that should call auth.signIn / auth.signOut.
 * Components and Server Actions import this service, not the Supabase
 * client directly, to keep auth logic centralised.
 */

import { createClient } from '@/lib/supabase/server';
import { ROLES } from '@/constants/roles';
import type { AuthUser, AuthResult } from '@/types/auth.types';
import type { ProfileRow } from '@/types/database.types';

/**
 * Returns the currently authenticated user with their profile.
 * Returns null if no session exists or if the profile is missing.
 * Used in server components and server actions.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) return null;

  return { supabaseUser: user, profile };
}

/**
 * Verifies the current user is a Super Admin.
 * Always fetches fresh data — never trusts cached/client state.
 * Returns the AuthUser if verified, null otherwise.
 */
export async function requireSuperAdmin(): Promise<AuthUser | null> {
  const authUser = await getCurrentUser();
  if (!authUser) return null;
  if (authUser.profile.role !== ROLES.SUPER_ADMIN) return null;
  return authUser;
}

/**
 * Signs in with email and password.
 * Returns success or a sanitised error message.
 */
export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthResult<{ userId: string }>> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: 'Invalid email or password.' };
  }

  return { success: true, data: { userId: data.user.id } };
}

/** Signs out the current user */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

/**
 * Fetches a profile by user id.
 * Used after sign-up to confirm profile creation by the DB trigger.
 */
export async function getProfileById(userId: string): Promise<ProfileRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

// Adding a temporary debug log function for requireSuperAdmin
export async function debugAuth() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('authError:', authError);
  console.log('user:', user?.id);
  if (!user) return null;
  const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  console.log('profileError:', profileError);
  console.log('profile:', profile);
}

