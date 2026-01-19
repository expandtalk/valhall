-- Security Fix Migration: Address Critical Database Security Issues

-- 1. Add missing RLS policies for tables that have RLS enabled but no policies

-- Archaeological sites - public read access
CREATE POLICY "Archaeological sites are publicly viewable"
ON public.archaeological_sites
FOR SELECT USING (true);

CREATE POLICY "Admins can manage archaeological sites"
ON public.archaeological_sites
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Genetic individuals - public read access for research
CREATE POLICY "Genetic individuals are publicly viewable"
ON public.genetic_individuals
FOR SELECT USING (true);

CREATE POLICY "Admins can manage genetic individuals"
ON public.genetic_individuals
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Historical events - public read access
CREATE POLICY "Historical events are publicly viewable"
ON public.historical_events
FOR SELECT USING (true);

CREATE POLICY "Admins can manage historical events"
ON public.historical_events
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Historical periods - public read access
CREATE POLICY "Historical periods are publicly viewable"
ON public.historical_periods
FOR SELECT USING (true);

CREATE POLICY "Admins can manage historical periods"
ON public.historical_periods
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Genetic markers - public read access for research
CREATE POLICY "Genetic markers are publicly viewable"
ON public.genetic_markers
FOR SELECT USING (true);

CREATE POLICY "Admins can manage genetic markers"
ON public.genetic_markers
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Artefacts - public read access
CREATE POLICY "Artefacts are publicly viewable"
ON public.artefacts
FOR SELECT USING (true);

CREATE POLICY "Admins can manage artefacts"
ON public.artefacts
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Bracteatetypes - public read access
CREATE POLICY "Bracteate types are publicly viewable"
ON public.bracteatetypes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage bracteate types"
ON public.bracteatetypes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Carver inscription - public read access
CREATE POLICY "Carver inscriptions are publicly viewable"
ON public.carver_inscription
FOR SELECT USING (true);

CREATE POLICY "Admins can manage carver inscriptions"
ON public.carver_inscription
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Counties - public read access
CREATE POLICY "Counties are publicly viewable"
ON public.counties
FOR SELECT USING (true);

CREATE POLICY "Admins can manage counties"
ON public.counties
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Countries - public read access
CREATE POLICY "Countries are publicly viewable"
ON public.countries
FOR SELECT USING (true);

CREATE POLICY "Admins can manage countries"
ON public.countries
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Aliases canonical - public read access
CREATE POLICY "Aliases canonical are publicly viewable"
ON public.aliases_canonical
FOR SELECT USING (true);

CREATE POLICY "Admins can manage aliases canonical"
ON public.aliases_canonical
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Alts canonical - public read access
CREATE POLICY "Alts canonical are publicly viewable"
ON public.alts_canonical
FOR SELECT USING (true);

CREATE POLICY "Admins can manage alts canonical"
ON public.alts_canonical
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Her SE - public read access
CREATE POLICY "Her SE records are publicly viewable"
ON public.her_SE
FOR SELECT USING (true);

CREATE POLICY "Admins can manage Her SE records"
ON public.her_SE
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Her dk notes - public read access
CREATE POLICY "Her DK notes are publicly viewable"
ON public.her_dk_notes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage Her DK notes"
ON public.her_dk_notes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Material materialsubtype - public read access
CREATE POLICY "Material materialsubtype are publicly viewable"
ON public.material_materialsubtype
FOR SELECT USING (true);

CREATE POLICY "Admins can manage material materialsubtype"
ON public.material_materialsubtype
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Materialtypes - public read access
CREATE POLICY "Material types are publicly viewable"
ON public.materialtypes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage material types"
ON public.materialtypes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Municipalities - public read access
CREATE POLICY "Municipalities are publicly viewable"
ON public.municipalities
FOR SELECT USING (true);

CREATE POLICY "Admins can manage municipalities"
ON public.municipalities
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Norwegian localities - public read access
CREATE POLICY "Norwegian localities are publicly viewable"
ON public.norwegian_localities
FOR SELECT USING (true);

CREATE POLICY "Admins can manage Norwegian localities"
ON public.norwegian_localities
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Notes - public read access with proper relationship handling
CREATE POLICY "Notes are publicly viewable"
ON public.notes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage notes"
ON public.notes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Admixture analysis - public read access for research
CREATE POLICY "Admixture analysis are publicly viewable"
ON public.admixture_analysis
FOR SELECT USING (true);

CREATE POLICY "Admins can manage admixture analysis"
ON public.admixture_analysis
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- 2. Fix function security paths to prevent function hijacking
CREATE OR REPLACE FUNCTION public.parse_swedish_dating(dating_text text)
 RETURNS TABLE(period_start integer, period_end integer, confidence numeric, parsed_period text, notes text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.update_dating_periods()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.search_inscriptions_flexible(p_search_term text)
 RETURNS TABLE(id uuid, signum text, transliteration text, normalization text, translation_en text, translation_sv text, dating_text text, period_start integer, period_end integer, dating_confidence double precision, location text, parish text, province text, country text, coordinates point, object_type text, material text, dimensions text, current_location text, rune_type text, rune_variant text, style_group text, uncertainty_level text, condition_notes text, bibliography jsonb, k_samsok_uri text, rundata_signum text, created_at timestamp with time zone, updated_at timestamp with time zone, embedding vector, text_segments jsonb, complexity_level text, scholarly_notes text, paleographic_notes text, historical_context text, raa_number text, lamningsnumber text, cultural_classification text, data_source text, inscription_group text, municipality text, county text, landscape text, name text, name_en text, also_known_as text[], alternative_signum text[])
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
    -- Alternative signum search
    EXISTS (
      SELECT 1 FROM unnest(ri.alternative_signum) AS alt_sig 
      WHERE LOWER(alt_sig) LIKE LOWER('%' || p_search_term || '%')
    ) OR
    -- Location searches
    LOWER(ri.location) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.municipality) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.parish) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.province) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.county) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.landscape) LIKE LOWER('%' || p_search_term || '%') OR
    -- Original text searches
    LOWER(ri.signum) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.transliteration) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.translation_en) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.translation_sv) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.historical_context) LIKE LOWER('%' || p_search_term || '%')
  ORDER BY 
    -- Prioritize exact name matches first
    CASE 
      WHEN LOWER(ri.name) = LOWER(p_search_term) THEN 1
      WHEN LOWER(ri.name_en) = LOWER(p_search_term) THEN 2
      WHEN LOWER(ri.location) = LOWER(p_search_term) THEN 3
      WHEN LOWER(ri.municipality) = LOWER(p_search_term) THEN 4
      WHEN LOWER(ri.parish) = LOWER(p_search_term) THEN 5
      ELSE 6
    END,
    ri.created_at DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_carver_statistics()
 RETURNS TABLE(carver_name text, total_inscriptions bigint, signed_count bigint, attributed_count bigint, certain_count bigint, uncertain_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_carver_inscriptions()
 RETURNS TABLE(carverid text, inscriptionid text, attribution attribution_type, certainty boolean, notes text, inscription jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

-- 3. Strengthen user_roles protection against privilege escalation
-- Add additional constraint to prevent self-elevation
CREATE OR REPLACE FUNCTION public.prevent_self_privilege_escalation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Prevent users from granting themselves admin role unless they're already admin
  IF NEW.role = 'admin' AND NEW.user_id = auth.uid() THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Cannot self-elevate to admin role';
    END IF;
  END IF;
  
  -- Prevent users from modifying other users' roles unless they're admin
  IF OLD.user_id != auth.uid() AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Cannot modify other users'' roles';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger to enforce privilege escalation prevention
DROP TRIGGER IF EXISTS prevent_privilege_escalation ON public.user_roles;
CREATE TRIGGER prevent_privilege_escalation
  BEFORE INSERT OR UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_privilege_escalation();

-- 4. Add role audit logging
CREATE TABLE IF NOT EXISTS public.role_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  target_user_id UUID NOT NULL,
  old_role app_role,
  new_role app_role NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on audit log
ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view role audit logs"
ON public.role_audit_log
FOR SELECT USING (public.is_admin());

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_role_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.role_audit_log (user_id, target_user_id, new_role, action, created_by)
    VALUES (auth.uid(), NEW.user_id, NEW.role, 'INSERT', auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.role_audit_log (user_id, target_user_id, old_role, new_role, action, created_by)
    VALUES (auth.uid(), NEW.user_id, OLD.role, NEW.role, 'UPDATE', auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.role_audit_log (user_id, target_user_id, old_role, action, created_by)
    VALUES (auth.uid(), OLD.user_id, OLD.role, 'DELETE', auth.uid());
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

-- Create audit trigger
DROP TRIGGER IF EXISTS audit_role_changes ON public.user_roles;
CREATE TRIGGER audit_role_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_role_changes();