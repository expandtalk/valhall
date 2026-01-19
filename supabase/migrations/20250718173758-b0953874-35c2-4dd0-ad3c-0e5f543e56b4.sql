-- Lägg till koordinater för Värmlands runstenar
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
('Vr 1', 59.285397, 14.1357, 'User provided exact coordinates', 'high', 'Järsbergsstenen, Järsberg, Varnum socken, Kristinehamn kommun'),
('Vr 2', 59.419081, 13.811025, 'User provided exact coordinates', 'high', 'Väsestenen, Rör, Väse socken, Karlstad kommun'),
('Vr 3', 59.316333, 13.532447, 'User provided exact coordinates', 'high', 'Hovlandastenen, Västra Hovlanda, Hammarö socken, Hammarö kommun'),
('Vr 4', 59.686814, 13.467469, 'User provided exact coordinates', 'high', 'Runsten/fotsten till dopfunt, Övre Ulleruds kyrka, Övre Ullerud socken, Forshaga kommun'),
('Vr 5', 59.204679, 12.814747, 'User provided exact coordinates', 'high', 'Kyrkklocka ca 1350, Kila kyrka, Kila socken, Säffle kommun'),
('Vr NOR1994;27', 59.811925, 12.575772, 'User provided exact coordinates', 'high', 'Skramlestenen, Stommen/Skramles udde, Gunnarskog socken, Arvika kommun'),
('Vr NOR1995;19A', 59.312472, 13.990033, 'User provided exact coordinates', 'high', 'Runbleck i bly, Karinrud/Saxholmen borgruin, Ölme socken, Kristinehamn kommun'),
('Vr NOR1995;19B', 59.312472, 13.990033, 'User provided exact coordinates', 'high', 'Sländtrissa, Karinrud/Saxholmen borgruin, Ölme socken, Kristinehamn kommun')

ON CONFLICT (signum) DO NOTHING;