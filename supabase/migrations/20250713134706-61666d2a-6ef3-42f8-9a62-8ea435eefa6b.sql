-- Sista stora koordinatlänkningen - använd LEFT JOIN för att se vad som kan länkas
WITH coord_matches AS (
  SELECT DISTINCT 
    r.id as inscription_id,
    c.latitude,
    c.longitude
  FROM runic_inscriptions r
  INNER JOIN coordinates c ON r.id::text = c.object_id
  WHERE r.coordinates IS NULL
    AND c.current_flag = 1
    AND c.latitude IS NOT NULL 
    AND c.longitude IS NOT NULL
)
UPDATE runic_inscriptions 
SET coordinates = point(cm.longitude, cm.latitude)
FROM coord_matches cm
WHERE runic_inscriptions.id = cm.inscription_id;