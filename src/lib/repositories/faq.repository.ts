/**
 * FAQ repository — data access layer for the faqs table.
 */

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { STATUS } from '@/constants/status';
import type { FaqRow, InsertFaq, UpdateFaq } from '@/types/database.types';

export const DEFAULT_FAQS: FaqRow[] = [
  {
    id: 'faq-1',
    category: 'Sessions & Practices',
    question: 'What is an Akashic Records session?',
    answer: 'An Akashic Records session is an intuitive exploration of your soul\u2019s journey. It allows us to look into recurring themes, patterns, relationships and deeper life questions with clarity, compassion and perspective.',
    sort_order: 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-2',
    category: 'Sessions & Practices',
    question: 'How does an intuitive Tarot reading work?',
    answer: 'The cards do not determine your destiny; they serve as an intuitive mirror for decisions, transitions and questions you are currently navigating. It is a reflective tool to bring hidden dynamics to light.',
    sort_order: 2,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-3',
    category: 'Booking & Online Format',
    question: 'How are sessions conducted?',
    answer: 'All sessions are held privately online via Google Meet or Zoom. You can join from the comfort and quiet of your own personal space from anywhere in the world.',
    sort_order: 3,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-4',
    category: 'Booking & Online Format',
    question: 'How long is a session and can it be recorded?',
    answer: 'Sessions typically run for 60 minutes. Audio or video recordings are available upon request so you can revisit the insights at your own pace.',
    sort_order: 4,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-5',
    category: 'Preparation & Approach',
    question: 'What if I do not know what questions to ask?',
    answer: 'You do not need to arrive with formulated questions or specific spiritual beliefs. Simply arriving as you are is enough \u2014 the session meets you wherever you are in life.',
    sort_order: 5,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq-6',
    category: 'Preparation & Approach',
    question: 'Are sessions predictive or fortune-telling?',
    answer: 'No. Alchemystery is grounded in self-awareness, personal sovereignty, and conscious alignment. Our work is not about fatalistic predictions, but empowering you to understand your energy and make intentional choices.',
    sort_order: 6,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getPublishedFaqs(): Promise<FaqRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('status', STATUS.PUBLISHED)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn(`[FaqRepository] getPublishedFaqs warning: ${error.message}`);
      return DEFAULT_FAQS;
    }
    if (!data || data.length === 0) {
      return DEFAULT_FAQS;
    }
    // If database only has a small set / test questions, merge with curated FAQs
    if (data.length < 3) {
      const existing = new Set(data.map((f) => f.question.toLowerCase().trim()));
      const additional = DEFAULT_FAQS.filter((f) => !existing.has(f.question.toLowerCase().trim()));
      return [...data, ...additional];
    }
    return data;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[FaqRepository] getPublishedFaqs network error: ${msg}`);
    return DEFAULT_FAQS;
  }
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
