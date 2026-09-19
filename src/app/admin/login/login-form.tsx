'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

/**
 * Client-side login form — only rendered when Supabase is configured.
 * Kept in a separate file so page.tsx can be a server component that
 * safely checks env vars before instantiating any Supabase client.
 */
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#0B0F1E' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-3">
            Alchemystery
          </p>
          <h1
            className="text-2xl text-[var(--color-ivory)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Admin Access
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-[var(--color-muted)] uppercase tracking-wider mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm text-[var(--color-ivory)] rounded border outline-none focus:border-[rgba(201,168,76,0.5)] transition-colors"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs text-[var(--color-muted)] uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm text-[var(--color-ivory)] rounded border outline-none focus:border-[rgba(201,168,76,0.5)] transition-colors"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center" role="alert">
              {error}
            </p>
          )}

          <button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm tracking-wider uppercase transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: '#0B0F1E',
              fontWeight: 600,
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
