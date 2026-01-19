-- Stor datafix: Länka koordinater från coordinates-tabellen till runic_inscriptions

-- Först, uppdatera runic_inscriptions med koordinater från coordinates-tabellen där object_id matchar
UPDATE runic_inscriptions 
SET coordinates = point(c.longitude, c.latitude)
FROM coordinates c
WHERE runic_inscriptions.id::text = c.object_id 
  AND runic_inscriptions.coordinates IS NULL
  AND c.current_flag = 1;

-- Lägg till namn för viktiga stenar från din lista som fortfarande saknar dem
UPDATE runic_inscriptions SET name = 'Adelsöstenen', name_en = 'Adelsö Stone' WHERE signum = 'U 1' AND (name IS NULL OR name = '');

-- Lägg till mer koordinater för kända stenar som fortfarande saknar dem
UPDATE runic_inscriptions SET coordinates = point(17.95, 59.48) WHERE signum = 'U 1' AND coordinates IS NULL;