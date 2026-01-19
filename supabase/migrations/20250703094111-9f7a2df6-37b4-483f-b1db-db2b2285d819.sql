-- Ta bort befintlig vy och skapa ny
DROP VIEW IF EXISTS runic_with_coordinates;

CREATE VIEW runic_with_coordinates AS
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
    
    -- Koordinater från additional_coordinates (sekundär källa)
    ac.latitude as additional_latitude,
    ac.longitude as additional_longitude,
    ac.source as coordinate_source,
    ac.confidence,
    
    -- Beräkna bästa tillgängliga koordinater
    CASE 
        WHEN r.coordinates IS NOT NULL THEN 'original_coordinates'
        WHEN ac.latitude IS NOT NULL THEN 'additional_coordinates'
        ELSE 'no_coordinates'
    END as coordinate_status,
    
    -- Geocoding priority
    CASE 
        WHEN r.coordinates IS NOT NULL OR ac.latitude IS NOT NULL THEN 'has_coordinates'
        WHEN r.location IS NOT NULL AND r.parish IS NOT NULL THEN 'high_geocoding_potential'
        WHEN r.location IS NOT NULL THEN 'medium_geocoding_potential'
        ELSE 'low_geocoding_potential'
    END as geocoding_priority
    
FROM runic_inscriptions r
LEFT JOIN additional_coordinates ac ON r.signum = ac.signum;