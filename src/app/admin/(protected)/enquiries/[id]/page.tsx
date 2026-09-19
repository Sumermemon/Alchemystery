import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEnquiryById } from '@/lib/repositories/enquiry.repository';
import EnquiryDetailClient from './enquiry-detail-client';

interface EnquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EnquiryDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const enquiry = await getEnquiryById(id);
  return {
    title: enquiry ? `Enquiry from ${enquiry.name} — Admin` : 'Enquiry — Admin',
  };
}

export const dynamic = 'force-dynamic';

export default async function EnquiryDetailPage({ params }: EnquiryDetailPageProps) {
  const { id } = await params;
  const enquiry = await getEnquiryById(id);

  if (!enquiry) {
    notFound();
  }

  return <EnquiryDetailClient enquiry={enquiry} />;
}
