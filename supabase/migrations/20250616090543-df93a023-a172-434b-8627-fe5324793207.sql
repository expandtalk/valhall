
-- Lägg till sagokungar från Ynglingaätten och andra legendära gestalter
INSERT INTO historical_kings (name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions) VALUES
-- Ynglingaätten (rena sagokungar)
('Fjölner', ARRAY['Fjolnir'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som enligt sagan drunknade i mjödfatet på Frodes gård.', false, false),
('Svegder', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som enligt sagan gick in i en sten och försvann.', false, false),
('Vanlande', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som enligt sagan dödades av maran.', false, false),
('Visbur', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som dödades av sina egna söner.', false, false),
('Domalde', ARRAY['Dómaldr'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som offrades för goda skördar.', false, false),
('Domar', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten känd för rättvisa och lagstiftning.', false, false),
('Dyggve', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som dog av sjukdom.', false, false),
('Dag den vise', ARRAY['Dag'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten känd för sin visdom.', false, false),
('Agne', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som hängdes i sitt guldsmycke.', false, false),
('Erik och Alrik', ARRAY['Erik', 'Alrik'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendariska tvillingkungar från Ynglingaätten som dödade varandra.', false, false),
('Yngve och Alf', ARRAY['Yngve', 'Alf'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendariska tvillingkungar från Ynglingaätten, Alfs söner.', false, false),
('Jorund', NULL, (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som dödades i strid.', false, false),
('Aun den gamle', ARRAY['Aun', 'Áni'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som offrade sina söner för att förlänga sitt liv.', false, false),
('Egil Vendelkråka', ARRAY['Egil'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten, far till Ottar Vendelkråka.', false, false),
('Bröt-Anund', ARRAY['Anund'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som byggde vägar och broar.', false, false),
('Ingjald Illråde', ARRAY['Ingjald'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som brände in sina vasaller.', false, false),
('Olof Trätälja', ARRAY['Olaf'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten som rödde skog för odling.', false, false),
('Halvdan Vitben', ARRAY['Halfdan'], (SELECT id FROM royal_dynasties WHERE name = 'Ynglingaätten' LIMIT 1), NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från Ynglingaätten, far till Harald Granskog.', false, false),

-- Möjligen historiska sagokungar
('Ottar Vendelkråka', ARRAY['Ottar', 'Ohthere'], NULL, 515, 530, 'legendary', 'Sweden', 'Möjligen historisk kung som nämns i både Beowulf och Ynglingatal som oberoende källor.', false, false),
('Adils den mäktige', ARRAY['Adils', 'Eadgils'], NULL, 530, 575, 'legendary', 'Sweden', 'Möjligen historisk kung som nämns i både Beowulf och Ynglingatal som oberoende källor.', false, false),
('Hugleik', ARRAY['Hygelac', 'Chlochilaichus'], NULL, 510, 520, 'legendary', 'Sweden', 'Möjligen samma person som Hygelac i Beowulf och Chlochilaichus hos Gregorius av Tours. Troligen historisk gestalt från 510-talet.', false, false),

-- Andra sagokungar (osäkra men kända från sagorna)
('Harald Hildetand', ARRAY['Harald'], NULL, NULL, NULL, 'legendary', 'Denmark', 'Legendarisk dansk kung från sagorna, kan vara sagogestalt utan historisk grund.', false, false),
('Ivar Vidfamne', ARRAY['Ivar'], NULL, NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung som enligt sagorna erövrade stora delar av Norden.', false, false),
('Sigurd Ring', ARRAY['Sigurd'], NULL, NULL, NULL, 'legendary', 'Sweden', 'Legendarisk kung från sagorna, far till Ragnar Lodbrok enligt vissa källor.', false, false),
('Ragnar Lodbrok', ARRAY['Ragnar', 'Reginherus'], NULL, 840, 845, 'legendary', 'Denmark', 'Legendarisk vikingakung. Möjligen samma person som "Reginherus" som plundrade Paris 845, men detta är omtvistat.', false, false);

-- Skapa Ynglingaätten-dynastin om den inte finns
INSERT INTO royal_dynasties (name, name_en, description, period_start, period_end, region)
SELECT 'Ynglingaätten', 'Yngling Dynasty', 'Legendarisk svensk dynasti utan historisk grund, men central i nordisk sagotradition. Beskrivs i Ynglingasagan.', -100, 600, 'Sweden'
WHERE NOT EXISTS (SELECT 1 FROM royal_dynasties WHERE name = 'Ynglingaätten');
