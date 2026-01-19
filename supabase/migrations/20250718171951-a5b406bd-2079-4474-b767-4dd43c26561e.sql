-- Lägg till koordinater för Medelpads runstenar
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
-- M 1 redan har koordinater
('M 2', 62.257153, 17.373571, 'User provided exact coordinates', 'high', 'Njurunda kyrka coordinates'),
('M 3', 62.270799, 17.410775, 'User provided exact coordinates', 'high', 'Bergastenen coordinates'),
('M 4', 62.312478, 17.055022, 'User provided exact coordinates', 'high', 'Attmars kyrka fragment coordinates'),
-- M 5 redan har koordinater
('M 6', 62.314037, 17.103359, 'User provided exact coordinates', 'high', 'Målastenen coordinates'),
('M 7', 62.327486, 17.065603, 'User provided exact coordinates', 'high', 'Tuna kyrka coordinates'),
('M 8', 62.359714, 17.036205, 'User provided exact coordinates', 'high', 'Skölestenen coordinates'),
('M 9', 62.4054, 17.2087, 'User provided exact coordinates', 'high', 'Selångers kyrkogård coordinates'),
-- M 10 har delvis koordinater, uppdatera om nödvändigt
('M 11', 62.400702, 17.257731, 'User provided exact coordinates', 'high', 'Högom coordinates'),
('M 12', 62.4225, 17.184, 'User provided exact coordinates', 'high', 'Silje coordinates'),
('M 13', 62.435589, 17.161695, 'User provided exact coordinates', 'high', 'Oxstastenen coordinates'),
('M 14', 62.455092, 17.132695, 'User provided exact coordinates', 'high', 'Sättna Byn coordinates'),
('M 15', 62.447912, 17.352459, 'User provided exact coordinates', 'high', 'Sköns kyrka coordinates'),
('M 16', 62.447912, 17.352459, 'User provided exact coordinates', 'high', 'Sköns kyrka fragment coordinates'),
('M 17', 62.448, 17.3527, 'User provided exact coordinates', 'high', 'Sköns kyrka fragment coordinates'),
('M 18', 62.4761, 17.3158, 'User provided exact coordinates', 'high', 'Timrå kyrka coordinates')

ON CONFLICT (signum) DO NOTHING;