/*
  # Create Artworks Schema

  1. New Tables
    - `artworks`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `image_url` (text, required)
      - `category` (text, required)
      - `medium` (text)
      - `dimensions` (text)
      - `created_at` (timestamp)
      - `likes` (integer)
      - `is_featured` (boolean)
    
  2. Security
    - Enable RLS on `artworks` table
    - Add policies for public read access
    - Add policy for admin write access
*/

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

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON artworks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access"
  ON artworks
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');