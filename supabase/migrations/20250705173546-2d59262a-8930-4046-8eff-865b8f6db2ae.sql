-- Add more inscriptions with precise coordinates
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES
('DR NOR2003;8', 55.0014, 15.0535, 'manual', 'high', 'Also known as: Bh 25, DK Bh25, DR AUD2002;135 - oldest recorded location'),
('DR NOR2004;9', 55.0014, 15.0535, 'manual', 'high', 'Sandegård, Povlsker sogn - also known as: DK Bh26 - oldest recorded location'),
('DR 380', 55.0739, 14.815, 'manual', 'high', 'Ny Larsker 2, Ny Larsker sogn - also known as: DK Bh34, L 1479, Bh 34 - oldest recorded location'),
('DR 397', 55.1712, 14.9616, 'manual', 'high', 'Øster Larsker 1, Øster Larsker sogn - also known as: DK Bh48, Bh 48, L 1607 - oldest recorded location'),
('Bh 5', 55.1751, 14.803, 'manual', 'high', 'Also known as: DR 403, Klemensker 5, Klemensker sogn, DK Bh5 - current location'),
('DR DKBh63', 55.092, 14.9002, 'manual', 'high', 'Skørrebrovej, Vester Marie sogn - also known as: Bh 63, DK Bh63 - oldest recorded location'),
('N A71', 61.8397, 8.56615, 'manual', 'high', 'Lom kirke - oldest recorded location'),
('DR 208', 55.4523, 10.2957, 'manual', 'high', 'Also known as: KJ 24, DK Fyn16, Fyn 16 - oldest recorded location')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;