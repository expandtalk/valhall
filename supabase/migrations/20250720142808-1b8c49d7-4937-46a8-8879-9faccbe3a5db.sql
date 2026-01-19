-- Lägg till koordinater för runstenar i Uppsala

-- Universitetsparken (59.8581°N, 17.6420°E)
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES 
  ('U 896', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 932', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 937', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 938', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 939', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 940', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 943', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala'),
  ('U 1011', 59.8581, 17.6420, 'manual', 'high', 'Universitetsparken, Uppsala')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;

-- Uppsala domkyrka (59.8581°N, 17.6358°E)
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES 
  ('U 931', 59.8581, 17.6358, 'manual', 'high', 'Uppsala domkyrka'),
  ('U 935', 59.8581, 17.6358, 'manual', 'high', 'Uppsala domkyrka'),
  ('U 929', 59.8581, 17.6358, 'manual', 'high', 'Uppsala domkyrka'),
  ('U 933', 59.8581, 17.6358, 'manual', 'high', 'Uppsala domkyrka'),
  ('Fv1976;107', 59.8581, 17.6358, 'manual', 'high', 'Uppsala domkyrka')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;

-- Gamla Uppsala kyrka (59.8995°N, 17.6318°E)
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES 
  ('U 978', 59.8995, 17.6318, 'manual', 'high', 'Gamla Uppsala kyrka'),
  ('U 979', 59.8995, 17.6318, 'manual', 'high', 'Gamla Uppsala kyrka'),
  ('U 980', 59.8995, 17.6318, 'manual', 'high', 'Gamla Uppsala kyrka')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;

-- Uppdatera även U 934 som redan fanns med fel koordinater
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes)
VALUES 
  ('U 934', 59.8581, 17.6358, 'manual', 'high', 'Uppsala domkyrka')
ON CONFLICT (signum) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  notes = EXCLUDED.notes;

-- Uppdatera U 489 med rätt koordinater för Universitetsparken
UPDATE additional_coordinates 
SET latitude = 59.8581, longitude = 17.6420, notes = 'Universitetsparken, Uppsala'
WHERE signum = 'U 489';