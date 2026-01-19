-- Security Fix: Fix remaining search_path issues and add final missing RLS policies

-- First, let's fix the remaining functions
CREATE OR REPLACE FUNCTION public.parse_swedish_dating(dating_text text)
RETURNS TABLE(period_start integer, period_end integer, confidence numeric, parsed_period text, notes text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.prevent_self_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Prevent users from granting themselves admin role unless they're already admin
  IF NEW.role = 'admin' AND NEW.user_id = auth.uid() THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Cannot self-elevate to admin role';
    END IF;
  END IF;
  
  -- Prevent users from modifying other users' roles unless they're admin
  IF TG_OP = 'UPDATE' AND OLD.user_id != auth.uid() AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Cannot modify other users'' roles';
  END IF;
  
  RETURN NEW;
END;
$function$;