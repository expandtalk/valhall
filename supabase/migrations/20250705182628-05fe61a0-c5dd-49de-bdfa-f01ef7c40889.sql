-- Remove incorrect Nominatim coordinates for Bornholm stones (Bh series) that are wrongly placed
DELETE FROM additional_coordinates 
WHERE signum LIKE 'Bh %' 
AND source = 'nominatim';

-- Remove incorrect Nominatim coordinates for BN series in Öland/Kalmarsund area
DELETE FROM additional_coordinates 
WHERE signum LIKE 'BN %' 
AND source = 'nominatim'
AND latitude BETWEEN 56.0 AND 57.5 
AND longitude BETWEEN 16.0 AND 17.0;

-- Remove incorrect B-series coordinates in Kalmarsund/Öland area that seem wrong
DELETE FROM additional_coordinates 
WHERE signum SIMILAR TO 'B [0-9]%' 
AND source = 'nominatim'
AND latitude BETWEEN 56.0 AND 57.5 
AND longitude BETWEEN 16.0 AND 17.0;

-- Remove specific DR stones with incorrect Bornholm coordinates
DELETE FROM additional_coordinates 
WHERE signum IN ('DR 404', 'DR IK95')
AND source = 'nominatim';