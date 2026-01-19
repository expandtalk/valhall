-- Update Blekinge inscriptions to show parish name instead of "unknown place" when coordinates exist
UPDATE runic_inscriptions 
SET 
  location = CASE 
    WHEN parish IS NOT NULL AND parish != '' THEN parish
    ELSE location
  END,
  updated_at = now()
WHERE signum LIKE 'Bl %' 
  AND location = 'Plats okänd (endast signum från databas)'
  AND parish IS NOT NULL 
  AND parish != '';