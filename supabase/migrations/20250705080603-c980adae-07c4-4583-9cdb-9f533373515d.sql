-- Add missing rulers from the genealogical sources

-- Add Thyra Danebod (Gorm's wife)
INSERT INTO historical_kings (name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, gender) 
VALUES (
  'Thyra Danebod',
  ARRAY['Thyra', 'Thyra Dannebod'],
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', -- Sjökungar dynasty
  920,
  950,
  'historical',
  'Danmark',
  'Drottning av Danmark, gift med Gorm den gamle. Omnämnd på Jellingstenarna som "Danmarks bot" (Danmarkar bot). Mor till Harald Blåtand. Hög tillförlitlighet genom samtida runstenar.',
  true,
  true,
  'female'
);

-- Add Harald Klak
INSERT INTO historical_kings (name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, gender) 
VALUES (
  'Harald Klak',
  ARRAY['Harald Klaksson'],
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', -- Sjökungar dynasty
  812,
  827,
  'historical',
  'Danmark/Jylland',
  'Dansk småkung på Jylland mellan 812-827, död efter 828. Son till Halvdan som anförtrodde sig Karl den store år 807. Enligt legenden bodde han i trakterna kring Klagstorp i Skåne som ska vara uppkallat efter honom.',
  false,
  false,
  'male'
);