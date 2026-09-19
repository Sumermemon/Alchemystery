import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageById } from '@/lib/repositories/page.repository';
import { PageForm } from '../page-form';

export const metadata: Metadata = { title: 'Edit Page — Admin' };

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(id);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Edit Page</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Update details for this custom page.</p>
      </div>

      <PageForm initialData={page} />
    </div>
  );
}
