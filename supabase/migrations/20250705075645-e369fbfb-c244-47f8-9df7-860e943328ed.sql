-- Add the genealogical sources mentioned by the user
INSERT INTO historical_sources (title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types) VALUES

-- Beowulf
('Beowulf', 'Beowulf', 'Okänd författare', 800, 500, 600, 'legendary', 'Old English', 'Fornengelska hjältedikt som innehåller information om skandinaviska stammar och kungar under folkvandringstiden.', ARRAY['temporal_distance']::bias_type[]),

-- Ynglingatal  
('Ynglingatal', 'Ynglingatal', 'Tjodolf av Hvin', 900, 200, 900, 'secondary', 'Old Norse', 'Skaldedikt som beskriver Ynglingaätten. En av de äldsta källorna till svensk kungahistoria, men innehåller mycket mytiskt material.', ARRAY['political_legitimacy']::bias_type[]),

-- Íslendingabók
('Íslendingabók', 'Book of Icelanders', 'Are Torgilsson den lärde', 1130, 870, 1120, 'primary', 'Old Norse', 'Isländsk historisk källa som ger information om nordiska kungar och kolonisering av Island. Anses som relativt tillförlitlig.', ARRAY['christian_anti_pagan']::bias_type[]),

-- Historia Norvegiæ
('Historia Norvegiæ', 'History of Norway', 'Okänd munk', 1180, 800, 1150, 'secondary', 'Latin', 'Latinsk historia över Norge som inkluderar information om tidiga norska kungar och dynastier.', ARRAY['christian_anti_pagan']::bias_type[]),

-- Ynglingasagan
('Ynglingasagan', 'Ynglinga saga', 'Snorre Sturlason', 1225, 200, 1000, 'tertiary', 'Old Norse', 'Del av Heimskringla som beskriver Ynglingaätten. Bygger på äldre källor men innehåller mycket sagomaterial.', ARRAY['political_legitimacy', 'temporal_distance']::bias_type[]),

-- Hversu Noregr byggðist
('Hversu Noregr byggðist', 'How Norway was Built', 'Okänd författare', 1387, 500, 1200, 'legendary', 'Old Norse', 'Fornisländsk text som beskriver norska kungaätter och landets bosättning. Innehåller mycket mytiskt och genealogiskt material.', ARRAY['temporal_distance']::bias_type[]);