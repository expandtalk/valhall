
-- Add the Skilfing/Scylfing dynasty to royal_dynasties
INSERT INTO royal_dynasties (name, name_en, description, period_start, period_end, region) VALUES
('Skilfingar', 'Scylfing Dynasty', 'Mythical Scandinavian royal dynasty primarily associated with the Swedes, claiming divine descent from the god Frej. Known from both Old English (Beowulf) and Old Norse sources, considered one of the oldest known royal dynasties in Scandinavia. Also identified with the Yngling dynasty in Nordic sources.', 400, 800, 'Sweden');

-- Update existing kings to belong to the Skilfing dynasty
-- First, get the dynasty ID for Skilfingar
WITH skilfing_dynasty AS (
  SELECT id FROM royal_dynasties WHERE name = 'Skilfingar' LIMIT 1
)
UPDATE historical_kings 
SET dynasty_id = (SELECT id FROM skilfing_dynasty)
WHERE name IN ('Adils den mäktige', 'Ottar Vendelkråka', 'Ale')
AND region = 'Sweden';
