-- Clean up duplicate Yngling dynasties and migrate data
-- First, keep the first Ynglingar dynasty and delete the duplicates

-- Update any historical kings that reference the duplicate dynasties
UPDATE historical_kings 
SET dynasty_id = '22d68f9b-1733-4cee-9bfc-2fd51ff84981'  -- Keep Ynglingar dynasty
WHERE dynasty_id IN (
  '11111111-1111-1111-1111-111111111111',  -- Ynglingarätten
  '284e497d-f62a-4acc-ba39-d390529de130'   -- Ynglingaätten
);

-- Update king_source_mentions if any references exist
UPDATE king_source_mentions 
SET king_id = (
  SELECT hk.id FROM historical_kings hk 
  WHERE hk.dynasty_id = '22d68f9b-1733-4cee-9bfc-2fd51ff84981'
  AND hk.name = (
    SELECT hk2.name FROM historical_kings hk2 
    WHERE hk2.id = king_source_mentions.king_id
  )
  LIMIT 1
)
WHERE king_id IN (
  SELECT id FROM historical_kings 
  WHERE dynasty_id IN (
    '11111111-1111-1111-1111-111111111111',
    '284e497d-f62a-4acc-ba39-d390529de130'
  )
);

-- Update king_inscription_links if any references exist  
UPDATE king_inscription_links 
SET king_id = (
  SELECT hk.id FROM historical_kings hk 
  WHERE hk.dynasty_id = '22d68f9b-1733-4cee-9bfc-2fd51ff84981'
  AND hk.name = (
    SELECT hk2.name FROM historical_kings hk2 
    WHERE hk2.id = king_inscription_links.king_id
  )
  LIMIT 1
)
WHERE king_id IN (
  SELECT id FROM historical_kings 
  WHERE dynasty_id IN (
    '11111111-1111-1111-1111-111111111111',
    '284e497d-f62a-4acc-ba39-d390529de130'
  )
);

-- Now delete the duplicate dynasties
DELETE FROM royal_dynasties 
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',  -- Ynglingarätten
  '284e497d-f62a-4acc-ba39-d390529de130'   -- Ynglingaätten
);

-- Update the remaining Ynglingar dynasty with better information
UPDATE royal_dynasties 
SET 
  name = 'Ynglingar',
  description = 'Legendär svensk kungaätt som enligt sagorna härstammade från guden Freyr (Yngvi). Beskrivs främst i Ynglingasagan och andra fornnordiska källor. Dynastin anses ha styrt över Svitjod (Sverige) under förhistorisk tid.',
  period_start = 200,
  period_end = 1000
WHERE id = '22d68f9b-1733-4cee-9bfc-2fd51ff84981';