/**
 * Media assets repository — data access for the media_assets table.
 * Tracks files uploaded to Supabase Storage by the admin.
 */

import { createClient } from '@/lib/supabase/server';
import type { MediaAssetRow, InsertMediaAsset } from '@/types/database.types';
import { STORAGE_BUCKETS } from '@/constants/storage';

export async function getMediaAssets(bucket?: string): Promise<MediaAssetRow[]> {
  const supabase = await createClient();
  let query = supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (bucket) query = query.eq('bucket', bucket);

  const { data, error } = await query;
  if (error) throw new Error(`[MediaRepository] getMediaAssets: ${error.message}`);
  return data ?? [];
}

export async function createMediaAsset(payload: InsertMediaAsset): Promise<MediaAssetRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('media_assets')
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`[MediaRepository] createMediaAsset: ${error.message}`);
  return data;
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const supabase = await createClient();

  // Fetch the record first so we can also delete from storage
  const { data: asset } = await supabase
    .from('media_assets')
    .select('bucket, storage_path')
    .eq('id', id)
    .single();

  if (asset) {
    await supabase.storage.from(asset.bucket).remove([asset.storage_path]);
  }

  const { error } = await supabase.from('media_assets').delete().eq('id', id);
  if (error) throw new Error(`[MediaRepository] deleteMediaAsset: ${error.message}`);
}

/** Returns available bucket names for the admin media uploader */
export function getUploadBuckets() {
  return [
    { label: 'Service Images', value: STORAGE_BUCKETS.SERVICE_IMAGES },
    { label: 'Blog Images', value: STORAGE_BUCKETS.BLOG_IMAGES },
    { label: 'Profile Images', value: STORAGE_BUCKETS.PROFILE_IMAGES },
    { label: 'Site Assets', value: STORAGE_BUCKETS.SITE_ASSETS },
  ];
}
