-- Fix multiple incorrect B signums to their correct primary signums

-- B 1 should be U 337 (Granby, Orkesta socken)
UPDATE runic_inscriptions 
SET 
  signum = 'U 337',
  alternative_signum = ARRAY['B 1', 'L 507']
WHERE signum = 'B 1';

-- B 10 should be U 330 (Markims socken)
UPDATE runic_inscriptions 
SET 
  signum = 'U 330',
  alternative_signum = ARRAY['B 10', 'L 497']
WHERE signum = 'B 10';

-- B 105 should be U 317 (Harg, Skånela socken)
UPDATE runic_inscriptions 
SET 
  signum = 'U 317',
  alternative_signum = ARRAY['B 105', 'L 438']
WHERE signum = 'B 105';

-- B 106 should be U 293 (Lilla Vilunda, Hammarby socken)
UPDATE runic_inscriptions 
SET 
  signum = 'U 293',
  alternative_signum = ARRAY['B 106', 'L 430']
WHERE signum = 'B 106';

-- B 197 should be U 276 (Hammarby, Hammarby socken)
UPDATE runic_inscriptions 
SET 
  signum = 'U 276',
  alternative_signum = ARRAY['B 197', 'B 107', 'L 421']
WHERE signum = 'B 197';