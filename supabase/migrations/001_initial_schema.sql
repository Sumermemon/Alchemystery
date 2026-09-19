-- ============================================================
-- ALCHEMYSTERY — Migration 001: Initial Schema
-- ============================================================
-- Run order: 1st
-- Description: Creates all application tables with proper
--              primary keys, foreign keys, constraints, indexes,
--              and an updated_at trigger.
-- ============================================================

-- ------------------------------------------------------------
-- updated_at trigger function
-- Automatically updates the updated_at column on any row change.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper macro to attach the trigger to a table
CREATE OR REPLACE FUNCTION create_updated_at_trigger(target_table TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format(
    'CREATE TRIGGER set_%I_updated_at
     BEFORE UPDATE ON %I
     FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
    target_table, target_table
  );
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------
-- profiles
-- Extends auth.users with application-level data and role.
-- One profile per Supabase auth user.
-- ------------------------------------------------------------
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT,
  avatar_url    TEXT,
  role          TEXT NOT NULL DEFAULT 'editor'
                CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('profiles');

-- ------------------------------------------------------------
-- service_categories
-- Groups services (e.g., "Energy Work", "Divination")
-- ------------------------------------------------------------
CREATE TABLE service_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order  INT  NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('service_categories');
CREATE INDEX idx_service_categories_slug ON service_categories(slug);

-- ------------------------------------------------------------
-- services
-- Individual session offerings (Akashic Records, Tarot, etc.)
-- ------------------------------------------------------------
CREATE TABLE services (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id       UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description       TEXT,
  duration_minutes  INT,
  price_display     TEXT,       -- Display string e.g. "₹2,500" not a numeric amount
  image_url         TEXT,
  sort_order        INT  NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'archived')),
  seo_title         TEXT CHECK (length(seo_title) <= 70),
  seo_description   TEXT CHECK (length(seo_description) <= 160),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('services');
CREATE INDEX idx_services_slug   ON services(slug);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_sort   ON services(sort_order);

-- ------------------------------------------------------------
-- pages
-- CMS-managed top-level pages (homepage, about, practice, etc.)
-- ------------------------------------------------------------
CREATE TABLE pages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published', 'archived')),
  seo_title       TEXT CHECK (length(seo_title) <= 70),
  seo_description TEXT CHECK (length(seo_description) <= 160),
  og_image_url    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('pages');
CREATE INDEX idx_pages_slug   ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);

-- ------------------------------------------------------------
-- page_sections
-- Content blocks within a page (hero, intro, CTA, etc.)
-- ------------------------------------------------------------
CREATE TABLE page_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id     UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,   -- e.g. "hero", "intro", "cta_primary"
  heading     TEXT,
  subheading  TEXT,
  body        TEXT,            -- Markdown / rich text
  image_url   TEXT,
  cta_label   TEXT,
  cta_url     TEXT,
  sort_order  INT  NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'draft'
              CHECK (status IN ('draft', 'published', 'archived')),
  metadata    JSONB,           -- Flexible extra data per section type
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (page_id, section_key)   -- Enforce one section_key per page
);

SELECT create_updated_at_trigger('page_sections');
CREATE INDEX idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX idx_page_sections_status  ON page_sections(status);

-- ------------------------------------------------------------
-- testimonials
-- Client reflections — author displayed by initials for privacy
-- ------------------------------------------------------------
CREATE TABLE testimonials (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name      TEXT NOT NULL,
  author_initials  TEXT,         -- e.g. "R. S." for display
  content          TEXT NOT NULL,
  service_id       UUID REFERENCES services(id) ON DELETE SET NULL,
  status           TEXT NOT NULL DEFAULT 'draft'
                   CHECK (status IN ('draft', 'published', 'archived')),
  sort_order       INT  NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('testimonials');
CREATE INDEX idx_testimonials_status ON testimonials(status);

-- ------------------------------------------------------------
-- faqs
-- Frequently asked questions, optionally grouped by category
-- ------------------------------------------------------------
CREATE TABLE faqs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  category   TEXT,             -- Optional grouping label
  sort_order INT  NOT NULL DEFAULT 0,
  status     TEXT NOT NULL DEFAULT 'draft'
             CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('faqs');
CREATE INDEX idx_faqs_status ON faqs(status);

-- ------------------------------------------------------------
-- blog_posts
-- Insights / articles published by Isha
-- ------------------------------------------------------------
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT,
  content         TEXT,           -- Markdown / rich text
  cover_image_url TEXT,
  author_name     TEXT,           -- Display name (defaults to Isha Singasane)
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published', 'archived')),
  published_at    TIMESTAMPTZ,
  seo_title       TEXT CHECK (length(seo_title) <= 70),
  seo_description TEXT CHECK (length(seo_description) <= 160),
  og_image_url    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('blog_posts');
CREATE INDEX idx_blog_posts_slug         ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status       ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ------------------------------------------------------------
-- site_settings
-- Key-value store for all CMS-managed site configuration.
-- Using key-value allows adding new settings without schema changes.
-- ------------------------------------------------------------
CREATE TABLE site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB,            -- String, number, boolean, or object
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('site_settings');
CREATE UNIQUE INDEX idx_site_settings_key ON site_settings(key);

-- ------------------------------------------------------------
-- navigation_items
-- Header and footer navigation managed via CMS
-- ------------------------------------------------------------
CREATE TABLE navigation_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label       TEXT NOT NULL,
  href        TEXT NOT NULL,
  location    TEXT NOT NULL CHECK (location IN ('header', 'footer')),
  sort_order  INT  NOT NULL DEFAULT 0,
  is_external BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('navigation_items');
CREATE INDEX idx_navigation_items_location ON navigation_items(location, sort_order);

-- ------------------------------------------------------------
-- media_assets
-- Tracks files uploaded to Supabase Storage by the admin.
-- Enables the media library in Phase 2.
-- ------------------------------------------------------------
CREATE TABLE media_assets (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket       TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_name    TEXT NOT NULL,
  mime_type    TEXT,
  size_bytes   BIGINT,
  alt_text     TEXT,
  uploaded_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (bucket, storage_path)
);

SELECT create_updated_at_trigger('media_assets');
CREATE INDEX idx_media_assets_bucket ON media_assets(bucket);

-- ------------------------------------------------------------
-- Auto-create profile on user sign-up
-- This trigger ensures every new Supabase Auth user gets a profile row.
-- New users receive the 'editor' role by default.
-- Super Admin role must be assigned manually (see README.md).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'editor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
