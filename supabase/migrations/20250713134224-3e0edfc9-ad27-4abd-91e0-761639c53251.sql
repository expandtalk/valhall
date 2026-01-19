-- Systematisk fix för kända runstenar med koordinater

-- U 15 Ingeborgsstenen - Ekerö kyrka
UPDATE runic_inscriptions SET coordinates = point(17.8381, 59.2703) WHERE signum = 'U 15' AND coordinates IS NULL;

-- Sparlösastenen Vg 119
UPDATE runic_inscriptions SET coordinates = point(13.4167, 58.6167) WHERE signum = 'Vg 119' AND coordinates IS NULL;

-- Några Södermanland stenar
UPDATE runic_inscriptions SET coordinates = point(17.1167, 59.25) WHERE signum = 'Sö 154' AND coordinates IS NULL;

-- Småland stenar  
UPDATE runic_inscriptions SET coordinates = point(13.7667, 56.8667) WHERE signum = 'Sm 39' AND coordinates IS NULL;

-- Skåne/Danmark stenar
UPDATE runic_inscriptions SET coordinates = point(13.1931, 55.7047) WHERE signum = 'DR 314' AND coordinates IS NULL;