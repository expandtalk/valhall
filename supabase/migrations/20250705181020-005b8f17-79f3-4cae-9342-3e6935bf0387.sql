-- Remove incorrect BN coordinates that are clearly wrong (Stockholm coordinates for Öland inscriptions)
DELETE FROM additional_coordinates 
WHERE signum LIKE 'BN %' 
AND latitude = 59.583333 
AND longitude = 16 
AND source = 'nominatim';

-- Remove other suspicious BN coordinates that seem incorrect (too far north for Öland)
DELETE FROM additional_coordinates 
WHERE signum LIKE 'BN %' 
AND latitude > 58.0 
AND source = 'nominatim';

-- Also remove some incorrect Bl coordinates that might be wrong
DELETE FROM additional_coordinates 
WHERE signum LIKE 'Bl %' 
AND latitude > 57.0 
AND source = 'nominatim';