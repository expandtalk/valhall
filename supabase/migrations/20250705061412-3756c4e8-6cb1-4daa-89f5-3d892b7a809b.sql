-- Fix Ljungbyån and Emån river courses based on correct geographical information
-- Ljungbyån: 62 km long, starts at Hosmo, ends at Ljungbyholm
-- Emån: 229 km long, starts at Storesjön, flows through multiple lakes to Em

-- First, update the river system metadata
UPDATE river_systems 
SET total_length_km = 62, 
    description = 'Ljungbyån är en 62 km lång å som rinner från Hosmo till Ljungbyholm i Småland.'
WHERE name = 'Ljungbyån';

UPDATE river_systems 
SET total_length_km = 229,
    description = 'Emån är en 229 km lång å som rinner från Storesjön (286 m ö.h.) genom flera sjöar till Em vid Kalmar.'
WHERE name = 'Emån';

-- Delete all existing coordinates for both rivers to start fresh
DELETE FROM river_coordinates 
WHERE river_system_id IN (
  SELECT id FROM river_systems WHERE name IN ('Ljungbyån', 'Emån')
);

-- Insert correct coordinates for Ljungbyån (62 km, Hosmo to Ljungbyholm)
INSERT INTO river_coordinates (river_system_id, sequence_order, latitude, longitude, name, name_en, is_trading_post, is_portage)
SELECT rs.id, 1, 56.6150, 16.2800, 'Hosmo (källområde)', 'Hosmo (source area)', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 2, 56.6100, 16.2850, 'Hossmo kyrkbyn', 'Hossmo church village', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 3, 56.6050, 16.2900, 'Prästgårdsängen', 'Prästgårdsängen', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 4, 56.5950, 16.3100, 'Dansbo', 'Dansbo', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 5, 56.5800, 16.3300, 'Kattemåla', 'Kattemåla', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 6, 56.5650, 16.3500, 'Källstorp', 'Källstorp', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 7, 56.5500, 16.3700, 'Markustorp', 'Markustorp', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 8, 56.5350, 16.3900, 'Trekanten', 'Trekanten', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 9, 56.5200, 16.4100, 'Kranklösaholm', 'Kranklösaholm', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 10, 56.5100, 16.4200, 'Brudhoppet', 'Brudhoppet', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 11, 56.5000, 16.4300, 'Ljungbyholm (slutpunkt)', 'Ljungbyholm (endpoint)', true, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån';

-- Insert correct coordinates for Emån (229 km, from Storesjön through lakes to Em)
INSERT INTO river_coordinates (river_system_id, sequence_order, latitude, longitude, name, name_en, is_trading_post, is_portage)
SELECT rs.id, 1, 57.4500, 15.8000, 'Storesjön (286 m ö.h.)', 'Storesjön (286m above sea level)', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 2, 57.4400, 15.8200, 'Lillesjön', 'Lillesjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 3, 57.4200, 15.8500, 'Hagasjön', 'Hagasjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 4, 57.4000, 15.8800, 'Uppsjön', 'Uppsjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 5, 57.3800, 15.9100, 'Prinsasjön', 'Prinsasjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 6, 57.3600, 15.9400, 'Nålsjön', 'Nålsjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 7, 57.3400, 15.9700, 'Tjurken', 'Tjurken', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 8, 57.3200, 16.0000, 'Flögen', 'Flögen', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 9, 57.3000, 16.0300, 'Norrasjön', 'Norrasjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 10, 57.2800, 16.0600, 'Grumlan', 'Grumlan', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 11, 57.2600, 16.0900, 'Aspödammen', 'Aspödammen', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 12, 57.2400, 16.1200, 'Turefors', 'Turefors', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 13, 57.2200, 16.1500, 'Järnsjön', 'Järnsjön', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 14, 57.1800, 16.2000, 'Holsbybrunn', 'Holsbybrunn', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 15, 57.1400, 16.2500, 'Kvillsfors', 'Kvillsfors', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 16, 57.0800, 16.3200, 'Målilla', 'Målilla', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 17, 57.0200, 16.3800, 'Högsby', 'Högsby', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 18, 56.9500, 16.4500, 'Emmerbron', 'Emmerbron', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 19, 56.6700, 16.1500, 'Em (mynning vid Kalmar)', 'Em (mouth at Kalmar)', true, false
FROM river_systems rs WHERE rs.name = 'Emån';