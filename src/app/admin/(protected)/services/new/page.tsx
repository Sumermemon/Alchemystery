import type { Metadata } from 'next';
import { ServiceForm } from '../service-form';

export const metadata: Metadata = { title: 'New Service — Admin' };

export default function NewServicePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl text-[var(--color-ivory)]" style={{ fontFamily: 'var(--font-serif)' }}>New Service</h1>
        <p className="text-[var(--color-muted)] text-sm mt-1">Create a new offering or session.</p>
      </div>

      <ServiceForm />
    </div>
  );
}
