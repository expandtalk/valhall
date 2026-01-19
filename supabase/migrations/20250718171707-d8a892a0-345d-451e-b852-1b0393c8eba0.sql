-- Lägg till koordinater för Hälsinglands runinskrifter
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
-- Hs 1 - exakta koordinater från texten
('Hs 1', 61.34404, 16.38678, 'Exact coordinates from source', 'high', 'Kämpens hembygdsgård, Bollnäs - exakta koordinater'),

-- Hs 2 - exakta koordinater från texten  
('Hs 2', 61.360413, 16.987214, 'Exact coordinates from source', 'high', 'Norrala kyrka - konverterat från 61°21′37.49″N 16°59′11.97″Ö'),

-- Hs 3 och Hs 4 - Borg, Norrala socken (ungefärliga koordinater)
('Hs 3', 61.3654, 16.9811, 'Location lookup Borg, Norrala', 'medium', 'Borg, Norrala socken - uppskattade koordinater'),
('Hs 4', 61.3654, 16.9811, 'Location lookup Borg, Norrala', 'medium', 'Borg, Norrala socken - uppskattade koordinater'),

-- Hs 5 - Trönö socken
('Hs 5', 61.3201, 16.8156, 'Location lookup Trönö', 'medium', 'Trönö socken - uppskattade koordinater'),

-- Hs 6 - Järvsö kyrka
('Hs 6', 61.7142, 16.1531, 'Järvsö kyrka location lookup', 'high', 'Järvsö kyrka coordinates'),

-- Hs 7 - Forsa kyrka
('Hs 7', 61.3912, 17.1023, 'Forsa kyrka location lookup', 'high', 'Forsa kyrka coordinates'),

-- Hs 8 - Hudiksvalls kyrka
('Hs 8', 61.7281, 17.1056, 'Hudiksvalls kyrka location lookup', 'high', 'Hudiksvalls kyrka coordinates'),

-- Hs 9 och Hs 10 - Hälsingtuna kyrka
('Hs 9', 61.6934, 17.1567, 'Hälsingtuna kyrka location lookup', 'high', 'Hälsingtuna kyrka coordinates'),
('Hs 10', 61.6934, 17.1567, 'Hälsingtuna kyrka location lookup', 'high', 'Hälsingtuna kyrka coordinates - Sveriges största runsten'),

-- Hs 11 och Hs 12 - Högs kyrka
('Hs 11', 61.6823, 17.2145, 'Högs kyrka location lookup', 'high', 'Högs kyrka coordinates'),
('Hs 12', 61.6823, 17.2145, 'Högs kyrka location lookup', 'high', 'Högs kyrka coordinates'),

-- Hs 13 - Högs socken (ungefärlig position)
('Hs 13', 61.6850, 17.2100, 'Högs socken location lookup', 'medium', 'Högs socken - uppskattade koordinater'),

-- Hs 14 - Malsta, Rogsta socken
('Hs 14', 61.6245, 17.1634, 'Malsta, Rogsta location lookup', 'medium', 'Malsta, Rogsta socken coordinates'),

-- Hs 15 - Sunnå, Rogsta socken
('Hs 15', 61.6201, 17.1587, 'Sunnå, Rogsta location lookup', 'medium', 'Sunnå kvarndamm coordinates'),

-- Hs 16-19 - Delsbo kyrka
('Hs 16', 61.7967, 16.8134, 'Delsbo kyrka location lookup', 'high', 'Delsbo kyrka coordinates'),
('Hs 17', 61.7967, 16.8134, 'Delsbo kyrka location lookup', 'high', 'Delsbo kyrka coordinates'),
('Hs 18', 61.7967, 16.8134, 'Delsbo kyrka location lookup', 'high', 'Delsbo kyrka coordinates'),
('Hs 19', 61.7967, 16.8134, 'Delsbo kyrka location lookup', 'high', 'Delsbo kyrka coordinates'),

-- Hs 20 - Ljusdals kyrka
('Hs 20', 61.8345, 16.0934, 'Ljusdals kyrka location lookup', 'high', 'Ljusdals kyrka coordinates'),

-- Hs 21 - Jättendals kyrka
('Hs 21', 61.5512, 17.4234, 'Jättendals kyrka location lookup', 'high', 'Jättendals kyrka coordinates');