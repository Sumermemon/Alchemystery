import type { Metadata } from 'next';
import { ServiceForm } from '../service-form';

export const metadata: Metadata = { title: 'New Service — Admin' };

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">New Service</h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">Create a new offering or session.</p>
      </div>

      <div
        className="w-full rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-200"
        style={{
          background: 'var(--admin-card-bg)',
          border: '1px solid var(--admin-border)',
          boxShadow: 'var(--admin-card-shadow)',
        }}
      >
        <ServiceForm />
      </div>
    </div>
  );
}
