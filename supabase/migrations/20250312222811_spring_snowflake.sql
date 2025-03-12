/*
  # Update artworks table and policies

  1. Table Changes
    - Create artworks table if it doesn't exist with:
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `image_url` (text, required)
      - `category` (text, required)
      - `medium` (text, optional)
      - `dimensions` (text, optional)
      - `created_at` (timestamp with time zone, default: now())
      - `likes` (integer, default: 0)
      - `is_featured` (boolean, default: false)

  2. Security
    - Enable RLS
    - Drop existing policies if they exist
    - Create new policies for:
      - Public read access
      - Authenticated user management
*/

-- Create the artworks table if it doesn't exist
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL,
  medium text,
  dimensions text,
  created_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  is_featured boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access" ON artworks;
  DROP POLICY IF EXISTS "Allow authenticated users full access" ON artworks;
END $$;

-- Create new policies
CREATE POLICY "Allow public read access" 
  ON artworks
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON artworks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);