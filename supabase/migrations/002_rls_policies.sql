-- ============================================================
-- ALCHEMYSTERY — Migration 002: Row Level Security Policies
-- ============================================================
-- Run order: 2nd (after 001_initial_schema.sql)
-- Description: Enables RLS on all application tables and defines
--              policies that enforce the CMS access model:
--
--              ANONYMOUS / PUBLIC:
--                - May SELECT rows where status = 'published'
--                - May NOT insert, update, or delete anything
--                - May NOT read draft/archived content
--
--              AUTHENTICATED (non-admin):
--                - Same as anonymous for content tables
--                - May read/update their own profile row
--
--              SUPER_ADMIN:
--                - Full access (SELECT, INSERT, UPDATE, DELETE) on all tables
--                - Verified by checking profiles.role = 'super_admin'
--                  using auth.uid() — server-side only, never client-supplied
--
-- IMPORTANT: Do not disable RLS to make development easier.
-- ============================================================

-- ------------------------------------------------------------
-- Helper: Checks whether the current user is a super_admin.
-- Used in policy definitions to avoid repetition.
-- This is a SECURITY DEFINER function so it can query profiles
-- without requiring the calling role to have direct SELECT on profiles.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
      AND role = 'super_admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================================
-- profiles
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Super admin can do everything
CREATE POLICY "super_admin_all_profiles"
  ON profiles FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- Authenticated users can read and update their own profile
CREATE POLICY "user_read_own_profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "user_update_own_profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- service_categories
-- ============================================================
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read categories (no status field — all are public)
CREATE POLICY "public_read_service_categories"
  ON service_categories FOR SELECT
  USING (TRUE);

-- Only super admin can manage categories
CREATE POLICY "super_admin_all_service_categories"
  ON service_categories FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- services
-- ============================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public can read published services only
CREATE POLICY "public_read_published_services"
  ON services FOR SELECT
  USING (status = 'published');

-- Super admin has full access
CREATE POLICY "super_admin_all_services"
  ON services FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- pages
-- ============================================================
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_pages"
  ON pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "super_admin_all_pages"
  ON pages FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- page_sections
-- ============================================================
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_page_sections"
  ON page_sections FOR SELECT
  USING (status = 'published');

CREATE POLICY "super_admin_all_page_sections"
  ON page_sections FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- testimonials
-- ============================================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_testimonials"
  ON testimonials FOR SELECT
  USING (status = 'published');

CREATE POLICY "super_admin_all_testimonials"
  ON testimonials FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- faqs
-- ============================================================
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_faqs"
  ON faqs FOR SELECT
  USING (status = 'published');

CREATE POLICY "super_admin_all_faqs"
  ON faqs FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- blog_posts
-- ============================================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_blog_posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "super_admin_all_blog_posts"
  ON blog_posts FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- site_settings
-- ============================================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- All settings are readable publicly (brand name, contact, etc.)
-- Sensitive settings should not be stored here — use env vars for secrets.
CREATE POLICY "public_read_site_settings"
  ON site_settings FOR SELECT
  USING (TRUE);

CREATE POLICY "super_admin_all_site_settings"
  ON site_settings FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- navigation_items
-- ============================================================
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_navigation_items"
  ON navigation_items FOR SELECT
  USING (TRUE);

CREATE POLICY "super_admin_all_navigation_items"
  ON navigation_items FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());

-- ============================================================
-- media_assets
-- ============================================================
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Public can read asset metadata (for public buckets)
CREATE POLICY "public_read_media_assets"
  ON media_assets FOR SELECT
  USING (TRUE);

CREATE POLICY "super_admin_all_media_assets"
  ON media_assets FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());
