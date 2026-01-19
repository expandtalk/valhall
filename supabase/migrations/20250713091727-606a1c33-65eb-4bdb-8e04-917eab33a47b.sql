-- Lägg till koordinater för U 1132 vid Gimo damm
UPDATE runic_inscriptions 
SET coordinates = point(18.15541, 60.19387)
WHERE signum = 'U 1132';