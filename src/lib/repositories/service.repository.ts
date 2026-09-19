/**
 * Service repository — data access layer for the services table.
 * All Supabase queries related to services live here.
 * Components never query Supabase directly.
 */

import { createClient } from '@/lib/supabase/server';
import { STATUS } from '@/constants/status';
import type { ServiceRow, InsertService, UpdateService } from '@/types/database.types';

/** Fetch all published services, ordered by sort_order */
export async function getPublishedServices(): Promise<ServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', STATUS.PUBLISHED)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[ServiceRepository] getPublishedServices: ${error.message}`);
  return data ?? [];
}

/** Fetch a single published service by slug — used for /sessions/[slug] */
export async function getPublishedServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('status', STATUS.PUBLISHED)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[ServiceRepository] getPublishedServiceBySlug: ${error.message}`);
  }
  return data ?? null;
}

/** Fetch all services (any status) — for admin CMS use */
export async function getAllServices(): Promise<ServiceRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[ServiceRepository] getAllServices: ${error.message}`);
  return data ?? [];
}

/** Fetch a single service by id — for admin edit form */
export async function getServiceById(id: string): Promise<ServiceRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`[ServiceRepository] getServiceById: ${error.message}`);
  }
  return data ?? null;
}

/** Create a new service */
export async function createService(payload: InsertService): Promise<ServiceRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[ServiceRepository] createService: ${error.message}`);
  return data;
}

/** Update an existing service */
export async function updateService({ id, ...payload }: UpdateService): Promise<ServiceRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[ServiceRepository] updateService: ${error.message}`);
  return data;
}

/** Delete a service (hard delete) */
export async function deleteService(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(`[ServiceRepository] deleteService: ${error.message}`);
}
