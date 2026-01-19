-- Add missing Viking Age names from carvers and historical kings to viking_names table
-- This enriches the database with authentic historical names

INSERT INTO viking_names (name, gender, frequency, meaning, etymology, historical_info, created_at)
VALUES
  -- High-frequency carver names (these are historically attested craftsmen)
  ('Alrik', 'male', 12, 'All-ruler, ruler of all', 'Old Norse: all + ríkr (ruler)', 'Attested runestone carver name from 11th century'),
  ('Äsbjörn', 'male', 15, 'God-bear, divine bear', 'Old Norse: áss (god) + björn (bear)', 'Multiple runestone carver attestations'),
  ('Äskil', 'male', 11, 'God-kettle, sacred vessel', 'Old Norse: áss (god) + ketill (kettle)', 'Known runestone carver name'),
  ('Amunde', 'male', 8, 'Awe-protection, fearsome protector', 'Old Norse: agi (awe) + mundr (protection)', 'Runestone carver from Uppland'),
  ('Ärnfast', 'male', 7, 'Eagle-firm, steadfast eagle', 'Old Norse: ǫrn (eagle) + fastr (firm)', 'Professional runestone carver'),
  ('Arbjörn', 'male', 9, 'Eagle-bear', 'Old Norse: ǫrn (eagle) + björn (bear)', 'Skilled craftsman name'),
  ('Ärnmund', 'male', 6, 'Eagle-protection', 'Old Norse: ǫrn (eagle) + mundr (protection)', 'Carver known from inscriptions'),
  ('Åsbjörn', 'male', 13, 'God-bear (variant)', 'Old Norse: áss (god) + björn (bear)', 'Alternative spelling of Äsbjörn'),
  ('Åsgöt', 'male', 5, 'God-Goth, divine Goth', 'Old Norse: áss (god) + gautr (Goth)', 'Regional carver name'),
  ('Äsger', 'male', 8, 'God-spear, divine spear', 'Old Norse: áss (god) + geirr (spear)', 'Warrior-craftsman name'),
  ('Anund', 'male', 14, 'Ancestor-spirit', 'Old Norse: ǫnd (spirit, breath)', 'Royal and carver name'),
  ('Åfrid', 'male', 4, 'Ancestor-peace', 'Old Norse: afi (ancestor) + friðr (peace)', 'Peaceful craftsman name'),
  ('Alver', 'male', 3, 'Elf-warrior', 'Old Norse: álfr (elf) + herr (army)', 'Mythological-inspired name'),
  ('Árni', 'male', 6, 'Eagle (Icelandic form)', 'Old Norse: ǫrn (eagle)', 'Nordic variant of Arne'),

  -- Royal and noble names from historical_kings
  ('Astrid', 'female', 35, 'Divine strength, god-beautiful', 'Old Norse: áss (god) + fríðr (beautiful)', 'Royal queen name, multiple attestations'),
  ('Birger', 'male', 22, 'Helper, protector', 'Old Norse: bjarga (to help, protect)', 'Medieval royal dynasty name'),
  ('Bengt', 'male', 16, 'Blessed (Nordic form)', 'Latin benedictus via Old Norse', 'Christianized royal name'),
  ('Adils', 'male', 4, 'Noble-fame', 'Old Norse: aðal (noble) + famous', 'Legendary king of the Svear'),
  ('Domalde', 'male', 2, 'Judgment-ruler', 'Old Norse: dómr (judgment) + valdr (ruler)', 'Mythical Swedish king'),
  ('Domar', 'male', 3, 'Judge, lawgiver', 'Old Norse: dómari (judge)', 'Legendary lawgiving king'),

  -- Additional authentic Viking names from various sources
  ('Åke', 'male', 19, 'Ancestor, forebear', 'Old Norse: afi (ancestor)', 'Common noble name'),
  ('Algot', 'male', 12, 'All-Goth, ruler of Goths', 'Old Norse: allr (all) + gautr (Goth)', 'Regional ruler name'),
  ('Botulf', 'male', 7, 'Battle-wolf', 'Old Norse: bot (remedy) + úlfr (wolf)', 'Warrior saint name'),
  ('Fastulf', 'male', 5, 'Firm-wolf', 'Old Norse: fastr (firm) + úlfr (wolf)', 'Steadfast warrior name'),
  ('Germund', 'male', 8, 'Spear-protection', 'Old Norse: geirr (spear) + mundr (protection)', 'Weapon-master name'),
  ('Halvdan', 'male', 21, 'Half-Dane', 'Old Norse: hálfr (half) + danr (Dane)', 'Famous royal lineage'),
  ('Holmger', 'male', 6, 'Island-spear', 'Old Norse: holmr (island) + geirr (spear)', 'Seafaring warrior'),
  ('Ingemar', 'male', 17, 'Ing-famous', 'Old Norse: Yngvi (god) + marr (famous)', 'Divine-blessed name'),
  ('Kolbjörn', 'male', 9, 'Coal-bear, dark bear', 'Old Norse: kol (charcoal) + björn (bear)', 'Dark-featured warrior'),
  ('Ljot', 'male', 4, 'Light, bright', 'Old Norse: ljótr (light, ugly)', 'Paradoxical Viking name'),
  ('Östen', 'male', 11, 'East-stone', 'Old Norse: austr (east) + steinn (stone)', 'Directional memorial name'),
  ('Ragnfast', 'male', 5, 'Council-firm', 'Old Norse: regin (council) + fastr (firm)', 'Wise counselor name'),
  ('Sigtrygg', 'male', 8, 'Victory-true', 'Old Norse: sigr (victory) + tryggr (true)', 'Faithful warrior'),
  ('Styrbjörn', 'male', 6, 'Tumult-bear', 'Old Norse: styrr (tumult) + björn (bear)', 'Battle-fierce name'),
  ('Toke', 'male', 13, 'Thunder-god (diminutive)', 'Old Norse: Þórr (Thor)', 'Familiar form of Thor'),
  ('Ödger', 'male', 7, 'Wealth-spear', 'Old Norse: auðr (wealth) + geirr (spear)', 'Prosperous warrior'),
  
  -- Female names from royal/noble sources  
  ('Estrid', 'female', 15, 'East-rider, beautiful rider', 'Old Norse: austr (east) + fríðr (beautiful)', 'Royal female name'),
  ('Gunhild', 'female', 26, 'War-battle', 'Old Norse: gunnr (war) + hildr (battle)', 'Warrior queen name'),
  ('Ragnhild', 'female', 18, 'Council-battle', 'Old Norse: regin (council) + hildr (battle)', 'Wise battle-maiden'),
  ('Thora', 'female', 16, 'Thor-woman', 'Old Norse: Þórr (Thor) + female ending', 'Female form of Thor'),
  ('Ulfhild', 'female', 9, 'Wolf-battle', 'Old Norse: úlfr (wolf) + hildr (battle)', 'Fierce female warrior')

ON CONFLICT (name) DO UPDATE SET
  frequency = GREATEST(viking_names.frequency, EXCLUDED.frequency),
  updated_at = now();

-- Update statistics
UPDATE viking_names 
SET updated_at = now() 
WHERE created_at >= now() - interval '1 minute';