-- Lägg till U 1132 (Gimostenen) i databasen
INSERT INTO runic_inscriptions (
  signum,
  location,
  parish,
  municipality,
  county,
  province,
  landscape,
  country,
  object_type,
  data_source,
  complexity_level,
  uncertainty_level,
  dating_confidence,
  current_location
) VALUES (
  'U 1132',
  'Gimo',
  'Skäfthammars socken',
  'Östhammars kommun',
  'Uppsala län',
  'Uppsala län',
  'Uppland',
  'Sweden',
  'Runsten',
  'Manual entry',
  'medium',
  'low',
  0.8,
  'Vid Gimo damm, cirka två kilometer nordväst om Skäfthammars kyrka'
);