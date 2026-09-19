-- ============================================================
-- ALCHEMYSTERY — Migration 004: Seed Data
-- ============================================================

-- ------------------------------------------------------------
-- Site Settings — initial defaults
-- ------------------------------------------------------------
INSERT INTO site_settings (key, value, description) VALUES
  ('brand_name',              '"Alchemystery"',                                   'The brand/company name'),
  ('website_title',           '"Alchemystery — A Space for Your Inner Truth"',    'Browser tab title for the homepage'),
  ('tagline',                 '"Clarity · Healing · Alignment"',                  'Short tagline displayed in the hero and footer'),
  ('contact_email',           '"hello@alchemystery.in"',                          'Primary contact email'),
  ('contact_phone',           'null',                                              'Contact phone number (optional)'),
  ('whatsapp',                'null',                                              'WhatsApp number including country code (optional)'),
  ('address',                 'null',                                              'Physical or mailing address (optional)'),
  ('instagram_url',           'null',                                              'Instagram profile URL'),
  ('facebook_url',            'null',                                              'Facebook page URL'),
  ('youtube_url',             'null',                                              'YouTube channel URL'),
  ('logo_url',                'null',                                              'Logo image URL (from site-assets bucket)'),
  ('favicon_url',             'null',                                              'Favicon URL (from site-assets bucket)'),
  ('default_seo_title',       '"Alchemystery — A Space for Your Inner Truth"',    'Default SEO meta title for pages without their own'),
  ('default_seo_description', '"Alchemystery brings together intuitive and spiritual practices to help you explore life''s questions with greater awareness and perspective."', 'Default SEO meta description'),
  ('footer_text',             '"© 2026 Alchemystery. All rights reserved. Your journey. Your truth."', 'Footer copyright / attribution text')
ON CONFLICT (key) DO NOTHING;

-- ------------------------------------------------------------
-- Navigation Items — initial header and footer links
-- ------------------------------------------------------------
INSERT INTO navigation_items (label, href, location, sort_order, is_external) VALUES
  ('The Practice', '/practice', 'header', 1, FALSE),
  ('Sessions',     '/sessions', 'header', 2, FALSE),
  ('About Isha',   '/about',    'header', 3, FALSE),
  ('Insights',     '/insights', 'header', 4, FALSE),
  ('FAQ',          '/faq',      'header', 5, FALSE),
  ('Contact',      '/contact',  'header', 6, FALSE),
  ('The Practice', '/practice', 'footer', 1, FALSE),
  ('Sessions',     '/sessions', 'footer', 2, FALSE),
  ('About Isha',   '/about',    'footer', 3, FALSE),
  ('Insights',     '/insights', 'footer', 4, FALSE),
  ('FAQ',          '/faq',      'footer', 5, FALSE),
  ('Contact',      '/contact',  'footer', 6, FALSE)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- Sample Service Category
-- ------------------------------------------------------------
INSERT INTO service_categories (name, slug, description, sort_order)
VALUES (
  'Intuitive Sessions',
  'intuitive-sessions',
  'One-to-one sessions exploring your inner landscape through established spiritual modalities.',
  1
)
ON CONFLICT (slug) DO NOTHING;

-- ------------------------------------------------------------
-- Published Services (Matching Mockup)
-- ------------------------------------------------------------
INSERT INTO services (category_id, title, slug, short_description, status, sort_order, image_url)
SELECT
  sc.id, 'Akashic Records', 'akashic-records', 'Insights for clarity and deeper self-understanding.', 'published', 1, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80'
FROM service_categories sc WHERE sc.slug = 'intuitive-sessions'
ON CONFLICT (slug) DO UPDATE SET status = 'published', short_description = EXCLUDED.short_description, image_url = EXCLUDED.image_url;

INSERT INTO services (category_id, title, slug, short_description, status, sort_order, image_url)
SELECT
  sc.id, 'Tarot', 'tarot', 'Reflective guidance for questions, decisions and life transitions.', 'published', 2, 'https://images.unsplash.com/photo-1616422285623-14fb7794ae6c?auto=format&fit=crop&q=80'
FROM service_categories sc WHERE sc.slug = 'intuitive-sessions'
ON CONFLICT (slug) DO UPDATE SET status = 'published', short_description = EXCLUDED.short_description, image_url = EXCLUDED.image_url;

INSERT INTO services (category_id, title, slug, short_description, status, sort_order, image_url)
SELECT
  sc.id, 'Numerology', 'numerology', 'Explore the symbolic significance of numbers and personal cycles.', 'published', 3, 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80'
FROM service_categories sc WHERE sc.slug = 'intuitive-sessions'
ON CONFLICT (slug) DO UPDATE SET status = 'published', short_description = EXCLUDED.short_description, image_url = EXCLUDED.image_url;

INSERT INTO services (category_id, title, slug, short_description, status, sort_order, image_url)
SELECT
  sc.id, 'Spiritual Guidance', 'spiritual-guidance', 'A one-to-one space for reflection and intuitive guidance.', 'published', 4, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
FROM service_categories sc WHERE sc.slug = 'intuitive-sessions'
ON CONFLICT (slug) DO UPDATE SET status = 'published', short_description = EXCLUDED.short_description, image_url = EXCLUDED.image_url;

INSERT INTO services (category_id, title, slug, short_description, status, sort_order, image_url)
SELECT
  sc.id, 'Energy & Healing', 'energy-healing', 'A calming practice focused on balance and wellbeing.', 'published', 5, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'
FROM service_categories sc WHERE sc.slug = 'intuitive-sessions'
ON CONFLICT (slug) DO UPDATE SET status = 'published', short_description = EXCLUDED.short_description, image_url = EXCLUDED.image_url;

-- ------------------------------------------------------------
-- Testimonials
-- ------------------------------------------------------------
INSERT INTO testimonials (client_name, client_initials, quote, is_featured, sort_order, status)
VALUES (
  'R. S.',
  'RS',
  'My session with Isha gave me clarity at a time when I felt completely stuck. Her guidance is gentle, insightful and deeply genuine.',
  TRUE,
  1,
  'published'
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- Insights (Blog Posts)
-- ------------------------------------------------------------
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, status, category, published_at)
VALUES (
  'What is the Akashic Records?',
  'what-is-the-akashic-records',
  'A gentle introduction to this powerful source of insight.',
  'Content goes here...',
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80',
  'published',
  'Guidance',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, status, category, published_at)
VALUES (
  'Tarot as a Tool for Reflection',
  'tarot-as-a-tool-for-reflection',
  'More than predictions — a mirror for your inner world.',
  'Content goes here...',
  'https://images.unsplash.com/photo-1503437313881-503a91226402?auto=format&fit=crop&q=80',
  'published',
  'Reflection',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, status, category, published_at)
VALUES (
  'Understanding Numerology',
  'understanding-numerology',
  'The language of numbers and what they reveal.',
  'Content goes here...',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80',
  'published',
  'Insights',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;
