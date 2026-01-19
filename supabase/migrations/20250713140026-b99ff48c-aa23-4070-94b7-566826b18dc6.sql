-- Danmark
UPDATE runic_inscriptions SET 
  name = 'Jellingestenarna',
  name_en = 'Jelling Stones',
  location = 'Jelling kyrka, Jylland'
WHERE signum IN ('DR 41', 'DR 42');

UPDATE runic_inscriptions SET 
  name = 'Dagstorpstenen',
  name_en = 'Dagstorp Stone',
  location = 'Dagstorps socken'
WHERE signum = 'DR 324';

UPDATE runic_inscriptions SET 
  name = 'Fosiestenen',
  name_en = 'Fosie Stone',
  location = 'Fosie socken'
WHERE signum = 'DR 262';

UPDATE runic_inscriptions SET 
  name = 'Björketorpsstenen',
  name_en = 'Björketorp Stone',
  location = 'Listerby socken'
WHERE signum = 'DR 360';

UPDATE runic_inscriptions SET 
  name = 'Halahultstenen',
  name_en = 'Halahult Stone',
  location = 'Åryds socken'
WHERE signum = 'DR 361';

UPDATE runic_inscriptions SET 
  name = 'Istabystenen',
  name_en = 'Istaby Stone',
  location = 'Mjällby socken'
WHERE signum = 'DR 359';

UPDATE runic_inscriptions SET 
  name = 'Stentoftenstenen',
  name_en = 'Stentoften Stone',
  location = 'Gammalstorps socken'
WHERE signum = 'DR 357';

UPDATE runic_inscriptions SET 
  name = 'Gummarpstenen',
  name_en = 'Gummarp Stone',
  location = 'Gammalstorps socken, förvarades i Köpenhamn, försvann 1728'
WHERE signum = 'DR 358';

-- Gästrikland  
UPDATE runic_inscriptions SET 
  name = 'Årsundastenen',
  name_en = 'Årsunda Stone',
  location = 'Årsunda kyrka, Årsunda socken'
WHERE signum = 'Gs 9';

-- Jämtland
UPDATE runic_inscriptions SET 
  name = 'Frösöstenen',
  name_en = 'Frösö Stone',
  location = 'Frösö socken'
WHERE signum = 'J Fv1954;22';

-- Fler viktiga Uppland stenar
UPDATE runic_inscriptions SET 
  name = 'Ingeborgsstenen',
  name_en = 'Ingeborg Stone',
  location = 'Ekerö socken'
WHERE signum = 'U 15';

UPDATE runic_inscriptions SET 
  name = 'Drävlestenen',
  name_en = 'Drävle Stone',
  also_known_as = ARRAY['en av Sigurdsristningar'],
  location = 'Altuna socken, Drävle'
WHERE signum = 'U 1163';

UPDATE runic_inscriptions SET 
  name = 'Dvärgstenen',
  name_en = 'Dwarf Stone',
  location = 'Skepptuna kyrka, Skepptuna socken'
WHERE signum = 'U 359';

UPDATE runic_inscriptions SET 
  name = 'Fällbrohällarna',
  name_en = 'Fällbro Rocks',
  location = 'Täby socken'
WHERE signum IN ('U 145', 'U 146');