-- Uppdatera runstenar med namn och ortsinformation från listan
-- Uppland runstenar
UPDATE runic_inscriptions SET 
  name = 'Altunastenen',
  name_en = 'Altuna Stone',
  location = 'Altuna socken'
WHERE signum = 'U 1161';

UPDATE runic_inscriptions SET 
  name = 'Bogesundsstenen',
  name_en = 'Bogesund Stone',
  location = 'Östra Ryds socken, Vaxholm'
WHERE signum = 'U 170';

UPDATE runic_inscriptions SET 
  name = 'Brodds sten',
  name_en = 'Brodd''s Stone',
  location = 'Norrtälje'
WHERE signum = 'U 530';

UPDATE runic_inscriptions SET 
  name = 'Brostenen',
  name_en = 'Bro Stone',
  also_known_as = ARRAY['Assurs sten'],
  location = 'Bro socken'
WHERE signum = 'U 617';

UPDATE runic_inscriptions SET 
  name = 'Bökstastenen',
  name_en = 'Böksta Stone',
  location = 'Balingsta socken'
WHERE signum = 'U 855';

UPDATE runic_inscriptions SET 
  name = 'Eggebystenen',
  name_en = 'Eggeby Stone',
  location = 'Spånga socken'
WHERE signum = 'U 69';

UPDATE runic_inscriptions SET 
  name = 'Flyttblocket i Ed',
  name_en = 'Ed Moving Block',
  location = 'Eds socken'
WHERE signum = 'U 112';

UPDATE runic_inscriptions SET 
  name = 'Gerlögs runa',
  name_en = 'Gerlög''s Rune',
  location = 'Hilleshögs socken'
WHERE signum = 'U 29';

UPDATE runic_inscriptions SET 
  name = 'Gliastenen',
  name_en = 'Glia Stone',
  location = 'Bromma socken'
WHERE signum = 'U 56';

UPDATE runic_inscriptions SET 
  name = 'Granbyhällen',
  name_en = 'Granby Rock',
  location = 'Orkesta socken'
WHERE signum = 'U 337';

UPDATE runic_inscriptions SET 
  name = 'Gullbrostenarna',
  name_en = 'Gullbro Stones',
  location = 'Vallentuna socken'
WHERE signum IN ('U 236', 'U 237', 'U 238');

UPDATE runic_inscriptions SET 
  name = 'Hovgårdsstenen',
  name_en = 'Hovgård Stone',
  also_known_as = ARRAY['Håkansstenen'],
  location = 'Adelsö socken'
WHERE signum = 'U 11';

UPDATE runic_inscriptions SET 
  name = 'Hårbystenen',
  name_en = 'Hårby Stone',
  location = 'Husby-Sjutolfts socken'
WHERE signum = 'U 746';

UPDATE runic_inscriptions SET 
  name = 'Hanstastenarna',
  name_en = 'Hansta Stones',
  location = 'Spånga socken'
WHERE signum IN ('U 72', 'U 73');