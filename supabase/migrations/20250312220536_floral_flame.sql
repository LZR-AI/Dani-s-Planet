/*
  # Add sample artworks

  1. Data Changes
    - Add 18 sample artwork pieces with diverse categories and mediums
    - Each artwork includes:
      - Title
      - Description
      - Image URL (from Unsplash)
      - Category
      - Medium
      - Dimensions
*/

INSERT INTO artworks (title, description, image_url, category, medium, dimensions) VALUES
  ('Cosmic Dreams', 'A vibrant exploration of celestial bodies in motion', 'https://images.unsplash.com/photo-1634577071318-089068cf9819?auto=format&fit=crop&w=800&q=80', 'abstract', 'Digital Art', '3000x3000px'),
  ('Urban Rhythm', 'Capturing the pulse of city life through geometric patterns', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80', 'urban', 'Mixed Media', '24x36 inches'),
  ('Ethereal Garden', 'A dreamy interpretation of a mystical garden at twilight', 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80', 'nature', 'Watercolor', '18x24 inches'),
  ('Digital Wilderness', 'Where technology meets nature in perfect harmony', 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80', 'digital', 'Digital Art', '4000x3000px'),
  ('Neon Nights', 'A celebration of urban nightlife in vibrant colors', 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=800&q=80', 'urban', 'Photography', '20x30 inches'),
  ('Sacred Geometry', 'Exploring mathematical patterns in nature', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 'abstract', 'Digital Art', '2500x2500px'),
  ('Ocean Dreams', 'Abstract interpretation of ocean waves and currents', 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&w=800&q=80', 'nature', 'Acrylic', '30x40 inches'),
  ('Quantum Field', 'Visualizing the invisible forces of quantum mechanics', 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80', 'science', 'Digital Art', '4000x4000px'),
  ('Forest Whispers', 'A mystical forest scene captured in ethereal light', 'https://images.unsplash.com/photo-1598439210625-5325a7c11cc3?auto=format&fit=crop&w=800&q=80', 'nature', 'Photography', '16x20 inches'),
  ('Digital Dreams', 'Abstract exploration of digital consciousness', 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80', 'digital', 'Digital Art', '3500x2000px'),
  ('Urban Fragments', 'Deconstructed cityscape in geometric forms', 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80', 'urban', 'Collage', '24x36 inches'),
  ('Celestial Dance', 'Abstract representation of cosmic movement', 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80', 'abstract', 'Digital Art', '3000x3000px'),
  ('Techno Flora', 'Hybrid flowers blooming in a digital garden', 'https://images.unsplash.com/photo-1634577071497-3568d1f57f63?auto=format&fit=crop&w=800&q=80', 'nature', 'Digital Art', '2800x3500px'),
  ('Neural Network', 'Visualization of artificial intelligence patterns', 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80', 'science', 'Digital Art', '4000x3000px'),
  ('Crystal Vision', 'Abstract exploration of crystalline structures', 'https://images.unsplash.com/photo-1618005198208-2d5545191417?auto=format&fit=crop&w=800&q=80', 'abstract', 'Digital Art', '2500x2500px'),
  ('Urban Pulse', 'The rhythm of city life captured in motion', 'https://images.unsplash.com/photo-1619385859058-3d0eb40e7cb5?auto=format&fit=crop&w=800&q=80', 'urban', 'Photography', '24x36 inches'),
  ('Quantum Garden', 'Where quantum physics meets natural beauty', 'https://images.unsplash.com/photo-1620121684840-edffcfc4b878?auto=format&fit=crop&w=800&q=80', 'science', 'Digital Art', '3000x3000px'),
  ('Digital Fauna', 'Reimagining wildlife through a digital lens', 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?auto=format&fit=crop&w=800&q=80', 'nature', 'Digital Art', '3500x2500px');