-- Add additional Bornholm inscriptions with precise coordinates
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES
('Bh 43', 55.1059, 14.8243, 'manual', 'high', 'Also known as: DK Bh43, DR 388 - oldest recorded location'),
('Bh 47', 55.062, 15.0726, 'manual', 'high', 'Also known as: DR EM85;161, DK Bh47 - oldest recorded location'),
('Bh 49', 55.1712, 14.9616, 'manual', 'high', 'Also known as: DR 398, DK Bh49 - oldest recorded location'),
('Bh 50', 55.1712, 14.9616, 'manual', 'high', 'Also known as: DR EM85;343, DK Bh50 - oldest recorded location'),
('Bh 52', 55.1381, 15.0161, 'manual', 'high', 'Also known as: DK Bh52, DR 391 - oldest recorded location')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;