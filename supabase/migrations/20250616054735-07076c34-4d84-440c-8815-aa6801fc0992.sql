
-- Add numeric period columns to dating table for timeline integration
ALTER TABLE public.dating 
ADD COLUMN period_start INTEGER,
ADD COLUMN period_end INTEGER,
ADD COLUMN parsing_confidence DECIMAL(3,2) DEFAULT 0.0,
ADD COLUMN parsed_period TEXT,
ADD COLUMN parsing_notes TEXT;

-- Add index for better performance when filtering by periods
CREATE INDEX idx_dating_period_range ON public.dating (period_start, period_end);

-- Add a function to parse Swedish dating text to numeric periods
CREATE OR REPLACE FUNCTION parse_swedish_dating(dating_text TEXT)
RETURNS TABLE(
  period_start INTEGER,
  period_end INTEGER,
  confidence DECIMAL(3,2),
  parsed_period TEXT,
  notes TEXT
) 
LANGUAGE plpgsql
AS $$
DECLARE
  cleaned_text TEXT;
  start_year INTEGER;
  end_year INTEGER;
  conf DECIMAL(3,2) := 0.8;
  period_name TEXT;
  parsing_notes TEXT := '';
BEGIN
  -- Clean and normalize the input
  cleaned_text := LOWER(TRIM(dating_text));
  cleaned_text := REGEXP_REPLACE(cleaned_text, '\s+', ' ', 'g');
  
  -- Handle specific Swedish period names
  IF cleaned_text LIKE '%vikingatid%' OR cleaned_text LIKE '%viking%' THEN
    start_year := 793;
    end_year := 1066;
    period_name := 'viking_age';
    conf := 0.9;
  ELSIF cleaned_text LIKE '%järnålder%' OR cleaned_text LIKE '%iron%age%' THEN
    start_year := -500;
    end_year := 1050;
    period_name := 'iron_age';
    conf := 0.8;
  ELSIF cleaned_text LIKE '%bronsålder%' OR cleaned_text LIKE '%bronze%age%' THEN
    start_year := -1700;
    end_year := -500;
    period_name := 'bronze_age';
    conf := 0.8;
  ELSIF cleaned_text LIKE '%folkvandringstid%' OR cleaned_text LIKE '%migration%' THEN
    start_year := 375;
    end_year := 568;
    period_name := 'migration_period';
    conf := 0.9;
  ELSIF cleaned_text LIKE '%vendeltid%' OR cleaned_text LIKE '%vendel%' THEN
    start_year := 550;
    end_year := 793;
    period_name := 'vendel_period';
    conf := 0.9;
  ELSIF cleaned_text LIKE '%högmedeltid%' THEN
    start_year := 1200;
    end_year := 1350;
    period_name := 'high_medieval';
    conf := 0.8;
  ELSIF cleaned_text LIKE '%medeltid%' OR cleaned_text LIKE '%medieval%' THEN
    start_year := 1050;
    end_year := 1520;
    period_name := 'medieval';
    conf := 0.7;
  ELSIF cleaned_text LIKE '%efter-jelling%' OR cleaned_text LIKE '%kristen%jelling%' THEN
    start_year := 965;
    end_year := 1100;
    period_name := 'post_jelling';
    conf := 0.8;
    
  -- Handle year ranges like "1200-1400"
  ELSIF cleaned_text ~ '\d{3,4}\s*-\s*\d{3,4}' THEN
    start_year := (REGEXP_MATCH(cleaned_text, '(\d{3,4})\s*-\s*\d{3,4}'))[1]::INTEGER;
    end_year := (REGEXP_MATCH(cleaned_text, '\d{3,4}\s*-\s*(\d{3,4})'))[1]::INTEGER;
    period_name := 'date_range';
    conf := 0.9;
    
  -- Handle century formats like "1100-talet"
  ELSIF cleaned_text ~ '\d{3,4}\s*-?\s*tal' THEN
    start_year := (REGEXP_MATCH(cleaned_text, '(\d{3,4})'))[1]::INTEGER;
    end_year := start_year + 99;
    period_name := 'century';
    conf := 0.8;
    
  -- Handle "före" (before) dates
  ELSIF cleaned_text ~ 'före\s+\d{3,4}' THEN
    end_year := (REGEXP_MATCH(cleaned_text, 'före\s+(\d{3,4})'))[1]::INTEGER;
    start_year := end_year - 200; -- Assume 200 year range before
    period_name := 'before_date';
    conf := 0.6;
    
  -- Handle "efter" (after) dates
  ELSIF cleaned_text ~ 'efter\s+\d{3,4}' THEN
    start_year := (REGEXP_MATCH(cleaned_text, 'efter\s+(\d{3,4})'))[1]::INTEGER;
    end_year := start_year + 200; -- Assume 200 year range after
    period_name := 'after_date';
    conf := 0.6;
    
  -- Handle "ca" (circa) dates
  ELSIF cleaned_text ~ 'ca\.?\s*\d{3,4}' THEN
    start_year := (REGEXP_MATCH(cleaned_text, 'ca\.?\s*(\d{3,4})'))[1]::INTEGER;
    end_year := start_year;
    start_year := start_year - 25;
    end_year := end_year + 25;
    period_name := 'circa_date';
    conf := 0.7;
    
  -- Handle single years
  ELSIF cleaned_text ~ '^\d{3,4}$' THEN
    start_year := cleaned_text::INTEGER;
    end_year := start_year;
    period_name := 'exact_year';
    conf := 0.95;
    
  -- Handle "mitten av" (middle of century)
  ELSIF cleaned_text ~ 'mitten\s+av\s+\d{3,4}' THEN
    start_year := (REGEXP_MATCH(cleaned_text, 'mitten\s+av\s+(\d{3,4})'))[1]::INTEGER;
    start_year := start_year + 25;
    end_year := start_year + 50;
    period_name := 'mid_century';
    conf := 0.7;
    
  -- Handle "slutet av" (end of century)
  ELSIF cleaned_text ~ 'slutet\s+av\s+\d{3,4}' THEN
    start_year := (REGEXP_MATCH(cleaned_text, 'slutet\s+av\s+(\d{3,4})'))[1]::INTEGER;
    start_year := start_year + 75;
    end_year := start_year + 25;
    period_name := 'end_century';
    conf := 0.7;
    
  ELSE
    -- Could not parse
    start_year := NULL;
    end_year := NULL;
    period_name := 'unparseable';
    conf := 0.0;
    parsing_notes := 'Could not parse: ' || dating_text;
  END IF;
  
  RETURN QUERY SELECT start_year, end_year, conf, period_name, parsing_notes;
END;
$$;

-- Create a function to update all dating records with parsed periods
CREATE OR REPLACE FUNCTION update_dating_periods()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  rec RECORD;
  parsed RECORD;
  updated_count INTEGER := 0;
BEGIN
  FOR rec IN SELECT datingid, dating FROM public.dating WHERE period_start IS NULL LOOP
    SELECT * INTO parsed FROM parse_swedish_dating(rec.dating);
    
    UPDATE public.dating 
    SET 
      period_start = parsed.period_start,
      period_end = parsed.period_end,
      parsing_confidence = parsed.confidence,
      parsed_period = parsed.parsed_period,
      parsing_notes = parsed.notes
    WHERE datingid = rec.datingid;
    
    updated_count := updated_count + 1;
  END LOOP;
  
  RETURN updated_count;
END;
$$;
