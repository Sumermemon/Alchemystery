import type { Metadata } from 'next';
import { getEnquiries } from '@/lib/repositories/enquiry.repository';
import EnquiriesClient from './enquiries-client';

export const metadata: Metadata = {
  title: 'Client Enquiries — Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  const { enquiries, tableMissing } = await getEnquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-sans text-[var(--admin-text)]">
          Client Enquiries
        </h1>
        <p className="text-[var(--admin-muted)] text-sm mt-1">
          Review and respond to session enquiries submitted through the website.
        </p>
      </div>

      <EnquiriesClient initialEnquiries={enquiries} tableMissing={tableMissing} />
    </div>
  );
}
