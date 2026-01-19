-- Säker uppdatering av B- och L-signum till moderna format
-- Hantera dubbletter genom att bara uppdatera de som inte skulle skapa konflikter

-- Först, lägg till gamla signum som alternativa namn för befintliga moderna signum
-- Uppdatera B-signum som motsvarar befintliga U-signum
UPDATE runic_inscriptions AS target
SET alternative_signum = CASE 
    WHEN target.alternative_signum IS NULL THEN ARRAY[source.signum]
    ELSE array_append(target.alternative_signum, source.signum)
END,
rundata_signum = COALESCE(target.rundata_signum, source.signum)
FROM runic_inscriptions AS source
WHERE target.signum = REPLACE(source.signum, 'B ', 'U ')
AND source.signum LIKE 'B %'
AND (source.province ILIKE '%uppland%' OR source.landscape ILIKE '%uppland%')
AND target.id != source.id;

-- Ta bort dubletter av B-signum som nu har sitt alternativa namn sparat
DELETE FROM runic_inscriptions 
WHERE signum LIKE 'B %' 
AND (province ILIKE '%uppland%' OR landscape ILIKE '%uppland%')
AND EXISTS (
    SELECT 1 FROM runic_inscriptions AS target 
    WHERE target.signum = REPLACE(runic_inscriptions.signum, 'B ', 'U ')
    AND target.id != runic_inscriptions.id
);

-- Uppdatera återstående B-signum till U-signum (de som inte hade dubletter)
UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'B ', 'U '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'B %' 
AND (province ILIKE '%uppland%' OR landscape ILIKE '%uppland%');

-- Samma process för L-signum till U-signum
UPDATE runic_inscriptions AS target
SET alternative_signum = CASE 
    WHEN target.alternative_signum IS NULL THEN ARRAY[source.signum]
    ELSE array_append(target.alternative_signum, source.signum)
END,
rundata_signum = COALESCE(target.rundata_signum, source.signum)
FROM runic_inscriptions AS source
WHERE target.signum = REPLACE(source.signum, 'L ', 'U ')
AND source.signum LIKE 'L %'
AND (source.province ILIKE '%uppland%' OR source.landscape ILIKE '%uppland%')
AND target.id != source.id;

DELETE FROM runic_inscriptions 
WHERE signum LIKE 'L %' 
AND (province ILIKE '%uppland%' OR landscape ILIKE '%uppland%')
AND EXISTS (
    SELECT 1 FROM runic_inscriptions AS target 
    WHERE target.signum = REPLACE(runic_inscriptions.signum, 'L ', 'U ')
    AND target.id != runic_inscriptions.id
);

UPDATE runic_inscriptions 
SET signum = REPLACE(signum, 'L ', 'U '),
    alternative_signum = CASE 
        WHEN alternative_signum IS NULL THEN ARRAY[signum]
        ELSE array_append(alternative_signum, signum)
    END,
    rundata_signum = signum
WHERE signum LIKE 'L %' 
AND (province ILIKE '%uppland%' OR landscape ILIKE '%uppland%');