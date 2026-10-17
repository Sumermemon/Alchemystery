'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPage, updatePage, deletePage, upsertPageSection } from '@/lib/repositories/page.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { pageWithContentSchema, type PageWithContentFormData } from '@/lib/validations/page.schema';

export async function createPageAction(data: PageWithContentFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = pageWithContentSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  const { section_heading, section_body, section_cta_label, section_cta_url, ...pageData } = parsed.data;

  const newPage = await createPage({
    ...pageData,
    seo_title: pageData.seo_title ?? null,
    seo_description: pageData.seo_description ?? null,
    og_image_url: pageData.og_image_url ?? null,
  });

  if (section_heading || section_body || section_cta_label) {
    await upsertPageSection({
      page_id: newPage.id,
      section_key: 'main',
      heading: section_heading ?? null,
      subheading: null,
      body: section_body ?? null,
      image_url: null,
      cta_label: section_cta_label ?? null,
      cta_url: section_cta_url ?? null,
      sort_order: 1,
      status: newPage.status,
      metadata: null,
    });
  }

  revalidatePath('/admin/pages');
  revalidatePath('/' + newPage.slug);
  return { success: true, id: newPage.id };
}

export async function updatePageAction(id: string, data: PageWithContentFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = pageWithContentSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  const { section_heading, section_body, section_cta_label, section_cta_url, ...pageData } = parsed.data;

  const updated = await updatePage({
    id,
    ...pageData,
    seo_title: pageData.seo_title ?? null,
    seo_description: pageData.seo_description ?? null,
    og_image_url: pageData.og_image_url ?? null,
  });

  if (section_heading || section_body || section_cta_label) {
    await upsertPageSection({
      page_id: id,
      section_key: 'main',
      heading: section_heading ?? null,
      subheading: null,
      body: section_body ?? null,
      image_url: null,
      cta_label: section_cta_label ?? null,
      cta_url: section_cta_url ?? null,
      sort_order: 1,
      status: updated.status,
      metadata: null,
    });
  }

  revalidatePath('/admin/pages');
  revalidatePath('/' + updated.slug);
  return { success: true, id: updated.id };
}

export async function deletePageAction(id: string) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  await deletePage(id);
  revalidatePath('/admin/pages');
  return { success: true };
}
