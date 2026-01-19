-- Update location field for Ög 64 to match the name
UPDATE runic_inscriptions 
SET 
  location = 'Bjälbo kyrka',
  updated_at = NOW()
WHERE signum = 'Ög 64';