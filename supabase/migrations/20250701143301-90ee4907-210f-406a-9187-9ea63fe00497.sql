
-- Förbättra sökfunktionen för att hantera svenska orter bättre
CREATE OR REPLACE FUNCTION public.search_inscriptions_flexible(p_search_term text)
RETURNS TABLE(
  id uuid,
  signum text,
  transliteration text,
  normalization text,
  translation_en text,
  translation_sv text,
  dating_text text,
  period_start integer,
  period_end integer,
  dating_confidence double precision,
  location text,
  parish text,
  province text,
  country text,
  coordinates point,
  object_type text,
  material text,
  dimensions text,
  current_location text,
  rune_type text,
  rune_variant text,
  style_group text,
  uncertainty_level text,
  condition_notes text,
  bibliography jsonb,
  k_samsok_uri text,
  rundata_signum text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  embedding vector,
  text_segments jsonb,
  complexity_level text,
  scholarly_notes text,
  paleographic_notes text,
  historical_context text,
  raa_number text,
  lamningsnumber text,
  cultural_classification text,
  data_source text,
  inscription_group text,
  municipality text,
  county text,
  landscape text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ri.id,
    ri.signum,
    ri.transliteration,
    ri.normalization,
    ri.translation_en,
    ri.translation_sv,
    ri.dating_text,
    ri.period_start,
    ri.period_end,
    ri.dating_confidence,
    ri.location,
    ri.parish,
    ri.province,
    ri.country,
    ri.coordinates,
    ri.object_type,
    ri.material,
    ri.dimensions,
    ri.current_location,
    ri.rune_type,
    ri.rune_variant,
    ri.style_group,
    ri.uncertainty_level,
    ri.condition_notes,
    ri.bibliography,
    ri.k_samsok_uri,
    ri.rundata_signum,
    ri.created_at,
    ri.updated_at,
    ri.embedding,
    ri.text_segments,
    ri.complexity_level,
    ri.scholarly_notes,
    ri.paleographic_notes,
    ri.historical_context,
    ri.raa_number,
    ri.lamningsnumber,
    ri.cultural_classification,
    ri.data_source,
    ri.inscription_group,
    ri.municipality,
    ri.county,
    ri.landscape
  FROM runic_inscriptions ri
  WHERE 
    -- Förbättrad sökning för orter och platser
    LOWER(ri.location) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.municipality) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.parish) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.province) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.county) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.landscape) LIKE LOWER('%' || p_search_term || '%') OR
    -- Befintlig textsökning
    LOWER(ri.signum) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.transliteration) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.translation_en) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.translation_sv) LIKE LOWER('%' || p_search_term || '%') OR
    LOWER(ri.historical_context) LIKE LOWER('%' || p_search_term || '%')
  ORDER BY 
    -- Prioritera exakta träffar för orter
    CASE 
      WHEN LOWER(ri.location) = LOWER(p_search_term) THEN 1
      WHEN LOWER(ri.municipality) = LOWER(p_search_term) THEN 2
      WHEN LOWER(ri.parish) = LOWER(p_search_term) THEN 3
      ELSE 4
    END,
    ri.created_at DESC;
END;
$$;
