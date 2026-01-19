-- Update Ög 64 with correct name information
UPDATE runic_inscriptions 
SET 
  name = 'Bjälbo kyrka',
  name_en = 'Bjälbo Church',
  location = 'Bjälbo kyrka',
  updated_at = NOW()
WHERE signum = 'Ög 64';