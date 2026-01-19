-- Fix incorrect river coordinates for Ljungbyån and Emån
-- Ljungbyån should not continue to Kalmarsund, it ends inland at Hossmo
-- Emån's mouth should be corrected to proper location

-- First, let's correct Ljungbyån by removing the incorrect Kalmarsund endpoint
DELETE FROM river_coordinates 
WHERE river_system_id = (SELECT id FROM river_systems WHERE name = 'Ljungbyån')
AND sequence_order = 6 AND name = 'Kalmarsund';

-- Update Ljungbyån coordinates to flow correctly - rename the final point
UPDATE river_coordinates 
SET latitude = 56.62, longitude = 16.30, name = 'Ljungby (slutpunkt)'
WHERE river_system_id = (SELECT id FROM river_systems WHERE name = 'Ljungbyån')
AND sequence_order = 5 AND name = 'Källstorp';

-- Fix Emån's mouth coordinates - Em should be at the correct location near Kalmar
UPDATE river_coordinates 
SET latitude = 56.62, longitude = 16.15, name = 'Em (mynning vid Kalmar)'
WHERE river_system_id = (SELECT id FROM river_systems WHERE name = 'Emån')
AND sequence_order = 9 AND name = 'Em (mynning i Kalmarsund)';

-- Also fix Emån's Oskarshamn coordinates which are too far east
UPDATE river_coordinates 
SET latitude = 57.26, longitude = 16.45
WHERE river_system_id = (SELECT id FROM river_systems WHERE name = 'Emån')
AND sequence_order = 8 AND name = 'Oskarshamn';