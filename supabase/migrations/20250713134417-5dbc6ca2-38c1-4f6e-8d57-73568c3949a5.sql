-- Stor datafix fas 2: Södermanlands runstenar

-- Ingvarsstenarna och andra Södermanlandstenar
UPDATE runic_inscriptions SET name = 'Skarpåkerstenen', name_en = 'Skarpåker Stone' WHERE signum = 'Sö 154' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Lövhultastenen', name_en = 'Lövhulta Stone' WHERE signum = 'Sö 90' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Ingvarssten från Strängnäs', name_en = 'Ingvar Stone from Strängnäs' WHERE signum = 'Sö 277' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Skåängstenen', name_en = 'Skåäng Stone' WHERE signum = 'Sö 32' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Sundstastenen', name_en = 'Sundsta Stone' WHERE signum = 'Sö 229' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Lidsstenen', name_en = 'Lids Stone' WHERE signum = 'Sö 128' AND (name IS NULL OR name = '');

-- Koordinater för Södermanland
UPDATE runic_inscriptions SET coordinates = point(16.9833, 58.9167) WHERE signum = 'Sö 90' AND coordinates IS NULL; -- Lövhulta
UPDATE runic_inscriptions SET coordinates = point(17.0333, 59.3833) WHERE signum = 'Sö 277' AND coordinates IS NULL; -- Strängnäs
UPDATE runic_inscriptions SET coordinates = point(17.5497, 58.7544) WHERE signum = 'Sö 32' AND coordinates IS NULL; -- Skåäng
UPDATE runic_inscriptions SET coordinates = point(17.7167, 59.1333) WHERE signum = 'Sö 229' AND coordinates IS NULL; -- Sundsta
UPDATE runic_inscriptions SET coordinates = point(16.3667, 58.75) WHERE signum = 'Sö 128' AND coordinates IS NULL; -- Lids kyrka