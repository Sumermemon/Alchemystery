'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { updateEnquiryStatus, deleteEnquiry } from '@/lib/repositories/enquiry.repository';
import type { EnquiryStatus } from '@/types/database.types';

export async function updateEnquiryStatusAction(id: string, status: EnquiryStatus) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const result = await updateEnquiryStatus(id, status);
  if (!result.success) {
    throw new Error(result.error || 'Failed to update enquiry status');
  }

  revalidatePath('/admin/enquiries');
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteEnquiryAction(id: string, redirectToList: boolean = false) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const result = await deleteEnquiry(id);
  if (!result.success) {
    throw new Error(result.error || 'Failed to delete enquiry');
  }

  revalidatePath('/admin/enquiries');
  revalidatePath('/admin');

  if (redirectToList) {
    redirect('/admin/enquiries');
  }

  return { success: true };
}
