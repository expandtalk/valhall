
-- Add the additional female rulers mentioned (using INSERT without ON CONFLICT)
INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Olga den Fagra', 'female', 'Kievrus', 'historical', 945, 969, 'Regent av Kievrus 945–969. Igors änka, regent för Svjatoslav. Döpt i Konstantinopel 955, hämnade sin mans död.', true, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Olga den Fagra');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Ingegärd Birgersdotter', 'female', 'Sweden', 'historical', 1250, 1300, 'Dotter till Birger jarl. Från Bjälboätten.', false, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Ingegärd Birgersdotter');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Katarina Sunesdotter', 'female', 'Sweden', 'historical', 1280, 1320, 'Drottning från Bjälboätten. Gift med kung från dynastin.', false, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Katarina Sunesdotter');

-- Update Olga av Kiev to use the correct name if it exists
UPDATE historical_kings 
SET name = 'Olga den Fagra',
    description = 'Regent av Kievrus 945–969. Igors änka, regent för Svjatoslav. Döpt i Konstantinopel 955, hämnade sin mans död.'
WHERE name = 'Olga av Kiev';

-- Ensure the new female rulers are assigned to the correct dynasty if they belong to Bjälboätten
UPDATE historical_kings 
SET dynasty_id = (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1)
WHERE name IN ('Ingegärd Birgersdotter', 'Katarina Sunesdotter');
