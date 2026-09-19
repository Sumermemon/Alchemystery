'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createFaq, updateFaq, deleteFaq } from '@/lib/repositories/faq.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { faqSchema, type FaqFormData } from '@/lib/validations/faq.schema';

export async function createFaqAction(data: FaqFormData) {
  const authUser = await requireSuperAdmin();
  console.log('[createFaqAction] authUser:', authUser);
  if (!authUser) {
    throw new Error('Unauthorized: requireSuperAdmin returned null. Please check server logs.');
  }

  const parsed = faqSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await createFaq({ ...parsed.data, category: parsed.data.category ?? null });
  revalidatePath('/admin/faqs');
  revalidatePath('/faqs');
  redirect('/admin/faqs');
}

export async function updateFaqAction(id: string, data: FaqFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = faqSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await updateFaq({ id, ...parsed.data, category: parsed.data.category ?? null });
  revalidatePath('/admin/faqs');
  revalidatePath('/faqs');
  redirect('/admin/faqs');
}

export async function deleteFaqAction(id: string) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  await deleteFaq(id);
  revalidatePath('/admin/faqs');
  revalidatePath('/faqs');
}
