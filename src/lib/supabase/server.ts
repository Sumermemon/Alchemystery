/**
 * Server-side Supabase client.
 *
 * Use this in:
 *  - Server Components
 *  - Server Actions
 *  - Route Handlers
 *
 * Reads the user's session from cookies — requests are made as the
 * authenticated user, still governed by Row Level Security.
 * Never import this in 'use client' files.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method is called from a Server Component.
            // This error can be safely ignored — session refresh is handled
            // by the middleware which can write cookies.
          }
        },
      },
    },
  );
}
