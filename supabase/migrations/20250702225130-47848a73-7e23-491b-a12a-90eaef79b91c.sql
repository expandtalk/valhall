-- Add missing Viking Age names from carvers and historical kings to viking_names table
-- This enriches the database with authentic historical names

INSERT INTO viking_names (name, gender, meaning, etymology, historical_info, frequency, regions)
VALUES
  -- High-frequency carver names (these are historically attested craftsmen)
  ('Alrik', 'male', 'All-ruler, ruler of all', 'Old Norse: all + ríkr (ruler)', 'Attested runestone carver name from 11th century', 12, ARRAY['Uppland']),
  ('Äsbjörn', 'male', 'God-bear, divine bear', 'Old Norse: áss (god) + björn (bear)', 'Multiple runestone carver attestations', 15, ARRAY['Uppland', 'Södermanland']),
  ('Äskil', 'male', 'God-kettle, sacred vessel', 'Old Norse: áss (god) + ketill (kettle)', 'Known runestone carver name', 11, ARRAY['Uppland']),
  ('Amunde', 'male', 'Awe-protection, fearsome protector', 'Old Norse: agi (awe) + mundr (protection)', 'Runestone carver from Uppland', 8, ARRAY['Uppland']),
  ('Ärnfast', 'male', 'Eagle-firm, steadfast eagle', 'Old Norse: ǫrn (eagle) + fastr (firm)', 'Professional runestone carver', 7, ARRAY['Uppland']),
  ('Arbjörn', 'male', 'Eagle-bear', 'Old Norse: ǫrn (eagle) + björn (bear)', 'Skilled craftsman name', 9, ARRAY['Uppland', 'Västmanland']),
  ('Ärnmund', 'male', 'Eagle-protection', 'Old Norse: ǫrn (eagle) + mundr (protection)', 'Carver known from inscriptions', 6, ARRAY['Uppland']),
  ('Åsbjörn', 'male', 'God-bear (variant)', 'Old Norse: áss (god) + björn (bear)', 'Alternative spelling of Äsbjörn', 13, ARRAY['Uppland', 'Västergötland']),
  ('Åsgöt', 'male', 'God-Goth, divine Goth', 'Old Norse: áss (god) + gautr (Goth)', 'Regional carver name', 5, ARRAY['Götland']),
  ('Äsger', 'male', 'God-spear, divine spear', 'Old Norse: áss (god) + geirr (spear)', 'Warrior-craftsman name', 8, ARRAY['Uppland']),
  ('Anund', 'male', 'Ancestor-spirit', 'Old Norse: ǫnd (spirit, breath)', 'Royal and carver name', 14, ARRAY['Uppland', 'Västergötland']),
  ('Åfrid', 'male', 'Ancestor-peace', 'Old Norse: afi (ancestor) + friðr (peace)', 'Peaceful craftsman name', 4, ARRAY['Uppland']),
  ('Alver', 'male', 'Elf-warrior', 'Old Norse: álfr (elf) + herr (army)', 'Mythological-inspired name', 3, ARRAY['Värmland']),
  ('Árni', 'male', 'Eagle (Icelandic form)', 'Old Norse: ǫrn (eagle)', 'Nordic variant of Arne', 6, ARRAY['Iceland', 'Norway']),

  -- Royal and noble names from historical_kings  
  ('Birger', 'male', 'Helper, protector', 'Old Norse: bjarga (to help, protect)', 'Medieval royal dynasty name', 22, ARRAY['Uppland', 'Östergötland']),
  ('Bengt', 'male', 'Blessed (Nordic form)', 'Latin benedictus via Old Norse', 'Christianized royal name', 16, ARRAY['Uppland']),
  ('Adils', 'male', 'Noble-fame', 'Old Norse: aðal (noble) + famous', 'Legendary king of the Svear', 4, ARRAY['Uppland']),
  ('Domalde', 'male', 'Judgment-ruler', 'Old Norse: dómr (judgment) + valdr (ruler)', 'Mythical Swedish king', 2, ARRAY['Uppland']),
  ('Domar', 'male', 'Judge, lawgiver', 'Old Norse: dómari (judge)', 'Legendary lawgiving king', 3, ARRAY['Uppland']),

  -- Additional authentic Viking names from various sources
  ('Åke', 'male', 'Ancestor, forebear', 'Old Norse: afi (ancestor)', 'Common noble name', 19, ARRAY['Uppland', 'Västergötland']),
  ('Algot', 'male', 'All-Goth, ruler of Goths', 'Old Norse: allr (all) + gautr (Goth)', 'Regional ruler name', 12, ARRAY['Västergötland']),
  ('Botulf', 'male', 'Battle-wolf', 'Old Norse: bot (remedy) + úlfr (wolf)', 'Warrior saint name', 7, ARRAY['Norway']),
  ('Fastulf', 'male', 'Firm-wolf', 'Old Norse: fastr (firm) + úlfr (wolf)', 'Steadfast warrior name', 5, ARRAY['Västergötland']),
  ('Germund', 'male', 'Spear-protection', 'Old Norse: geirr (spear) + mundr (protection)', 'Weapon-master name', 8, ARRAY['Uppland']),
  ('Halvdan', 'male', 'Half-Dane', 'Old Norse: hálfr (half) + danr (Dane)', 'Famous royal lineage', 21, ARRAY['Denmark', 'Norway']),
  ('Holmger', 'male', 'Island-spear', 'Old Norse: holmr (island) + geirr (spear)', 'Seafaring warrior', 6, ARRAY['Uppland']),
  ('Ingemar', 'male', 'Ing-famous', 'Old Norse: Yngvi (god) + marr (famous)', 'Divine-blessed name', 17, ARRAY['Uppland', 'Småland']),
  ('Kolbjörn', 'male', 'Coal-bear, dark bear', 'Old Norse: kol (charcoal) + björn (bear)', 'Dark-featured warrior', 9, ARRAY['Uppland']),
  ('Ljot', 'male', 'Light, bright', 'Old Norse: ljótr (light, ugly)', 'Paradoxical Viking name', 4, ARRAY['Norway']),
  ('Östen', 'male', 'East-stone', 'Old Norse: austr (east) + steinn (stone)', 'Directional memorial name', 11, ARRAY['Uppland', 'Södermanland']),
  ('Ragnfast', 'male', 'Council-firm', 'Old Norse: regin (council) + fastr (firm)', 'Wise counselor name', 5, ARRAY['Uppland']),
  ('Sigtrygg', 'male', 'Victory-true', 'Old Norse: sigr (victory) + tryggr (true)', 'Faithful warrior', 8, ARRAY['Denmark']),
  ('Styrbjörn', 'male', 'Tumult-bear', 'Old Norse: styrr (tumult) + björn (bear)', 'Battle-fierce name', 6, ARRAY['Uppland']),
  ('Toke', 'male', 'Thunder-god (diminutive)', 'Old Norse: Þórr (Thor)', 'Familiar form of Thor', 13, ARRAY['Denmark', 'Uppland']),
  ('Ödger', 'male', 'Wealth-spear', 'Old Norse: auðr (wealth) + geirr (spear)', 'Prosperous warrior', 7, ARRAY['Uppland']),
  
  -- Female names from royal/noble sources  
  ('Estrid', 'female', 'East-rider, beautiful rider', 'Old Norse: austr (east) + fríðr (beautiful)', 'Royal female name', 15, ARRAY['Denmark', 'Uppland']),
  ('Gunhild', 'female', 'War-battle', 'Old Norse: gunnr (war) + hildr (battle)', 'Warrior queen name', 26, ARRAY['Denmark', 'Norway']),
  ('Ragnhild', 'female', 'Council-battle', 'Old Norse: regin (council) + hildr (battle)', 'Wise battle-maiden', 18, ARRAY['Norway', 'Uppland']),
  ('Thora', 'female', 'Thor-woman', 'Old Norse: Þórr (Thor) + female ending', 'Female form of Thor', 16, ARRAY['Norway', 'Iceland']),
  ('Ulfhild', 'female', 'Wolf-battle', 'Old Norse: úlfr (wolf) + hildr (battle)', 'Fierce female warrior', 9, ARRAY['Uppland'])

ON CONFLICT (name) DO UPDATE SET
  frequency = GREATEST(viking_names.frequency, EXCLUDED.frequency),
  updated_at = now();