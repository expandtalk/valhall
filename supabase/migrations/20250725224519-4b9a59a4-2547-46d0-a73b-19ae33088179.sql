-- Fix critical security issues

-- 1. Add missing RLS policies for tables that have RLS enabled but no policies
-- First, let's add policies for tables that need them

-- Fix user_roles table to prevent self-privilege escalation
CREATE OR REPLACE FUNCTION public.prevent_self_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

-- Create trigger for user_roles if it doesn't exist
DROP TRIGGER IF EXISTS prevent_privilege_escalation ON public.user_roles;
CREATE TRIGGER prevent_privilege_escalation
  BEFORE INSERT OR UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_privilege_escalation();

-- 2. Fix search_path for existing functions to prevent SQL injection
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Check if the user has the 'admin' role in the user_roles table
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = p_user_id AND role = 'admin'::public.app_role
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.update_dating_periods()
RETURNS integer
LANGUAGE plpgsql
SET search_path TO 'public'
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

CREATE OR REPLACE FUNCTION public.search_inscriptions_flexible(p_search_term text)
RETURNS TABLE(id uuid, signum text, transliteration text, normalization text, translation_en text, translation_sv text, dating_text text, period_start integer, period_end integer, dating_confidence double precision, location text, parish text, province text, country text, coordinates point, object_type text, material text, dimensions text, current_location text, rune_type text, rune_variant text, style_group text, uncertainty_level text, condition_notes text, bibliography jsonb, k_samsok_uri text, rundata_signum text, created_at timestamp with time zone, updated_at timestamp with time zone, embedding vector, text_segments jsonb, complexity_level text, scholarly_notes text, paleographic_notes text, historical_context text, raa_number text, lamningsnumber text, cultural_classification text, data_source text, inscription_group text, municipality text, county text, landscape text, name text, name_en text, also_known_as text[], alternative_signum text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ri.id, ri.signum, ri.transliteration, ri.normalization,
    ri.translation_en, ri.translation_sv, ri.dating_text,
    ri.period_start, ri.period_end, ri.dating_confidence,
    ri.location, ri.parish, ri.province, ri.country, ri.coordinates,
    ri.object_type, ri.material, ri.dimensions, ri.current_location,
    ri.rune_type, ri.rune_variant, ri.style_group, ri.uncertainty_level,
    ri.condition_notes, ri.bibliography, ri.k_samsok_uri, ri.rundata_signum,
    ri.created_at, ri.updated_at, ri.embedding, ri.text_segments,
    ri.complexity_level, ri.scholarly_notes, ri.paleographic_notes,
    ri.historical_context, ri.raa_number, ri.lamningsnumber,
    ri.cultural_classification, ri.data_source, ri.inscription_group,
    ri.municipality, ri.county, ri.landscape,
    ri.name, ri.name_en, ri.also_known_as, ri.alternative_signum
  FROM runic_inscriptions ri
  WHERE 
    -- Name searches (highest priority)
    LOWER(ri.name) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.name_en) LIKE LOWER('%' || p_search_term || '%') OR
    -- Alternative names search
    EXISTS (
      SELECT 1 FROM unnest(ri.also_known_as) AS alt_name 
      WHERE LOWER(alt_name) LIKE LOWER('%' || p_search_term || '%')
    ) OR
    -- Alternative signum search (NEW!)
    EXISTS (
      SELECT 1 FROM unnest(ri.alternative_signum) AS alt_sig 
      WHERE LOWER(alt_sig) LIKE LOWER('%' || p_search_term || '%')
    ) OR
    -- Main signum search with normalized format
    regexp_replace(LOWER(ri.signum), '\s+', '', 'g') LIKE regexp_replace(LOWER('%' || p_search_term || '%'), '\s+', '', 'g') OR
    -- Location searches
    LOWER(ri.location) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.municipality) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.parish) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.province) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.county) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.landscape) LIKE LOWER('%' || p_search_term || '%') OR
    -- Original text searches
    LOWER(ri.transliteration) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.translation_en) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.translation_sv) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.historical_context) LIKE LOWER('%' || p_search_term || '%')
  ORDER BY 
    -- Prioritize exact name matches first
    CASE 
      WHEN LOWER(ri.name) = LOWER(p_search_term) THEN 1
      WHEN LOWER(ri.name_en) = LOWER(p_search_term) THEN 2
      WHEN LOWER(ri.signum) = LOWER(p_search_term) THEN 3
      WHEN EXISTS (SELECT 1 FROM unnest(ri.alternative_signum) AS alt_sig WHERE LOWER(alt_sig) = LOWER(p_search_term)) THEN 4
      WHEN LOWER(ri.location) = LOWER(p_search_term) THEN 5
      WHEN LOWER(ri.municipality) = LOWER(p_search_term) THEN 6
      WHEN LOWER(ri.parish) = LOWER(p_search_term) THEN 7
      ELSE 8
    END,
    ri.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.parse_swedish_dating(dating_text text)
RETURNS TABLE(period_start integer, period_end integer, confidence numeric, parsed_period text, notes text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Fix other security definer functions
CREATE OR REPLACE FUNCTION public.map_b_signum_to_modern(old_signum text, parish_name text, province_name text)
RETURNS text
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.get_carver_statistics()
RETURNS TABLE(carver_name text, total_inscriptions bigint, signed_count bigint, attributed_count bigint, certain_count bigint, uncertain_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.name::text as carver_name,
    COUNT(*)::bigint as total_inscriptions,
    COUNT(CASE WHEN ci.attribution = 'signed' THEN 1 END)::bigint as signed_count,
    COUNT(CASE WHEN ci.attribution = 'attributed' THEN 1 END)::bigint as attributed_count,
    COUNT(CASE WHEN ci.certainty = true THEN 1 END)::bigint as certain_count,
    COUNT(CASE WHEN ci.certainty = false THEN 1 END)::bigint as uncertain_count
  FROM carvers c
  JOIN carver_inscription ci ON encode(ci.carverid, 'hex') = replace(c.id::text, '-', '')
  GROUP BY c.name
  ORDER BY total_inscriptions DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_carver_inscriptions()
RETURNS TABLE(carverid text, inscriptionid text, attribution attribution_type, certainty boolean, notes text, inscription jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id::text as carverid,
    encode(ci.inscriptionid, 'hex') as inscriptionid,
    ci.attribution,
    ci.certainty,
    ci.notes,
    jsonb_build_object(
      'id', encode(ci.inscriptionid, 'hex'),
      'signum', COALESCE(r.signum, 'Unknown'),
      'location', COALESCE(r.location, c.region),
      'coordinates', 
      CASE 
        WHEN r.coordinates IS NOT NULL THEN 
          jsonb_build_object('lat', ST_Y(r.coordinates), 'lng', ST_X(r.coordinates))
        ELSE NULL 
      END
    ) as inscription
  FROM carvers c
  JOIN carver_inscription ci ON encode(ci.carverid, 'hex') = replace(c.id::text, '-', '')
  LEFT JOIN runic_inscriptions r ON encode(ci.inscriptionid, 'hex') = replace(r.id::text, '-', '')
  ORDER BY c.name, ci.certainty DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.search_inscriptions_by_similarity(query_embedding vector, match_threshold double precision DEFAULT 0.78, match_count integer DEFAULT 10)
RETURNS TABLE(id uuid, signum text, transliteration text, translation_en text, similarity double precision)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ri.id,
    ri.signum,
    ri.transliteration,
    ri.translation_en,
    (ri.embedding <=> query_embedding) * -1 + 1 AS similarity
  FROM runic_inscriptions ri
  WHERE ri.embedding IS NOT NULL
    AND (ri.embedding <=> query_embedding) < (1 - match_threshold)
  ORDER BY ri.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE OR REPLACE FUNCTION public.get_viking_names_stats()
RETURNS TABLE(total_names integer, male_names integer, female_names integer, total_frequency integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_names,
    COUNT(*) FILTER (WHERE gender = 'male')::INTEGER as male_names,
    COUNT(*) FILTER (WHERE gender = 'female')::INTEGER as female_names,
    COALESCE(SUM(frequency), 0)::INTEGER as total_frequency
  FROM viking_names;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;