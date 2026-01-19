-- Uppdatera DR 360 för att inkludera fler varianter av namnet
UPDATE runic_inscriptions 
SET also_known_as = ARRAY['Björketorpsstenen', 'Björketorp runsten', 'Björketorps runsten']
WHERE signum = 'DR 360';