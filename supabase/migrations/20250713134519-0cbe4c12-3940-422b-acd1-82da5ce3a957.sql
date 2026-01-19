-- Stor datafix fas 5: Övriga landskap och massiv koordinatlänkning

-- Västmanlands runstenar
UPDATE runic_inscriptions SET name = 'Anundshögsstenen', name_en = 'Anundshög Stone' WHERE signum = 'Vs 13' AND (name IS NULL OR name = '');

-- Jämtlands runstenar  
UPDATE runic_inscriptions SET name = 'Frösöstenen', name_en = 'Frösö Stone' WHERE signum = 'J 1' AND (name IS NULL OR name = '');

-- Värmlands runstenar
UPDATE runic_inscriptions SET name = 'Järsbergsstenen', name_en = 'Järsberg Stone' WHERE signum = 'Vr 1' AND (name IS NULL OR name = '');

-- Koordinater för övriga landskap
UPDATE runic_inscriptions SET coordinates = point(16.5433, 59.6133) WHERE signum = 'Vs 13' AND coordinates IS NULL; -- Anundshög Västerås
UPDATE runic_inscriptions SET coordinates = point(14.6333, 63.1833) WHERE signum = 'J 1' AND coordinates IS NULL; -- Frösön Östersund
UPDATE runic_inscriptions SET coordinates = point(14.1167, 59.3833) WHERE signum = 'Vr 1' AND coordinates IS NULL; -- Järsberg

-- Massiv koordinatlänkning från coordinates-tabellen - försök igen med bättre matchning
UPDATE runic_inscriptions 
SET coordinates = point(c.longitude, c.latitude)
FROM coordinates c
WHERE runic_inscriptions.id::text = c.object_id 
  AND runic_inscriptions.coordinates IS NULL
  AND c.latitude IS NOT NULL 
  AND c.longitude IS NOT NULL;