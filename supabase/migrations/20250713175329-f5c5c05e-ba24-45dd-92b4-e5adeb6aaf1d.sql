-- Update ALL inscriptions across Sweden to show parish name instead of "unknown place" when parish info exists
UPDATE runic_inscriptions 
SET 
  location = CASE 
    WHEN parish IS NOT NULL AND parish != '' THEN parish
    ELSE location
  END,
  updated_at = now()
WHERE location = 'Plats okänd (endast signum från databas)'
  AND parish IS NOT NULL 
  AND parish != '';