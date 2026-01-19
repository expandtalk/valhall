
-- Lägg till Gorm den gamle, kung av Danmark och far till Harald Blåtand
INSERT INTO historical_kings (name, gender, region, status, reign_start, reign_end, description, archaeological_evidence, runestone_mentions) 
SELECT 'Gorm den gamle', 'male', 'Denmark', 'historical', 920, 958, 'Kung av Danmark under första hälften av 900-talet. Far till Harald Blåtand, gift med Thyra Danebod. Död omkring 958 enligt dendrodatering från Jelling. Lät resa lilla Jellingestenen över sin hustru Thyra.', true, true
WHERE NOT EXISTS (SELECT 1 FROM historical_kings WHERE name = 'Gorm den gamle');
