-- Fix Öland B signum duplicates by updating Öl signums with alternative signums and removing duplicates

-- Update Öl 1 (Karlevistenen) to include its B variants as alternatives
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['B 107', 'B 1071', 'BN 1', 'DR 411', 'L 1323']
WHERE signum = 'Öl 1' AND (alternative_signum IS NULL OR NOT 'B 107' = ANY(alternative_signum));

-- Remove the duplicate B entries that correspond to Öl 1
DELETE FROM runic_inscriptions 
WHERE signum IN ('B 107', 'B 1071') 
AND parish = 'Vickleby socken'
AND location = 'Plats okänd (endast signum från databas)';