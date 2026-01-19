-- Fix coordinates for additional Öland runestones B 1054 and B 1064

-- B 1054 (Öl 37) - Lerkaka, Runstens socken, Öland
-- Remove any incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1054', 'Öl 37', 'L 1305', 'BN 69');

-- Update main table coordinates for B 1054
UPDATE runic_inscriptions 
SET coordinates = point(16.7094, 56.7186)
WHERE signum = 'B 1054';

-- Insert correct coordinates into additional_coordinates as backup
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES ('B 1054', 56.7186, 16.7094, 'manual_correction', 'high', 'Lerkaka, Runstens socken, Öland - also known as Öl 37');

-- B 1064 (Öl 10) - Alvlösa, Smedby socken, Öland  
-- Remove any incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1064', 'Öl 10', 'BN 20', 'L 1317');

-- Update main table coordinates for B 1064
UPDATE runic_inscriptions 
SET coordinates = point(16.436, 56.422)
WHERE signum = 'B 1064';

-- Insert correct coordinates into additional_coordinates as backup
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES ('B 1064', 56.422, 16.436, 'manual_correction', 'high', 'Alvlösa, Smedby socken, Öland - also known as Öl 10');