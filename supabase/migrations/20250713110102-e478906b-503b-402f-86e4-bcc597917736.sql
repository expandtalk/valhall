-- Fix Karlevi stone name and alternatives
UPDATE public.runic_inscriptions 
SET name = 'Karlevistenen', 
    name_en = 'Karlevi Stone',
    also_known_as = ARRAY['Karlevistenen'],
    alternative_signum = ARRAY['B 1071', 'BN 1', 'DR 411', 'L 1323']
WHERE signum = 'Öl 1';

-- Update Öl 16 to have proper alternative signum 
UPDATE public.runic_inscriptions 
SET alternative_signum = ARRAY['L 1313', 'BN 27', 'B 1058']
WHERE signum = 'Öl 16';

-- Remove the duplicate BN entries that correspond to existing Öl stones
-- These are duplicates that should show the Öl signum as primary
DELETE FROM public.runic_inscriptions 
WHERE signum IN ('BN 1', 'BN 27') 
AND location = 'Plats okänd (endast signum från databas)';

-- Update all other Öland stones to have their BN equivalents as alternatives
-- This is a complex mapping but let's start with a few known ones
UPDATE public.runic_inscriptions 
SET alternative_signum = ARRAY['BN 2']
WHERE signum = 'Öl 2';

UPDATE public.runic_inscriptions 
SET alternative_signum = ARRAY['BN 3'] 
WHERE signum = 'Öl 3';

-- Add coordinates to Öl 16 from the information provided
UPDATE public.runic_inscriptions 
SET coordinates = POINT(16.5077, 56.3096)
WHERE signum = 'Öl 16';