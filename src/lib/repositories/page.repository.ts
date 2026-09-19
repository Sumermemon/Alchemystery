/**
 * Page repository — data access for the pages and page_sections tables.
 */

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { STATUS } from '@/constants/status';
import type { PageRow, PageSectionRow, InsertPage, UpdatePage, InsertPageSection, UpdatePageSection } from '@/types/database.types';
import type { PageWithSections } from '@/types/content.types';

/** Fetch a published page with all its published sections, by slug */
export async function getPublishedPageBySlug(slug: string): Promise<PageWithSections | null> {
  const supabase = createPublicClient();

  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', STATUS.PUBLISHED)
    .single();

  if (pageError && pageError.code !== 'PGRST116') {
    throw new Error(`[PageRepository] getPublishedPageBySlug: ${pageError.message}`);
  }
  if (!page) return null;

  const { data: sections, error: sectionsError } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page_id', page.id)
    .eq('status', STATUS.PUBLISHED)
    .order('sort_order', { ascending: true });

  if (sectionsError) {
    throw new Error(`[PageRepository] getPublishedPageBySlug sections: ${sectionsError.message}`);
  }

  return { ...page, sections: sections ?? [] };
}

/** Fetch all pages for admin */
export async function getAllPages(): Promise<PageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('title', { ascending: true });

  if (error) throw new Error(`[PageRepository] getAllPages: ${error.message}`);
  return data ?? [];
}

/** Fetch sections for a page (admin use — any status) */
export async function getSectionsByPageId(pageId: string): Promise<PageSectionRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page_id', pageId)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[PageRepository] getSectionsByPageId: ${error.message}`);
  return data ?? [];
}

export async function createPage(payload: InsertPage): Promise<PageRow> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('pages').insert(payload).select().single();
  if (error) throw new Error(`[PageRepository] createPage: ${error.message}`);
  return data;
}

export async function updatePage({ id, ...payload }: UpdatePage): Promise<PageRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pages')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[PageRepository] updatePage: ${error.message}`);
  return data;
}

export async function upsertPageSection(payload: InsertPageSection & { id?: string }): Promise<PageSectionRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('page_sections')
    .upsert({ ...payload, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw new Error(`[PageRepository] upsertPageSection: ${error.message}`);
  return data;
}

export async function updatePageSection({ id, ...payload }: UpdatePageSection): Promise<PageSectionRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('page_sections')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[PageRepository] updatePageSection: ${error.message}`);
  return data;
}

/** Fetch a page by ID (for admin editing) */
export async function getPageById(id: string): Promise<PageRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[PageRepository] getPageById: `);
  }
  return data;
}

export async function deletePage(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('pages').delete().eq('id', id);
  if (error) throw new Error(`[PageRepository] deletePage: `);
}

