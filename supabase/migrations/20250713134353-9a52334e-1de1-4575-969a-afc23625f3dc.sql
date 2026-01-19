-- Stor datafix fas 1: Alla Upplands runstenar från din lista

-- Jarlabankestenarna och andra viktiga Upplandstenar
UPDATE runic_inscriptions SET name = 'Jarlabankesten 1', name_en = 'Jarlabanke Stone 1' WHERE signum = 'U 101' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Jarlabankesten 2', name_en = 'Jarlabanke Stone 2' WHERE signum = 'U 127' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Norahällen', name_en = 'Nora Rock' WHERE signum = 'U 130' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Jarlabankesten vid bron', name_en = 'Jarlabanke Bridge Stone' WHERE signum = 'U 164' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Jarlabankesten vid bron', name_en = 'Jarlabanke Bridge Stone' WHERE signum = 'U 165' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Stockholmsstenen', name_en = 'Stockholm Stone' WHERE signum = 'U 53' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Edsbackafragmentet', name_en = 'Edsbacka Fragment' WHERE signum = 'U 96' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Fjuckbystenen', name_en = 'Fjuckby Stone' WHERE signum = 'U 1016' AND (name IS NULL OR name = '');

-- Lägg till koordinater för viktiga Upplandstenar
UPDATE runic_inscriptions SET coordinates = point(17.8381, 59.2894) WHERE signum = 'U 101' AND coordinates IS NULL; -- Jarlabankesten Edsberg
UPDATE runic_inscriptions SET coordinates = point(18.0339, 59.4003) WHERE signum = 'U 127' AND coordinates IS NULL; -- Danderyds kyrka
UPDATE runic_inscriptions SET coordinates = point(18.0403, 59.4167) WHERE signum = 'U 130' AND coordinates IS NULL; -- Norahällen
UPDATE runic_inscriptions SET coordinates = point(18.0667, 59.4333) WHERE signum = 'U 164' AND coordinates IS NULL; -- Täby kyrkby
UPDATE runic_inscriptions SET coordinates = point(18.0667, 59.4333) WHERE signum = 'U 165' AND coordinates IS NULL; -- Täby kyrkby
UPDATE runic_inscriptions SET coordinates = point(18.0686, 59.3293) WHERE signum = 'U 53' AND coordinates IS NULL; -- Gamla stan Stockholm