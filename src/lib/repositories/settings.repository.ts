/**
 * Settings repository — data access layer for the site_settings table.
 * Uses a key-value pattern: one row per setting key.
 */

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import type { SiteSettingRow } from '@/types/database.types';
import { buildSiteSettings } from '@/types/content.types';
import type { SiteSettings } from '@/types/content.types';

/** Fetch all site settings and return as a typed map */
export async function getSiteSettings(): Promise<Partial<SiteSettings>> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true });

    if (error) {
      console.warn(`[SettingsRepository] getSiteSettings warning: ${error.message}`);
      return buildSiteSettings([]);
    }
    return buildSiteSettings(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[SettingsRepository] getSiteSettings network error: ${msg}`);
    return buildSiteSettings([]);
  }
}

/** Fetch the raw rows — for the admin settings editor */
export async function getAllSettingRows(): Promise<SiteSettingRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('key', { ascending: true });

  if (error) throw new Error(`[SettingsRepository] getAllSettingRows: ${error.message}`);
  return data ?? [];
}

/** Upsert a single setting by key */
export async function upsertSetting(
  key: string,
  value: unknown,
): Promise<SiteSettingRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: 'key' },
    )
    .select()
    .single();

  if (error) throw new Error(`[SettingsRepository] upsertSetting: ${error.message}`);
  return data;
}

/** Upsert multiple settings at once */
export async function upsertSettings(
  settings: Record<string, unknown>,
): Promise<void> {
  const rows = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const supabase = await createClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert(rows, { onConflict: 'key' });

  if (error) throw new Error(`[SettingsRepository] upsertSettings: ${error.message}`);
}
