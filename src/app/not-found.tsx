import Link from 'next/link';
import type { Metadata } from 'next';
import { Compass, Sparkles, ArrowRight, Home, HeartHandshake, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Veil Remains Closed · 404 — Alchemystery',
  description: 'The path you seek has dissolved into the ether or has not yet materialized.',
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen relative flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{ backgroundColor: '#070a14' }}
    >
      {/* Mystical Radial Background Aura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 40%, rgba(201, 168, 76, 0.08) 0%, transparent 70%),
            radial-gradient(circle 35% at 50% 50%, rgba(60, 45, 110, 0.12) 0%, transparent 80%)
          `,
        }}
      />

      {/* Subtle Starry Speckles */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(201, 168, 76, 0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        {/* Sacred Emblem */}
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center relative border transition-transform duration-700 hover:rotate-45"
            style={{
              borderColor: 'rgba(201, 168, 76, 0.3)',
              backgroundColor: 'rgba(201, 168, 76, 0.05)',
              boxShadow: '0 0 35px rgba(201, 168, 76, 0.15)',
            }}
          >
            <Compass className="w-9 h-9 text-[var(--color-gold)] opacity-90 animate-pulse" />
            <span
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--color-gold)', boxShadow: '0 0 10px var(--color-gold)' }}
            />
          </div>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3">
          <p className="text-[var(--color-gold)] text-xs tracking-[0.25em] uppercase font-mono">
            Error 404 · Uncharted Realm
          </p>
          <h1
            className="text-3xl sm:text-4xl text-[var(--color-ivory)] font-normal leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            The Veil Remains Closed
          </h1>
          <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto leading-relaxed">
            The doorway you are trying to open has shifted or dissolved into the ether. Let us guide you back to familiar light.
          </p>
        </div>

        {/* Constellation Navigation Links */}
        <div
          className="rounded-2xl p-6 border space-y-3 text-left"
          style={{
            backgroundColor: 'rgba(11, 15, 30, 0.75)',
            borderColor: 'rgba(201, 168, 76, 0.18)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="text-[11px] text-[var(--color-gold)] uppercase tracking-widest font-mono text-center mb-4">
            Sanctuary Portals
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-[rgba(201,168,76,0.4)] bg-white/[0.02] hover:bg-[rgba(201,168,76,0.06)] text-xs text-[var(--color-ivory)] transition-all group"
            >
              <Home className="w-4 h-4 text-[var(--color-gold)] opacity-70 group-hover:opacity-100" />
              <div className="flex-1">
                <span className="font-medium">Sanctuary</span>
                <p className="text-[10px] text-[var(--color-muted)]">Return to Homepage</p>
              </div>
              <ArrowRight className="w-3 h-3 text-[var(--color-muted)] group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/sessions"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-[rgba(201,168,76,0.4)] bg-white/[0.02] hover:bg-[rgba(201,168,76,0.06)] text-xs text-[var(--color-ivory)] transition-all group"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-gold)] opacity-70 group-hover:opacity-100" />
              <div className="flex-1">
                <span className="font-medium">Sessions</span>
                <p className="text-[10px] text-[var(--color-muted)]">Tarot & Akashic</p>
              </div>
              <ArrowRight className="w-3 h-3 text-[var(--color-muted)] group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/practice"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-[rgba(201,168,76,0.4)] bg-white/[0.02] hover:bg-[rgba(201,168,76,0.06)] text-xs text-[var(--color-ivory)] transition-all group"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-gold)] opacity-70 group-hover:opacity-100" />
              <div className="flex-1">
                <span className="font-medium">The Practice</span>
                <p className="text-[10px] text-[var(--color-muted)]">Our Sacred Ethos</p>
              </div>
              <ArrowRight className="w-3 h-3 text-[var(--color-muted)] group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/connect"
              className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-[rgba(201,168,76,0.4)] bg-white/[0.02] hover:bg-[rgba(201,168,76,0.06)] text-xs text-[var(--color-ivory)] transition-all group"
            >
              <HeartHandshake className="w-4 h-4 text-[var(--color-gold)] opacity-70 group-hover:opacity-100" />
              <div className="flex-1">
                <span className="font-medium">Connect</span>
                <p className="text-[10px] text-[var(--color-muted)]">Direct Inquiry</p>
              </div>
              <ArrowRight className="w-3 h-3 text-[var(--color-muted)] group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Sacred Quote */}
        <p className="text-[11px] text-[var(--color-muted)] italic opacity-60">
          &ldquo;Every detour in consciousness reveals a hidden truth.&rdquo;
        </p>
      </div>
    </main>
  );
}
