
-- Skapa Bjälboätten-dynastin
INSERT INTO royal_dynasties (name, name_en, description, period_start, period_end, region)
SELECT 'Bjälboätten', 'Bjälbo Dynasty', 'Även känd som Folkungaätten. Mäktig svensk dynasti som härstammade från jarlar och blev kungar. Grundade Stockholm och moderniserade Sverige.', 1200, 1380, 'Sweden'
WHERE NOT EXISTS (SELECT 1 FROM royal_dynasties WHERE name = 'Bjälboätten');

-- Uppdatera alla Bjälboätten-kungar med korrekt dynasty_id nu när dynastin finns
UPDATE historical_kings 
SET dynasty_id = (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1)
WHERE name IN (
  'Valdemar Birgersson', 'Magnus Ladulås', 'Birger Magnusson', 'Magnus Eriksson', 
  'Håkan Magnusson', 'Erik Magnusson', 'Ragnhild', 'Ingegärd Birgersdotter', 
  'Katarina Sunesdotter', 'Folke Filbyter', 'Ingevald Folkesson', 'Folke den tjocke', 
  'Bengt snivil', 'Magnus Minnesköld', 'Karl Döve', 'Eskil Magnusson', 
  'Karl Magnusson', 'Bengt Magnusson', 'Erik Birgersson', 'Bengt Birgersson', 
  'Valdemar Magnusson', 'Olof III'
);
