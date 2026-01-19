-- Update existing Närke runestones with accurate coordinates
UPDATE runic_inscriptions SET coordinates = POINT(14.9714, 59.1656), location = 'Väsby', parish = 'Kräcklinge socken' WHERE signum = 'Nä 8' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.5252, 59.1643), location = 'Tälje bro, Odensbacken', parish = 'Askers socken' WHERE signum = 'Nä 11' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.5029, 59.2122) WHERE signum = 'Nä 12' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.503, 59.2123) WHERE signum = 'Nä 13' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.4195, 59.2155), location = 'Bärsta, Rönneberga' WHERE signum = 'Nä 14' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.5768, 59.2044), location = 'Åsby' WHERE signum = 'Nä 15' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.2208, 59.3422), location = 'Kumla by' WHERE signum = 'Nä 18' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.0678, 59.1985) WHERE signum = 'Nä 19' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(14.973, 59.2064), location = 'Granhammarskyrkan' WHERE signum = 'Nä 20' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.4021, 59.3193) WHERE signum = 'Nä 23' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.4026, 59.319) WHERE signum = 'Nä 27' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.3986, 59.3545), location = 'Apelboda' WHERE signum = 'Nä 29' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.6601, 59.3738), location = 'Urvalla, Runeberg' WHERE signum = 'Nä 32' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.3376, 59.3142) WHERE signum = 'Nä 33' AND landscape = 'Närke';

UPDATE runic_inscriptions SET coordinates = POINT(15.3535, 59.3314), location = 'Nasta', alternative_signum = ARRAY['L 1030', 'B 768'] WHERE signum = 'Nä 34' AND landscape = 'Närke';

-- Insert missing Närke runestones
INSERT INTO runic_inscriptions (
    signum, name, location, parish, landscape, country, coordinates, 
    alternative_signum, transliteration, translation_en, object_type, material, created_at, updated_at
) VALUES 
-- Nä 10 - Mariedamm brakteat
('Nä 10', 'Mariedamm', 'Mariedamm', 'Lerbäcks socken', 'Närke', 'Sverige', 
 POINT(15.1642, 58.8517), ARRAY['Ög 178B', 'IK 377,2'], 
 'tuwa tuwa · fuþarkgw : hnijïpzs : tbemlŋod', 
 'Tow, tow. <fuþarkgw hnijïpzs tbemlŋod>', 'brakteat', 'guld', now(), now()),

-- Nä 16 - Ormesta fragment
('Nä 16', 'Ormesta', 'Ormesta, Hageborg', 'Örebro', 'Närke', 'Sverige', 
 POINT(15.2781, 59.252), ARRAY[]::text[], 
 '…li : lit : resa : eftiʀ : f…', 
 '… had … raised in memory of …', 'fragment', 'grå sandsten', now(), now()),

-- Nä 17 - Ormesta nonsens
('Nä 17', 'Ormesta', 'Ormesta, Hageborg', 'Örebro', 'Närke', 'Sverige', 
 POINT(15.2781, 59.252), ARRAY[]::text[], 
 '…', '…', 'runsten', 'gråröd sandsten', now(), now()),

-- Nä 21 - Glanshammars kyrka ornamental
('Nä 21', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.4019, 59.3192), ARRAY[]::text[], 
 NULL, NULL, 'gravhäll', 'ljus kalksten', now(), now()),

-- Nä 22 - Glanshammars kyrka fragment
('Nä 22', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.4019, 59.3192), ARRAY[]::text[], 
 '…(n)r-…', '…', 'gravhäll', 'kalksten', now(), now()),

-- Nä 24 - Glanshammars kyrka wood
('Nä 24', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.4015, 59.3193), ARRAY[]::text[], 
 'tiu i', '<tiu i>', 'planka', 'ek', now(), now()),

-- Nä 25 - Glanshammars kyrka (lost)
('Nä 25', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.4019, 59.3192), ARRAY['L 1026'], 
 '[…ur iuh : iuna : -…]', '… cut(?) the runes(?) …', 'fragment', 'sten', now(), now()),

-- Nä 28 - Glanshammars kyrka (lost)
('Nä 28', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.4019, 59.3192), ARRAY['L 1028'], 
 '[suen : let : rita : stin : eftir faþur : sin : kunuat · …ta hrulauhar : kuþ : hialbi : sal : hans -þulfri]', 
 'Sveinn had the stone erected in memory of his father Gunnhvatr, Hróðlaug''s husbandman. May God help his soul. Igulfriðr(?)', 'runsten', 'sten', now(), now()),

-- Nä 30 - Äversta fragments
('Nä 30', 'Äversta', 'Äversta', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.3913, 59.3332), ARRAY[]::text[], 
 '§A …sin · stih… §B …(f)t… …---… …(m) §C ---… …--…', 
 '§A … §B … §C …', 'fragment', 'granit', now(), now()),

-- Modern finds
-- Nä FBB1978;69 - Glanshammars kyrka ornamental
('Nä FBB1978;69', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammars socken', 'Närke', 'Sverige', 
 POINT(15.4019, 59.3192), ARRAY[]::text[], 
 NULL, NULL, 'ristad sten', 'gråblå kalksten', now(), now()),

-- Nä Fv1979;234 - Örebro wooden bowl
('Nä Fv1979;234', 'Örebro', 'Örebro, kv. Bromsgården', 'Örebro', 'Närke', 'Sverige', 
 POINT(15.212, 59.2712), ARRAY[]::text[], 
 'sator ¶ ar(æ)po ¶ tænæt', 
 'Sator, Arepo, Tenet (= from the ''Devil''s Square'' palindrome: Sator, Arepo, Tenet, Opera, Rotas)', 'laggskål', 'trä', now(), now()),

-- Nä Fv1992;153 - Örebro wooden bowl fragment
('Nä Fv1992;153', 'Örebro', 'Örebro, kv. Tryckeriet 10', 'Örebro', 'Närke', 'Sverige', 
 POINT(15.2133, 59.271), ARRAY[]::text[], 
 '--(m)--(o)', '…', 'laggskål', 'trä', now(), now()),

-- Nä NOR1995;18 - Ekeby kyrka ornamental
('Nä NOR1995;18', 'Ekeby kyrka', 'Ekeby kyrka', 'Ekeby socken', 'Närke', 'Sverige', 
 POINT(15.2719, 59.166), ARRAY[]::text[], 
 NULL, NULL, 'gavelhäll', 'kalksten', now(), now());