-- Continue adding remaining Blekinge runestones

-- Insert DK Bl 6 (Björketorp-sten) 
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 6', 'Björketorp-sten', 'Björketorp Stone',
  '1: hAidz runo ronu fAlAhAk hAiderA g inArunAz ArAgeu hAerAmAlAusz utiAz welAdAude sAz þAt bArutz 2: uþArAbA sbA',
  'Mäktiga runors hemlighet dolde jag här, kraftfulla runor. Den som bryter detta minnesmärke ska ständigt plågas av arghet. Svekfull död ska drabba honom. Jag spår fördärv',
  'I hid here the secret of mighty runes, powerful runes. He who breaks this monument shall constantly be tormented by anger. Treacherous death shall strike him. I foretell destruction',
  'Mäktiga runors hemlighet dolde jag här, kraftfulla runor. Den som bryter detta minnesmärke ska ständigt plågas av arghet. Svekfull död ska drabba honom. Jag spår fördärv',
  'Björketorp', 'Listerby', 'Blekinge', 'Sverige',
  'runsten', 'sten', 'Ursprunglig plats vid gravfält',
  'Folkvandringstiden', 400, 800,
  'Stenen är fyra meter hög och flankeras av två höga resta stenar. Intill stenarna finns ett gravfält som har daterats till år 400 - 800. Inskriften är med urnordiska runor',
  'En av de mest berömda runstenarna med förbannelse och magiska formler. Fyra meter hög sten med urnordiska runor.',
  'SRDB', NOW(), NOW()
)
ON CONFLICT (signum) DO NOTHING;

-- Insert DK Bl 8 (Lösen-sten 1)
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 8', 'Lösen-sten 1', 'Lösen Stone 1',
  'ødmar : ok : reinmod',
  'Ödmar och Reginmod',
  'Ödmar and Reginmod',
  'Ödmar och Reginmod',
  'Lösen', 'Lösen', 'Blekinge', 'Sverige',
  'gravsten', 'sten', 'Lösens kyrkogård',
  '1100-1200-talet', 1100, 1200,
  'Gravstenen från 1100- eller 1200-talet står på toppen av en kulle på kyrkogården några meter söder om Lösens kyrka. Den är tidigast dokumenterad från 1527, då den också stod på kyrkogården.',
  'Medeltida gravsten med runor, dokumenterad sedan 1527.',
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

-- Insert DK Bl 10 (Lösen-sten 2/3)
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 10', 'Lösen-sten 3', 'Lösen Stone 3',
  '[ANO þNI M|CCCX (i) asio (m)i) lo](t) gøræ þen(æ) [siææn | aaeiokR | þusi]n au- føþø[ir urkræiæeer]',
  'I Herrens år 1310 i Åsjö Mi lät göra denna sten och fader ...',
  'In the year of our Lord 1310 in Åsjö Mi had this stone made and father ...',
  'I Herrens år 1310 i Åsjö Mi lät göra denna sten och fader ...',
  'Lösen', 'Lösen', 'Blekinge', 'Sverige',
  'gravsten', 'sten', 'Lösens kyrkogård',
  '1310-1311', 1310, 1311,
  'Gravstenen från 1310 eller 1311 står på norra sidan av en kulle på kyrkogården några meter söder om Lösens kyrka. När den upptäcktes 1746 låg den nära altaret i kyrkan.',
  'Stenen är den enda danska runsten som är uttryckligen daterad till 1310.',
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

-- Update DK Bl 12 (Sturkö-sten) with detailed information
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, coordinates, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DK Bl 12', 'Sturkö-sten', 'Sturkö Stone',
  'skibarR : kuþis : raisþ... stin',
  'Gudes skeppare reste ... sten',
  'Gude''s skipper raised ... stone',
  'Gudes skeppare reste ... sten',
  'Sturkö', 'Sturkö', 'Blekinge', 'Sverige',
  POINT(15.72854, 56.11326),
  'runsten', 'sten', 'Västra Skällöns naturreservat',
  'Vikingatid', 800, 1100,
  'Runstenen står rest i Västra Skällöns naturreservat. Tidigare stod den vid Runstensvägen 250 m väster om dess nuvarande plats.',
  'Nämner en skeppare, vilket visar på vikten av sjöfart i regionen.',
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

-- Insert DR BR 75 (Tjurkö)
INSERT INTO runic_inscriptions (
  id, signum, name, name_en, transliteration, normalization, translation_en, translation_sv,
  location, parish, province, country, object_type, material, current_location,
  dating_text, period_start, period_end, historical_context, scholarly_notes, data_source,
  created_at, updated_at
) VALUES (
  gen_random_uuid(), 'DR BR 75', 'Tjurkö', 'Tjurkö Bracteate',
  'wurte runoz an walhakurne ** heldaz kunimudiu ***',
  'Heldaz skrev runorna på guldet åt Kunimunduz',
  'Heldaz wrote the runes on the gold for Kunimunduz',
  'Heldaz skrev runorna på guldet åt Kunimunduz',
  'Tjurkö', 'Tjurkö', 'Blekinge', 'Sverige',
  'brakteat', 'guld', 'Historiska museet i Stockholm (guldrummet)',
  'Folkvandringstiden', 450, 550,
  'Brakteaten finns att se i guldrummet i Historiska museet i Stockholm.',
  'Carver: Heldaz (Signed). Guldbrakteat med urnordiska runor.',
  'SRDB', NOW(), NOW()
)
ON CONFLICT (signum) DO NOTHING;