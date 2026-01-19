-- Update runic_inscriptions with coordinates from additional_coordinates for Blekinge stones
UPDATE runic_inscriptions 
SET coordinates = point(ac.longitude, ac.latitude),
    updated_at = now()
FROM additional_coordinates ac
WHERE runic_inscriptions.signum = ac.signum
  AND runic_inscriptions.signum LIKE 'Bl%'
  AND runic_inscriptions.coordinates IS NULL
  AND ac.confidence = 'high'
  AND ac.source = 'manual';