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

  await createService(parsed.data);
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

  await updateService({ id, ...parsed.data });
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
