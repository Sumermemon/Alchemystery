import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth callback route — handles the code exchange after a Supabase
 * OAuth flow or magic link click. For Phase 1 (email/password auth),
 * this route is registered but not actively used.
 *
 * If OAuth providers (Google, etc.) are added in a future phase,
 * this route handles the redirect_uri callback.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Exchange failed — redirect to login with an error indicator
  return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`);
}
