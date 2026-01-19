-- Stor datafix fas 3: Västergötlands runstenar

-- Västergötlands märkligaste runstenar
UPDATE runic_inscriptions SET name = 'Levenes kyrkosten', name_en = 'Levene Church Stone' WHERE signum = 'Vg 117' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Norra Härenes sten', name_en = 'North Härene Stone' WHERE signum = 'Vg 59' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Grästorpsstenen', name_en = 'Grästorp Stone' WHERE signum = 'Vg 181' AND (name IS NULL OR name = '');
UPDATE runic_inscriptions SET name = 'Västanåkerstenen', name_en = 'Västanåker Stone' WHERE signum = 'Vg 20' AND (name IS NULL OR name = '');

-- Koordinater för Västergötland  
UPDATE runic_inscriptions SET coordinates = point(13.45, 58.4) WHERE signum = 'Vg 117' AND coordinates IS NULL; -- Levene kyrka
UPDATE runic_inscriptions SET coordinates = point(13.2667, 58.5) WHERE signum = 'Vg 59' AND coordinates IS NULL; -- Norra Härene
UPDATE runic_inscriptions SET coordinates = point(12.9167, 58.35) WHERE signum = 'Vg 181' AND coordinates IS NULL; -- Grästorp
UPDATE runic_inscriptions SET coordinates = point(13.3, 58.55) WHERE signum = 'Vg 20' AND coordinates IS NULL; -- Västanåker