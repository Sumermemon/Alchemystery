import { Suspense } from 'react';
import LoginForm from './login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Login' };

/**
 * /admin/login — Server component wrapper.
 *
 * Checks whether Supabase credentials are configured before rendering
 * the client-side login form. If credentials are missing, shows a
 * clear setup notice instead of crashing the browser client.
 */
export default function AdminLoginPage() {
  const isConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isConfigured) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: '#0B0F1E' }}
      >
        <div className="w-full max-w-md text-center">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">
            Alchemystery · Admin
          </p>
          <h1
            className="text-2xl text-[var(--color-ivory)] mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Supabase Not Configured
          </h1>

          <div
            className="text-left rounded-lg p-5 mb-6 space-y-3"
            style={{ backgroundColor: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <p className="text-[var(--color-gold)] text-xs font-semibold uppercase tracking-wider mb-1">
              Setup required
            </p>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              Open <code className="text-[var(--color-ivory)] bg-white/5 px-1 py-0.5 rounded text-xs">.env.local</code> in the project root and fill in your Supabase credentials:
            </p>
            <pre
              className="text-xs rounded p-3 overflow-x-auto"
              style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#a0aec0' }}
            >
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...`}
            </pre>
            <p className="text-[var(--color-muted)] text-sm">
              Then restart the dev server with{' '}
              <code className="text-[var(--color-ivory)] bg-white/5 px-1 py-0.5 rounded text-xs">
                npm run dev
              </code>
              .
            </p>
          </div>

          <p className="text-[var(--color-muted)] text-xs">
            Find your credentials in your Supabase project under{' '}
            <span className="text-[var(--color-ivory)]">Settings → API</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
