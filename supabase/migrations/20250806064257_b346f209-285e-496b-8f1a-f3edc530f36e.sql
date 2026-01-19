-- Update Magnus Barfot with detailed description
UPDATE historical_kings 
SET description = 'Magnus Olavsson Barfot, född 1073, död 24 augusti 1103, var kung av Norge från 1093 fram till sin död. Han var son till kung Olav Kyrre (den fredlige) av Norge och dennes frilla Tora Jonsdatter, gift med Margareta Fredkulla och far till bland andra Sigurd Jorsalafarare (Sigurd I Magnusson). Magnus Barfot representerade en vändning i norsk utrikespolitik; han förde en aggressiv och expansiv politik och försökte bland annat erövra Dalsland och delar av Värmland, vilket dock misslyckades. Magnus Barfots krigföring i Skottland ledde till att många områden och öar med norskättad befolkning antingen inlemmades i eller knöts närmare till Norge, däribland Hebriderna (kallade Söderöarna), Orkneyöarna och Isle of Man. Han förde krig även i Wales och på Irland. 1101 deltog Magnus Barfot i fredssamtalen som kung av Norge i trekungamötet i Kungahälla tillsammans med Inge den äldre från Sverige och Erik Ejegod från Danmark. Han gifte sig, som en bekräftelse på freden, med Margareta Fredkulla som var kung Inges dotter. Magnus dog efter att ha fått en yxa i halsen under ett slag i Ulster på norra Irland. I Heimskringla berättas att han förde ett lejon av guld i rött fält på skölden och på vapenrocken. Varför Magnus kallades Barfot (från berfættr eller berleggr) är något oklart. Snorre Sturlasson hävdar att kungen och många av hans män hade lagt sig till med vanan att gå klädda »med bare legger på gata og hadde korte trøyer og kapper». Enligt Saxo fick han namnet efter att vid ett tillfälle ha tvingats fly från svenskarna barfota, utan skor.',
    name_variations = ARRAY['Magnus Olavsson', 'Magnus Barefoot', 'Magnus Berføtter']
WHERE name = 'Magnus Barfot' AND region = 'Norway';

-- Add Olav Kyrre
INSERT INTO historical_kings (
  name, 
  name_variations,
  dynasty_id,
  reign_start,
  reign_end,
  status,
  region,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Olav Kyrre',
  ARRAY['Olav den fredlige', 'Olav the Peaceful'],
  '88888888-8888-8888-8888-888888888888',
  1067,
  1093,
  'historical',
  'Norway',
  'male',
  'Olav Kyrre (den fredlige) var kung av Norge 1067-1093. Magnus Haraldsson var samregent till 1069. Olav Kyrre var far till Magnus Barfot via sin frilla Tora Jonsdatter.',
  true,
  false
);

-- Add Magnus Haraldsson  
INSERT INTO historical_kings (
  name,
  name_variations,
  dynasty_id,
  reign_start,
  reign_end,
  status,
  region,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Magnus Haraldsson',
  ARRAY['Magnus II av Norge'],
  '88888888-8888-8888-8888-888888888888',
  1066,
  1069,
  'historical',
  'Norway',
  'male',
  'Magnus Haraldsson regerade sommaren 1066 till 28 april 1069. Olav Kyrre var samregent från 1067. Son till Harald Hårdråde.',
  true,
  false
);

-- Add missing co-king information for Håkan Magnusson
INSERT INTO historical_kings (
  name,
  name_variations,
  dynasty_id,
  reign_start,
  reign_end,
  status,
  region,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Håkan Magnusson (motkonung)',
  ARRAY['Håkan Magnusson', 'Håkan motkonung'],
  '88888888-8888-8888-8888-888888888888',
  1093,
  1094,
  'historical',
  'Norway',
  'male',
  'Håkan Magnusson var motkonung till Magnus Barfot 1093-1094.',
  false,
  false
);

-- Add birth and death year columns to historical_kings table
ALTER TABLE historical_kings 
ADD COLUMN birth_year INTEGER,
ADD COLUMN death_year INTEGER;