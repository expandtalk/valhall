-- Lägg till koordinater för Småland runstenar
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
('Sm 107', 57.4282, 15.0713, 'Vetlanda kyrkogård location lookup', 'high', 'Vetlanda kyrkogård coordinates'),
('Sm 114', 57.7796, 14.1525, 'Angerdshestra kyrka location lookup', 'high', 'Angerdshestra kyrka coordinates'),
('Sm 123', 58.0011, 14.2026, 'Brahekyrkan location lookup', 'high', 'Brahekyrkan, Visingsö coordinates'),
('Sm 128', 58.0426, 14.9782, 'Göberga location lookup', 'high', 'Göberga, Linderås coordinates'),
('Sm 50', 57.2896, 13.5341, 'Burseryds kyrka location lookup', 'high', 'Burseryds kyrka coordinates'),

-- Lägg till koordinater för Värmland runstenar
('Vr 1', 59.2854, 14.1357, 'Järsberg location lookup', 'high', 'Järsbergsstenen coordinates'),
('Vr 2', 59.4191, 13.8110, 'Rör location lookup', 'high', 'Väsestenen coordinates'),
('Vr 3', 59.3163, 13.5324, 'Västra Hovlanda location lookup', 'high', 'Hovlandastenen coordinates'),
('Vr 4', 59.6868, 13.4675, 'Övre Ulleruds kyrka location lookup', 'high', 'Övre Ulleruds kyrka coordinates'),
('Vr 5', 59.2047, 12.8147, 'Kila kyrka location lookup', 'high', 'Kila kyrka coordinates'),
('Vr NOR 1994;27', 59.8119, 12.5758, 'Skramle location lookup', 'high', 'Skramlestenen coordinates');

-- Uppdatera runic_inscriptions med koordinater från additional_coordinates
UPDATE runic_inscriptions 
SET coordinates = ST_MakePoint(ac.longitude, ac.latitude)
FROM additional_coordinates ac 
WHERE runic_inscriptions.signum = ac.signum 
AND runic_inscriptions.coordinates IS NULL;