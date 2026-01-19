-- Add missing Viking Age names from carvers and historical kings to viking_names table
-- First check what names already exist to avoid duplicates

-- Add the most important missing runestone carver names
INSERT INTO viking_names (name, gender, meaning, etymology, historical_info, frequency, regions)
SELECT * FROM (VALUES
  ('Alrik', 'male', 'All-ruler, ruler of all', 'Old Norse: all + ríkr (ruler)', 'Attested runestone carver name from 11th century', 12, ARRAY['Uppland']),
  ('Äsbjörn', 'male', 'God-bear, divine bear', 'Old Norse: áss (god) + björn (bear)', 'Multiple runestone carver attestations', 15, ARRAY['Uppland', 'Södermanland']),
  ('Äskil', 'male', 'God-kettle, sacred vessel', 'Old Norse: áss (god) + ketill (kettle)', 'Known runestone carver name', 11, ARRAY['Uppland']),
  ('Amunde', 'male', 'Awe-protection, fearsome protector', 'Old Norse: agi (awe) + mundr (protection)', 'Runestone carver from Uppland', 8, ARRAY['Uppland']),
  ('Ärnfast', 'male', 'Eagle-firm, steadfast eagle', 'Old Norse: ǫrn (eagle) + fastr (firm)', 'Professional runestone carver', 7, ARRAY['Uppland']),
  ('Arbjörn', 'male', 'Eagle-bear', 'Old Norse: ǫrn (eagle) + björn (bear)', 'Skilled craftsman name', 9, ARRAY['Uppland', 'Västmanland']),
  ('Anund', 'male', 'Ancestor-spirit', 'Old Norse: ǫnd (spirit, breath)', 'Royal and carver name', 14, ARRAY['Uppland', 'Västergötland']),
  ('Åke', 'male', 'Ancestor, forebear', 'Old Norse: afi (ancestor)', 'Common noble name', 19, ARRAY['Uppland', 'Västergötland']),
  ('Algot', 'male', 'All-Goth, ruler of Goths', 'Old Norse: allr (all) + gautr (Goth)', 'Regional ruler name', 12, ARRAY['Västergötland']),
  ('Birger', 'male', 'Helper, protector', 'Old Norse: bjarga (to help, protect)', 'Medieval royal dynasty name', 22, ARRAY['Uppland', 'Östergötland']),
  ('Halvdan', 'male', 'Half-Dane', 'Old Norse: hálfr (half) + danr (Dane)', 'Famous royal lineage', 21, ARRAY['Denmark', 'Norway']),
  ('Ingemar', 'male', 'Ing-famous', 'Old Norse: Yngvi (god) + marr (famous)', 'Divine-blessed name', 17, ARRAY['Uppland', 'Småland']),
  ('Östen', 'male', 'East-stone', 'Old Norse: austr (east) + steinn (stone)', 'Directional memorial name', 11, ARRAY['Uppland', 'Södermanland']),
  ('Toke', 'male', 'Thunder-god (diminutive)', 'Old Norse: Þórr (Thor)', 'Familiar form of Thor', 13, ARRAY['Denmark', 'Uppland']),
  ('Estrid', 'female', 'East-rider, beautiful rider', 'Old Norse: austr (east) + fríðr (beautiful)', 'Royal female name', 15, ARRAY['Denmark', 'Uppland']),
  ('Ragnhild', 'female', 'Council-battle', 'Old Norse: regin (council) + hildr (battle)', 'Wise battle-maiden', 18, ARRAY['Norway', 'Uppland']),
  ('Thora', 'female', 'Thor-woman', 'Old Norse: Þórr (Thor) + female ending', 'Female form of Thor', 16, ARRAY['Norway', 'Iceland'])
) AS new_names(name, gender, meaning, etymology, historical_info, frequency, regions)
WHERE NOT EXISTS (
  SELECT 1 FROM viking_names WHERE viking_names.name = new_names.name
);