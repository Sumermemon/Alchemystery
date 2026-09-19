/**
 * FAQ repository — data access layer for the faqs table.
 */

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { STATUS } from '@/constants/status';
import type { FaqRow, InsertFaq, UpdateFaq } from '@/types/database.types';

export async function getPublishedFaqs(): Promise<FaqRow[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('status', STATUS.PUBLISHED)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[FaqRepository] getPublishedFaqs: ${error.message}`);
  return data ?? [];
}

export async function getAllFaqs(): Promise<FaqRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[FaqRepository] getAllFaqs: ${error.message}`);
  return data ?? [];
}

export async function getFaqById(id: string): Promise<FaqRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(`[FaqRepository] getFaqById: ${error.message}`);
  return data;
}

export async function createFaq(payload: InsertFaq): Promise<FaqRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('faqs')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[FaqRepository] createFaq: ${error.message}`);
  return data;
}

export async function updateFaq({ id, ...payload }: UpdateFaq): Promise<FaqRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('faqs')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[FaqRepository] updateFaq: ${error.message}`);
  return data;
}

export async function deleteFaq(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw new Error(`[FaqRepository] deleteFaq: ${error.message}`);
}
