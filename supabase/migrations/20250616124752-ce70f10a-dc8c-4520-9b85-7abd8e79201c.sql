
-- Migrera data från rundata_artefacts till artefacts tabellen
INSERT INTO artefacts (artefactid, artefact, lang)
SELECT 
  decode(replace(id::text, '-', ''), 'hex') as artefactid,
  artefact_name as artefact,
  language as lang
FROM rundata_artefacts
WHERE NOT EXISTS (
  SELECT 1 FROM artefacts 
  WHERE artefacts.artefact = rundata_artefacts.artefact_name 
  AND artefacts.lang = rundata_artefacts.language
);
