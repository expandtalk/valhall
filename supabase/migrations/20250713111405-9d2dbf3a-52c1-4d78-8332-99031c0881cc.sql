-- Fix Öl 23 inscription (currently showing as B 1068)
UPDATE runic_inscriptions 
SET 
  signum = 'Öl 23',
  alternative_signum = ARRAY['B 1075', 'B 1068', 'BN 50', 'L 1309']
WHERE signum = 'B 1068';