-- ============================================================
-- ALCHEMYSTERY — Migration 005: Enquiries Table
-- ============================================================
-- Stores contact/booking enquiries submitted via the Connect page.
-- ============================================================

CREATE TABLE enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  session_type  TEXT,           -- optional, e.g. "Tarot", "Akashic Records"
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

SELECT create_updated_at_trigger('enquiries');
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);

-- RLS
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (submit an enquiry) but never read
CREATE POLICY "public_insert_enquiry"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only super_admin can read/update/delete
CREATE POLICY "super_admin_all_enquiries"
  ON enquiries FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
    )
  );
