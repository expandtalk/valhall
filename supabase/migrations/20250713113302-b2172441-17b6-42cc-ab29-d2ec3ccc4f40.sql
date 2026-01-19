-- Fix B signums by updating existing U signums with alternative signums and removing duplicates

-- First, update existing U signums to include B signums as alternatives
-- U 337 should include B 1 and L 507 as alternatives
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['B 1', 'L 507']
WHERE signum = 'U 337' AND (alternative_signum IS NULL OR NOT 'B 1' = ANY(alternative_signum));

-- U 330 should include B 10 and L 497 as alternatives  
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['B 10', 'L 497']
WHERE signum = 'U 330' AND (alternative_signum IS NULL OR NOT 'B 10' = ANY(alternative_signum));

-- U 317 should include B 105 and L 438 as alternatives
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['B 105', 'L 438']
WHERE signum = 'U 317' AND (alternative_signum IS NULL OR NOT 'B 105' = ANY(alternative_signum));

-- U 293 should include B 106 and L 430 as alternatives
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['B 106', 'L 430']
WHERE signum = 'U 293' AND (alternative_signum IS NULL OR NOT 'B 106' = ANY(alternative_signum));

-- U 276 should include B 197, B 107 and L 421 as alternatives
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['B 197', 'B 107', 'L 421']
WHERE signum = 'U 276' AND (alternative_signum IS NULL OR NOT 'B 197' = ANY(alternative_signum));

-- Now delete the duplicate B signum entries (only if the corresponding U signum exists)
DELETE FROM runic_inscriptions 
WHERE signum IN ('B 1', 'B 10', 'B 105', 'B 106', 'B 197')
AND EXISTS (
  SELECT 1 FROM runic_inscriptions u
  WHERE u.signum IN ('U 337', 'U 330', 'U 317', 'U 293', 'U 276')
  AND CASE 
    WHEN runic_inscriptions.signum = 'B 1' THEN u.signum = 'U 337'
    WHEN runic_inscriptions.signum = 'B 10' THEN u.signum = 'U 330'
    WHEN runic_inscriptions.signum = 'B 105' THEN u.signum = 'U 317'
    WHEN runic_inscriptions.signum = 'B 106' THEN u.signum = 'U 293'
    WHEN runic_inscriptions.signum = 'B 197' THEN u.signum = 'U 276'
  END
);