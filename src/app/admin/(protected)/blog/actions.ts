'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/repositories/blog.repository';
import { requireSuperAdmin } from '@/lib/services/auth.service';
import { blogPostSchema, type BlogPostFormData } from '@/lib/validations/blog.schema';

export async function createBlogPostAction(data: BlogPostFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await createBlogPost({ ...parsed.data, excerpt: parsed.data.excerpt ?? null, content: parsed.data.content ?? null, cover_image_url: parsed.data.cover_image_url ?? null, seo_title: parsed.data.seo_title ?? null, seo_description: parsed.data.seo_description ?? null, og_image_url: parsed.data.og_image_url ?? null, author_name: parsed.data.author_name ?? null, published_at: parsed.data.published_at ?? null });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function updateBlogPostAction(id: string, data: BlogPostFormData) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  await updateBlogPost({ id, ...parsed.data, excerpt: parsed.data.excerpt ?? null, content: parsed.data.content ?? null, cover_image_url: parsed.data.cover_image_url ?? null, seo_title: parsed.data.seo_title ?? null, seo_description: parsed.data.seo_description ?? null, og_image_url: parsed.data.og_image_url ?? null, author_name: parsed.data.author_name ?? null, published_at: parsed.data.published_at ?? null });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath(`/blog/${parsed.data.slug}`);
  redirect('/admin/blog');
}

export async function deleteBlogPostAction(id: string) {
  const authUser = await requireSuperAdmin();
  if (!authUser) throw new Error('Unauthorized');

  await deleteBlogPost(id);
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}
