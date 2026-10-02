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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">Edit Page</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Update details for this custom page.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <PageForm initialData={page} />
      </div>
    </div>
  );
}
