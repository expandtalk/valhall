-- Update DR 360 (Björketorpsstenen) to have clearer name
UPDATE runic_inscriptions 
SET 
  name = 'Björketorpsstenen',
  name_en = 'Björketorp Stone',
  province = 'Blekinge län',
  updated_at = NOW()
WHERE signum = 'DR 360';