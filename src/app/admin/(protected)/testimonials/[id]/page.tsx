import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTestimonialById } from '@/lib/repositories/testimonial.repository';
import { TestimonialForm } from '../testimonial-form';

export const metadata: Metadata = { title: 'Edit Testimonial — Admin' };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">Edit Testimonial</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Update details for this client reflection.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <TestimonialForm initialData={testimonial} />
      </div>
    </div>
  );
}
