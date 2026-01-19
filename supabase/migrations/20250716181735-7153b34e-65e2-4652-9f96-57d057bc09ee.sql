-- Omfattande uppdatering av alla B- och L-signum till moderna regionala format
-- Behåll gamla signum som alternativa namn

-- Uppland (U) - alla B och L signum som tillhör Uppland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'U '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%uppland%' OR landscape ILIKE '%uppland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'U '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%uppland%' OR landscape ILIKE '%uppland%');

-- Östergötland (Ög) - alla B och L signum som tillhör Östergötland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Ög '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%östergötland%' OR landscape ILIKE '%östergötland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Ög '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%östergötland%' OR landscape ILIKE '%östergötland%');

-- Öland (Öl) - alla B och L signum som tillhör Öland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Öl '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%öland%' OR landscape ILIKE '%öland%' OR parish ILIKE '%öland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Öl '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%öland%' OR landscape ILIKE '%öland%' OR parish ILIKE '%öland%');

-- Gotland (G) - alla B och L signum som tillhör Gotland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'G '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%gotland%' OR landscape ILIKE '%gotland%' OR parish ILIKE '%gotland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'G '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%gotland%' OR landscape ILIKE '%gotland%' OR parish ILIKE '%gotland%');

-- Sörmland (Sö) - alla B och L signum som tillhör Sörmland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Sö '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%sörmland%' OR landscape ILIKE '%sörmland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Sö '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%sörmland%' OR landscape ILIKE '%sörmland%');

-- Västergötland (Vg) - alla B och L signum som tillhör Västergötland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Vg '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%västergötland%' OR landscape ILIKE '%västergötland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Vg '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%västergötland%' OR landscape ILIKE '%västergötland%');

-- Småland (Sm) - alla B och L signum som tillhör Småland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Sm '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%småland%' OR landscape ILIKE '%småland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Sm '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%småland%' OR landscape ILIKE '%småland%');

-- Skåne (Sk) - alla B och L signum som tillhör Skåne
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Sk '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%skåne%' OR landscape ILIKE '%skåne%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Sk '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%skåne%' OR landscape ILIKE '%skåne%');

-- Halland (Hl) - alla B och L signum som tillhör Halland
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Hl '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%halland%' OR landscape ILIKE '%halland%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Hl '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%halland%' OR landscape ILIKE '%halland%');

-- Blekinge (Bl) - alla B och L signum som tillhör Blekinge
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Bl '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%blekinge%' OR landscape ILIKE '%blekinge%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Bl '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%blekinge%' OR landscape ILIKE '%blekinge%');

-- Närke (Nä) - alla B och L signum som tillhör Närke
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'Nä '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
    AND (province ILIKE '%närke%' OR landscape ILIKE '%närke%' OR province ILIKE '%örebro%');

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'Nä '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
    AND (province ILIKE '%närke%' OR landscape ILIKE '%närke%' OR province ILIKE '%örebro%');