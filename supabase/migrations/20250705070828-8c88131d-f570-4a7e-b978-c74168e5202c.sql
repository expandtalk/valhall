-- First, find the IDs of the old duplicates and the new Sjökungar versions

-- Get the old Harald Blåtand (not in Sjökungar dynasty)
-- and update all references to point to the new Sjökungar version instead

-- Update king_source_mentions to reference the Sjökungar version
UPDATE king_source_mentions 
SET king_id = (
  SELECT id FROM historical_kings 
  WHERE name = 'Harald Blåtand' 
  AND dynasty_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
  LIMIT 1
)
WHERE king_id IN (
  SELECT id FROM historical_kings 
  WHERE name = 'Harald Blåtand' 
  AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
);

-- Update king_inscription_links to reference the Sjökungar version for Harald
UPDATE king_inscription_links 
SET king_id = (
  SELECT id FROM historical_kings 
  WHERE name = 'Harald Blåtand' 
  AND dynasty_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
  LIMIT 1
)
WHERE king_id IN (
  SELECT id FROM historical_kings 
  WHERE name = 'Harald Blåtand' 
  AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
);

-- Do the same for Gorm den Gamle
UPDATE king_source_mentions 
SET king_id = (
  SELECT id FROM historical_kings 
  WHERE name = 'Gorm den Gamle' 
  AND dynasty_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
  LIMIT 1
)
WHERE king_id IN (
  SELECT id FROM historical_kings 
  WHERE name = 'Gorm den Gamle' 
  AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
);

-- Update king_inscription_links for Gorm
UPDATE king_inscription_links 
SET king_id = (
  SELECT id FROM historical_kings 
  WHERE name = 'Gorm den Gamle' 
  AND dynasty_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
  LIMIT 1
)
WHERE king_id IN (
  SELECT id FROM historical_kings 
  WHERE name = 'Gorm den Gamle' 
  AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
);

-- Now we can safely delete the old duplicates
DELETE FROM historical_kings 
WHERE name = 'Harald Blåtand' 
AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';

DELETE FROM historical_kings 
WHERE name = 'Gorm den Gamle' 
AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';