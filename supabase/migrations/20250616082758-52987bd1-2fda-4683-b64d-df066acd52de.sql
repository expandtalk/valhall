
-- First, let's insert Royal Dynasties with explicit UUIDs to avoid conflicts
WITH dynasty_inserts AS (
  INSERT INTO public.royal_dynasties (id, name, name_en, description, period_start, period_end, region, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Ynglingarätten', 'Yngling Dynasty', 'Legendär svensk kungaätt som påstås härstamma från Oden', 200, 1060, 'Sweden', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'Stenkilsätten', 'Stenkil Dynasty', 'Svensk kungaätt grundad av Stenkil', 1060, 1130, 'Sweden', now(), now()),
  ('33333333-3333-3333-3333-333333333333', 'Sverkerätren', 'Sverker Dynasty', 'Kungaätt som växlade makt med Eriksätten', 1130, 1250, 'Sweden', now(), now()),
  ('44444444-4444-4444-4444-444444444444', 'Eriksätten', 'Erik Dynasty', 'Kungaätt som växlade makt med Sverkerätren', 1156, 1250, 'Sweden', now(), now()),
  ('55555555-5555-5555-5555-555555555555', 'Bjälboätten', 'Bjälbo Dynasty', 'Även kallad Folkungaätten, styrde Sverige 1250-1364', 1250, 1364, 'Sweden', now(), now()),
  ('66666666-6666-6666-6666-666666666666', 'Jelling-dynastin', 'Jelling Dynasty', 'Första historiskt belagda danska kungadynasti', 930, 1080, 'Denmark', now(), now()),
  ('77777777-7777-7777-7777-777777777777', 'Valdemarätten', 'Valdemar Dynasty', 'Mäktig dansk kungaätt', 1157, 1250, 'Denmark', now(), now()),
  ('88888888-8888-8888-8888-888888888888', 'Hårfagerätten', 'Fairhair Dynasty', 'Norska kungaätten grundad av Harald Hårfager', 872, 1130, 'Norway', now(), now()),
  ('99999999-9999-9999-9999-999999999999', 'Sverreätten', 'Sverre Dynasty', 'Norsk kungaätt', 1177, 1319, 'Norway', now(), now()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Rurikdynastin', 'Rurik Dynasty', 'Grundade Kievriket och senare Ryssland', 862, 1598, 'Kievrus', now(), now())
  RETURNING id, name
),
source_inserts AS (
  INSERT INTO public.historical_sources (id, title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types, created_at, updated_at) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Vita Ansgarii', 'Life of Ansgar', 'Rimbert', 870, 829, 865, 'primary', 'Latin', 'Helgonbiografi över Ansgar av Bremen, innehåller de första historiskt belagda namnen på svenska kungar', ARRAY['christian_anti_pagan']::bias_type[], now(), now()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Gesta Hammaburgensis ecclesiae pontificum', 'Deeds of Bishops of the Hamburg Church', 'Adam av Bremen', 1075, 900, 1072, 'secondary', 'Latin', 'En av de viktigaste källorna till Nordeuropas medeltida historia och vikingatiden', ARRAY['christian_anti_pagan', 'temporal_distance']::bias_type[], now(), now()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Nestorskrönikan', 'Primary Chronicle', 'Nestor av Kiev', 1113, 800, 1110, 'secondary', 'Fornkyrkoslaviska', 'Den primära källan till Ruriks historia och grundandet av Kievriket', ARRAY['temporal_distance', 'political_legitimacy']::bias_type[], now(), now()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Gesta Danorum', 'Deeds of the Danes', 'Saxo Grammaticus', 1200, 500, 1200, 'secondary', 'Latin', 'Patriotiskt verk om dansk historia som blandar mytiska element med historiska uppgifter', ARRAY['nationalist_danish', 'temporal_distance']::bias_type[], now(), now()),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Ingvars saga víðförla', 'Saga of Ingvar the Far-Travelled', 'Okänd', 1200, 1040, 1050, 'tertiary', 'Fornnordiska', 'Saga om Ingvar Vittfarnes expeditioner österut, stödd av runstenar', ARRAY['temporal_distance']::bias_type[], now(), now())
  RETURNING id, title
),
king_inserts AS (
  INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Kung Björn', ARRAY['Björn i Birka'], '11111111-1111-1111-1111-111111111111', 829, 850, 'historical', 'Sweden', 'Den första svenska kung som Ansgar mötte när han anlände till Birka omkring 830. Mottog Ansgar vänligt och gav tillstånd för kristet missionsarbete.', true, false, now(), now()),
  (gen_random_uuid(), 'Kung Olof', ARRAY['Olof av Birka'], '11111111-1111-1111-1111-111111111111', 850, 870, 'historical', 'Sweden', 'Sveakonung när Ansgar gjorde sin andra resa till Birka. Välvilligt inställd till kristendomen och tillät kyrkobyggnad.', true, false, now(), now()),
  (gen_random_uuid(), 'Kung Anund', ARRAY['Anund av Birka'], '11111111-1111-1111-1111-111111111111', 860, 880, 'historical', 'Sweden', 'Kung som levt i landsflykt i Danmark och angrep Birka med en flotta av 32 skepp.', false, false, now(), now()),
  (gen_random_uuid(), 'Erik Segersäll', ARRAY['Erik Björnsson'], '11111111-1111-1111-1111-111111111111', 970, 995, 'historical', 'Sweden', 'Ledde ledungen mot Danmark, nämns på flera runstenar och har stark sagotradition.', true, true, now(), now()),
  (gen_random_uuid(), 'Olof Skötkonung', ARRAY['Olof Eriksson'], '11111111-1111-1111-1111-111111111111', 995, 1022, 'historical', 'Sweden', 'Första kristna svenska kungen med myntprägning och runstenar som bekräftar hans existens.', true, true, now(), now()),
  (gen_random_uuid(), 'Anund Jakob', ARRAY['Anund Olofsson'], '11111111-1111-1111-1111-111111111111', 1022, 1050, 'historical', 'Sweden', 'Allierad med Olav den helige mot Knut den store, nämns på runstenar.', true, true, now(), now()),
  (gen_random_uuid(), 'Ingvar Vittfarne', ARRAY['Ingvar den vittfarne'], '11111111-1111-1111-1111-111111111111', 1040, 1041, 'historical', 'Sweden', 'Ledde stora österlands-expeditioner, över 20 Ingvarsstenar runt Mälaren vittnar om honom.', true, true, now(), now()),
  (gen_random_uuid(), 'Birger Jarl', ARRAY['Birger Magnusson'], '55555555-5555-5555-5555-555555555555', 1248, 1266, 'historical', 'Sweden', 'Sveriges största medeltida statsman, grundade Stockholm och konsoliderade Sverige.', true, false, now(), now()),
  (gen_random_uuid(), 'Rurik', ARRAY['Rurik av Novgorod'], 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 862, 879, 'semi_legendary', 'Kievrus', 'Grundare av Rurikdynastin och traditionellt betraktad som grundare av den ryska monarkin.', false, false, now(), now()),
  (gen_random_uuid(), 'Harald Blåtand', ARRAY['Harald Gormsson'], '66666666-6666-6666-6666-666666666666', 958, 987, 'historical', 'Denmark', 'Kristnade Danmark och byggde Jellingmonumenten, en av Danmarks mest betydelsefulla kungar.', true, true, now(), now()),
  (gen_random_uuid(), 'Knut den store', ARRAY['Knut II', 'Canute the Great'], '66666666-6666-6666-6666-666666666666', 1014, 1035, 'historical', 'Denmark', 'Kung av England, Danmark och Norge samtidigt - byggde ett enormt nordsjöimperium.', true, true, now(), now()),
  (gen_random_uuid(), 'Harald Hårfager', ARRAY['Harald Halvdansson'], '88888888-8888-8888-8888-888888888888', 872, 930, 'semi_legendary', 'Norway', 'Första kung av Norge, förenade Norge till ett rike.', false, false, now(), now()),
  (gen_random_uuid(), 'Olav den helige', ARRAY['Olav Haraldsson'], '88888888-8888-8888-8888-888888888888', 1015, 1028, 'historical', 'Norway', 'Helgonförklarad, Norges nationalhelgon som kristnade Norge.', true, true, now(), now())
  RETURNING id, name
)
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  k.id,
  s.id,
  mention_data.mentioned_name,
  mention_data.context,
  mention_data.reliability_note,
  now()
FROM king_inserts k
CROSS JOIN source_inserts s
CROSS JOIN (
  VALUES 
    ('Kung Björn', 'Vita Ansgarii', 'Kung Björn', 'Ansgar mötte kung Björn i Birka omkring 830 och fick tillstånd för kristet missionsarbete', 'Samtida källa genom Rimbert'),
    ('Kung Olof', 'Vita Ansgarii', 'Kung Olof', 'Sveakonung under Ansgars andra resa till Birka, tillät kyrkobyggnad', 'Samtida källa genom Rimbert'),
    ('Kung Anund', 'Vita Ansgarii', 'Kung Anund', 'Angrep Birka med 32 skepp efter att ha levt i landsflykt i Danmark', 'Samtida källa genom Rimbert'),
    ('Erik Segersäll', 'Gesta Hammaburgensis ecclesiae pontificum', 'Erik', 'Nämns som en av Ring-kungarna tillsammans med Emund', 'Sekundär källa, intervju med Sven Estridsson'),
    ('Rurik', 'Nestorskrönikan', 'Rurik', 'Kallades av slaviska stammar: "Vårt land är stort och rikt, men det finnes ingen ordning"', 'Skriven 250 år senare, legitimerande syfte'),
    ('Harald Blåtand', 'Gesta Danorum', 'Harald Blåtand', 'Kristnade Danmark och byggde Jellingmonumenten', 'Danskt perspektiv, patriotisk framställning')
) AS mention_data(king_name, source_title, mentioned_name, context, reliability_note)
WHERE k.name = mention_data.king_name AND s.title = mention_data.source_title;
