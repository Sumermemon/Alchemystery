import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[var(--color-gold)] text-sm tracking-widest uppercase mb-4">
          404
        </p>
        <h1 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Page Not Found
        </h1>
        <p className="text-[var(--color-muted)] mb-8 text-[0.9375rem]">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-block border border-[rgba(201,168,76,0.4)] text-[var(--color-gold)] px-6 py-2.5 text-sm tracking-wide hover:border-[var(--color-gold)] transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
