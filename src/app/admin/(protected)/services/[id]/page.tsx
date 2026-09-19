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
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Edit Service</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Update details for {service.title}.</p>
      </div>

      <ServiceForm initialData={service} />
    </div>
  );
}
