/*
  # Update artwork images

  1. Changes
    - Updates image_url for all 18 artworks with new URLs
    - Adds appropriate titles and categories for each artwork

  2. Note
    - Preserves existing artwork IDs and other metadata
    - Updates only image URLs and related content
*/

UPDATE artworks SET
  title = 'Alien Swans',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/aliean%20swans.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2FsaWVhbiBzd2Fucy5qcGciLCJpYXQiOjE3NDE4MTczNjksImV4cCI6MjA1NzE3NzM2OX0.6Z8CQdazOtMWXkA_emQUhJ4W6JD0_YJkOLPiewKC5uk',
  category = 'fantasy'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 0);

UPDATE artworks SET
  title = 'Alien UFO',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Alien%20ufo.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL0FsaWVuIHVmby5qcGciLCJpYXQiOjE3NDE4MTczODUsImV4cCI6MjA1NzE3NzM4NX0.gA_J5a1z_lgypEfytTnNqkYKaFtERXcXq56Ddm_yfAg',
  category = 'sci-fi'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 1);

UPDATE artworks SET
  title = 'Alpaca',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Alpaca.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL0FscGFjYS5qcGciLCJpYXQiOjE3NDE4MTc0MDAsImV4cCI6MjA1NzE3NzQwMH0.HrWNsDCygzaH5JMshoS5kUYAMPO78Z5b__-dl78kLFY',
  category = 'animals'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 2);

UPDATE artworks SET
  title = 'Arse Tree',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/arse%20tree.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2Fyc2UgdHJlZS5qcGciLCJpYXQiOjE3NDE4MTc0NTUsImV4cCI6MjA1NzE3NzQ1NX0.DpsgGCzczM344KdozCb1s4tWKNZCIRLFivSujwXVUCw',
  category = 'nature'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 3);

UPDATE artworks SET
  title = 'Awakening of the Coneheads',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Awanking%20of%20he%20coneheads.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL0F3YW5raW5nIG9mIGhlIGNvbmVoZWFkcy5qcGciLCJpYXQiOjE3NDE4MTc0NzAsImV4cCI6MjA1NzE3NzQ3MH0.IYhNR-GfIOVkd3_FGx0Lwzze05x5kdNOiumMG-9HfBU',
  category = 'abstract'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 4);

UPDATE artworks SET
  title = 'Butternut Squash',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/butternt%20squash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2J1dHRlcm50IHNxdWFzaC5qcGciLCJpYXQiOjE3NDE4MTc1MzAsImV4cCI6MjA1NzE3NzUzMH0.4iZUoT5YmoGjmeVLQxmZwx12b9XzlWSi_f3rzRl95qA',
  category = 'food'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 5);

UPDATE artworks SET
  title = 'Elephant',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/elepahnt.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2VsZXBhaG50LmpwZyIsImlhdCI6MTc0MTgxNzU1MSwiZXhwIjoyMDU3MTc3NTUxfQ.ZYOsr3tR41bTgoSqj3-iH-oNMtrosoQduM1SeNntJXg',
  category = 'animals'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 6);

UPDATE artworks SET
  title = 'Halloween',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Halloween.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL0hhbGxvd2Vlbi5qcGciLCJpYXQiOjE3NDE4MTc1NzMsImV4cCI6MjA1NzE3NzU3M30.hI8bUgIdeGX9IYToCfI_IL2ejKHQQXVGoZzN_bGafQI',
  category = 'holiday'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 7);

UPDATE artworks SET
  title = 'Light and Dark',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/light%20and%20dark.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2xpZ2h0IGFuZCBkYXJrLmpwZyIsImlhdCI6MTc0MTgxNzU5MiwiZXhwIjoyMDU3MTc3NTkyfQ.KgexU3s2myTQ7WLFoDAUkHz9GdUGfPLoxaRzJG-h-iM',
  category = 'abstract'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 8);

UPDATE artworks SET
  title = 'Lochness Dragon',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/lockness%20dragon.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2xvY2tuZXNzIGRyYWdvbi5qcGciLCJpYXQiOjE3NDE4MTc2MjQsImV4cCI6MjA1NzE3NzYyNH0.NqhiFs6iSknfmg_X9afe1ev1llkIR7WHsGOoZrBPv1I',
  category = 'fantasy'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 9);

UPDATE artworks SET
  title = 'Mushrooms and Animals',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/mushrooms%20and%20nnaimals.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL211c2hyb29tcyBhbmQgbm5haW1hbHMuanBnIiwiaWF0IjoxNzQxODE3NjU5LCJleHAiOjIwNTcxNzc2NTl9.5pnuu86zGn5jZlhe5sOIyiDvzf9VUAB8zzfXM7hysLg',
  category = 'nature'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 10);

UPDATE artworks SET
  title = 'Poodle Portrait',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Poodle%20portarait.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL1Bvb2RsZSBwb3J0YXJhaXQuanBnIiwiaWF0IjoxNzQxODE3NjkzLCJleHAiOjIwNTcxNzc2OTN9.xN7GRxA-IYylhwBP0LyM2ADBUlkD6pidaVqxvK8sdGM',
  category = 'animals'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 11);

UPDATE artworks SET
  title = 'Psychedelic Tree',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/psychedelic%20tree.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL3BzeWNoZWRlbGljIHRyZWUuanBnIiwiaWF0IjoxNzQxODE3NzU3LCJleHAiOjIwNTcxNzc3NTd9.2gnKfWYttjsQLWm8FmjCW66vuaSrENBtrmS9GUP0vZc',
  category = 'psychedelic'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 12);

UPDATE artworks SET
  title = 'Rainbow Skull',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Rainbow%20skull.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL1JhaW5ib3cgc2t1bGwuanBnIiwiaWF0IjoxNzQxODE3NzgyLCJleHAiOjIwNTcxNzc3ODJ9.dWpSiDw7ikpL2ZisJmQ3uRbMbZZaU6kP_L8pCdkqeko',
  category = 'psychedelic'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 13);

UPDATE artworks SET
  title = 'Sun and Moon',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/sun%20and%20moon.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL3N1biBhbmQgbW9vbi5qcGciLCJpYXQiOjE3NDE4MTc4MzcsImV4cCI6MjA1NzE3NzgzN30.ouc60DLyuTHTCuISFXKCaJbj8m4fZHVUIDu9tUe7UcU',
  category = 'celestial'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 14);

UPDATE artworks SET
  title = 'Tears Waterfall',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/tears%20watefall.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL3RlYXJzIHdhdGVmYWxsLmpwZyIsImlhdCI6MTc0MTgxODE0NCwiZXhwIjoyMDU3MTc4MTQ0fQ.E-NxqlMZ03wA4YMxeTe4W99CQt0MBXKFUPDMRJDWPTc',
  category = 'surreal'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 15);

UPDATE artworks SET
  title = 'Winged Cat',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/winged%20cat.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL3dpbmdlZCBjYXQuanBnIiwiaWF0IjoxNzQxODE4MTYyLCJleHAiOjIwNTcxNzgxNjJ9.QBTrawTIRf4V3aUS4lw3mJ-K2zxTYBE4GbjYxdP0Z3I',
  category = 'fantasy'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 16);

UPDATE artworks SET
  title = 'Witch Ladies',
  image_url = 'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/witch%20ladys.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL3dpdGNoIGxhZHlzLmpwZyIsImlhdCI6MTc0MTgxODE4OSwiZXhwIjoyMDU3MTc4MTg5fQ.LrDl4ZMEJSXD7yguIR_iW6m-dcAkKkJQfBvw5EMnpUc',
  category = 'fantasy'
WHERE id = (SELECT id FROM artworks LIMIT 1 OFFSET 17);