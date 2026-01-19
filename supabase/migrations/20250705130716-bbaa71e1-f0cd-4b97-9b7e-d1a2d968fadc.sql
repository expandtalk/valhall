-- Update specific Öland inscriptions with their precise coordinates
UPDATE additional_coordinates SET 
  latitude = 56.6075, 
  longitude = 16.4398, 
  source = 'manual', 
  confidence = 'high',
  notes = 'Precise coordinates - oldest recorded location'
WHERE signum = 'Öl 1';

UPDATE additional_coordinates SET 
  latitude = 56.6788, 
  longitude = 16.5278, 
  source = 'manual', 
  confidence = 'high',
  notes = 'Precise coordinates'
WHERE signum = 'Öl 2';

UPDATE additional_coordinates SET 
  latitude = 56.5414, 
  longitude = 16.4438, 
  source = 'manual', 
  confidence = 'high',
  notes = 'Precise coordinates - oldest recorded location'
WHERE signum = 'Öl 3';

-- Add BN inscriptions with their specific coordinates
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES
('BN 26', 56.361, 16.421, 'manual', 'high', 'Precise coordinates'),
('BN 24', 56.3565, 16.4214, 'manual', 'high', 'Precise coordinates - oldest recorded location')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;