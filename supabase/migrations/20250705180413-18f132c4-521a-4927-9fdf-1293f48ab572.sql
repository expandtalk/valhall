-- Update coordinates for BN, Bl, Bh series and DR AUD1988 inscriptions
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES
-- BN series
('BN 26', 56.361, 16.421, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 25', 56.3565, 16.4214, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 24', 56.3565, 16.4214, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 15', 56.5198, 16.3991, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 10', 56.502, 16.4264, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 19', 56.4585, 16.4291, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 13', 56.5196, 16.3984, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 5', 56.5414, 16.4438, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('BN 4', 56.5414, 16.4438, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),

-- Bl series  
('Bl 11', 56.197, 15.6884, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bl 7', 56.1966, 15.4023, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bl 6', 56.2023, 15.3807, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bl 1', 56.2981, 14.9981, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bl 2', 56.0734, 14.6089, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bl 5', 56.0529, 14.5813, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bl 4', 56.0224, 14.6509, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),

-- Other inscriptions
('DR AUD1988', 55.3495, 11.1923, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bh 21', 55.052, 15.0128, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bh 1', 55.1751, 14.803, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bh 23', 55.0228, 15.0403, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bh 36', 55.0625, 14.7943, 'manual', 'high', 'Corrected coordinates - oldest recorded location'),
('Bh 43', 55.1059, 14.8243, 'manual', 'high', 'Corrected coordinates - oldest recorded location')

ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;