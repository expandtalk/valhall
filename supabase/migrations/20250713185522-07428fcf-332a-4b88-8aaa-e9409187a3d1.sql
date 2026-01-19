-- Fix coordinates and update comprehensive data for four Öland runestones

-- B 1056 (Öl 31) - Runstens kyrka, Runstens socken, Öland
-- Remove incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1056', 'Öl 31', 'BN 62', 'L 1303');

-- Update B 1056 with comprehensive data
UPDATE runic_inscriptions 
SET 
    coordinates = point(16.6999, 56.6992),
    transliteration = 'auþbiarn : lit : reisa : stein : …----… hialbi sialu · has',
    translation_en = 'Auðbjǫrn had the stone raised … May (God) help his soul',
    translation_sv = 'Audbjörn lät resa stenen … Gud hjälpe hans själ',
    material = 'gråbrun kalksten',
    style_group = 'Pr 3',
    location = 'Runstens kyrka',
    parish = 'Runstens socken',
    landscape = 'Öland',
    county = 'Kalmar',
    municipality = 'Borgholm',
    country = 'Sweden',
    also_known_as = ARRAY['Öl 31', 'BN 62', 'L 1303'],
    period_start = 725,
    period_end = 1100,
    raa_number = '25',
    k_samsok_uri = 'http://kulturarvsdata.se/uu/srdb/df6fb50c-4fa5-4a6d-9833-9a28dbb8a7bd'
WHERE signum = 'B 1056';

-- B 1062 (Öl 17) - Seby, Segerstads socken, Öland (förkommen)
-- Remove incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1062', 'Öl 17', 'L 1312', 'BN 29');

-- Update B 1062 with comprehensive data
UPDATE runic_inscriptions 
SET 
    coordinates = point(16.5331, 56.3488),
    transliteration = '[× þurkuþr × raisti × stain × þenh × iftiʀ × inkialt × bruþur × sin ×]',
    translation_en = 'Þorgunnr raised this stone in memory of Ingjaldr, her brother',
    translation_sv = 'Torgunn reste denna sten efter Ingjald, sin broder',
    material = 'sten',
    style_group = 'Rak',
    location = 'Seby',
    parish = 'Segerstads socken',
    landscape = 'Öland',
    county = 'Kalmar',
    municipality = 'Mörbylånga',
    country = 'Sweden',
    also_known_as = ARRAY['Öl 17', 'L 1312', 'BN 29'],
    period_start = 980,
    period_end = 1015,
    condition_notes = 'Förkommen (†)',
    k_samsok_uri = 'http://kulturarvsdata.se/uu/srdb/248f963c-6ac4-46df-a562-1d7020da26f8'
WHERE signum = 'B 1062';

-- B 1065 (Öl 12) - Smedby kyrkogård, Smedby socken, Öland (förkommen)
-- Remove incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1065', 'Öl 12', 'L 1316', 'BN 22');

-- Update B 1065 with comprehensive data
UPDATE runic_inscriptions 
SET 
    coordinates = point(16.4326, 56.4072),
    transliteration = '[aynt--s · … þina : eftiʀ · ketil · boþyr : sin · kuþ · h… … … … kus · moþiʀ ·]',
    translation_en = 'Eysteinn(?) … (had) this (stone raised) in memory of Ketill, his brother. May God and God''s mother help his spirit',
    translation_sv = 'Öjstein(?) … (lät) resa (denna sten) efter Ketil, sin broder. Gud och Guds moder hjälpe hans ande',
    material = 'sten',
    style_group = 'Pr 3, Pr 2',
    location = 'Smedby kyrkogård',
    parish = 'Smedby socken',
    landscape = 'Öland',
    county = 'Kalmar',
    municipality = 'Mörbylånga',
    country = 'Sweden',
    also_known_as = ARRAY['Öl 12', 'L 1316', 'BN 22'],
    period_start = 725,
    period_end = 1100,
    condition_notes = 'Förkommen (†)',
    raa_number = '120',
    scholarly_notes = 'Runföljden aynt- placeras under Otolkade belägg i NRL, s. 297',
    k_samsok_uri = 'http://kulturarvsdata.se/uu/srdb/185c4b6a-7dcd-4e79-9e5f-3b8d9daad30b'
WHERE signum = 'B 1065';

-- B 1078 (Öl 46) - Tingsflisan, Köpings socken, Öland
-- Remove incorrect coordinates first
DELETE FROM additional_coordinates 
WHERE signum IN ('B 1078', 'Öl 46', 'L 1297', 'BN 86');

-- Update B 1078 with comprehensive data
UPDATE runic_inscriptions 
SET 
    coordinates = point(16.7214, 56.8765),
    transliteration = 'þuriʀ : auk : þurstain auk : þurfastr · þaiʀ : bryþr : raistu : stain : at : kunfus : faþur : sin : kuþ : hialbi siul : hans',
    translation_en = 'Þórir and Þorsteinn and Þorfastr, these brothers raised the stone in memory of Gunnfúss, their father. May God help his soul',
    translation_sv = 'Tore och Torsten och Torfast, dessa bröder reste stenen efter Gunnfus, sin fader. Gud hjälpe hans själ',
    material = 'grå kalksten',
    style_group = 'Pr 2',
    location = 'Tingsflisan',
    parish = 'Köpings socken',
    landscape = 'Öland',
    county = 'Kalmar',
    municipality = 'Borgholm',
    country = 'Sweden',
    also_known_as = ARRAY['Öl 46', 'L 1297', 'BN 86'],
    period_start = 725,
    period_end = 1100,
    raa_number = '42',
    k_samsok_uri = 'http://kulturarvsdata.se/uu/srdb/9177d82d-7040-411c-a682-9043654298ee'
WHERE signum = 'B 1078';

-- Insert correct coordinates into additional_coordinates as backup
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES 
    ('B 1056', 56.6992, 16.6999, 'manual_correction', 'high', 'Runstens kyrka, Runstens socken, Öland - Öl 31'),
    ('B 1062', 56.3488, 16.5331, 'manual_correction', 'high', 'Seby, Segerstads socken, Öland - Öl 17 (förkommen)'),
    ('B 1065', 56.4072, 16.4326, 'manual_correction', 'high', 'Smedby kyrkogård, Smedby socken, Öland - Öl 12 (förkommen)'),
    ('B 1078', 56.8765, 16.7214, 'manual_correction', 'high', 'Tingsflisan, Köpings socken, Öland - Öl 46');