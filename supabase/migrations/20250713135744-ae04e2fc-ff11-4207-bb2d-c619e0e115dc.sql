-- Uppdatera fler viktiga runstenar med namn från listan
-- Västmanland
UPDATE runic_inscriptions SET 
  name = 'Anundshögsstenen',
  name_en = 'Anundshög Stone',
  also_known_as = ARRAY['Anundstenen'],
  location = 'Badelunda socken'
WHERE signum = 'Vs 13';

UPDATE runic_inscriptions SET 
  name = 'Odendisastenen',
  name_en = 'Odendisa Stone',
  location = 'Fläckebo socken'
WHERE signum = 'Vs 24';

-- Östergötland  
UPDATE runic_inscriptions SET 
  name = 'Bjälbostenen',
  name_en = 'Bjälbo Stone',
  location = 'Bjälbo kyrka, Bjälbo socken'
WHERE signum = 'Ög 64';

UPDATE runic_inscriptions SET 
  name = 'Högbystenen',
  name_en = 'Högby Stone',
  location = 'Högby kyrka, Högby socken'
WHERE signum = 'Ög 81';

UPDATE runic_inscriptions SET 
  name = 'Kagahällen',
  name_en = 'Kaga Rock',
  location = 'Kaga socken'
WHERE signum = 'Ög 102';

UPDATE runic_inscriptions SET 
  name = 'Slakastenen',
  name_en = 'Slaka Stone',
  location = 'Slaka kyrka, Slaka socken'
WHERE signum = 'Ög 117';

UPDATE runic_inscriptions SET 
  name = 'Ledbergsstenen',
  name_en = 'Ledberg Stone',
  location = 'Ledbergs socken'
WHERE signum = 'Ög 181';

-- Södermanland
UPDATE runic_inscriptions SET 
  name = 'Bjudbystenen',
  name_en = 'Bjudby Stone',
  location = 'Blacksta socken'
WHERE signum = 'Sö 54';

UPDATE runic_inscriptions SET 
  name = 'Fyrbyblocket',
  name_en = 'Fyrby Block',
  location = 'Blacksta socken'
WHERE signum = 'Sö 56';

UPDATE runic_inscriptions SET 
  name = 'Fagerlötblocket',
  name_en = 'Fagerlöt Block',
  location = 'Bogsta socken'
WHERE signum = 'Sö 126';

UPDATE runic_inscriptions SET 
  name = 'Aspöstenen',
  name_en = 'Aspö Stone',
  location = 'Aspö kyrka, Aspö socken'
WHERE signum = 'Sö 174';

UPDATE runic_inscriptions SET 
  name = 'Bergaholmsstenen',
  name_en = 'Bergaholm Stone',
  location = 'Salems socken'
WHERE signum = 'Sö 302';

UPDATE runic_inscriptions SET 
  name = 'Bornöstenen',
  name_en = 'Bornö Stone',
  location = 'Salems socken'
WHERE signum = 'Sö 303';

UPDATE runic_inscriptions SET 
  name = 'Oxelbystenen',
  name_en = 'Oxelby Stone',
  location = 'Salems socken'
WHERE signum = 'Sö 304';