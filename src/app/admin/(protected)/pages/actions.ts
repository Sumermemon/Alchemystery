'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPage, updatePage, deletePage } from '@/lib/repositories/page.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { pageSchema, type PageFormData } from '@/lib/validations/page.schema';

export async function createPageAction(data: PageFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = pageSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await createPage(parsed.data);
  revalidatePath('/admin/pages');
  revalidatePath('/' + parsed.data.slug);
  redirect('/admin/pages');
}

export async function updatePageAction(id: string, data: PageFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = pageSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await updatePage({ id, ...parsed.data });
  revalidatePath('/admin/pages');
  revalidatePath('/' + parsed.data.slug);
  redirect('/admin/pages');
}

export async function deletePageAction(id: string) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  await deletePage(id);
  revalidatePath('/admin/pages');
}
