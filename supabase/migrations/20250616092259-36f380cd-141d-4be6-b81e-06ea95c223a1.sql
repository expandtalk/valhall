
-- Lägg till källan om Mora sten och kungaval
INSERT INTO historical_sources (title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types) VALUES
('Mora sten och kungaval', 'Mora Stone and Royal Elections', 'Historiska källor', 1300, 1275, 1500, 'secondary', 'Swedish', 'Beskrivning av kungaval vid Mora sten, belagd från 1200-talet. Innehåller information om Södermannalagen (1335) och Upplandslagen (1296) samt specifika kungaval.', ARRAY['temporal_distance']::bias_type[]);

-- Lägg till de kungar som inte redan finns
INSERT INTO historical_kings (name, name_variations, reign_start, reign_end, status, region, description, archaeological_evidence, runestone_mentions) VALUES
('Albrekt av Mecklenburg', ARRAY['Albert av Mecklenburg', 'Albrecht von Mecklenburg'], 1364, 1389, 'historical', 'Sweden', 'Tysk prins som valdes till svensk kung på Mora äng 15 februari 1364. Styrde Sverige till 1389.', false, false),
('Erik av Pommern', ARRAY['Erik XIII', 'Erik af Pommern'], 1396, 1439, 'historical', 'Sweden', 'Dansk prins som valdes till svensk kung på Mora äng 23 juli 1396. Styrde i personalunion med Danmark och Norge.', false, false),
('Kristofer av Bayern', ARRAY['Kristoffer av Bayern', 'Christopher av Bayern'], 1441, 1448, 'historical', 'Sweden', 'Tysk prins som valdes till svensk kung på Mora äng i september 1441. Styrde Sverige till sin död 1448.', false, false),
('Karl Knutsson (Bonde)', ARRAY['Karl VIII', 'Karl Knutsson Bonde'], 1448, 1457, 'historical', 'Sweden', 'Svensk högättling som valdes på Mora äng 20 juni 1448 och hyllades 28 juni samma år. Första gången han styrde Sverige.', false, false),
('Kristian I', ARRAY['Christian I', 'Kristian I av Danmark'], 1457, 1464, 'historical', 'Sweden', 'Dansk kung som valdes till svensk kung på Mora äng 23 juni 1457 och hyllades 2 juli samma år.', false, false);

-- Lägg till källa-omnämnanden för de kungar som valdes på Mora äng
INSERT INTO king_source_mentions (king_id, source_id, mentioned_name, context, reliability_note) 
SELECT 
    hk.id,
    hs.id,
    hk.name,
    CASE 
        WHEN hk.name = 'Magnus Ladulås' THEN 'Vald på Mora äng 22 juli 1275, den förste kung som det finns belägg för att ha valts på Mora äng'
        WHEN hk.name = 'Magnus Eriksson' THEN 'Vald på Mora äng 8 juli 1319'
        WHEN hk.name = 'Håkan Magnusson' THEN 'Vald på Mora äng i februari 1362'
        WHEN hk.name = 'Albrekt av Mecklenburg' THEN 'Vald på Mora äng 15 februari 1364'
        WHEN hk.name = 'Erik av Pommern' THEN 'Vald på Mora äng 23 juli 1396'
        WHEN hk.name = 'Kristofer av Bayern' THEN 'Vald på Mora äng i september 1441'
        WHEN hk.name = 'Karl Knutsson (Bonde)' THEN 'Vald på Mora äng 20 juni och hyllad 28 juni 1448'
        WHEN hk.name = 'Kristian I' THEN 'Vald på Mora äng 23 juni och hyllad 2 juli 1457'
    END,
    'Historiskt belagd genom Södermannalagen och andra källor'
FROM historical_kings hk
CROSS JOIN historical_sources hs
WHERE hs.title = 'Mora sten och kungaval'
AND hk.name IN ('Magnus Ladulås', 'Magnus Eriksson', 'Håkan Magnusson', 'Albrekt av Mecklenburg', 'Erik av Pommern', 'Kristofer av Bayern', 'Karl Knutsson (Bonde)', 'Kristian I');
