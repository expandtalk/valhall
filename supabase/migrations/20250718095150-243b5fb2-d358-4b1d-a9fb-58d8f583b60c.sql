-- Insert historical Viking Age events into historical_events table
INSERT INTO historical_events (event_name, event_name_en, year_start, year_end, event_type, significance_level, description, description_en, region_affected) VALUES

-- 790 Birka founded
('Birka anläggs på Björkö i Mälaren', 'Birka is founded on Björkö in Lake Mälaren', 790, 900, 'settlement', 'very_high', 'Bosättningen blomstrar till slutet av 900-talet', 'The settlement flourishes until the end of the 900s', ARRAY['Sverige', 'Mälaren']),

-- 792 King Offa's preparations
('Kung Offa av Mercia uppmanar till förstärkt kustförsvar', 'King Offa of Mercia calls for strengthened coastal defenses', 792, 792, 'military', 'high', 'Uppmanar folket i Kent att stärka försvarsanläggningarna vid havet', 'Calls upon the people of Kent to strengthen coastal fortifications', ARRAY['England', 'Kent']),

-- 793 Lindisfarne raid
('Nordbor plundrar Lindisfarne kloster', 'Norse raiders plunder Lindisfarne monastery', 793, 793, 'raid', 'very_high', 'Nordbor landstiger vid Lindisfarne i Nordvästra England och plundrar klostret', 'Norse raiders land at Lindisfarne in Northwest England and plunder the monastery', ARRAY['England', 'Northumbria']),

-- 799 Aquitaine coast raids
('Hedniska nordbor seglat längs Akvitaniens kust', 'Heathen Norsemen sail along Aquitaine coast', 799, 799, 'raid', 'high', 'Hedniska nordbor rapporteras ha seglat längs Akvitaniens kust i nuvarande sydvästra Frankrike', 'Heathen Norsemen reported to have sailed along the Aquitaine coast in present-day southwestern France', ARRAY['Frankrike', 'Akvitanien']),

-- 800 Charlemagne organizes fleet
('Karl den store organiserar flottstyrkor', 'Charlemagne organizes naval forces', 800, 800, 'military', 'high', 'Frankernas härskare organiserar flottstyrkor för att möta hotet från norr', 'Frankish ruler organizes naval forces to meet the threat from the north', ARRAY['Frankrike']),

-- 808 Godfred takes control of Hedeby
('Danska kungen Godfred tar kontroll över Hedeby', 'Danish king Godfred takes control of Hedeby', 808, 1050, 'political', 'very_high', 'Börjar utveckla staden till ett centrum för handel och hantverk. Köpmän från Rerik tvångsförflyttas till Hedeby', 'Begins developing the city into a center for trade and crafts. Merchants from Rerik are forcibly relocated to Hedeby', ARRAY['Danmark', 'Hedeby']),

-- 826 Harald Klak baptized
('Harald Klak anammar kristendomen', 'Harald Klak adopts Christianity', 826, 826, 'religious', 'high', 'Frankerna överlåter ön Rustringen i Frisland till den landsflyktige danske kungen Harald Klak som döps', 'The Franks cede the island of Rustringen in Frisia to the exiled Danish king Harald Klak who is baptized', ARRAY['Frisland', 'Danmark']),

-- 830 Repeated attacks on British Isles
('Nordbor angriper de brittiska öarna upprepat', 'Norsemen repeatedly attack the British Isles', 830, 830, 'raid', 'high', 'Tar många iriska kvinnor i slaveri och säljer dem i Norge och Island', 'Take many Irish women into slavery and sell them in Norway and later in newly discovered Iceland', ARRAY['Irland', 'Storbritannien']),

-- 841 Dublin established
('Dublin etableras som nordbornas fäste', 'Dublin established as Norse stronghold', 841, 841, 'settlement', 'very_high', 'Etableras som nordbornas starkaste fäste på Irland. Andra bosättningar vid Limerick, Waterford, Wexford och Cork', 'Established as the Norsemen''s strongest fortress in Ireland. Other settlements at Limerick, Waterford, Wexford and Cork', ARRAY['Irland', 'Dublin']),

-- 843 Nantes attack and Noirmoutier base
('Vikingarna attackerar Nantes', 'Vikings attack Nantes', 843, 843, 'raid', 'high', 'Vikingarna attackerar Nantes och etablerar permanent bas på ön Noirmoutier vid Loires mynning', 'Vikings attack Nantes and establish permanent base on the island of Noirmoutier at Loire estuary', ARRAY['Frankrike', 'Loire']),

-- 842-867 Michael III and Varangians
('Mikael III anlitar väringar från Norden', 'Michael III employs Varangians from the North', 842, 867, 'military', 'high', 'Första kejsaren som anlitar legotrupper från Norden så kallade väringar', 'First emperor to employ mercenaries from the North called Varangians', ARRAY['Bysantinska riket']),

-- 834-837 Dorestad raids
('Vikingar plundrar Dorestad', 'Vikings plunder Dorestad', 834, 837, 'raid', 'high', 'Vikingar plundrar den rika köpstaden Dorestad söder om Utrecht vid flera tillfällen', 'Vikings plunder the rich trading town of Dorestad south of Utrecht on several occasions', ARRAY['Nederländerna', 'Utrecht']),

-- 841-856 Seine raids
('Hövdingarna härjar vid Seine', 'Chieftains ravage along the Seine', 841, 856, 'raid', 'very_high', 'Oscar, Sidroc, Godfred och Björn härjar med sina vikingar vid Seine. Rouen, Paris attackeras', 'Oscar, Sidroc, Godfred and Björn ravage with their Vikings along the Seine. Rouen, Paris attacked', ARRAY['Frankrike', 'Seine', 'Paris']),

-- 844 Iberian Peninsula raids
('Vikingar attackerar pyreneiska halvön', 'Vikings attack Iberian Peninsula', 844, 844, 'raid', 'high', 'Vikingar söker sig för första gången mot pyreneiska halvön där Cadiz och Sevilla attackeras', 'Vikings venture for the first time against the Iberian Peninsula where Cadiz and Seville are attacked', ARRAY['Spanien', 'Cadiz', 'Sevilla']),

-- 857 Pippin II alliance
('Kung Pippin II allierar sig med vikingar', 'King Pippin II allies with Vikings', 857, 857, 'political', 'high', 'Kung Pippin II av Akvitanien allierar sig med vikingarna vid Loire för att återvinna sitt rike', 'King Pippin II of Aquitaine allies with the Vikings at Loire to regain his kingdom', ARRAY['Frankrike', 'Akvitanien']),

-- 862 Hired Viking fleets
('Hertig Salomon och greve Robert lejer vikingaflottor', 'Duke Salomon and Count Robert hire Viking fleets', 862, 862, 'military', 'high', 'Hertig Salomon av Bretagne och greve Robert av Anjou lejer varsin vikingaflotta', 'Duke Salomon of Brittany and Count Robert of Anjou each hire a Viking fleet', ARRAY['Frankrike', 'Bretagne', 'Anjou']);