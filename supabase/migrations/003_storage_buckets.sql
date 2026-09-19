-- ============================================================
-- ALCHEMYSTERY — Migration 003: Storage Buckets
-- ============================================================
-- Run order: 3rd (after 002_rls_policies.sql)
-- Description: Creates Supabase Storage buckets for media management.
--
-- NOTE: Supabase Storage bucket creation must be done via:
--   1. The Supabase Dashboard (Storage > New Bucket), OR
--   2. The Supabase Management API, OR
--   3. The supabase CLI: `supabase storage create <bucket>`
--
-- The SQL below uses the storage schema functions available in
-- Supabase's PostgreSQL environment. If running via the SQL editor
-- in the dashboard, this will work directly.
-- ============================================================

-- ------------------------------------------------------------
-- Public buckets — files accessible without authentication
-- ------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'service-images',
    'service-images',
    TRUE,
    5242880,  -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  ),
  (
    'blog-images',
    'blog-images',
    TRUE,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  ),
  (
    'profile-images',
    'profile-images',
    TRUE,
    2097152,  -- 2 MB limit for profile photos
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'site-assets',
    'site-assets',
    TRUE,
    2097152,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/x-icon']
  )
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- Private bucket — raw uploads before categorisation
-- Files here are not publicly accessible.
-- ------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES
  (
    'uploads',
    'uploads',
    FALSE,
    10485760  -- 10 MB limit for raw uploads
  )
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- Storage RLS Policies
-- ------------------------------------------------------------

-- Public buckets: anyone can view objects
CREATE POLICY "public_read_service_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-images');

CREATE POLICY "public_read_blog_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "public_read_profile_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-images');

CREATE POLICY "public_read_site_assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

-- Only super_admin can upload/delete in public buckets
CREATE POLICY "super_admin_manage_service_images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'service-images' AND is_super_admin())
  WITH CHECK (bucket_id = 'service-images' AND is_super_admin());

CREATE POLICY "super_admin_manage_blog_images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'blog-images' AND is_super_admin())
  WITH CHECK (bucket_id = 'blog-images' AND is_super_admin());

CREATE POLICY "super_admin_manage_profile_images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'profile-images' AND is_super_admin())
  WITH CHECK (bucket_id = 'profile-images' AND is_super_admin());

CREATE POLICY "super_admin_manage_site_assets"
  ON storage.objects FOR ALL
  USING (bucket_id = 'site-assets' AND is_super_admin())
  WITH CHECK (bucket_id = 'site-assets' AND is_super_admin());

-- Private uploads bucket: super_admin only
CREATE POLICY "super_admin_manage_uploads"
  ON storage.objects FOR ALL
  USING (bucket_id = 'uploads' AND is_super_admin())
  WITH CHECK (bucket_id = 'uploads' AND is_super_admin());
