-- Update Gästrikland runestones to use GS signum as primary and add old B/L signums as alternatives

-- First, let's update the known mappings for Gästrikland runestones
-- GS 1 (currently B 1091, also L 1046)
UPDATE runic_inscriptions 
SET 
  signum = 'Gs 1',
  alternative_signum = ARRAY['B 1091', 'L 1046']
WHERE signum = 'B 1091' AND landscape = 'Gästrikland';

-- GS 2 (currently B 1092, also L 1045) 
UPDATE runic_inscriptions 
SET 
  signum = 'Gs 2',
  alternative_signum = ARRAY['B 1092', 'L 1045']
WHERE signum = 'B 1092' AND landscape = 'Gästrikland';

-- Update other known Gästrikland mappings
UPDATE runic_inscriptions 
SET 
  signum = 'Gs 3',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Kungsgården%' 
  AND parish LIKE '%Österfärnebo%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 5',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Hedesunda kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 6',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND (location LIKE '%Hade%' OR parish LIKE '%Hedesunda%');

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 7',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Torsåkers kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 8',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND (location LIKE '%Västra Hästbo%' OR parish LIKE '%Torsåker%');

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 9',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Årsunda kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 11',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Järvsta%' 
  AND parish LIKE '%Valbo%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 12',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Valbo kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 13',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Heliga Trefaldighets kyrka%' 
  AND location LIKE '%Gävle%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 14',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Ovansjö kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 15',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Ovansjö kyrka%'
  AND signum != 'Gs 14';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 16',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Ovansjö prästgård%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 17',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Åsens by%' 
  AND parish LIKE '%Ovansjö%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 18',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Björke%' 
  AND parish LIKE '%Hille%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 19',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Ockelbo kyrka%';

UPDATE runic_inscriptions 
SET 
  signum = 'Gs 22',
  alternative_signum = CASE 
    WHEN signum IS NOT NULL THEN ARRAY[signum]
    ELSE ARRAY[]::text[]
  END
WHERE (signum LIKE 'B %' OR signum LIKE 'L %') 
  AND landscape = 'Gästrikland' 
  AND location LIKE '%Berg%' 
  AND parish LIKE '%Hamrånge%';