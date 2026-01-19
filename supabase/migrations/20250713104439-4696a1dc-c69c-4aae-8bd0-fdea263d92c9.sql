-- Add name columns to runic_inscriptions table
ALTER TABLE public.runic_inscriptions 
ADD COLUMN name text,
ADD COLUMN name_en text,
ADD COLUMN also_known_as text[], -- Array for alternative names/signum
ADD COLUMN alternative_signum text[]; -- Array for alternative signum references

-- Update the search function to include name searches
CREATE OR REPLACE FUNCTION public.search_inscriptions_flexible(p_search_term text)
RETURNS TABLE(
  id uuid, signum text, transliteration text, normalization text, 
  translation_en text, translation_sv text, dating_text text, 
  period_start integer, period_end integer, dating_confidence double precision, 
  location text, parish text, province text, country text, coordinates point, 
  object_type text, material text, dimensions text, current_location text, 
  rune_type text, rune_variant text, style_group text, uncertainty_level text, 
  condition_notes text, bibliography jsonb, k_samsok_uri text, rundata_signum text, 
  created_at timestamp with time zone, updated_at timestamp with time zone, 
  embedding vector, text_segments jsonb, complexity_level text, scholarly_notes text, 
  paleographic_notes text, historical_context text, raa_number text, 
  lamningsnumber text, cultural_classification text, data_source text, 
  inscription_group text, municipality text, county text, landscape text,
  name text, name_en text, also_known_as text[], alternative_signum text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
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
$$;

-- Add some example famous runestone names
UPDATE public.runic_inscriptions 
SET name = 'Rökstenen', 
    name_en = 'Rök Stone',
    also_known_as = ARRAY['Rökstenen'],
    alternative_signum = ARRAY['L 2028', 'B 913']
WHERE signum = 'Ög 136';

-- Add comment explaining the new columns
COMMENT ON COLUMN public.runic_inscriptions.name IS 'Swedish name of the runestone (e.g., Rökstenen, Gripsholmsstenen)';
COMMENT ON COLUMN public.runic_inscriptions.name_en IS 'English name of the runestone (e.g., Rök Stone, Gripsholm Stone)';
COMMENT ON COLUMN public.runic_inscriptions.also_known_as IS 'Alternative names and variants (e.g., local names, historical variants)';
COMMENT ON COLUMN public.runic_inscriptions.alternative_signum IS 'Alternative signum references (e.g., B 1071, BN 1, DR 411, L 1323 for Öl 1)';