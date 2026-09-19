/**
 * Blog repository — data access layer for the blog_posts table.
 */

import { createClient } from '@/lib/supabase/server';
import { STATUS } from '@/constants/status';
import type { BlogPostRow, InsertBlogPost, UpdateBlogPost } from '@/types/database.types';

/** Fetch all published blog posts, newest first */
export async function getPublishedBlogPosts(limit?: number): Promise<BlogPostRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', STATUS.PUBLISHED)
    .order('published_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`[BlogRepository] getPublishedBlogPosts: ${error.message}`);
  return data ?? [];
}

/** Fetch a single published post by slug */
export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', STATUS.PUBLISHED)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[BlogRepository] getPublishedBlogPostBySlug: ${error.message}`);
  }
  return data ?? null;
}

/** Fetch all posts for admin */
export async function getAllBlogPosts(): Promise<BlogPostRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`[BlogRepository] getAllBlogPosts: ${error.message}`);
  return data ?? [];
}

/** Fetch single post by id for admin edit */
export async function getBlogPostById(id: string): Promise<BlogPostRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[BlogRepository] getBlogPostById: ${error.message}`);
  }
  return data ?? null;
}

export async function createBlogPost(payload: InsertBlogPost): Promise<BlogPostRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[BlogRepository] createBlogPost: ${error.message}`);
  return data;
}

export async function updateBlogPost({ id, ...payload }: UpdateBlogPost): Promise<BlogPostRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[BlogRepository] updateBlogPost: ${error.message}`);
  return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw new Error(`[BlogRepository] deleteBlogPost: ${error.message}`);
}
