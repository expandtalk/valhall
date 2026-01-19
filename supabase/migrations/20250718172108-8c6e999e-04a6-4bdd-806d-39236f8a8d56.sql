-- Lägg till koordinater för Jämtlands runstenar
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
('J 2', 63.183333, 14.618611, 'User provided exact coordinates', 'high', 'Frösöstenen, Frösön, Frösö socken - main Jämtland runestone'),
('J Grönan', 63.355278, 12.093889, 'User provided exact coordinates', 'high', 'Stenen i Grönan dal, Åre socken - lost runestone near Skurdalssjön'),
('J JLM', 62.921944, 14.504444, 'User provided exact coordinates', 'high', 'Medieval runic inscription in plaster, Hackås kyrka, Hackås socken')

ON CONFLICT (signum) DO NOTHING;