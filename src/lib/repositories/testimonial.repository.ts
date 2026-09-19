/**
 * Testimonial repository — data access layer for the testimonials table.
 */

import { createClient } from '@/lib/supabase/server';
import { STATUS } from '@/constants/status';
import type { TestimonialRow, InsertTestimonial, UpdateTestimonial } from '@/types/database.types';

export async function getPublishedTestimonials(): Promise<TestimonialRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', STATUS.PUBLISHED)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[TestimonialRepository] getPublishedTestimonials: ${error.message}`);
  return data ?? [];
}

export async function getAllTestimonials(): Promise<TestimonialRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[TestimonialRepository] getAllTestimonials: ${error.message}`);
  return data ?? [];
}

export async function getTestimonialById(id: string): Promise<TestimonialRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(`[TestimonialRepository] getTestimonialById: ${error.message}`);
  return data;
}

export async function createTestimonial(payload: InsertTestimonial): Promise<TestimonialRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[TestimonialRepository] createTestimonial: ${error.message}`);
  return data;
}

export async function updateTestimonial({ id, ...payload }: UpdateTestimonial): Promise<TestimonialRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[TestimonialRepository] updateTestimonial: ${error.message}`);
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(`[TestimonialRepository] deleteTestimonial: ${error.message}`);
}
