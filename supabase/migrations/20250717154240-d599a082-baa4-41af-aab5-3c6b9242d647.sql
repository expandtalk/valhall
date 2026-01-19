-- Update Ög 64 with correct coordinates and administrative information
UPDATE runic_inscriptions 
SET 
  coordinates = point(15.005194, 58.372083),
  county = 'Östergötlands län',
  landscape = 'Östergötland',
  updated_at = NOW()
WHERE signum = 'Ög 64';