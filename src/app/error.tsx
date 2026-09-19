'use client';

/**
 * Global error boundary — catches unhandled errors in the root layout's children.
 * For more granular error handling, add error.tsx files in specific route segments.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0B0F1E', color: '#F4EDD3', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '2rem' }}>
          <p style={{ color: '#C9A84C', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>
            An unexpected error occurred
          </h1>
          <p style={{ color: '#8892AA', marginBottom: '2rem', fontSize: '0.9375rem' }}>
            {process.env.NODE_ENV === 'development' ? error.message : 'Please try refreshing the page.'}
          </p>
          <button
            onClick={reset}
            style={{ backgroundColor: 'transparent', border: '1px solid rgba(201, 168, 76, 0.4)', color: '#C9A84C', padding: '0.625rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', letterSpacing: '0.05em' }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
