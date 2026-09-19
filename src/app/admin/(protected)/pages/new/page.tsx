import type { Metadata } from 'next';
import { PageForm } from '../page-form';

export const metadata: Metadata = { title: 'New Page — Admin' };

export default function NewPagePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>New Page</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Add a new custom page.</p>
      </div>

      <PageForm />
    </div>
  );
}
