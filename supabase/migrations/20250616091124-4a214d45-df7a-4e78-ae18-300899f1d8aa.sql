
-- Lägg till kungar och drottningar från Bjälboätten/Folkungaätten
INSERT INTO historical_kings (name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions) VALUES

-- Kungar från Bjälboätten
('Valdemar Birgersson', ARRAY['Valdemar'], (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), 1250, 1275, 'historical', 'Sweden', 'Kung av Sverige, son till Birger jarl. Första kungen från Bjälboätten.', true, false),

('Magnus Ladulås', ARRAY['Magnus III', 'Magnus Barnlock'], (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), 1275, 1290, 'historical', 'Sweden', 'Kung av Sverige, son till Birger jarl. Genomförde viktiga reformer och grundlade Sveriges makt.', true, false),

('Birger Magnusson', ARRAY['Birger'], (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), 1290, 1318, 'historical', 'Sweden', 'Kung av Sverige, son till Magnus Ladulås. Kom i konflikt med sina bröder.', true, false),

('Magnus Eriksson', ARRAY['Magnus IV', 'Magnus VII av Norge'], (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), 1319, 1364, 'historical', 'Sweden', 'Kung av både Sverige och Norge. Sista kungen från Bjälboätten. Omfattande myntprägning.', true, false),

('Håkan Magnusson', ARRAY['Håkan VI av Norge'], (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), 1362, 1380, 'historical', 'Norway', 'Kung av Norge, son till Magnus Eriksson. Sista manliga representanten för Bjälboätten.', true, false),

('Erik Magnusson', ARRAY['Erik hertog'], (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), 1356, 1359, 'historical', 'Sweden', 'Hertog och medkung, son till Magnus Eriksson. Kort regeringstid.', true, false),

-- Drottningar från Bjälboätten
('Ragnhild', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'disputed', 'Sweden', 'Möjlig drottning enligt teori av Sven Lagerbring. Historiciteten är omtvistad.', false, false),

('Ingegärd Birgersdotter', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Drottning från Bjälboätten, dotter till Birger jarl.', false, false),

('Katarina Sunesdotter', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Drottning från Bjälboätten. Gift med kung från dynastin.', false, false),

-- Tidigare släktmedlemmar (semi-legendära/osäkra)
('Folke Filbyter', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'semi_legendary', 'Sweden', 'Legendarisk stamfader till Folkungaätten. Historiciteten är osäker.', false, false),

('Ingevald Folkesson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'semi_legendary', 'Sweden', 'Son till Folke Filbyter enligt sagotradition. Historiciteten är osäker.', false, false),

('Folke den tjocke', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'semi_legendary', 'Sweden', 'Medlem av den tidiga Folkungaätten. Historiciteten är osäker.', false, false),

('Bengt snivil', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'semi_legendary', 'Sweden', 'Tidig medlem av Folkungaätten. Historiciteten är osäker.', false, false),

-- Jarlar som blev kungar
('Magnus Minnesköld', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Jarl och mäktig man från Bjälboätten, bror till Birger Brosa.', true, false),

('Karl Döve', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Medlem av Bjälboätten, bror till Magnus Minnesköld och Birger Brosa.', false, false),

('Eskil Magnusson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Son till Magnus Minnesköld, bror till Birger jarl.', false, false),

('Karl Magnusson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Son till Magnus Minnesköld, bror till Birger jarl.', false, false),

('Bengt Magnusson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Son till Magnus Minnesköld, bror till Birger jarl.', false, false),

-- Senare medlemmar
('Erik Birgersson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Son till Birger jarl, bror till Valdemar och Magnus Ladulås.', false, false),

('Bengt Birgersson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Son till Birger jarl, bror till kungarna Valdemar och Magnus Ladulås.', false, false),

('Valdemar Magnusson', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Son till Magnus Ladulås, bror till kung Birger Magnusson.', false, false),

('Olof III', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1), NULL, NULL, 'historical', 'Sweden', 'Senare medlem av Bjälboätten, son till Erik Magnusson.', true, false);

-- Uppdatera Birger jarl för att markera hans betydelse
UPDATE historical_kings 
SET description = 'Sveriges siste riksjarl och de facto härskare. Grundare av Stockholm och far till kungarna Valdemar och Magnus Ladulås. Bjälboättens mäktigaste gestalt.'
WHERE name = 'Birger Jarl';
