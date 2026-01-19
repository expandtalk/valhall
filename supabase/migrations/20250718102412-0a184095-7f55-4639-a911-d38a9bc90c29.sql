-- Add missing Viking centers to the viking_cities table

INSERT INTO viking_cities (name, coordinates, category, period_start, period_end, country, region, description, historical_significance, status, unesco_site) VALUES

-- Sweden
('Sigtuna', '(17.7234, 59.6191)', 'administrative_center', 980, 1200, 'Sweden', 'Uppland', 'Medeltida handels- och administrationsstad', 'En av Sveriges första egentliga städer grundad av kung Erik Segersäll', 'evolved', false),
('Valsgärde', '(17.6500, 59.9167)', 'burial_site', 200, 1000, 'Sweden', 'Uppland', 'Gravfält med rika boat burials', 'Viktigt gravfält som visar på elitens begravningskultur', 'archaeological', false),
('Löddeköping', '(13.0167, 55.7667)', 'trading_post', 700, 1000, 'Sweden', 'Skåne', 'Handelsplats i Skåne', 'Viktig handelsplats under sen järnålder och tidig medeltid', 'abandoned', false),
('Åhus', '(14.3000, 55.9167)', 'trading_post', 800, 1200, 'Sweden', 'Skåne', 'Medeltida handelsstad', 'Betydelsefull handelsplats vid östersjön', 'evolved', false),
('Lund', '(13.1910, 55.7047)', 'administrative_center', 1020, 1600, 'Sweden', 'Skåne', 'Medeltida ärkebiskopsstad', 'Skandinaviens religiösa centrum under medeltiden', 'evolved', false),
('Tommarp', '(13.9333, 55.9333)', 'settlement', 800, 1100, 'Sweden', 'Skåne', 'Vikingatida bosättning', 'Viktig bosättning i östra Skåne', 'archaeological', false),
('Varnhem', '(13.6500, 58.3833)', 'religious_center', 1100, 1500, 'Sweden', 'Västergötland', 'Klosterstad och begravningsplats för kungar', 'Viktigt religiöst centrum med kungagravar', 'evolved', false),
('Valstanäs', '(15.6333, 58.4167)', 'settlement', 800, 1200, 'Sweden', 'Östergötland', 'Bosättning i Östergötland', 'Viktig bosättning under vikingatiden', 'archaeological', false),
('Skänninge', '(15.0867, 58.3942)', 'trading_post', 1000, 1400, 'Sweden', 'Östergötland', 'Medeltida handelsstad', 'En av Sveriges äldsta städer', 'evolved', false),
('Söderköping', '(16.3222, 58.4806)', 'trading_post', 1000, 1600, 'Sweden', 'Östergötland', 'Medeltida handelsstad vid Östersjön', 'Viktig handelsplats under medeltiden', 'evolved', false),
('Klosterstad', '(15.6000, 58.4500)', 'religious_center', 1100, 1500, 'Sweden', 'Östergötland', 'Klosterstad', 'Religiöst centrum med kloster', 'evolved', false),
('Borg Säteri', '(16.1833, 58.5333)', 'settlement', 800, 1200, 'Sweden', 'Östergötland', 'Bosättning i Östergötland', 'Viktig bosättning under vikingatiden', 'archaeological', false),
('Hosmo', '(16.2833, 56.6167)', 'settlement', 800, 1200, 'Sweden', 'Småland', 'Bosättning i Småland', 'Viktig bosättning under vikingatiden', 'archaeological', false),
('Köpingsvik', '(16.7333, 56.9167)', 'trading_post', 800, 1200, 'Sweden', 'Öland', 'Handelsplats på Öland', 'Viktig handelsplats på Öland', 'evolved', false),

-- Denmark
('Jelling', '(9.4194, 55.7561)', 'administrative_center', 958, 1100, 'Denmark', 'Jutland', 'Danmarks kristna centrum och kungaresidens', 'Platsen där Danmark kristnades officiellt', 'evolved', true),
('Århus', '(10.2039, 56.1629)', 'trading_post', 900, 1600, 'Denmark', 'Jutland', 'Viktig handelsstad i östra Jutland', 'Betydelsefull handels- och administrativ stad', 'evolved', false),
('Roskilde', '(12.0803, 55.6415)', 'administrative_center', 980, 1400, 'Denmark', 'Sjælland', 'Danmarks huvudstad under medeltiden', 'Viktigaste politiska och religiösa centrum', 'evolved', true),
('Odense', '(10.3883, 55.3959)', 'administrative_center', 988, 1600, 'Denmark', 'Fyn', 'Viktig administrativ stad på Fyn', 'Betydelsefull regional huvudstad', 'evolved', false),
('Lejre', '(11.9667, 55.6000)', 'administrative_center', 500, 1000, 'Denmark', 'Sjælland', 'Forntida kungasäte', 'Legendariskt centrum för dansk kunglighet', 'archaeological', false),

-- Norway  
('Kaupang', '(10.0333, 59.1667)', 'trading_post', 800, 950, 'Norway', 'Vestfold', 'Norges äldsta handelsstad', 'Viktigaste handelsplats i Norge under vikingatiden', 'abandoned', false),
('Tönsberg', '(10.4075, 59.2667)', 'trading_post', 871, 1600, 'Norway', 'Vestfold', 'En av Norges äldsta städer', 'Viktig handels- och sjöfartsstad', 'evolved', false),
('Oslo', '(10.7522, 59.9139)', 'administrative_center', 1048, 1624, 'Norway', 'Oslo', 'Norges huvudstad', 'Grundad som Kristiania, blev senare huvudstad', 'evolved', false),
('Nidaros', '(10.3951, 63.4305)', 'administrative_center', 997, 1600, 'Norway', 'Trøndelag', 'Norges religiösa och politiska centrum', 'Viktigaste pilgrimsmål i Norden', 'evolved', false),
('Bergen', '(5.3221, 60.3913)', 'trading_post', 1070, 1600, 'Norway', 'Hordaland', 'Viktig hansastad', 'Norges viktigaste handelsstad under medeltiden', 'evolved', true),
('Borg Lofoten', '(13.7892, 68.2472)', 'settlement', 500, 950, 'Norway', 'Lofoten', 'Hövdingasäte i Lofoten', 'Viktigt politiskt centrum i nord', 'archaeological', false),

-- Other countries  
('Wolin', '(14.6142, 53.8419)', 'trading_post', 900, 1200, 'Poland', 'Pomerania', 'Viktig slavisk handelsstad', 'Betydelsefull handelsplats vid Östersjön', 'abandoned', false),
('Truso', '(19.6500, 54.1000)', 'trading_post', 800, 1000, 'Poland', 'Prussia', 'Handelsstad vid Östersjön', 'Viktig handelsplats för östeuropeisk handel', 'abandoned', false),
('Reykjavik', '(-21.9426, 64.1466)', 'settlement', 874, 1600, 'Iceland', 'Southwest', 'Islands äldsta bosättning', 'Första permanenta bosättning på Island', 'evolved', false),
('Þingvellir', '(-21.1278, 64.2559)', 'administrative_center', 930, 1798, 'Iceland', 'Southwest', 'Islands första parlament', 'Platsen för det första parlamentet Althing', 'evolved', true),
('York', '(-1.0815, 53.9591)', 'administrative_center', 867, 1066, 'England', 'Yorkshire', 'Vikingahuvudstad i England', 'Centrum för det danska riket i England', 'evolved', true),
('Dublin', '(-6.2603, 53.3498)', 'trading_post', 841, 1170, 'Ireland', 'Leinster', 'Vikingagrundad handelsstad', 'Viktigaste vikingastad i Irland', 'evolved', false),
('Novgorod', '(31.2710, 58.5213)', 'trading_post', 859, 1500, 'Russia', 'Novgorod', 'Viktig handelsstad på handelsrutten till Konstantinopel', 'Nyckelstad på vägen österut', 'evolved', true),
('Kiev', '(30.5234, 50.4501)', 'administrative_center', 882, 1240, 'Ukraine', 'Kiev', 'Huvudstad i Kievriket', 'Centrum för det östslaviska riket', 'evolved', true),
('Staraja Ladoga', '(32.2978, 59.9953)', 'trading_post', 753, 1200, 'Russia', 'Leningrad', 'En av Rysslands äldsta städer', 'Viktig handelsplats på vägen österut', 'evolved', false);