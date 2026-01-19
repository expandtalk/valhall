
-- Add Rurikid dynasty
INSERT INTO public.royal_dynasties (id, name, name_en, description, period_start, period_end, region, created_at, updated_at) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Rurikdynastin', 'Rurikid Dynasty', 'Nordisk/varjagisk dynasti som grundade och styrde Kievriket från Novgorod till Kiev', 862, 1240, 'Kievrus', now(), now());

-- Add the early Rurikid rulers with Nordic names and connections
INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
(gen_random_uuid(), 'Rurik', ARRAY['Rörik', 'Hrøríkr'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 862, 879, 'semi_legendary', 'Kievrus', 'Varjagisk hövding från Sverige, etablerade Novgorod 862. Möjligen samma person som Rorik av Dorestad', true, false, now(), now()),
(gen_random_uuid(), 'Oleg den Vise', ARRAY['Helge'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 879, 912, 'historical', 'Kievrus', 'Ruriks frände, regent för Igor. Erövrade Kiev 882 och grundade Kievriket genom att döda Askold och Dir', true, false, now(), now()),
(gen_random_uuid(), 'Igor', ARRAY['Ingvar'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 912, 945, 'historical', 'Kievrus', 'Ruriks son, attackerade Konstantinopel 941 och 944. Dödad av drevljanerna vid skatteinsamling', true, false, now(), now()),
(gen_random_uuid(), 'Olga den Fagra', ARRAY['Helga'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 945, 969, 'historical', 'Kievrus', 'Igors änka, regent för Svjatoslav. Döpt i Konstantinopel 955, hämnade sin mans död genom att förstöra drevljanernas huvudstad', true, false, now(), now()),
(gen_random_uuid(), 'Svjatoslav I', ARRAY['Svjatoslav'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 964, 972, 'historical', 'Kievrus', 'Krigarkung som expanderade riket österut och söderut. Nordiskt ursprung men mer slaviskt namn', true, false, now(), now()),
(gen_random_uuid(), 'Vladimir den Store', ARRAY['Valdemar'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 980, 1015, 'historical', 'Kievrus', 'Kristnade Kievriket 988, gift med Anna Porphyrogenita av Bysans och Rogned av Polotsk', true, true, now(), now()),
(gen_random_uuid(), 'Jaroslav den Vise', ARRAY['Jarisleif'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1019, 1054, 'historical', 'Kievrus', 'Gift med Ingegerd Olofsdotter av Sverige. Gav asyl åt Olof Haraldsson och Harald Hårdråde. Kievrikets höjdpunkt', true, true, now(), now()),
(gen_random_uuid(), 'Iziaslav I', ARRAY['Iziaslav'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1054, 1078, 'historical', 'Kievrus', 'Jaroslavs son, härskade över Kiev efter rikets uppdelning', true, false, now(), now()),
(gen_random_uuid(), 'Svjatoslav II', ARRAY['Svjatoslav'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1073, 1076, 'historical', 'Kievrus', 'Härskade över Tjernigov, del av rikets uppdelning efter Jaroslav', true, false, now(), now()),
(gen_random_uuid(), 'Vsevolod I', ARRAY['Vsevolod'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1078, 1093, 'historical', 'Kievrus', 'Härskade över Perejaslav, del av rikets uppdelning', true, false, now(), now()),
(gen_random_uuid(), 'Mstislav Harald', ARRAY['Harald'], 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1125, 1132, 'historical', 'Kievrus', 'Den siste betydande fursten i Kiev enligt nordiska källor. Efter hans död blev rikets uppdelning oåterkallelig', true, false, now(), now());

-- Add sources for Rurikid dynasty
INSERT INTO public.historical_sources (id, title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types, created_at, updated_at) VALUES
('66666666-6666-6666-6666-666666666666', 'Nestorkrönikan', 'Primary Chronicle', 'Nestor (tillskriven)', 1113, 862, 1110, 'primary', 'Fornkyrkoslaviska', 'Huvudkälla för tidig rysk historia och Rurikdynastin', ARRAY['christian_anti_pagan']::bias_type[], now(), now()),
('77777777-7777-7777-7777-777777777777', 'Nordiska sagakällor', 'Nordic Saga Sources', 'Olika sagaförfattare', 1200, 862, 1240, 'secondary', 'Fornnordiska', 'Snorre Sturlassons och andra nordiska källor om Gardarike och de ryska furstarna', ARRAY['temporal_distance']::bias_type[], now(), now()),
('88888888-8888-8888-8888-888888888888', 'Bysantinska källor', 'Byzantine Sources', 'Olika bysantinska kronister', 950, 860, 1100, 'primary', 'Grekiska', 'Bysantinska källor om Rus-attacker och diplomatiska kontakter', ARRAY['none']::bias_type[], now(), now());

-- Add source mentions for the Rurikid rulers
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  hk.id,
  source_data.source_id::uuid,
  source_data.mentioned_name,
  source_data.context,
  source_data.reliability_note,
  now()
FROM historical_kings hk
CROSS JOIN (
  VALUES 
    ('Rurik', '66666666-6666-6666-6666-666666666666', 'Рюрик', 'Grundare av dynastin, kallad från Sverige av slaverna och finnarna', 'Primär källa - Nestorkrönikans grundberättelse'),
    ('Oleg den Vise', '66666666-6666-6666-6666-666666666666', 'Олег Вещий', 'Regent som erövrade Kiev och grundade Kievriket', 'Primär källa - detaljerad beskrivning av Kievs erövring'),
    ('Igor', '66666666-6666-6666-6666-666666666666', 'Игорь', 'Ruriks son, anförde angrepp mot Konstantinopel', 'Primär källa - hans död beskrivs utförligt'),
    ('Olga den Fagra', '66666666-6666-6666-6666-666666666666', 'Ольга Святая', 'Igors änka, den första kristna furstinnan', 'Primär källa - hennes dop i Konstantinopel dokumenterat'),
    ('Vladimir den Store', '66666666-6666-6666-6666-666666666666', 'Владимир Святой', 'Kristnade Rus 988', 'Primär källa - kristnandeprocessen väl dokumenterad'),
    ('Jaroslav den Vise', '66666666-6666-6666-6666-666666666666', 'Ярослав Мудрый', 'Rikets höjdpunkt, lagstiftare', 'Primär källa - hans regeringstid väl dokumenterad'),
    ('Jaroslav den Vise', '77777777-7777-7777-7777-777777777777', 'Jarisleif', 'Gift med Ingegerd Olofsdotter, gav asyl åt norska kungar', 'Sekundär källa - nordiska äktenskapsförbindelser'),
    ('Vladimir den Store', '88888888-8888-8888-8888-888888888888', 'Βλαδίμηρος', 'Gift med Anna Porphyrogenita, kristnad 988', 'Primär källa - bysantinska källor om äktenskapet'),
    ('Igor', '88888888-8888-8888-8888-888888888888', 'Ἴγγωρ', 'Anförde Rus-flottor mot Konstantinopel 941, 944', 'Primär källa - bysantinska källor om attackerna')
) AS source_data(king_name, source_id, mentioned_name, context, reliability_note)
WHERE hk.name = source_data.king_name;
