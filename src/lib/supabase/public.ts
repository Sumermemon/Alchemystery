import { createClient } from '@supabase/supabase-js';

/**
 * Public Server-side Supabase client.
 *
 * Use this ONLY for fetching public data (published posts, settings, etc.) 
 * during Server-Side Rendering (SSR) or Static Site Generation (SSG).
 * It DOES NOT use cookies, so it will not opt pages into dynamic rendering.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
