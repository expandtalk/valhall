
-- Add Danish kings with coin evidence
INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
(gen_random_uuid(), 'Sven Tveskägg', ARRAY['Sven Forkbeard'], '66666666-6666-6666-6666-666666666666', 985, 1014, 'historical', 'Denmark', 'Den förste danske kung som låter sätta sitt namn på mynt', true, false, now(), now()),
(gen_random_uuid(), 'Harald Hein', ARRAY['Harald Hen'], '66666666-6666-6666-6666-666666666666', 1076, 1080, 'historical', 'Denmark', 'Dansk kung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Knut den helige', ARRAY['Canute the Holy'], '66666666-6666-6666-6666-666666666666', 1080, 1086, 'historical', 'Denmark', 'Helgonförklarad dansk kung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Oluf Hunger', ARRAY['Olaf Hunger'], '66666666-6666-6666-6666-666666666666', 1086, 1095, 'historical', 'Denmark', 'Dansk kung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Erik Ejegod', ARRAY['Eric Evergood'], '66666666-6666-6666-6666-666666666666', 1095, 1103, 'historical', 'Denmark', 'Dansk kung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Valdemar Sejr', ARRAY['Valdemar the Victorious'], '77777777-7777-7777-7777-777777777777', 1202, 1241, 'historical', 'Denmark', 'Präglades det unika myntet med årtal 1234', true, false, now(), now()),
(gen_random_uuid(), 'Hans', ARRAY['John of Denmark'], '77777777-7777-7777-7777-777777777777', 1481, 1513, 'historical', 'Denmark', 'Första danske kung att prägla guldmynt (nobeln) 1496', true, false, now(), now());

-- Add Norwegian kings with coin evidence
INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
(gen_random_uuid(), 'Magnus den gode', ARRAY['Magnus the Good'], '88888888-8888-8888-8888-888888888888', 1035, 1047, 'historical', 'Norway', 'Kung av både Norge och Danmark med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Harald Hårdråde', ARRAY['Harald Hardrada'], '88888888-8888-8888-8888-888888888888', 1047, 1066, 'historical', 'Norway', 'Norsk kung med myntprägning', true, true, now(), now()),
(gen_random_uuid(), 'Magnus Barfot', ARRAY['Magnus Barefoot'], '88888888-8888-8888-8888-888888888888', 1093, 1103, 'historical', 'Norway', 'Norsk kung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Sigurd Jorsalfar', ARRAY['Sigurd the Crusader'], '88888888-8888-8888-8888-888888888888', 1103, 1130, 'historical', 'Norway', 'Korsfararkung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Sverre Sigurdsson', ARRAY['Sverre of Norway'], '99999999-9999-9999-9999-999999999999', 1177, 1202, 'historical', 'Norway', 'Norsk kung med myntprägning från Sverreätten', true, false, now(), now()),
(gen_random_uuid(), 'Håkon Håkonsson', ARRAY['Haakon the Old'], '99999999-9999-9999-9999-999999999999', 1217, 1263, 'historical', 'Norway', 'Norsk kung med myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Magnus Lagabøte', ARRAY['Magnus the Lawmender'], '99999999-9999-9999-9999-999999999999', 1263, 1280, 'historical', 'Norway', 'Norsk kung med myntprägning', true, false, now(), now());

-- Add Kievrus ruler with coin evidence
INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
(gen_random_uuid(), 'Jaropolk', ARRAY['Yaropolk I'], 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 972, 980, 'historical', 'Kievrus', 'Första kända myntprägning i Kiev - "Jaropolks pseudodirham", endast ett tiotal exemplar kända', true, false, now(), now());

-- Add Danish coin source
INSERT INTO public.historical_sources (id, title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types, created_at, updated_at) VALUES
('33333333-3333-3333-3333-333333333333', 'Danska kungamynt', 'Danish Royal Coins', 'Olika danska myntverkstäder', NULL, 985, 1513, 'primary', 'Latin/Danska', 'Danska kungamynt som primär källa för kunglig legitimitet och makt', ARRAY[]::bias_type[], now(), now());

-- Add Norwegian coin source  
INSERT INTO public.historical_sources (id, title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types, created_at, updated_at) VALUES
('44444444-4444-4444-4444-444444444444', 'Norska kungamynt', 'Norwegian Royal Coins', 'Olika norska myntverkstäder', NULL, 1015, 1280, 'primary', 'Latin/Norska', 'Norska kungamynt som primär källa för kunglig legitimitet och makt', ARRAY[]::bias_type[], now(), now());

-- Add Kievrus coin source
INSERT INTO public.historical_sources (id, title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types, created_at, updated_at) VALUES
('55555555-5555-5555-5555-555555555555', 'Kievrus pseudodirhamer', 'Kievrus Pseudo-Dirhams', 'Kievrus myntverkstäder', NULL, 972, 980, 'primary', 'Fornkyrkoslaviska', 'Första kända myntprägning i Kievriket - Jaropolks pseudodirhamer', ARRAY[]::bias_type[], now(), now());

-- Add coin evidence for Danish kings
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  hk.id,
  '33333333-3333-3333-3333-333333333333'::uuid,
  coin_data.coin_name,
  coin_data.context,
  coin_data.reliability_note,
  now()
FROM historical_kings hk
CROSS JOIN (
  VALUES 
    ('Sven Tveskägg', 'SVEN REX', 'Den förste danske kung som låter sätta sitt namn på mynt ca 985-1014', 'Primär källa - första danska namnmynt'),
    ('Knut den store', 'CNUT REX', 'Präglades vackra mynt med Guds lamm i Lund 1018-1035', 'Primär källa - omfattande myntmaterial från Nordsjöimperiet'),
    ('Harald Hein', 'HARALD REX', 'Dansk kung med myntprägning 1076-1080', 'Primär källa - myntfynd'),
    ('Knut den helige', 'CNUT SANCTUS', 'Helgonförklarad kung med myntprägning 1080-1086', 'Primär källa - helgonmynt'),
    ('Oluf Hunger', 'OLUF REX', 'Dansk kung med myntprägning 1086-1095', 'Primär källa - myntfynd'),
    ('Erik Ejegod', 'ERIK REX', 'Dansk kung med myntprägning 1095-1103', 'Primär källa - myntfynd'),
    ('Valdemar Sejr', 'VALDEMAR REX', 'Präglades det unika myntet med årtal 1234', 'Primär källa - unikt daterat mynt'),
    ('Hans', 'HANS REX', 'Första danske kung att prägla guldmynt (nobeln) 1496', 'Primär källa - första danska guldmynt')
) AS coin_data(king_name, coin_name, context, reliability_note)
WHERE hk.name = coin_data.king_name;

-- Add coin evidence for Norwegian kings  
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  hk.id,
  '44444444-4444-4444-4444-444444444444'::uuid,
  coin_data.coin_name,
  coin_data.context,
  coin_data.reliability_note,
  now()
FROM historical_kings hk
CROSS JOIN (
  VALUES 
    ('Olav den helige', 'OLAF SANCTUS', 'Präglades mynt av engelska myntmästare efter engelskt mönster 1015-1028', 'Primär källa - helgonkungsmynt'),
    ('Magnus den gode', 'MAGNUS REX', 'Kung av både Norge och Danmark med myntprägning 1035-1047', 'Primär källa - mynt från dubbel kungamakt'),
    ('Harald Hårdråde', 'HARALD REX', 'Norsk kung med myntprägning 1047-1066', 'Primär källa - myntfynd'),
    ('Magnus Barfot', 'MAGNUS REX', 'Norsk kung med myntprägning 1093-1103', 'Primär källa - myntfynd'),
    ('Sigurd Jorsalfar', 'SIGURD REX', 'Korsfararkung med myntprägning 1103-1130', 'Primär källa - korsfararmynt'),
    ('Sverre Sigurdsson', 'SVERRE REX', 'Norsk kung med myntprägning från Sverreätten 1177-1202', 'Primär källa - dynastimynt'),
    ('Håkon Håkonsson', 'HAAKON REX', 'Norsk kung med myntprägning 1217-1263', 'Primär källa - myntfynd'),
    ('Magnus Lagabøte', 'MAGNUS REX', 'Norsk kung med myntprägning 1263-1280', 'Primär källa - myntfynd')
) AS coin_data(king_name, coin_name, context, reliability_note)
WHERE hk.name = coin_data.king_name;

-- Add coin evidence for Kievrus ruler
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  hk.id,
  '55555555-5555-5555-5555-555555555555'::uuid,
  'JAROPOLK',
  'Första kända myntprägning i Kiev - "Jaropolks pseudodirham", endast ett tiotal exemplar kända',
  'Primär källa - extremt sällsynta myntfynd, första östslaviska myntprägning',
  now()
FROM historical_kings hk
WHERE hk.name = 'Jaropolk';
