-- Import existing river systems data into database

-- Insert Nordic Rivers
INSERT INTO public.river_systems (name, name_en, description, period, significance, historical_significance, color, width, importance, total_length_km) VALUES
('Ljungbyån', 'Ljungby River', 'Ljungbyån börjar i Hossmo strax söder om Kalmar och flödar genom småländska skogarna. 6,2 mil lång å med viktig historisk betydelse.', 'Viking Age', 'Transportväg för handel från Smålands inre delar till Kalmar och kusten.', 'Viktig vattenled för transport till och från Kalmar.', '#0369a1', 4, 'secondary', 62),
('Helgeå', 'Helge River', 'Helgeå rinner genom Skåne och Blekinge och mynnar i Hanöbukten. En av Sydsveriges viktigaste floder.', 'Viking Age', 'Viktig transportled genom Skåne och Blekinge till Östersjön.', 'Möjliggjorde handel mellan inlandet och kusten i sydöstra Sverige.', '#0369a1', 5, 'primary', NULL),
('Mörrumsån', 'Mörrums River', 'Mörrumsån rinner genom Blekinge och mynnar vid Karlshamn. Känd för sitt laxfiske redan under vikingatiden.', 'Viking Age', 'Viktigt för laxfiske och handel i Blekinge.', 'Laxen från Mörrumsån var en viktig handelsvara under vikingatiden.', '#0369a1', 4, 'secondary', NULL),
('Dalälven', 'Dal River', 'Dalälven är en av Sveriges längsta floder och rinner från Dalarna till Östersjön vid Gävle. Viktig transportled för järn och andra varor.', 'Viking Age', 'Huvudväg för transport av järn och andra varor från Dalarna till kusten.', 'Möjliggjorde export av svenskt järn under vikingatiden.', '#0369a1', 6, 'primary', NULL),
('Emån', 'Em River', 'Emån kommer från Storesjön (286 m.ö.h.) på småländska höglandet och rinner 4 472 km² avrinningsområde genom åtta kommuner till Östersjön vid Em.', 'Viking Age', 'En av Sveriges viktigaste handelsvägar från höglandet till kusten.', 'Möjliggjorde handel mellan Smålands inre delar och Östersjön, viktig för järn- och glashandel.', '#0369a1', 5, 'primary', NULL),
('Ronnebyån', 'Ronneby River', 'Ronnebyån är cirka 85 km lång, börjar i sjön Rottnen (149 m.ö.h.) och rinner söderut genom Blekinge till Östersjön.', 'Viking Age', 'Viktig å i Blekinge för transport av varor från inlandet till kusten.', 'Centrala transportled för Blekinges handel med omvärlden.', '#0369a1', 4, 'secondary', 85),
('Daugava', 'Daugava River', 'The Daugava is a large river rising in the Valdai Hills, flowing through Russia, Belarus, and Latvia into the Gulf of Riga.', 'Viking Age', 'Important trade route connecting the Baltic Sea with inland Russia and Belarus.', 'Important trade route connecting the Baltic Sea with inland Russia and Belarus.', '#0369a1', 6, 'primary', NULL),
('Volkhov', 'Volkhov River', 'The Volkhov River connects Lake Ilmen with Lake Ladoga, a crucial part of the trade route from the Varangians to the Greeks.', 'Viking Age', 'Key segment of the trade route from the Varangians to the Greeks, facilitating trade between Scandinavia and the Byzantine Empire.', 'Key segment of the trade route from the Varangians to the Greeks, facilitating trade between Scandinavia and the Byzantine Empire.', '#0369a1', 6, 'primary', NULL),
('Dnipro', 'Dnipro River', 'The Dnipro River flows from Russia through Belarus and Ukraine to the Black Sea, serving as a major trade artery.', 'Viking Age', 'Major trade route used by the Vikings to access the Black Sea and trade with the Byzantine Empire.', 'Major trade route used by the Vikings to access the Black Sea and trade with the Byzantine Empire.', '#0369a1', 6, 'primary', NULL),
('Neva', 'Neva River', 'The Neva River connects Lake Ladoga with the Gulf of Finland, providing a direct route to the Baltic Sea.', 'Viking Age', 'Facilitated access to Lake Ladoga and the interior waterways of Russia, crucial for trade and exploration.', 'Facilitated access to Lake Ladoga and the interior waterways of Russia, crucial for trade and exploration.', '#0369a1', 6, 'primary', NULL),
('Göta älv', 'Göta älv River', 'Göta älv connects Lake Vänern with the Kattegat, serving as a vital waterway for trade and transport in Sweden.', 'Viking Age', 'Enabled trade and transport between Lake Vänern and the Kattegat, supporting settlements and trade in the region.', 'Enabled trade and transport between Lake Vänern and the Kattegat, supporting settlements and trade in the region.', '#0369a1', 6, 'primary', NULL),
('Stångån', 'Stångån River', 'The natural river that flows through Söderköping to Slätbaken (Baltic Sea), crucial for medieval trade.', 'Viking Age', 'Made Söderköping an important medieval trading town.', 'Made Söderköping an important medieval trading town.', '#0369a1', 6, 'primary', NULL),
('Nemunas', 'Nemunas River', 'The Nemunas River flows through Belarus and Lithuania to the Curonian Lagoon, providing access to the Baltic Sea.', 'Viking Age', 'Enabled trade and transport between inland areas and the Baltic Sea.', 'Enabled trade and transport between inland areas and the Baltic Sea.', '#0369a1', 6, 'primary', NULL),
('Oder', 'Oder River', 'The Oder River flows through the Czech Republic, Poland, and Germany to the Baltic Sea, serving as a trade route.', 'Viking Age', 'Facilitated trade and transport between Central Europe and the Baltic Sea.', 'Facilitated trade and transport between Central Europe and the Baltic Sea.', '#0369a1', 6, 'primary', NULL),
('Vistula', 'Vistula River', 'The Vistula River flows through Poland to the Baltic Sea, serving as a major trade and transport route.', 'Viking Age', 'Enabled trade and transport within Poland and to the Baltic Sea.', 'Enabled trade and transport within Poland and to the Baltic Sea.', '#0369a1', 6, 'primary', NULL),
('Elbe', 'Elbe River', 'The Elbe River flows through the Czech Republic and Germany to the North Sea, serving as a major trade route.', 'Viking Age', 'Connected inland areas with the North Sea, facilitating trade and transport.', 'Connected inland areas with the North Sea, facilitating trade and transport.', '#0369a1', 6, 'primary', NULL),
('Rhine', 'Rhine River', 'The Rhine River flows through Switzerland, Germany, France, and the Netherlands to the North Sea, serving as a major trade route.', 'Viking Age', 'Enabled trade and transport between inland Europe and the North Sea.', 'Enabled trade and transport between inland Europe and the North Sea.', '#0369a1', 6, 'primary', NULL);

-- Insert Eastern Trade Routes
INSERT INTO public.river_systems (name, name_en, description, period, significance, historical_significance, color, width, importance, type) VALUES
('Daugava-rutten', 'Daugava Route', 'Huvudled från Östersjön via Riga till Dnjepr och Svarta havet', '800-1100 CE', 'En av vikingatidens viktigaste östliga handelsrutter till Konstantinopel', 'En av vikingatidens viktigaste östliga handelsrutter till Konstantinopel', '#1e40af', 4, 'primary', 'river_route'),
('Volchov-rutten', 'Volchov Route', 'Färdväg via Finska viken, Neva och Ladoga till Novgorod', '750-1100 CE', 'Viktig koppling mellan Östersjön och ryska inlandet', 'Viktig koppling mellan Östersjön och ryska inlandet', '#7c3aed', 4, 'primary', 'river_route'),
('Göta älv-rutten', 'Göta River Route', 'Västlig handelsled via Göta älv från Kattegatt', '900-1200 CE', 'Viktig västlig hamn och förbindelse till kontinenten', 'Viktig västlig hamn och förbindelse till kontinenten', '#059669', 3, 'secondary', 'river_route'),
('Akerselva-rutten', 'Akerselva Route', 'Lokalflod genom Oslo, etablerad som handelsplats 1048', '1000-1200 CE', 'Harald Hardradas handelsplats, blev Oslo', 'Harald Hardradas handelsplats, blev Oslo', '#dc2626', 2, 'secondary', 'river_route'),
('Klarälven-rutten', 'Klarälven Route', 'Transportled mellan Norge och Sverige via Värmland', '700-1200 CE', 'Pulsåder genom Värmland, naturlig kommunikationsled', 'Pulsåder genom Värmland, naturlig kommunikationsled', '#2563eb', 3, 'secondary', 'river_route'),
('Torneälven-rutten', 'Torne River Route', 'Gränsflod mellan Sverige och Finland, nordlig handelsled', '800-1200 CE', 'Viktig för handel och transport i norr', 'Viktig för handel och transport i norr', '#7c2d12', 2, 'secondary', 'river_route'),
('Piteälven-rutten', 'Pite River Route', 'Norrländsk flod, handelsled i norr', '800-1200 CE', 'Del av norrländska handelsnätverket', 'Del av norrländska handelsnätverket', '#92400e', 2, 'secondary', 'river_route'),
('Trave-rutten', 'Trave Route', 'Tyskt handelscentrum vid Östersjön', '800-1200 CE', 'Lübeck utvecklades från slavisk bosättning Liubice (819)', 'Lübeck utvecklades från slavisk bosättning Liubice (819)', '#1f2937', 3, 'secondary', 'river_route');

-- Now insert coordinates for each river system
-- Get the river system IDs for coordinate insertion

-- Ljungbyån coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 56.63, 16.32, 'Hossmo (källområde)', 'Början av Ljungbyån', false, false FROM river_systems WHERE name = 'Ljungbyån'
UNION ALL
SELECT id, 2, 56.64, 16.28, 'Krankelösa', NULL, false, false FROM river_systems WHERE name = 'Ljungbyån'
UNION ALL  
SELECT id, 3, 56.66, 16.24, 'Öbbestorp', NULL, false, false FROM river_systems WHERE name = 'Ljungbyån'
UNION ALL
SELECT id, 4, 56.68, 16.20, 'Harby', NULL, false, false FROM river_systems WHERE name = 'Ljungbyån'
UNION ALL
SELECT id, 5, 56.70, 16.16, 'Källstorp', NULL, false, false FROM river_systems WHERE name = 'Ljungbyån'
UNION ALL
SELECT id, 6, 56.71, 16.35, 'Kalmarsund', 'Mynning', false, false FROM river_systems WHERE name = 'Ljungbyån';

-- Ronnebyån coordinates  
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 56.85, 14.85, 'Rottnen (källa)', NULL, true, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 2, 56.75, 14.90, 'Knäsjön', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 3, 56.65, 14.95, 'Veden', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 4, 56.55, 15.00, 'Hammaren', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 5, 56.45, 15.05, 'Viren', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 6, 56.35, 15.10, 'Bastsjön', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 7, 56.25, 15.15, 'Hobergssjön', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 8, 56.22, 15.25, 'Kallinge', NULL, true, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 9, 56.21, 15.27, 'Ronneby', NULL, true, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 10, 56.20, 15.28, 'Ronneby brunn', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 11, 56.18, 15.30, 'Ronnebyhamn', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån'
UNION ALL
SELECT id, 12, 56.16, 15.32, 'Ronnebyfjärden (mynning)', NULL, false, false FROM river_systems WHERE name = 'Ronnebyån';

-- Emån coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 57.3000, 14.2000, 'Storesjön (källområde)', NULL, true, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 2, 57.2500, 14.3500, 'Lillesjön', NULL, false, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 3, 57.1500, 14.6000, 'Eksjö', NULL, true, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 4, 57.0000, 14.9000, 'Vetlanda', NULL, true, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 5, 56.9000, 15.2000, 'Hultsfred', NULL, false, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 6, 56.8000, 15.5000, 'Högsby', NULL, false, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 7, 56.7000, 15.8000, 'Mönsterås', NULL, true, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 8, 56.6500, 16.1000, 'Oskarshamn', NULL, true, false FROM river_systems WHERE name = 'Emån'
UNION ALL
SELECT id, 9, 56.6200, 16.4500, 'Em (mynning i Kalmarsund)', NULL, false, false FROM river_systems WHERE name = 'Emån';

-- Daugava Route coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 56.9496, 24.1052, 'Riga', 'Viktig östersjöhamn och handelscentrum', true, false FROM river_systems WHERE name = 'Daugava-rutten'
UNION ALL
SELECT id, 2, 56.5, 25.5, 'Daugava uppströms', NULL, false, false FROM river_systems WHERE name = 'Daugava-rutten'
UNION ALL
SELECT id, 3, 55.8, 26.5, 'Daugava-Dnjepr portage', 'Viktig bärställe mellan floderna', false, true FROM river_systems WHERE name = 'Daugava-rutten'
UNION ALL
SELECT id, 4, 50.4501, 30.5234, 'Kiev', 'Huvudstad i Kievriket', true, false FROM river_systems WHERE name = 'Daugava-rutten';

-- Volchov Route coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 59.9311, 30.3609, 'St. Petersburg/Neva', NULL, true, false FROM river_systems WHERE name = 'Volchov-rutten'
UNION ALL
SELECT id, 2, 60.1, 32.3, 'Ladoga', NULL, false, false FROM river_systems WHERE name = 'Volchov-rutten'
UNION ALL
SELECT id, 3, 60.1272, 32.2963, 'Staraja Ladoga', 'Äldsta ryska staden, viktig handelsplats', true, false FROM river_systems WHERE name = 'Volchov-rutten'
UNION ALL
SELECT id, 4, 58.5219, 31.2756, 'Novgorod', 'Stor handelsrepublik', true, false FROM river_systems WHERE name = 'Volchov-rutten';

-- Göta älv Route coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 57.8708, 11.9886, 'Kungälv', 'Kungahälla - äldsta staden vid Göta älv', true, false FROM river_systems WHERE name = 'Göta älv-rutten'
UNION ALL
SELECT id, 2, 58.0, 12.3, 'Lödöse', 'Viktig medeltida handelsstad', true, false FROM river_systems WHERE name = 'Göta älv-rutten'
UNION ALL
SELECT id, 3, 58.2, 12.6, 'Lilla Edet', 'Forsar som begränsade sjöfarten', false, true FROM river_systems WHERE name = 'Göta älv-rutten';

-- Add a few more key coordinates for major rivers
-- Helgeå coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 56.20, 13.90, 'Helgeå källa', NULL, false, false FROM river_systems WHERE name = 'Helgeå'
UNION ALL
SELECT id, 2, 56.15, 14.25, 'Kristianstad', NULL, true, false FROM river_systems WHERE name = 'Helgeå'
UNION ALL
SELECT id, 3, 56.10, 14.55, 'Hanöbukten', NULL, false, false FROM river_systems WHERE name = 'Helgeå';

-- Dalälven coordinates
INSERT INTO public.river_coordinates (river_system_id, sequence_order, latitude, longitude, name, description, is_trading_post, is_portage)
SELECT id, 1, 60.60, 12.50, 'Dalälvens källområde', NULL, false, false FROM river_systems WHERE name = 'Dalälven'
UNION ALL
SELECT id, 2, 60.67, 17.14, 'Gävle', NULL, true, false FROM river_systems WHERE name = 'Dalälven'
UNION ALL
SELECT id, 3, 60.72, 17.20, 'Gävlebukten', NULL, false, false FROM river_systems WHERE name = 'Dalälven';