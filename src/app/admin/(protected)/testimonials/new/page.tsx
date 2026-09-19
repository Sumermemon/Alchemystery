import type { Metadata } from 'next';
import { TestimonialForm } from '../testimonial-form';

export const metadata: Metadata = { title: 'New Testimonial — Admin' };

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>New Testimonial</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Add a new client reflection.</p>
      </div>

      <TestimonialForm />
    </div>
  );
}
