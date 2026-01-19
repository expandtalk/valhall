-- Remove duplicate Thyra Danebod (the one without dynasty_id)
DELETE FROM historical_kings 
WHERE name = 'Thyra Danebod' 
AND dynasty_id IS NULL;

-- Add missing king Håkan av Norge 
INSERT INTO historical_kings (name, name_variations, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, gender) 
VALUES (
  'Håkan av Norge',
  ARRAY['Håkon VI Magnusson'],
  1355,
  1380,
  'historical',
  'Norge',
  'Kung av Norge, gift med Margareta som senare blev regent för hela Norden.',
  false,
  false,
  'male'
);

-- Add the medieval queens
INSERT INTO historical_kings (name, name_variations, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, gender) 
VALUES 
-- Helvig av Holstein, gift med Magnus Ladulås
(
  'Helvig av Holstein',
  ARRAY['Hedvig av Holstein'],
  1275,
  1290,
  'historical',
  'Sweden',
  'Drottning av Sverige, gift med Magnus Ladulås. Dotter till hertig Gerhard I av Holstein.',
  false,
  false,
  'female'
),

-- Märta, gift med Birger Magnusson
(
  'Märta',
  ARRAY['Märta av Danmark'],
  1290,
  1318,
  'historical',
  'Sweden',
  'Drottning av Sverige, gift med Birger Magnusson. Känd för sin politiska inflytande.',
  false,
  false,
  'female'
),

-- Blanka av Namur, gift med Magnus Eriksson
(
  'Blanka av Namur',
  ARRAY['Blanche de Namur'],
  1319,
  1364,
  'historical',
  'Sweden',
  'Drottning av Sverige, gift med Magnus Eriksson. Dotter till Johan I av Namur.',
  false,
  false,
  'female'
),

-- Beatrix av Wittelsbach, gift med Erik Magnusson
(
  'Beatrix av Wittelsbach',
  ARRAY['Beatrix av Bayern'],
  1300,
  1318,
  'historical',
  'Sweden',
  'Gift med Erik Magnusson. Dotter till Ludwig II av Bayern.',
  false,
  false,
  'female'
),

-- Rikardis, gift med Albrekt av Mecklenburg  
(
  'Rikardis',
  ARRAY['Richeza av Schwerin'],
  1364,
  1377,
  'historical',
  'Sweden',
  'Drottning av Sverige, gift med Albrekt av Mecklenburg.',
  false,
  false,
  'female'
),

-- Agnes, gift med Albrekt av Mecklenburg
(
  'Agnes',
  ARRAY['Agnes av Brunswick'],
  1377,
  1389,
  'historical',
  'Sweden',
  'Andra hustru till Albrekt av Mecklenburg.',
  false,
  false,
  'female'
),

-- Margareta, gift med Håkan av Norge
(
  'Margareta',
  ARRAY['Margareta I', 'Margareta av Danmark'],
  1355,
  1412,
  'historical',
  'Norge/Danmark/Sverige',
  'Drottning av Norge, Danmark och Sverige. Gift med Håkan av Norge. Kalmarunionens grundare.',
  false,
  false,
  'female'
),

-- Filippa, gift med Erik av Pommern
(
  'Filippa',
  ARRAY['Philippa av England'],
  1396,
  1430,
  'historical',
  'Sverige/Danmark/Norge',
  'Drottning av Danmark, Norge och Sverige, gift med Erik av Pommern. Dotter till Henrik IV av England.',
  false,
  false,
  'female'
);