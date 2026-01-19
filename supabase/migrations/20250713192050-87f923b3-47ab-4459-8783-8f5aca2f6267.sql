-- Add coordinates for Bornholm runestones based on known church and location positions

-- Klemensker kyrka (multiple stones)
UPDATE runic_inscriptions 
SET coordinates = point(14.7494, 55.1892)
WHERE signum IN ('DK Bh 1', 'DK Bh 5', 'DK Bh 6', 'DK Bh 7', 'DK Bh 8', 'DK Bh 9');

-- Hasle kyrka/kyrkogård
UPDATE runic_inscriptions 
SET coordinates = point(14.7067, 55.1900)
WHERE signum = 'DK Bh 4';

-- Allinge kyrkogård
UPDATE runic_inscriptions 
SET coordinates = point(14.7938, 55.2219)
WHERE signum = 'DK Bh 2';

-- Rutsker kyrka
UPDATE runic_inscriptions 
SET coordinates = point(14.6722, 55.2528)
WHERE signum = 'DK Bh 10';

-- Rø kyrka
UPDATE runic_inscriptions 
SET coordinates = point(14.7069, 55.2000)
WHERE signum = 'DK Bh 12';

-- Bodilsker kyrka (multiple stones)
UPDATE runic_inscriptions 
SET coordinates = point(14.8597, 55.1389)
WHERE signum IN ('DK Bh 13', 'DK Bh 15', 'DK Bh 16', 'DK Bh 17');

-- Åkirkeby kyrka (multiple stones)
UPDATE runic_inscriptions 
SET coordinates = point(14.9025, 55.0631)
WHERE signum IN ('DK Bh 27', 'DK Bh 28', 'DK Bh 30');

-- Nyker kyrka
UPDATE runic_inscriptions 
SET coordinates = point(14.7417, 55.1778)
WHERE signum = 'DK Bh 31';

-- Update older Bornholm stones without DK prefix but with clear locations
-- Klemensker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.7494, 55.1892)
WHERE signum IN ('Bh 6', 'Bh 7', 'Bh 8', 'Bh 9') AND parish = 'Klemensker sogn';

-- Åker sogn stones  
UPDATE runic_inscriptions 
SET coordinates = point(14.9025, 55.0631)
WHERE signum IN ('Bh 27', 'Bh 28', 'Bh 29', 'Bh 3', 'Bh 30', 'Bh 62', 'Bh 65', 'Bh 67') AND parish = 'Åker sogn';

-- Bodilsker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.8597, 55.1389)
WHERE signum IN ('Bh 1', 'Bh 13', 'Bh 14', 'Bh 15', 'Bh 16', 'Bh 17') AND parish = 'Bodilsker sogn';

-- Rutsker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.6722, 55.2528)
WHERE signum IN ('Bh 10', 'Bh 11') AND parish = 'Rutsker sogn';

-- Rø sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.7069, 55.2000)
WHERE signum = 'Bh 12' AND parish = 'Rø sogn';

-- Poulsker/Povlsker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.8333, 55.1167)
WHERE signum IN ('Bh 2', 'Bh 23', 'Bh 24', 'Bh 25', 'Bh 26', 'Bh 64') AND parish IN ('Poulsker sogn', 'Povlsker sogn');

-- Pedersker sogn stones  
UPDATE runic_inscriptions 
SET coordinates = point(14.8944, 55.1167)
WHERE signum IN ('Bh 18', 'Bh 19', 'Bh 20', 'Bh 21', 'Bh 22') AND parish = 'Pedersker sogn';

-- Vester Marie sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.6833, 55.2167)
WHERE signum IN ('Bh 4', 'Bh 38', 'Bh 39', 'Bh 40', 'Bh 41', 'Bh 42', 'Bh 43', 'Bh 63') AND parish = 'Vester Marie sogn';

-- Øster Marie sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.7167, 55.1833)
WHERE signum IN ('Bh 5', 'Bh 51', 'Bh 52', 'Bh 53', 'Bh 54', 'Bh 55', 'Bh 56', 'Bh 57', 'Bh 58', 'Bh 59', 'Bh 60') AND parish = 'Øster Marie sogn';

-- Nyker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.7417, 55.1778)
WHERE signum = 'Bh 32' AND parish = 'Nyker sogn';

-- Ny Larsker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.8000, 55.1667)
WHERE signum IN ('Bh 33', 'Bh 34', 'Bh 35', 'Bh 36') AND parish = 'Ny Larsker sogn';

-- Øster Larsker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.8167, 55.1500)
WHERE signum IN ('Bh 47', 'Bh 48', 'Bh 49', 'Bh 50') AND parish = 'Øster Larsker sogn';

-- Ibsker sogn stones
UPDATE runic_inscriptions 
SET coordinates = point(14.8667, 55.1167)
WHERE signum IN ('Bh 44', 'Bh 45', 'Bh 46', 'Bh 68') AND parish = 'Ibsker sogn';

-- Rønne stones
UPDATE runic_inscriptions 
SET coordinates = point(14.6917, 55.1000)
WHERE signum = 'Bh 37' AND parish = 'Rønne';