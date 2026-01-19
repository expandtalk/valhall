-- Add detailed information for Blekinge runestones

-- Update DK Bl 1 (Åryd-sten) if it exists, otherwise insert
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, coordinates, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 1', 'Åryd-sten', 'Åryd Stone',
  'fuþorkeniastblm', '-', 
  'Runic alphabet inscription on reused stone',
  'Runalfabet på återanvänd sten',
  'Åryd', 'Halahult', 'Blekinge', 'Sverige',
  POINT(14.99848, 56.29746),
  'sten', 'sten', 'Offerlunden vid Halahult',
  'Medeltid eller senare', 1200, 1600,
  'Inskrift på återanvänd sten, i "offerlunden" vid Halahult. Skyltad parkering finns 300 m norr om stenen, och en stig går till lunden, som ligger i en beteshage för hjortar.',
  'Runinskriften är från medeltid eller senare, och på skylten vid stenen framförs misstanken att hela offerlunden är anlagd på 1600-talet som en historisk lek.',
  'SRDB', NOW(), NOW()
)
ON CONFLICT (signum) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  transliteration = EXCLUDED.transliteration,
  normalization = EXCLUDED.normalization,
  translation_en = EXCLUDED.translation_en,
  translation_sv = EXCLUDED.translation_sv,
  location = EXCLUDED.location,
  parish = EXCLUDED.parish,
  coordinates = EXCLUDED.coordinates,
  object_type = EXCLUDED.object_type,
  material = EXCLUDED.material,
  current_location = EXCLUDED.current_location,
  dating_text = EXCLUDED.dating_text,
  period_start = EXCLUDED.period_start,
  period_end = EXCLUDED.period_end,
  historical_context = EXCLUDED.historical_context,
  scholarly_notes = EXCLUDED.scholarly_notes,
  updated_at = NOW();

-- Insert DK Bl 3 (Stentoften-sten)
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 3', 'Stentoften-sten', 'Stentoften Stone',
  'niu hAborumR | niu hagestumR | hAþuwolAfR gAf j | hAriwolAfR (m)A--u snuh-e | hideRrunono fe(l)(A)h ekA h ed|erA ginoronoR herAmAlAsAR ArAgeu we(l)AdudsA þAt Side B bAriutiþ',
  'Med nio bockar och nio hingstar gav Hådulv godår. Herulv ... Himmelglansrunraden döljer jag här, kraftrunor.',
  'With nine bucks and nine stallions Hådulv gave good years. Herulv ... The heaven-bright run-row I hide here, power-runes.',
  'Med nio bockar och nio hingstar gav Hådulv godår. Herulv ... Himmelglansrunraden döljer jag här, kraftrunor. Ständigt med arghet, till död genom trolldom den som bryter det [minnesmärket]',
  'Stentoften', 'Sölvesborg', 'Blekinge', 'Sverige',
  'runsten', 'sten', 'Sölvesborgs kyrkas vapenhus',
  '600-talet', 600, 700,
  'Runstenen från 600-talet står i Sölvesborgs kyrkas vapenhus. Den är känd sedan 1820-talet då den låg norr om Sölvesborgs slottsruin tillsammans med andra stenar, som troligen utgjort en större anläggning.',
  'En av de äldsta runstenarna i Skandinavien med magiska formler och kraftrunor.',
  'SRDB', NOW(), NOW()
)
ON CONFLICT (signum) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  transliteration = EXCLUDED.transliteration,
  normalization = EXCLUDED.normalization,
  translation_en = EXCLUDED.translation_en,
  translation_sv = EXCLUDED.translation_sv,
  location = EXCLUDED.location,
  parish = EXCLUDED.parish,
  object_type = EXCLUDED.object_type,
  material = EXCLUDED.material,
  current_location = EXCLUDED.current_location,
  dating_text = EXCLUDED.dating_text,
  period_start = EXCLUDED.period_start,
  period_end = EXCLUDED.period_end,
  historical_context = EXCLUDED.historical_context,
  scholarly_notes = EXCLUDED.scholarly_notes,
  updated_at = NOW();

-- Insert DK Bl 4 (Istaby-sten)
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 4', 'Istaby-sten', 'Istaby Stone',
  'Afatz hAriwulafa ¶ hAþuwulafz hAeruwulafiz hAþuwulafz hAeruwulafiz ¶ Afatz hAriwulafa warAit runAz þAiAz',
  'Hådulf, Hjorulfs frände, ristade dessa runor till minne av Härjulv',
  'Hådulf, kinsman of Hjǫrulfr, carved these runes in memory of Hǣrulfr',
  'Hådulf, Hjorulfs frände, ristade dessa runor till minne av Härjulv',
  'Istaby', 'Istaby', 'Blekinge', 'Sverige',
  'runsten', 'sten', 'Historiska museet i Stockholm',
  'Folkvandringstiden', 400, 600,
  'Stenen höggs under folkvandringstiden, och förvaras nu på Historiska museet i Stockholm',
  'Carver: Hådulf (Signed). En av de äldsta runstenarna med urnordiska runor.',
  'SRDB', NOW(), NOW()
)
ON CONFLICT (signum) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  transliteration = EXCLUDED.transliteration,
  normalization = EXCLUDED.normalization,
  translation_en = EXCLUDED.translation_en,
  translation_sv = EXCLUDED.translation_sv,
  location = EXCLUDED.location,
  parish = EXCLUDED.parish,
  object_type = EXCLUDED.object_type,
  material = EXCLUDED.material,
  current_location = EXCLUDED.current_location,
  dating_text = EXCLUDED.dating_text,
  period_start = EXCLUDED.period_start,
  period_end = EXCLUDED.period_end,
  historical_context = EXCLUDED.historical_context,
  scholarly_notes = EXCLUDED.scholarly_notes,
  updated_at = NOW();

-- Insert DK Bl 5 (Sölvesborg-sten)
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 5', 'Sölvesborg-sten', 'Sölvesborg Stone',
  'urti : (w)Aþ- ...|- : ąsM=ut (:) sunu sin :',
  'Vade gjorde [stenen efter] Asmund, sin son',
  'Vade made [the stone after] Asmund, his son',
  'Vade gjorde [stenen efter] Asmund, sin son',
  'Sölvesborg', 'Sölvesborg', 'Blekinge', 'Sverige',
  'runsten', 'sten', 'Rest intill Sölvesborgs kyrka på västra sidan',
  '600-750', 600, 750,
  'Runstenen daterad till år 600 - 750 står rest intill Sölvesborgs kyrka på västra sidan. Den har tidigare varit inmurad i Sölvesborgs kloster.',
  'Danske Runeindskrifter anger att tolkningen är "noget usikker".',
  'SRDB', NOW(), NOW()
)
ON CONFLICT (signum) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  transliteration = EXCLUDED.transliteration,
  normalization = EXCLUDED.normalization,
  translation_en = EXCLUDED.translation_en,
  translation_sv = EXCLUDED.translation_sv,
  location = EXCLUDED.location,
  parish = EXCLUDED.parish,
  object_type = EXCLUDED.object_type,
  material = EXCLUDED.material,
  current_location = EXCLUDED.current_location,
  dating_text = EXCLUDED.dating_text,
  period_start = EXCLUDED.period_start,
  period_end = EXCLUDED.period_end,
  historical_context = EXCLUDED.historical_context,
  scholarly_notes = EXCLUDED.scholarly_notes,
  updated_at = NOW();