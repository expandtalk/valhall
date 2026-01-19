-- Create function to get carver statistics with proper BYTEA to UUID conversion
CREATE OR REPLACE FUNCTION public.get_carver_statistics()
RETURNS TABLE(
  carver_name text,
  total_inscriptions bigint,
  signed_count bigint,
  attributed_count bigint,
  certain_count bigint,
  uncertain_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to get carver inscription details
CREATE OR REPLACE FUNCTION public.get_carver_inscriptions()
RETURNS TABLE(
  carverid text,
  inscriptionid text,
  attribution attribution_type,
  certainty boolean,
  notes text,
  inscription jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
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