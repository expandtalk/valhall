-- Uppdatera signum för Närke runinskrifter till moderna format
-- B 768 = Nä 33 (Rinkaby kyrka)
UPDATE runic_inscriptions 
SET signum = 'Nä 33',
    alternative_signum = ARRAY['B 768'],
    rundata_signum = 'B 768'
WHERE signum = 'B 768' AND parish = 'Rinkaby socken';

-- Lägg till alternative_signum för Nä 32 som också kallas L 1024
UPDATE runic_inscriptions 
SET alternative_signum = ARRAY['L 1024'],
    rundata_signum = 'L 1024'
WHERE signum = 'Nä 32' AND parish = 'Götlunda socken';

-- Skapa en funktion för att mappa gamla B-signum till moderna regionala signum
CREATE OR REPLACE FUNCTION map_b_signum_to_modern(old_signum text, parish_name text, province_name text)
RETURNS text AS $$
BEGIN
  -- Mappa B-signum till Närke (Nä) format
  IF province_name ILIKE '%örebro%' OR province_name ILIKE '%närke%' THEN
    CASE old_signum
      WHEN 'B 768' THEN RETURN 'Nä 33';
      -- Lägg till fler mappningar här när vi hittar dem
    END CASE;
  END IF;
  
  -- Behåll original signum om ingen mapping finns
  RETURN old_signum;
END;
$$ LANGUAGE plpgsql;