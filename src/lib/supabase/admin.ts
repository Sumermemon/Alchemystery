/**
 * Privileged Supabase admin client (service-role).
 *
 * IMPORTANT: This file must ONLY be imported in server-side code:
 *  - Server Actions
 *  - Route Handlers
 *  - Server-only utility files
 *
 * It MUST NEVER be imported in:
 *  - 'use client' files
 *  - Files inside the public/ directory
 *  - Any code that could be bundled for the browser
 *
 * The service-role key bypasses Row Level Security.
 * Use only for privileged operations that authenticated RLS policies
 * cannot satisfy (e.g., creating the initial admin profile on signup).
 */

import { createClient } from '@supabase/supabase-js';

// This module-level singleton is safe because this file is server-only.
// Next.js will error at build time if it detects this in client bundles
// (as long as SUPABASE_SERVICE_ROLE_KEY has no NEXT_PUBLIC_ prefix).
let adminClient: ReturnType<typeof createClient> | null = null;

export function createAdminClient() {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. ' +
      'Ensure these are set in .env.local and are NOT prefixed with NEXT_PUBLIC_ for the service role key.',
    );
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
