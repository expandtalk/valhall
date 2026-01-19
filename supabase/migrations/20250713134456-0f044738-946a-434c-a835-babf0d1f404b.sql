-- Stor datafix fas 4: Smålands och Skånes runstenar

-- Smålands runstenar
UPDATE runic_inscriptions SET name = 'Nöbbeleholmssten', name_en = 'Nöbbelesholm Stone' WHERE signum = 'Sm 101' AND (name IS NULL OR name = '');

-- Östergötlands runstenar (förutom Rökstenen)
UPDATE runic_inscriptions SET name = 'Biskopsbergasten', name_en = 'Biskopsberga Stone' WHERE signum = 'Ög 62' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Frackstadsstenen', name_en = 'Frackstad Stone' WHERE signum = 'Ög 186' AND (name IS NULL OR name = '');

-- Skånes/Danmarks runstenar
UPDATE runic_inscriptions SET name = 'Lundagårdsstenen', name_en = 'Lundagård Stone' WHERE signum = 'DR 314' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Gårdstångasten 3', name_en = 'Gårdstånga Stone 3' WHERE signum = 'DR 331' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Västra Strömonumentet 1', name_en = 'West Strö Monument 1' WHERE signum = 'DR 334' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Västra Strömonumentet 2', name_en = 'West Strö Monument 2' WHERE signum = 'DR 335' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Vallebergastenen', name_en = 'Valleberga Stone' WHERE signum = 'DR 337' AND (name IS NULL OR name = '');

-- Koordinater för dessa stenar
UPDATE runic_inscriptions SET coordinates = point(14.8667, 57.1167) WHERE signum = 'Sm 101' AND coordinates IS NULL; -- Nöbbelesholm
UPDATE runic_inscriptions SET coordinates = point(15.7, 58.45) WHERE signum = 'Ög 62' AND coordinates IS NULL; -- Biskopsberga
UPDATE runic_inscriptions SET coordinates = point(15.1, 58.3) WHERE signum = 'Ög 186' AND coordinates IS NULL; -- Frackstad