'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createService, updateService, deleteService } from '@/lib/repositories/service.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { serviceSchema, type ServiceFormData } from '@/lib/validations/service.schema';

export async function createServiceAction(data: ServiceFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await createService({ ...parsed.data, category_id: parsed.data.category_id ?? null, short_description: parsed.data.short_description ?? null, description: parsed.data.description ?? null, image_url: parsed.data.image_url ?? null, duration_minutes: parsed.data.duration_minutes ?? null, price_display: parsed.data.price_display ?? null, seo_title: parsed.data.seo_title ?? null, seo_description: parsed.data.seo_description ?? null });
  revalidatePath('/admin/services');
  revalidatePath('/sessions');
  redirect('/admin/services');
}

export async function updateServiceAction(id: string, data: ServiceFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await updateService({ id, ...parsed.data, category_id: parsed.data.category_id ?? null, short_description: parsed.data.short_description ?? null, description: parsed.data.description ?? null, image_url: parsed.data.image_url ?? null, duration_minutes: parsed.data.duration_minutes ?? null, price_display: parsed.data.price_display ?? null, seo_title: parsed.data.seo_title ?? null, seo_description: parsed.data.seo_description ?? null });
  revalidatePath('/admin/services');
  revalidatePath('/sessions');
  revalidatePath(`/sessions/${parsed.data.slug}`);
  redirect('/admin/services');
}

export async function deleteServiceAction(id: string) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  await deleteService(id);
  revalidatePath('/admin/services');
  revalidatePath('/sessions');
}
