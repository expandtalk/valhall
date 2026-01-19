-- First, add coordinates for existing Närke runestones
UPDATE runic_inscriptions 
SET coordinates = POINT(14.891, 59.1249)
WHERE signum = 'Nä 32' AND landscape = 'Närke';

-- Add coordinates for Nä 33 (assuming Rinkaby kyrka coordinates)
UPDATE runic_inscriptions 
SET coordinates = POINT(15.2, 59.2)  -- Approximate coordinates for Rinkaby kyrka
WHERE signum = 'Nä 33' AND landscape = 'Närke';

-- Now insert the missing Närke runestones with their coordinates
INSERT INTO runic_inscriptions (
    signum, name, location, parish, landscape, country, coordinates, 
    alternative_signum, created_at, updated_at
) VALUES 
-- Nä 1 - Viby kyrka
('Nä 1', 'Viby kyrka', 'Viby kyrka', 'Viby socken', 'Närke', 'Sverige', 
 POINT(14.8712, 59.0603), ARRAY['L 1039'], now(), now()),

-- Nä 2 - Väla fingerring  
('Nä 2', 'Väla', 'Väla', 'Viby socken', 'Närke', 'Sverige', 
 POINT(14.8984, 59.074), ARRAY[]::text[], now(), now()),

-- Nä 3 - Frösvi, Edsberg
('Nä 3', 'Frösvi', 'Frösvi', 'Edsbergs socken', 'Närke', 'Sverige', 
 POINT(14.891, 59.1249), ARRAY[]::text[], now(), now()),

-- Nä 4 - Riseberga kloster
('Nä 4', 'Riseberga kloster', 'Riseberga kloster', 'Edsbergs socken', 'Närke', 'Sverige', 
 POINT(14.8928, 59.1544), ARRAY[]::text[], now(), now()),

-- Nä 5 - Riseberga kloster (ornamental)
('Nä 5', 'Riseberga kloster', 'Riseberga kloster', 'Edsbergs socken', 'Närke', 'Sverige', 
 POINT(14.8928, 59.1544), ARRAY[]::text[], now(), now()),

-- Nä 6 - Riseberga kloster (ornamental)
('Nä 6', 'Riseberga kloster', 'Riseberga kloster', 'Edsbergs socken', 'Närke', 'Sverige', 
 POINT(14.8928, 59.1544), ARRAY[]::text[], now(), now()),

-- Nä 7 - Riseberga kloster (ornamental, lost)
('Nä 7', 'Riseberga kloster', 'Riseberga kloster', 'Edsbergs socken', 'Närke', 'Sverige', 
 POINT(14.8928, 59.1544), ARRAY[]::text[], now(), now()),

-- Nä 8 - Kräcklinge kyrka
('Nä 8', 'Kräcklinge kyrka', 'Kräcklinge kyrka', 'Kräcklinge socken', 'Närke', 'Sverige', 
 POINT(15.0, 59.3), ARRAY[]::text[], now(), now()),

-- Nä 9 - Vesta, Kumla
('Nä 9', 'Vesta', 'Vesta', 'Kumla socken', 'Närke', 'Sverige', 
 POINT(15.1, 59.1), ARRAY[]::text[], now(), now()),

-- Nä 11 - Odensbacken
('Nä 11', 'Odensbacken', 'Odensbacken', 'Odensbacken socken', 'Närke', 'Sverige', 
 POINT(15.2, 59.4), ARRAY[]::text[], now(), now()),

-- Nä 12 - Stora Mellösa kyrka
('Nä 12', 'Stora Mellösa kyrka', 'Stora Mellösa kyrka', 'Stora Mellösa socken', 'Närke', 'Sverige', 
 POINT(15.3, 59.2), ARRAY[]::text[], now(), now()),

-- Nä 13 - Stora Mellösa kyrka  
('Nä 13', 'Stora Mellösa kyrka', 'Stora Mellösa kyrka', 'Stora Mellösa socken', 'Närke', 'Sverige', 
 POINT(15.3, 59.2), ARRAY[]::text[], now(), now()),

-- Nä 14 - Rönneberga, Stora Mellösa
('Nä 14', 'Rönneberga', 'Rönneberga', 'Stora Mellösa socken', 'Närke', 'Sverige', 
 POINT(15.31, 59.21), ARRAY[]::text[], now(), now()),

-- Nä 15 - Åsby, Stora Mellösa
('Nä 15', 'Åsby', 'Åsby', 'Stora Mellösa socken', 'Närke', 'Sverige', 
 POINT(15.32, 59.22), ARRAY[]::text[], now(), now()),

-- Nä 18 - Kumla by, Hovsta
('Nä 18', 'Kumla by', 'Kumla by', 'Hovsta socken', 'Närke', 'Sverige', 
 POINT(15.1, 59.13), ARRAY[]::text[], now(), now()),

-- Nä 19 - Täby kyrka
('Nä 19', 'Täby kyrka', 'Täby kyrka', 'Täby socken', 'Närke', 'Sverige', 
 POINT(15.0, 59.4), ARRAY[]::text[], now(), now()),

-- Nä 20 - Granhammars kyrka, Vintrosa
('Nä 20', 'Granhammars kyrka', 'Granhammars kyrka', 'Vintrosa socken', 'Närke', 'Sverige', 
 POINT(15.05, 59.41), ARRAY[]::text[], now(), now()),

-- Nä 23 - Glanshammars kyrka
('Nä 23', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammar socken', 'Närke', 'Sverige', 
 POINT(15.1, 59.5), ARRAY[]::text[], now(), now()),

-- Nä 26 - Glanshammars kyrka
('Nä 26', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammar socken', 'Närke', 'Sverige', 
 POINT(15.11, 59.51), ARRAY[]::text[], now(), now()),

-- Nä 27 - Glanshammars kyrka
('Nä 27', 'Glanshammars kyrka', 'Glanshammars kyrka', 'Glanshammar socken', 'Närke', 'Sverige', 
 POINT(15.12, 59.52), ARRAY[]::text[], now(), now()),

-- Nä 29 - Apelboda, Glanshammar
('Nä 29', 'Apelboda', 'Apelboda', 'Glanshammar socken', 'Närke', 'Sverige', 
 POINT(15.13, 59.53), ARRAY[]::text[], now(), now()),

-- Nä 31 - Södra Lunger, Götlunda
('Nä 31', 'Södra Lunger', 'Södra Lunger', 'Götlunda socken', 'Närke', 'Sverige', 
 POINT(14.89, 59.125), ARRAY[]::text[], now(), now()),

-- Nä 34 - Nasta, Rinkaby
('Nä 34', 'Nasta', 'Nasta', 'Rinkaby socken', 'Närke', 'Sverige', 
 POINT(15.21, 59.21), ARRAY[]::text[], now(), now());