-- Add primary signum column and restructure signum data
ALTER TABLE runic_inscriptions 
ADD COLUMN primary_signum TEXT,
ADD COLUMN is_primary_signum_verified BOOLEAN DEFAULT false;

-- Create function to extract primary signum from current signum
CREATE OR REPLACE FUNCTION extract_primary_signum(signum_text TEXT) 
RETURNS TEXT AS $$
BEGIN
  -- Remove whitespace and convert to uppercase
  signum_text := UPPER(TRIM(signum_text));
  
  -- Swedish landscapes (prioritize these as primary)
  IF signum_text ~ '^(SÖ|U|ÖG|VG|SM|G|Ö|VS|NÄ|M|DR|BO|HS|VR|ÄL)\s*\d+' THEN
    RETURN (regexp_match(signum_text, '^([A-ZÄÖÅ]+\s*\d+)'))[1];
  END IF;
  
  -- Danish signum (DR, DK)
  IF signum_text ~ '^(DR|DK)\s*[A-Z]*\s*\d+' THEN
    RETURN (regexp_match(signum_text, '^(DR|DK\s*[A-Z]*\s*\d+)'))[1];
  END IF;
  
  -- Norwegian signum (N)
  IF signum_text ~ '^N\s*\d+' THEN
    RETURN (regexp_match(signum_text, '^(N\s*\d+)'))[1];
  END IF;
  
  -- Default: return first part
  RETURN (regexp_match(signum_text, '^([A-ZÄÖÅ]+\s*\d+)'))[1];
END;
$$ LANGUAGE plpgsql;

-- Update primary_signum for all inscriptions
UPDATE runic_inscriptions 
SET primary_signum = extract_primary_signum(signum)
WHERE primary_signum IS NULL;

-- Clean up primary signums (remove extra spaces)
UPDATE runic_inscriptions 
SET primary_signum = regexp_replace(primary_signum, '\s+', ' ', 'g')
WHERE primary_signum IS NOT NULL;

-- Mark verified primary signums (Swedish landscapes)
UPDATE runic_inscriptions 
SET is_primary_signum_verified = true
WHERE primary_signum ~ '^(SÖ|U|ÖG|VG|SM|G|Ö|VS|NÄ|M|DR|BO|HS|VR|ÄL)\s+\d+$';

-- Create index for better performance
CREATE INDEX idx_runic_inscriptions_primary_signum ON runic_inscriptions(primary_signum);

-- Add comments for documentation
COMMENT ON COLUMN runic_inscriptions.primary_signum IS 'Primary signum (e.g. Sö 333, Ög 136, G 200)';
COMMENT ON COLUMN runic_inscriptions.alternative_signum IS 'Alternative signum names (e.g. B 698, L 968)';
COMMENT ON COLUMN runic_inscriptions.is_primary_signum_verified IS 'Whether primary signum follows standard Swedish landscape format';