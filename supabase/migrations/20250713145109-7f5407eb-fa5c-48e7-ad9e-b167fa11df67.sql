-- Uppdatera U 489 (Laggastenen) med komplett information
UPDATE runic_inscriptions 
SET 
  name = 'Laggastenen',
  name_en = 'Lagga Stone',
  alternative_signum = ARRAY['L 570', 'B 207'],
  location = 'Morby, Lagga socken (ursprunglig plats)',
  parish = 'Lagga socken',
  municipality = 'Knivsta',
  county = 'Uppsala län',
  landscape = 'Uppland',
  country = 'Sverige',
  transliteration = 'khulu · lit · kira · bro fr ant · kilaua · totur · sin · uk sum · ati · ulfr · ybiʀ risti',
  translation_sv = 'Gullaug(?) let gæra bro fyr and Gillaugaʀ, dottur sinnaʀ ok sum atti Ulfʀ. Øpiʀ risti.',
  translation_en = 'Gullaug(?) had the bridge made for the spirit of Gillaug, her daughter, and whom Ulfr owned (i.e. was married to). Œpir carved.',
  object_type = 'runsten',
  material = 'granit',
  style_group = 'Pr 4',
  period_start = 725,
  period_end = 1100,
  dating_text = 'Vikingatid (725-1100)',
  historical_context = 'Handlar om brobyggnad som kristen god gärning för de döda. Ristad av den berömde runmästaren Öpir. Hämtades från Mora äng, Lagga, år 1729. Visades vid världsutställningen i Paris 1867.',
  scholarly_notes = 'Signerad av Öpir, en av de mest kända runmästarna. Exempel på kristen runsten där brobyggnad ses som god gärning för den avlidnas själ. Flyttad från ursprungsplatsen 1729.',
  raa_number = 'RAÄ 1:7',
  current_location = 'Universitetsparken, Uppsala'
WHERE signum = 'U 489';