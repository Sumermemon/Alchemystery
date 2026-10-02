import type { Metadata } from 'next';
import { TestimonialForm } from '../testimonial-form';

export const metadata: Metadata = { title: 'New Testimonial — Admin' };

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">New Testimonial</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Add a new client reflection.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <TestimonialForm />
      </div>
    </div>
  );
}
