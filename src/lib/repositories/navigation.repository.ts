/**
 * Navigation repository — data access for the navigation_items table.
 */

import { createClient } from '@/lib/supabase/server';
import type { NavigationItemRow, InsertNavigationItem } from '@/types/database.types';

type NavLocation = 'header' | 'footer';

export async function getNavigationItems(location: NavLocation): Promise<NavigationItemRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('navigation_items')
    .select('*')
    .eq('location', location)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[NavigationRepository] getNavigationItems: ${error.message}`);
  return data ?? [];
}

export async function getAllNavigationItems(): Promise<NavigationItemRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('navigation_items')
    .select('*')
    .order('location')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`[NavigationRepository] getAllNavigationItems: ${error.message}`);
  return data ?? [];
}

export async function createNavigationItem(payload: InsertNavigationItem): Promise<NavigationItemRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('navigation_items')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[NavigationRepository] createNavigationItem: ${error.message}`);
  return data;
}

export async function updateNavigationItem(
  id: string,
  payload: Partial<InsertNavigationItem>,
): Promise<NavigationItemRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('navigation_items')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`[NavigationRepository] updateNavigationItem: ${error.message}`);
  return data;
}

export async function deleteNavigationItem(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('navigation_items').delete().eq('id', id);
  if (error) throw new Error(`[NavigationRepository] deleteNavigationItem: ${error.message}`);
}
