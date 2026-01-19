
-- Lägg till fler kvinnliga härskare från nordisk historia
INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Margrete I', 'female', 'Denmark', 'historical', 1387, 1412, 'Drottning av Danmark, Norge och Sverige. Grundade Kalmarunionen 1397.', true, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Margrete I');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Kristina', 'female', 'Sweden', 'historical', 1632, 1654, 'Sveriges drottning, abdikerade 1654. Konverterade till katolicismen.', true, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Kristina');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Ulrika Eleonora', 'female', 'Sweden', 'historical', 1718, 1720, 'Sveriges drottning efter Karl XII:s död. Abdikerade till förmån för sin make.', true, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Ulrika Eleonora');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Thyra Danebod', 'female', 'Denmark', 'semi_legendary', 900, 950, 'Drottning av Danmark, gift med Gorm den gamle. Mor till Harald Blåtand.', false, true
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Thyra Danebod');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Astrid Olofsdotter', 'female', 'Sweden', 'historical', 1050, 1100, 'Drottning av Norge, gift med Olof den helige.', false, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Astrid Olofsdotter');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Sigrid Storråda', 'female', 'Sweden', 'semi_legendary', 980, 1020, 'Svensk drottning, gift med Erik Segersäll och senare Sven Tveskägg.', false, true
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Sigrid Storråda');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Ragnhild Eriksdotter', 'female', 'Norway', 'historical', 920, 970, 'Norsk prinsessa, mor till Harald Gråfäll.', false, false
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Ragnhild Eriksdotter');

INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Estrid Svendsdatter', 'female', 'Denmark', 'historical', 1020, 1070, 'Dansk prinsessa, syster till Knut den store.', false, true
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Estrid Svendsdatter');

-- Sätt dynastin för svenska kvinnliga härskare till Bjälboätten där det är lämpligt
UPDATE historical_kings 
SET dynasty_id = (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1)
WHERE name IN ('Astrid Olofsdotter', 'Sigrid Storråda') AND dynasty_id IS NULL;
