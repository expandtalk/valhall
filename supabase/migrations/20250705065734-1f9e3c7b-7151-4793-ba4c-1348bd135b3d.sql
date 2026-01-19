-- Fix river coordinates based on correct geographical information
-- Ljungbyån: Start at Hossmo 56°38′14″N 16°13′35″E
-- Emån: Start at Em 57.131517706631264, 16.510177373443433 and pass through 57.126641°N 16.4838°E  
-- Ronnebyån: Start at 56.174505, 15.300472

-- Delete all existing coordinates for these rivers
DELETE FROM river_coordinates 
WHERE river_system_id IN (
  SELECT id FROM river_systems WHERE name IN ('Ljungbyån', 'Emån', 'Ronnebyån')
);

-- Fix Ljungbyån - correct start at Hossmo and realistic flow
INSERT INTO river_coordinates (river_system_id, sequence_order, latitude, longitude, name, name_en, is_trading_post, is_portage)
SELECT rs.id, 1, 56.637222, 16.226389, 'Hossmo (start)', 'Hossmo (start)', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 2, 56.630, 16.240, 'Ljungby kyrka', 'Ljungby church', false, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån'
UNION ALL
SELECT rs.id, 3, 56.500, 16.430, 'Ljungbyholm (slutpunkt)', 'Ljungbyholm (endpoint)', true, false
FROM river_systems rs WHERE rs.name = 'Ljungbyån';

-- Fix Emån - correct start at Em and flow direction  
INSERT INTO river_coordinates (river_system_id, sequence_order, latitude, longitude, name, name_en, is_trading_post, is_portage)
SELECT rs.id, 1, 57.131518, 16.510177, 'Em (start)', 'Em (start)', true, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 2, 57.126641, 16.4838, 'Em passage', 'Em passage', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 3, 57.02, 16.38, 'Högsby', 'Högsby', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 4, 56.95, 16.45, 'Emmerbron', 'Emmerbron', false, false
FROM river_systems rs WHERE rs.name = 'Emån'
UNION ALL
SELECT rs.id, 5, 56.67, 16.15, 'Kalmar (mynning)', 'Kalmar (mouth)', true, false
FROM river_systems rs WHERE rs.name = 'Emån';

-- Fix Ronnebyån - correct start coordinates
INSERT INTO river_coordinates (river_system_id, sequence_order, latitude, longitude, name, name_en, is_trading_post, is_portage)
SELECT rs.id, 1, 56.174505, 15.300472, 'Ronnebyån start', 'Ronnebyån start', false, false
FROM river_systems rs WHERE rs.name = 'Ronnebyån'
UNION ALL
SELECT rs.id, 2, 56.21, 15.27, 'Ronneby', 'Ronneby', true, false
FROM river_systems rs WHERE rs.name = 'Ronnebyån'
UNION ALL
SELECT rs.id, 3, 56.16, 15.32, 'Ronnebyfjärden (mynning)', 'Ronnebyfjärden (mouth)', false, false
FROM river_systems rs WHERE rs.name = 'Ronnebyån';