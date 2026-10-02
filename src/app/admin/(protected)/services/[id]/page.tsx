import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceById } from '@/lib/repositories/service.repository';
import { ServiceForm } from '../service-form';

export const metadata: Metadata = { title: 'Edit Service — Admin' };

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">Edit Service</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Update details for {service.title}.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <ServiceForm initialData={service} />
      </div>
    </div>
  );
}
