-- ============================================
-- RITZEE SUPABASE SCHEMA - CLEAN INSTALL
-- ============================================
-- This script drops all old tables and creates a fresh schema
-- for managing site configuration (hero images & announcements)

-- Step 1: Drop existing tables (if any)
DROP TABLE IF EXISTS site_config CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Step 2: Create the site_config table
CREATE TABLE site_config (
  id bigint PRIMARY KEY DEFAULT 1,
  
  -- Announcements (stored as JSON array)
  -- Example: ["Sale 50% Off!", "Free Shipping Today"]
  announcements jsonb DEFAULT '[]'::jsonb,
  
  -- Hero Images (stored as JSON array of URLs)
  -- Example: ["/hero1.png", "https://cdn.example.com/hero2.jpg"]
  hero_images jsonb DEFAULT '[]'::jsonb,
  
  -- Toggle for announcement bar
  announcements_enabled boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Insert default configuration
INSERT INTO site_config (id, announcements, hero_images, announcements_enabled)
VALUES (
  1,
  '["Welcome to Ritzee - Unleash Your Alter Ego!", "Free Shipping on Orders Over ₹2000"]'::jsonb,
  '["/hero-genz-1.png", "/hero-genz-2.png"]'::jsonb,
  true
);

-- Step 4: Create function to auto-update 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 5: Create trigger for auto-updating timestamp
CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 6: Enable Row Level Security
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Step 7: Create RLS Policies
-- Allow public read access (for homepage)
CREATE POLICY "Allow public read access"
  ON site_config
  FOR SELECT
  TO public
  USING (true);

-- Allow public write access (TEMPORARY - for development)
-- TODO: Replace with authenticated admin-only policy in production
CREATE POLICY "Allow public write access"
  ON site_config
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Step 8: Create helpful view for admin
CREATE OR REPLACE VIEW site_config_summary AS
SELECT 
  id,
  jsonb_array_length(announcements) as announcement_count,
  jsonb_array_length(hero_images) as hero_image_count,
  announcements_enabled,
  updated_at
FROM site_config;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify the setup:

-- Check if table exists and has data
-- SELECT * FROM site_config;

-- Check announcements
-- SELECT announcements FROM site_config WHERE id = 1;

-- Check hero images
-- SELECT hero_images FROM site_config WHERE id = 1;

-- View summary
-- SELECT * FROM site_config_summary;
