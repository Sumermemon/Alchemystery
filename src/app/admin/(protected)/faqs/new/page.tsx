import type { Metadata } from 'next';
import { FaqForm } from '../faq-form';

export const metadata: Metadata = { title: 'New FAQ — Admin' };

export default function NewFaqPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>New FAQ</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Add a new frequently asked question.</p>
      </div>

      <FaqForm />
    </div>
  );
}
