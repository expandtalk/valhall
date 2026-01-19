-- Add missing Viking Age names from carvers and historical kings to viking_names table
-- This enriches the database with authentic historical names

-- First, add runestone carver names (these are historically attested craftsmen)
INSERT INTO viking_names (name, name_en, gender, frequency, historical_period, meaning, origin, created_at)
VALUES
  -- High-frequency carver names (multiple attestations)
  ('Alrik', 'Alrik', 'male', 12, 'Viking Age', 'All-ruler, ruler of all', 'Old Norse', now()),
  ('Äsbjörn', 'Asbjorn', 'male', 15, 'Viking Age', 'God-bear, divine bear', 'Old Norse', now()),
  ('Äskil', 'Eskil', 'male', 11, 'Viking Age', 'God-kettle, sacred vessel', 'Old Norse', now()),
  ('Amunde', 'Amund', 'male', 8, 'Viking Age', 'Awe-protection, fearsome protector', 'Old Norse', now()),
  ('Ärnfast', 'Arnfast', 'male', 7, 'Viking Age', 'Eagle-firm, steadfast eagle', 'Old Norse', now()),
  ('Arbjörn', 'Arbjorn', 'male', 9, 'Viking Age', 'Eagle-bear', 'Old Norse', now()),
  ('Ärnmund', 'Arnmund', 'male', 6, 'Viking Age', 'Eagle-protection', 'Old Norse', now()),
  ('Åsbjörn', 'Asbjorn', 'male', 13, 'Viking Age', 'God-bear (variant)', 'Old Norse', now()),
  ('Åsgöt', 'Asgot', 'male', 5, 'Viking Age', 'God-Goth, divine Goth', 'Old Norse', now()),
  ('Äsger', 'Asger', 'male', 8, 'Viking Age', 'God-spear, divine spear', 'Old Norse', now()),
  ('Anund', 'Anund', 'male', 14, 'Viking Age', 'Ancestor-spirit', 'Old Norse', now()),
  ('Åfrid', 'Afrid', 'male', 4, 'Viking Age', 'Ancestor-peace', 'Old Norse', now()),
  ('Alver', 'Alver', 'male', 3, 'Viking Age', 'Elf-warrior', 'Old Norse', now()),
  ('Árni', 'Arni', 'male', 6, 'Viking Age', 'Eagle (Icelandic form)', 'Old Norse', now()),

  -- Royal and noble names from historical_kings
  ('Anund Jakob', 'Anund Jacob', 'male', 18, 'Viking Age', 'Ancestor-spirit + Jacob', 'Old Norse/Hebrew', now()),
  ('Astrid', 'Astrid', 'female', 32, 'Viking Age', 'Divine strength, god-beautiful', 'Old Norse', now()),
  ('Birger', 'Birger', 'male', 22, 'Medieval', 'Helper, protector', 'Old Norse', now()),
  ('Bengt', 'Benedict', 'male', 16, 'Medieval', 'Blessed (Nordic form)', 'Latin/Old Norse', now()),
  ('Adils', 'Adils', 'male', 4, 'Migration Period', 'Noble-fame', 'Old Norse', now()),
  ('Domalde', 'Domalde', 'male', 2, 'Migration Period', 'Judgment-ruler', 'Old Norse', now()),
  ('Domar', 'Domar', 'male', 3, 'Migration Period', 'Judge, lawgiver', 'Old Norse', now()),

  -- Additional authentic Viking names that appear in sources
  ('Åke', 'Ake', 'male', 19, 'Viking Age', 'Ancestor, forebear', 'Old Norse', now()),
  ('Algot', 'Algot', 'male', 12, 'Viking Age', 'All-Goth, ruler of Goths', 'Old Norse', now()),
  ('Botulf', 'Botulf', 'male', 7, 'Viking Age', 'Battle-wolf', 'Old Norse', now()),
  ('Fastulf', 'Fastulf', 'male', 5, 'Viking Age', 'Firm-wolf', 'Old Norse', now()),
  ('Germund', 'Germund', 'male', 8, 'Viking Age', 'Spear-protection', 'Old Norse', now()),
  ('Halvdan', 'Halfdan', 'male', 21, 'Viking Age', 'Half-Dane', 'Old Norse', now()),
  ('Holmger', 'Holmger', 'male', 6, 'Viking Age', 'Island-spear', 'Old Norse', now()),
  ('Ingemar', 'Ingemar', 'male', 17, 'Viking Age', 'Ing-famous', 'Old Norse', now()),
  ('Kolbjörn', 'Kolbjorn', 'male', 9, 'Viking Age', 'Coal-bear, dark bear', 'Old Norse', now()),
  ('Ljot', 'Ljot', 'male', 4, 'Viking Age', 'Light, bright', 'Old Norse', now()),
  ('Östen', 'Osten', 'male', 11, 'Viking Age', 'East-stone', 'Old Norse', now()),
  ('Ragnfast', 'Ragnfast', 'male', 5, 'Viking Age', 'Council-firm', 'Old Norse', now()),
  ('Sigtrygg', 'Sigtrygg', 'male', 8, 'Viking Age', 'Victory-true', 'Old Norse', now()),
  ('Styrbjörn', 'Styrbjorn', 'male', 6, 'Viking Age', 'Tumult-bear', 'Old Norse', now()),
  ('Toke', 'Toke', 'male', 13, 'Viking Age', 'Thunder-god (diminutive)', 'Old Norse', now()),
  ('Ödger', 'Odger', 'male', 7, 'Viking Age', 'Wealth-spear', 'Old Norse', now()),
  
  -- Female names from royal/noble sources
  ('Estrid', 'Estrid', 'female', 15, 'Viking Age', 'East-rider, beautiful rider', 'Old Norse', now()),
  ('Gunhild', 'Gunhild', 'female', 24, 'Viking Age', 'War-battle', 'Old Norse', now()),
  ('Ragnhild', 'Ragnhild', 'female', 18, 'Viking Age', 'Council-battle', 'Old Norse', now()),
  ('Sigrid', 'Sigrid', 'female', 41, 'Viking Age', 'Victory-rider', 'Old Norse', now()),
  ('Thora', 'Thora', 'female', 16, 'Viking Age', 'Thor-woman', 'Old Norse', now()),
  ('Ulfhild', 'Ulfhild', 'female', 9, 'Viking Age', 'Wolf-battle', 'Old Norse', now())

ON CONFLICT (name) DO UPDATE SET
  frequency = GREATEST(viking_names.frequency, EXCLUDED.frequency),
  updated_at = now();

-- Update statistics for the new names
UPDATE viking_names 
SET updated_at = now() 
WHERE created_at >= now() - interval '1 minute';