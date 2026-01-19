-- Fix coordinates for Öland runestones B 1066 and B 1061

-- B 1066 (Öl 26) - Sandby kyrkogård, Sandby socken, Öland
-- Remove any incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1066', 'Öl 26', 'BN 55', 'L 1586', 'L 1587');

-- Update main table coordinates for B 1066
UPDATE runic_inscriptions 
SET coordinates = point(16.6409, 56.5804)
WHERE signum = 'B 1066';

-- Insert correct coordinates into additional_coordinates as backup
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES ('B 1066', 56.5804, 16.6409, 'manual_correction', 'high', 'Sandby kyrkogård, Sandby socken, Öland - also known as Öl 26');

-- B 1061 (Öl 18) - Seby, Segerstads socken, Öland  
-- Remove any incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1061', 'Öl 18', 'BN 30', 'L 1311');

-- Update main table coordinates for B 1061
UPDATE runic_inscriptions 
SET coordinates = point(16.531, 56.3435)
WHERE signum = 'B 1061';

-- Insert correct coordinates into additional_coordinates as backup
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES ('B 1061', 56.3435, 16.531, 'manual_correction', 'high', 'Seby, Segerstads socken, Öland - also known as Öl 18');