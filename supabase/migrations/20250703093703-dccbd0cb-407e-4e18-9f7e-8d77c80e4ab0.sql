-- Skapa tabell för förbättrade koordinater
CREATE TABLE IF NOT EXISTS additional_coordinates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    signum TEXT NOT NULL UNIQUE,
    inscription_id UUID,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    source TEXT NOT NULL DEFAULT 'geocoded', -- 'geocoded', 'manual', 'enhanced', etc.
    confidence TEXT NOT NULL DEFAULT 'medium', -- 'high', 'medium', 'low'
    notes TEXT,
    location_input TEXT, -- Den plats som användes för geocoding
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Skapa index för snabbare sökningar
CREATE INDEX IF NOT EXISTS idx_additional_coordinates_signum ON additional_coordinates(signum);
CREATE INDEX IF NOT EXISTS idx_additional_coordinates_inscription_id ON additional_coordinates(inscription_id);

-- RLS policies
ALTER TABLE additional_coordinates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Additional coordinates are viewable by everyone" 
ON additional_coordinates 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage additional coordinates" 
ON additional_coordinates 
FOR ALL 
USING (is_admin());

-- Skapa förbättrad vy som kombinerar alla koordinatkällor
CREATE OR REPLACE VIEW runic_with_coordinates AS
SELECT 
    r.id,
    r.signum,
    r.transliteration,
    r.location,
    r.parish,
    r.province,
    r.country,
    r.municipality,
    r.county,
    r.landscape,
    r.translation_en,
    r.translation_sv,
    r.object_type,
    r.period_start,
    r.period_end,
    r.dating_text,
    r.created_at,
    
    -- Koordinater från runic_inscriptions (primär källa)
    r.coordinates as original_coordinates,
    r.latitude as original_latitude,
    r.longitude as original_longitude,
    
    -- Koordinater från additional_coordinates (sekundär källa)
    ac.latitude as additional_latitude,
    ac.longitude as additional_longitude,
    ac.source as coordinate_source,
    ac.confidence,
    ac.location_input,
    
    -- Beräkna bästa tillgängliga koordinater
    CASE 
        WHEN r.coordinates IS NOT NULL THEN 'original_coordinates'
        WHEN r.latitude IS NOT NULL AND r.longitude IS NOT NULL THEN 'original_lat_lng'
        WHEN ac.latitude IS NOT NULL THEN 'additional_coordinates'
        ELSE 'no_coordinates'
    END as coordinate_status,
    
    -- Skapa sammansatt koordinat-objekt för enkel användning
    CASE 
        WHEN r.coordinates IS NOT NULL THEN r.coordinates
        WHEN r.latitude IS NOT NULL AND r.longitude IS NOT NULL THEN 
            ('(' || r.longitude || ',' || r.latitude || ')')::point
        WHEN ac.latitude IS NOT NULL THEN 
            ('(' || ac.longitude || ',' || ac.latitude || ')')::point
        ELSE NULL
    END as best_coordinates,
    
    -- Geocoding priority (för att identifiera vilka som behöver geocodas)
    CASE 
        WHEN r.coordinates IS NOT NULL OR (r.latitude IS NOT NULL AND r.longitude IS NOT NULL) OR ac.latitude IS NOT NULL THEN 'has_coordinates'
        WHEN r.location IS NOT NULL AND r.parish IS NOT NULL THEN 'high_geocoding_potential'
        WHEN r.location IS NOT NULL THEN 'medium_geocoding_potential'
        ELSE 'low_geocoding_potential'
    END as geocoding_priority
    
FROM runic_inscriptions r
LEFT JOIN additional_coordinates ac ON r.signum = ac.signum;

-- Skapa funktion för att få koordinater för en specifik inskrift
CREATE OR REPLACE FUNCTION get_inscription_coordinates(inscription_signum TEXT)
RETURNS TABLE(latitude DOUBLE PRECISION, longitude DOUBLE PRECISION, source TEXT, confidence TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN rwc.original_coordinates IS NOT NULL THEN ST_Y(rwc.original_coordinates)
      WHEN rwc.original_latitude IS NOT NULL THEN rwc.original_latitude
      WHEN rwc.additional_latitude IS NOT NULL THEN rwc.additional_latitude
      ELSE NULL
    END as latitude,
    CASE 
      WHEN rwc.original_coordinates IS NOT NULL THEN ST_X(rwc.original_coordinates)
      WHEN rwc.original_longitude IS NOT NULL THEN rwc.original_longitude
      WHEN rwc.additional_longitude IS NOT NULL THEN rwc.additional_longitude
      ELSE NULL
    END as longitude,
    COALESCE(rwc.coordinate_source, 'original') as source,
    COALESCE(rwc.confidence, 'high') as confidence
  FROM runic_with_coordinates rwc
  WHERE rwc.signum = inscription_signum;
END;
$$;