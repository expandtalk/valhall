-- Migration: Fix geographical classification errors (corrected version)
-- This migration fixes the major geographical classification issues found in the analysis

-- Step 1: Fix the Bergen catastrophe - 624 Swedish runestones incorrectly have Bergen as municipality
-- These should be removed since Bergen is a Norwegian city
UPDATE runic_inscriptions 
SET municipality = NULL, 
    province = NULL,
    scholarly_notes = COALESCE(scholarly_notes || '; ', '') || 'Geographic data corrected: Bergen removed from Swedish inscriptions (migration 2025-01-04)'
WHERE country = 'Sweden' 
  AND municipality = 'Bergen' 
  AND province = 'NO';

-- Step 2: Move Swedish landscapes from province to landscape field
-- This fixes the core hierarchical problem where landscapes are stored in the wrong field

-- Move Uppland from province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Uppland',
    province = CASE 
      WHEN municipality LIKE '%Uppsala%' THEN 'Uppsala län'
      WHEN municipality LIKE '%Stockholm%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Sigtuna%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Vallentuna%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Ekerö%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Enköping%' THEN 'Uppsala län'
      WHEN municipality LIKE '%Väsby%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Knivsta%' THEN 'Uppsala län'
      WHEN municipality LIKE '%Täby%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Norrtälje%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Håbo%' THEN 'Uppsala län'
      WHEN municipality LIKE '%Upplands-Bro%' THEN 'Stockholms län'
      WHEN municipality LIKE '%Järfälla%' THEN 'Stockholms län'
      ELSE 'Uppsala län'
    END
WHERE country = 'Sweden' 
  AND province = 'Uppland';

-- Move Södermanland from province to landscape  
UPDATE runic_inscriptions 
SET landscape = 'Södermanland',
    province = 'Södermanlands län'
WHERE country = 'Sweden' 
  AND province = 'Södermanland';

-- Move Östergötland from province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Östergötland',
    province = 'Östergötlands län'
WHERE country = 'Sweden' 
  AND province = 'Östergötland';

-- Move Västergötland from province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Västergötland',
    province = 'Västra Götalands län'
WHERE country = 'Sweden' 
  AND province = 'Västergötland';

-- Move Småland from province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Småland',
    province = CASE 
      WHEN municipality LIKE '%Växjö%' THEN 'Kronobergs län'
      WHEN municipality LIKE '%Kalmar%' THEN 'Kalmar län'
      WHEN municipality LIKE '%Jönköping%' THEN 'Jönköpings län'
      WHEN municipality LIKE '%Vetlanda%' THEN 'Jönköpings län'
      ELSE 'Kalmar län'
    END
WHERE country = 'Sweden' 
  AND province = 'Småland';

-- Move Öland from province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Öland',
    province = 'Kalmar län'
WHERE country = 'Sweden' 
  AND province = 'Öland';

-- Move Gotland from both municipality and province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Gotland',
    province = 'Gotlands län',
    municipality = 'Gotland'
WHERE country = 'Sweden' 
  AND (province = 'Gotland' OR municipality = 'Gotland');

-- Move other Swedish landscapes from province to landscape
UPDATE runic_inscriptions 
SET landscape = 'Blekinge',
    province = 'Blekinge län'
WHERE country = 'Sweden' 
  AND province = 'Blekinge';

UPDATE runic_inscriptions 
SET landscape = 'Gästrikland',
    province = 'Gävleborgs län'
WHERE country = 'Sweden' 
  AND province = 'Gästrikland';

UPDATE runic_inscriptions 
SET landscape = 'Medelpad',
    province = 'Västernorrlands län'
WHERE country = 'Sweden' 
  AND province = 'Medelpad';

UPDATE runic_inscriptions 
SET landscape = 'Dalarna',
    province = 'Dalarnas län'
WHERE country = 'Sweden' 
  AND province = 'Dalarna';

UPDATE runic_inscriptions 
SET landscape = 'Skåne',
    province = 'Skåne län'
WHERE country = 'Sweden' 
  AND province = 'Skåne';

UPDATE runic_inscriptions 
SET landscape = 'Västmanland',
    province = 'Västmanlands län'
WHERE country = 'Sweden' 
  AND province = 'Västmanland';

UPDATE runic_inscriptions 
SET landscape = 'Närke',
    province = 'Örebro län'
WHERE country = 'Sweden' 
  AND province = 'Närke';

UPDATE runic_inscriptions 
SET landscape = 'Bohuslän',
    province = 'Västra Götalands län'
WHERE country = 'Sweden' 
  AND province = 'Bohuslän';

UPDATE runic_inscriptions 
SET landscape = 'Halland',
    province = 'Hallands län'
WHERE country = 'Sweden' 
  AND province = 'Halland';

UPDATE runic_inscriptions 
SET landscape = 'Jämtland',
    province = 'Jämtlands län'
WHERE country = 'Sweden' 
  AND province = 'Jämtland';

UPDATE runic_inscriptions 
SET landscape = 'Värmland',
    province = 'Värmlands län'
WHERE country = 'Sweden' 
  AND province = 'Värmland';

-- Step 3: Clean up Norwegian province data
-- Replace generic "NO" with proper Norwegian regions where possible
UPDATE runic_inscriptions 
SET province = CASE 
  WHEN municipality = 'Bergen' THEN 'Vestland'
  WHEN municipality = 'Trondheim' THEN 'Trøndelag'
  WHEN municipality = 'Ålesund' THEN 'Møre og Romsdal'
  WHEN municipality = 'Luster' THEN 'Vestland'
  WHEN municipality = 'Sogndal' THEN 'Vestland'
  WHEN municipality = 'Balestrand' THEN 'Vestland'
  WHEN municipality = 'Osterøy' THEN 'Vestland'
  WHEN municipality = 'Ullensvang' THEN 'Vestland'
  WHEN municipality = 'Ringerike' THEN 'Viken'
  WHEN municipality = 'Tønsberg' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Sandefjord' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Skien' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Seljord' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Fyresdal' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Bø' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Gol' THEN 'Viken'
  WHEN municipality = 'Lom' THEN 'Innlandet'
  WHEN municipality = 'Lærdal' THEN 'Vestland'
  WHEN municipality = 'Rauma' THEN 'Møre og Romsdal'
  WHEN municipality = 'Steinkjer' THEN 'Trøndelag'
  WHEN municipality = 'Karmøy' THEN 'Rogaland'
  WHEN municipality = 'Hå' THEN 'Rogaland'
  WHEN municipality = 'Time' THEN 'Rogaland'
  WHEN municipality = 'Sokndal' THEN 'Rogaland'
  WHEN municipality = 'Klepp' THEN 'Rogaland'
  WHEN municipality = 'Bykle' THEN 'Agder'
  WHEN municipality = 'Sande' THEN 'Vestfold og Telemark'
  WHEN municipality = 'Hurum' THEN 'Viken'
  ELSE province
END
WHERE country = 'Norway' 
  AND province = 'NO';