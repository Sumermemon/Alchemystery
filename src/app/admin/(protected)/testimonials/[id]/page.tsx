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
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>Edit Testimonial</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Update details for this client reflection.</p>
      </div>

      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
