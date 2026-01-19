-- Uppdatera Rökstenen med de exakta koordinaterna
UPDATE runic_inscriptions SET 
  coordinates = point(14.77806, 58.29333)
WHERE signum = 'Ög 136';

-- Lägg även till koordinaterna i coordinates-tabellen för backup
INSERT INTO coordinates (
  coordinate_id,
  object_id,
  latitude,
  longitude,
  current_flag
) VALUES (
  gen_random_uuid(),
  '0be64520-b663-4e19-aa3e-bb0c9ffbb8ba',
  58.29333,
  14.77806,
  1
);