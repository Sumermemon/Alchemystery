import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFaqById } from '@/lib/repositories/faq.repository';
import { FaqForm } from '../faq-form';

export const metadata: Metadata = { title: 'Edit FAQ — Admin' };

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">Edit FAQ</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Update details for this frequently asked question.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <FaqForm initialData={faq} />
      </div>
    </div>
  );
}
