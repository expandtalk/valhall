
-- Först, identifiera den dynasti vi vill behålla för Rurikdynastin
WITH oldest_rurik AS (
    SELECT id 
    FROM royal_dynasties 
    WHERE name = 'Rurikdynastin'
    ORDER BY created_at ASC
    LIMIT 1
),
rurik_duplicates AS (
    SELECT id 
    FROM royal_dynasties 
    WHERE name = 'Rurikdynastin'
    AND id NOT IN (SELECT id FROM oldest_rurik)
)
-- Uppdatera alla kungar som pekar på dubletterna till att peka på den äldsta
UPDATE historical_kings 
SET dynasty_id = (SELECT id FROM oldest_rurik)
WHERE dynasty_id IN (SELECT id FROM rurik_duplicates);

-- Nu kan vi säkert ta bort dubletterna
DELETE FROM royal_dynasties 
WHERE name = 'Rurikdynastin' 
AND id NOT IN (
    SELECT id 
    FROM royal_dynasties 
    WHERE name = 'Rurikdynastin'
    ORDER BY created_at ASC
    LIMIT 1
);

-- Fixa stavfelet i Ynglingaätten
UPDATE royal_dynasties 
SET name = 'Ynglingaätten' 
WHERE name = 'Ynlingaätten';

-- Uppdatera alla kungar som refererar till felstavade dynastier
UPDATE historical_kings 
SET dynasty_id = (
    SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1
)
WHERE dynasty_id IN (
    SELECT id FROM royal_dynasties WHERE name LIKE '%nlingaätten' OR name LIKE '%nglingaätten'
);
