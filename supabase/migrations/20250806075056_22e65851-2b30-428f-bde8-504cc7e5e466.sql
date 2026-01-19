-- Add death_year column if it doesn't exist (birth_year already exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'historical_kings' AND column_name = 'death_year') THEN
        ALTER TABLE historical_kings ADD COLUMN death_year INTEGER;
    END IF;
END $$;

-- Update Magnus Barfot with detailed information
UPDATE historical_kings 
SET 
  description = 'Magnus Olavsson Barfot, född 1073, död 24 augusti 1103, var kung av Norge från 1093 fram till sin död. Han var son till kung Olav Kyrre (den fredlige) av Norge och dennes frilla Tora Jonsdatter, gift med Margareta Fredkulla och far till bland andra Sigurd Jorsalafarare (Sigurd I Magnusson). Magnus Barfot representerade en vändning i norsk utrikespolitik; han förde en aggressiv och expansiv politik och försökte bland annat erövra Dalsland och delar av Värmland, vilket dock misslyckades. Magnus Barfots krigföring i Skottland ledde till att många områden och öar med norskättad befolkning antingen inlemmades i eller knöts närmare till Norge, däribland Hebriderna (kallade Söderöarna), Orkneyöarna och Isle of Man. 1101 deltog Magnus Barfot i fredssamtalen som kung av Norge i trekungamötet i Kungahälla tillsammans med Inge den äldre från Sverige och Erik Ejegod från Danmark. Magnus dog efter att ha fått en yxa i halsen under ett slag i Ulster på norra Irland.',
  birth_year = 1073,
  death_year = 1103,
  reign_start = 1093,
  reign_end = 1103
WHERE name = 'Magnus Barfot' AND region = 'Norway';

-- Insert Olav Kyrre
INSERT INTO historical_kings (
  id, name, name_variations, dynasty_id, reign_start, reign_end, 
  birth_year, death_year, status, region, gender, description, 
  archaeological_evidence, runestone_mentions
) VALUES (
  gen_random_uuid(),
  'Olav Kyrre',
  ARRAY['Olav den fredlige', 'Olav III'],
  '88888888-8888-8888-8888-888888888888',
  1067, 1093,
  NULL, 1093,
  'historical',
  'Norway',
  'male',
  'Olav Kyrre (den fredlige) var kung av Norge 1067-1093. Son till Harald Hårdråde och far till Magnus Barfot. Känd för sin fredliga politik och för att ha grundlagt Bergen.',
  true,
  false
);

-- Insert Magnus Haraldsson
INSERT INTO historical_kings (
  id, name, name_variations, dynasty_id, reign_start, reign_end,
  birth_year, death_year, status, region, gender, description,
  archaeological_evidence, runestone_mentions
) VALUES (
  gen_random_uuid(),
  'Magnus Haraldsson',
  ARRAY['Magnus II'],
  '88888888-8888-8888-8888-888888888888',
  1066, 1069,
  NULL, 1069,
  'historical',
  'Norway',
  'male',
  'Magnus Haraldsson var kung av Norge sommaren 1066 till 28 april 1069. Son till Harald Hårdråde, samregent med sin bror Olav Kyrre från 1067.',
  true,
  false
);

-- Insert Håkan Magnusson (motkonung)
INSERT INTO historical_kings (
  id, name, name_variations, dynasty_id, reign_start, reign_end,
  birth_year, death_year, status, region, gender, description,
  archaeological_evidence, runestone_mentions
) VALUES (
  gen_random_uuid(),
  'Håkan Magnusson',
  ARRAY['Håkan motkonung'],
  '88888888-8888-8888-8888-888888888888',
  1093, 1094,
  NULL, 1094,
  'historical',
  'Norway',
  'male',
  'Håkan Magnusson var motkonung till Magnus Barfot 1093-1094. Utmanade Magnus Barfots makt men föll redan efter ett år.',
  false,
  false
);

-- Update Harald Hårdråde if exists (to ensure consistency)
UPDATE historical_kings 
SET 
  reign_start = 1047,
  reign_end = 1066,
  death_year = 1066,
  description = 'Harald Hårdråde var kung av Norge 1047-1066. Känd för sina vikingatåg och sitt försök att erövra England 1066 där han föll i slaget vid Stamford Bridge.'
WHERE name LIKE '%Harald%' AND (name LIKE '%Hårdråde%' OR name LIKE '%Hardrada%') AND region = 'Norway';