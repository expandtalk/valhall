
-- Add coin minting as a source type and create records for Swedish rulers with coin evidence
INSERT INTO public.historical_sources (id, title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Svenska kungamynt', 'Swedish Royal Coins', 'Olika myntverkstäder', NULL, 995, 1560, 'primary', 'Latin/Svenska', 'Myntprägning som primär källa för kunglig legitimitet och ekonomisk kontroll', ARRAY[]::bias_type[], now(), now()),
('22222222-2222-2222-2222-222222222222', 'Svenska jarlmynt', 'Swedish Jarl Coins', 'Olika myntverkstäder', NULL, 1174, 1266, 'primary', 'Latin', 'Jarlmynt som bevis för regional makt och autonomi', ARRAY[]::bias_type[], now(), now());

-- Add coin minting evidence to existing kings
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  hk.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  coin_data.coin_name,
  coin_data.context,
  coin_data.reliability_note,
  now()
FROM historical_kings hk
CROSS JOIN (
  VALUES 
    ('Olof Skötkonung', 'OLAF REX', 'Första svenska kung med myntprägning i Sigtuna myntverk ca 995-1000', 'Primär källa - fysiska mynt bevarade'),
    ('Anund Jakob', 'ANUND REX', 'Myntprägning fortsatte till ca 1030 under hans regeringstid', 'Primär källa - myntfynd bekräftar regeringstid'),
    ('Magnus Eriksson', 'MAGNUS REX', 'Myntprägning som kung av både Sverige och Norge 1319-1364', 'Primär källa - omfattande myntmaterial'),
    ('Gustav Vasa', 'GUSTAVUS REX', 'Införde dalern 1534, omfattande myntreform', 'Primär källa - välbevarad mynthistoria')
) AS coin_data(king_name, coin_name, context, reliability_note)
WHERE hk.name = coin_data.king_name;

-- Add new kings that are mentioned in the coin evidence but not yet in the database
INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
(gen_random_uuid(), 'Knut Eriksson', ARRAY['Knut Eriksson'], '44444444-4444-4444-4444-444444444444', 1172, 1196, 'historical', 'Sweden', 'Kung som återupptog myntprägningen i Sverige efter den myntlösa perioden ca 1030-1140', true, false, now(), now()),
(gen_random_uuid(), 'Karl Sverkersson', ARRAY['Karl Sverkersson'], '33333333-3333-3333-3333-333333333333', 1160, 1167, 'historical', 'Sweden', 'Kung som präglede brakteater i Lödöse', true, false, now(), now()),
(gen_random_uuid(), 'Magnus Eriksson', ARRAY['Magnus Eriksson'], '44444444-4444-4444-4444-444444444444', 1319, 1364, 'historical', 'Sweden', 'Kung av både Sverige och Norge, betydande myntprägning', true, false, now(), now()),
(gen_random_uuid(), 'Gustav Vasa', ARRAY['Gustav Vasa'], '55555555-5555-5555-5555-555555555555', 1523, 1560, 'historical', 'Sweden', 'Införde dalern 1534 och genomförde omfattande myntreformer', true, false, now(), now());

-- Add jarls with coin minting evidence
INSERT INTO public.historical_kings (id, name, name_variations, dynasty_id, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions, created_at, updated_at) VALUES
(gen_random_uuid(), 'Birger Brosa', ARRAY['Birger Brosa'], '55555555-5555-5555-5555-555555555555', 1174, 1202, 'historical', 'Sweden', 'Riksjarl, den första jarlen över både svear och götar. Tillnamnet betyder "småleende"', true, false, now(), now()),
(gen_random_uuid(), 'Ulf Fase', ARRAY['Ulf Fase'], NULL, 1220, 1247, 'historical', 'Sweden', 'Den ende jarl som slagit egna mynt. Myntfynd med texten "ULF DUX". Död 1247, möjligen avrättad efter kupförsöket vid Sparrsätra', true, false, now(), now());

-- Add coin evidence for these new rulers
INSERT INTO public.king_source_mentions (id, king_id, source_id, mentioned_name, context, reliability_note, created_at)
SELECT 
  gen_random_uuid(),
  hk.id,
  CASE 
    WHEN hk.name IN ('Birger Brosa', 'Ulf Fase', 'Birger Jarl') THEN '22222222-2222-2222-2222-222222222222'::uuid
    ELSE '11111111-1111-1111-1111-111111111111'::uuid
  END,
  coin_data.coin_name,
  coin_data.context,
  coin_data.reliability_note,
  now()
FROM historical_kings hk
CROSS JOIN (
  VALUES 
    ('Knut Eriksson', 'KNUT REX', 'Återupptog myntprägningen ca 1172 efter den myntlösa perioden', 'Primär källa - myntfynd bekräftar återupptagning'),
    ('Karl Sverkersson', 'KARL REX', 'Brakteater präglade i Lödöse ca 1160-1167', 'Primär källa - arkeologiska myntfynd'),
    ('Birger Brosa', 'BIRGER DUX', 'Riksjarl med myntprägning 1174-1202', 'Primär källa - jarlmynt som maktbevis'),
    ('Ulf Fase', 'ULF DUX', 'Den ende jarl med egna mynt, text "ULF DUX" på myntfynd', 'Primär källa - unika jarlmynt'),
    ('Birger Jarl', 'BIRGER DUX', 'Sveriges siste riksjarl med myntprägning 1248-1266', 'Primär källa - omfattande jarlmynt')
) AS coin_data(king_name, coin_name, context, reliability_note)
WHERE hk.name = coin_data.king_name;
