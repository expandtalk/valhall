-- Lägg till koordinater för Frösö-runstenen
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
('J 2', 59.2510976, 14.9291008, 'User provided exact coordinates', 'high', 'Frösö runsten - exakta koordinater');

-- Lägg till saknade Medelpads runstenar med koordinater
INSERT INTO runic_inscriptions (signum, name, location, parish, municipality, landscape, country, object_type, dating_text, period_start, period_end) VALUES 
-- Kontrollera om dessa saknas och lägg till dem
('M 2', 'Njurunda kyrka', 'Njurunda kyrka', 'Njurunda socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('M 3', 'Bergastenen', 'Berga', 'Njurunda socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 4', 'Attmars kyrka', 'Attmarby, vid Attmars kyrka', 'Attmar socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('M 6', 'Målastenen', 'Målsta', 'Tuna socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 7', 'Tuna kyrka', 'Tuna kyrka', 'Tuna socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('M 8', 'Skölestenen', 'Sköle, Tuna hembygdsgård', 'Tuna socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 9', 'Selångers kyrkogård', 'Selångers kyrkogård', 'Selånger socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 11', 'Högom', 'Högom', 'Selånger socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 12', 'Silje', 'Silje', 'Selånger socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 13', 'Oxstastenen', 'Oxsta', 'Selånger socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('M 14', 'Byn', 'Byn', 'Sättna socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 15', 'Sköns kyrka', 'Sköns kyrka', 'Skön socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066),
('M 16', 'Sköns kyrka', 'Sköns kyrka', 'Skön socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('M 17', 'Sköns kyrka', 'Sköns kyrka', 'Skön socken', 'Sundsvall kommun', 'Medelpad', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('M 18', 'Timrå kyrka', 'Timrå kyrka', 'Timrå socken', 'Timrå kommun', 'Medelpad', 'Sverige', 'runsten', 'Vikingatiden', 793, 1066)

ON CONFLICT (signum) DO NOTHING;