-- Update all landscapes to use modern signum as primary and old signum as alternative

-- HALLAND - Update DK Hal to Hal
UPDATE runic_inscriptions 
SET 
  signum = 'Hal 1',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE signum = 'DK Hal 1' AND landscape = 'Halland';

UPDATE runic_inscriptions 
SET 
  signum = 'Hal 4',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE signum = 'DK Hal 4' AND landscape = 'Halland';

UPDATE runic_inscriptions 
SET 
  signum = 'Hal 5',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE signum = 'DK Hal 5' AND landscape = 'Halland';

-- Update DR BR 74 to Hal (need to check location)
UPDATE runic_inscriptions 
SET 
  signum = 'Hal 74',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE signum = 'DR BR 74' AND (landscape = 'Halland' OR location LIKE '%Eskatorp%' OR parish LIKE '%Fjärås%');

-- HÄLSINGLAND - Already Hs, but let's ensure consistency
UPDATE runic_inscriptions 
SET 
  alternative_signum = CASE 
    WHEN alternative_signum IS NULL THEN ARRAY[]::text[]
    ELSE alternative_signum
  END
WHERE landscape = 'Hälsingland' AND signum LIKE 'Hs %';

-- JÄMTLAND - Update to use J as prefix
UPDATE runic_inscriptions 
SET 
  signum = 'J 1',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE signum = 'J FV 1970;86' AND landscape = 'Jämtland';

UPDATE runic_inscriptions 
SET 
  signum = 'J 2',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE signum = 'J RS 1928;66' AND landscape = 'Jämtland';

-- MEDELPAD - Already M, ensure consistency  
UPDATE runic_inscriptions 
SET 
  alternative_signum = CASE 
    WHEN alternative_signum IS NULL THEN ARRAY[]::text[]
    ELSE alternative_signum
  END
WHERE landscape = 'Medelpad' AND signum LIKE 'M %';

-- NÄRKE - Ensure Nä is used consistently and add any B signum as alternative
UPDATE runic_inscriptions 
SET 
  signum = 'Nä 3',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 3' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 3') 
  AND landscape = 'Närke' 
  AND (location LIKE '%Frösvi%' OR parish LIKE '%Edsberg%');

UPDATE runic_inscriptions 
SET 
  signum = 'Nä 4',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 4' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 4') 
  AND landscape = 'Närke' 
  AND location LIKE '%Riseberga kloster%';

UPDATE runic_inscriptions 
SET 
  signum = 'Nä 8',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 8' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 8') 
  AND landscape = 'Närke' 
  AND location LIKE '%Kräcklinge kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Nä 9',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 9' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 9') 
  AND landscape = 'Närke' 
  AND (location LIKE '%Vesta%' OR parish LIKE '%Kumla%');

UPDATE runic_inscriptions 
SET 
  signum = 'Nä 11',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 11' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 11') 
  AND landscape = 'Närke' 
  AND location LIKE '%Odensbacken%';

UPDATE runic_inscriptions 
SET 
  signum = 'Nä 12',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 12' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 12') 
  AND landscape = 'Närke' 
  AND location LIKE '%Stora Mellösa kyrka%';

-- Continue with more Närke runestones
UPDATE runic_inscriptions 
SET 
  signum = 'Nä 13',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 13' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 13') 
  AND landscape = 'Närke' 
  AND location LIKE '%Stora Mellösa kyrka%'
  AND signum != 'Nä 12';

UPDATE runic_inscriptions 
SET 
  signum = 'Nä 14',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 14' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 14') 
  AND landscape = 'Närke' 
  AND (location LIKE '%Rönneberga%' OR parish LIKE '%Stora Mellösa%');

-- Add the rest of Närke systematically
UPDATE runic_inscriptions 
SET 
  signum = 'Nä 15',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL AND signum != 'Nä 15' THEN ARRAY[signum]
    ELSE COALESCE(alternative_signum, ARRAY[]::text[])
  END
WHERE (signum LIKE 'B %' OR signum = 'Nä 15') 
  AND landscape = 'Närke' 
  AND (location LIKE '%Åsby%' OR parish LIKE '%Stora Mellösa%');

-- For any remaining B signum in these landscapes, add as alternative_signum
UPDATE runic_inscriptions 
SET 
  alternative_signum = CASE 
    WHEN alternative_signum IS NULL THEN ARRAY[signum]
    WHEN signum = ANY(alternative_signum) THEN alternative_signum
    ELSE array_append(alternative_signum, signum)
  END
WHERE landscape IN ('Halland', 'Hälsingland', 'Jämtland', 'Medelpad', 'Närke')
  AND signum LIKE 'B %'
  AND NOT (signum LIKE 'Hal %' OR signum LIKE 'Hs %' OR signum LIKE 'J %' OR signum LIKE 'M %' OR signum LIKE 'Nä %');