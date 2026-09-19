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
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Edit FAQ</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Update details for this frequently asked question.</p>
      </div>

      <FaqForm initialData={faq} />
    </div>
  );
}
