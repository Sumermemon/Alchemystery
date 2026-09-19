'use client';

/**
 * Browser-side Supabase client.
 *
 * Use this in Client Components ('use client') only.
 * Uses the public anon key — subject to Row Level Security.
 * Never use the service-role key here.
 */

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
