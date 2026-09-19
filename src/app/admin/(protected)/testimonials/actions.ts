'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/repositories/testimonial.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { testimonialSchema, type TestimonialFormData } from '@/lib/validations/testimonial.schema';

export async function createTestimonialAction(data: TestimonialFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data: ' + parsed.error.issues.map(e => e.message).join(', '));
  }

  await createTestimonial(parsed.data);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

export async function updateTestimonialAction(id: string, data: TestimonialFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data: ' + parsed.error.issues.map(e => e.message).join(', '));
  }

  await updateTestimonial({ id, ...parsed.data });
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

export async function deleteTestimonialAction(id: string) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  await deleteTestimonial(id);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}
