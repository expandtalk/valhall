-- Create dynasty for Sea Kings and add the historical sea kings
-- First create the Sea Kings dynasty with a unique ID
INSERT INTO royal_dynasties (id, name, name_en, description, region, period_start, period_end) 
VALUES (
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  'Sjökungar', 
  'Sea Kings',
  'Historiskt belagda vikingakungar som kontrollerade sjöhandel och kustområden under vikingatiden',
  'Skandinavien/Östersjön',
  900,
  1000
);

-- Add the historical sea kings
INSERT INTO historical_kings (name, name_variations, region, reign_start, reign_end, status, dynasty_id, archaeological_evidence, runestone_mentions, description, gender) 
VALUES 
-- Sibbe (ca 900-950)
(
  'Sibbe',
  ARRAY['Kong Sibbe'],
  'Danmark/Östersjön',
  900,
  950,
  'historical',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  true,
  true,
  'Sjökonung med makt över Danmark, Öresund och Östersjön. Omnämnd på Karlevistenen och möjligen Rökstenen. Hög tillförlitlighet genom samtida runstenar.'
),

-- Harald Blåtand (ca 935-986)
(
  'Harald Blåtand',
  ARRAY['Harald Bluetooth', 'Harald Gormsson'],
  'Danmark/Östersjön',
  935,
  986,
  'historical',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  true,
  true,
  'Sjökonung med kontroll över Danmark, Östersjön och Kattegatt. Omnämnd på Jellingstenarna samt av Adam av Bremen och i Heimskringla. Hög tillförlitlighet genom flera samtida källor.'
),

-- Gorm den Gamle (död ca 958)
(
  'Gorm den Gamle',
  ARRAY['Gorm the Old', 'Gorm Hardeknut'],
  'Danmark',
  920,
  958,
  'historical',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  true,
  true,
  'Dansk kung som kontrollerade sjöhandel. Omnämnd på Jellingstenarna, av Adam av Bremen och i Heimskringla. Hög tillförlitlighet genom samtida källor.'
),

-- Håkon Adalsteinsfostre (920-961)
(
  'Håkon Adalsteinsfostre',
  ARRAY['Håkon den gode', 'Haakon Adalsteinfostri'],
  'Norge/Nordsjön',
  920,
  961,
  'semi_legendary',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  false,
  false,
  'Norsk sjökonung med makt över Norge, Nordsjön och norska kustfarvatten. Omnämnd i Heimskringla och Agrip af Noregskonungasögum. Medel tillförlitlighet genom senare sagor men flera oberoende källor.'
),

-- Eirik Blodyx (död 954)
(
  'Eirik Blodyx',
  ARRAY['Eirik Blodøks', 'Erik Bloodaxe'],
  'Norge/Northumbria',
  930,
  954,
  'semi_legendary',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  false,
  false,
  'Sjökonung med makt över Norge, Orkneyöarna och Northumbria. Omnämnd i Heimskringla, Orkneyinga saga och Anglosaxiska krönikan. Medel tillförlitlighet genom flera oberoende källor.'
),

-- Palnatoke (ca 950-1000)
(
  'Palnatoke',
  ARRAY['Palna-Toki', 'Palnatoki'],
  'Danmark/Öresund',
  950,
  1000,
  'legendary',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  false,
  false,
  'Legendär sjökonung med makt över Öresund, Skåne och Själland. Omnämnd i Gesta Danorum, Jómsvíkinga saga och Heimskringla. Låg-medel tillförlitlighet genom huvudsakligen senare sagor.'
);