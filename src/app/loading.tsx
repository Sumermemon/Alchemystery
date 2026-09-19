export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-gold)] animate-spin"
          role="status"
          aria-label="Loading"
        />
        <p className="text-[var(--color-muted)] text-xs tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
