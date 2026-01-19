-- Fix B signum in Östergötland that should be Ög signum
-- Update specific B signum to their modern Ög format

-- B 889 -> Ög 64
UPDATE runic_inscriptions 
SET signum = 'Ög 64',
    alternative_signum = ARRAY['B 889', 'L 1183'],
    rundata_signum = 'B 889'
WHERE signum = 'B 889';

-- B 888 -> Ög 63  
UPDATE runic_inscriptions 
SET signum = 'Ög 63',
    alternative_signum = ARRAY['B 888', 'L 1182'],
    rundata_signum = 'B 888'
WHERE signum = 'B 888';

-- B 88 -> Ög 258 (this might be a duplicate with U 258, let's check and handle)
-- First check if U 258 exists and merge if needed
DO $$
BEGIN
  -- If U 258 exists, update it to include B 88 as alternative
  IF EXISTS (SELECT 1 FROM runic_inscriptions WHERE signum = 'U 258') THEN
    UPDATE runic_inscriptions 
    SET alternative_signum = COALESCE(alternative_signum, ARRAY[]::text[]) || ARRAY['B 88', 'L 402']
    WHERE signum = 'U 258';
    
    -- Delete the duplicate B 88 record
    DELETE FROM runic_inscriptions WHERE signum = 'B 88';
  ELSE
    -- If U 258 doesn't exist, update B 88 to U 258
    UPDATE runic_inscriptions 
    SET signum = 'U 258',
        alternative_signum = ARRAY['B 88', 'L 402'],
        rundata_signum = 'B 88'
    WHERE signum = 'B 88';
  END IF;
END $$;