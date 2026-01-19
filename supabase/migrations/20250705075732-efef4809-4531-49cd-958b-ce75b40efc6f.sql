-- Clean up any remaining duplicate entries and fix potential display issues
-- First, let's check if there are any Harald Blåtand or Gorm entries that might be outside Sjökungar dynasty

-- Remove any duplicate Harald Blåtand entries that are not in Sjökungar dynasty  
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

-- Update king_inscription_links for Harald
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

-- Now delete any duplicate entries
DELETE FROM historical_kings 
WHERE name = 'Harald Blåtand' 
AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';

DELETE FROM historical_kings 
WHERE name = 'Gorm den Gamle' 
AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';