-- Uppdatera Rökstenen (Ög 136) med grundläggande information först
UPDATE runic_inscriptions SET 
  material = 'granit (sten)',
  object_type = 'sten,runsten',
  location = 'Röks kyrkogård',
  parish = 'Röks socken',
  province = 'Östergötland',
  municipality = 'Ödeshög',
  county = 'Östergötland',
  country = 'Sverige',
  landscape = 'Östergötland',
  dating_text = '800–899',
  period_start = 800,
  period_end = 899,
  rune_type = 'fuþark: 16-typiga, fuþark: kortkvist',
  style_group = 'Rak',
  also_known_as = ARRAY['L 2028', 'B 913'],
  coordinates = point(14.7752, 58.295),
  raa_number = 'RAÄ-nr: 1',
  k_samsok_uri = 'http://kulturarvsdata.se/uu/srdb/3a61c080-77fc-4a44-b5ac-f3a4b33b3aab'
WHERE signum = 'Ög 136';