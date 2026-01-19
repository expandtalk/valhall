-- Security Fix: Add remaining function search_path configurations and fix remaining issues

-- Fix remaining functions without search_path
CREATE OR REPLACE FUNCTION public.update_dating_periods()
RETURNS integer
LANGUAGE plpgsql
SET search_path TO 'public'
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
SET search_path TO 'public'
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
$function$;

CREATE OR REPLACE FUNCTION public.search_inscriptions_by_similarity(query_embedding vector, match_threshold double precision DEFAULT 0.78, match_count integer DEFAULT 10)
RETURNS TABLE(id uuid, signum text, transliteration text, translation_en text, similarity double precision)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;