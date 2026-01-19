-- Update coordinates for well-known runestones with accurate GPS data

-- Jarlabanke stones
UPDATE runic_inscriptions 
SET coordinates = point(18.0633, 59.4994), current_location = 'Jarlabankes bro, Täby kyrkby'
WHERE signum IN ('U 164', 'U 165');

UPDATE runic_inscriptions 
SET coordinates = point(18.0426, 59.3976), current_location = 'Danderyds kyrka'
WHERE signum = 'U 127';

UPDATE runic_inscriptions 
SET coordinates = point(17.9569, 59.5181), current_location = 'Fresta kyrka'
WHERE signum = 'U 261';

-- Runestones at Skansen, Stockholm
UPDATE runic_inscriptions 
SET coordinates = point(18.1038, 59.3247), current_location = 'Skansen, Stockholm'
WHERE signum IN ('U 72', 'U 419', 'U 871');

-- Famous individual stones
UPDATE runic_inscriptions 
SET coordinates = point(17.6742, 59.8579), current_location = 'Vaksala kyrka/Vaksalahöjden'
WHERE signum = 'U 961';

-- University Park Uppsala stones
UPDATE runic_inscriptions 
SET coordinates = point(17.6333, 59.8583), current_location = 'Universitetsparken, Uppsala'
WHERE signum IN ('U 489', 'U 896', 'U 931', 'U 932', 'U 933', 'U 934', 'U 935', 'U 937', 'U 938', 'U 939', 'U 940', 'U 1011');

-- Uppsala Cathedral stones
UPDATE runic_inscriptions 
SET coordinates = point(17.6333, 59.8583), current_location = 'Uppsala domkyrka'
WHERE signum IN ('U 922', 'U 923', 'U 924', 'U 925', 'U 926', 'U 927', 'U 928', 'U 929', 'U 930');

-- Gamla Uppsala church stones
UPDATE runic_inscriptions 
SET coordinates = point(17.6354, 59.8978), current_location = 'Gamla Uppsala kyrka'
WHERE signum IN ('U 978', 'U 979', 'U 980', 'U 981');

-- Church locations with multiple stones
UPDATE runic_inscriptions 
SET coordinates = point(17.5318, 59.3601)
WHERE signum IN ('U 1', 'U 2') AND location LIKE '%Adelsö%';

UPDATE runic_inscriptions 
SET coordinates = point(17.7483, 59.2724)
WHERE signum = 'U 15' AND location LIKE '%Ekerö%';

UPDATE runic_inscriptions 
SET coordinates = point(17.7026, 59.3909)
WHERE signum IN ('U 23', 'U 24', 'U 25', 'U 26', 'U 27', 'U 28') AND location LIKE '%Hilleshög%';

UPDATE runic_inscriptions 
SET coordinates = point(17.8395, 59.3211)
WHERE signum IN ('U 46', 'U 47', 'U 48', 'U 49', 'U 50') AND location LIKE '%Lovö%';

UPDATE runic_inscriptions 
SET coordinates = point(17.9121, 59.3914)
WHERE signum IN ('U 61', 'U 62', 'U 63', 'U 64', 'U 65', 'U 66', 'U 67', 'U 68') AND location LIKE '%Spånga%';

UPDATE runic_inscriptions 
SET coordinates = point(17.8712, 59.4087)
WHERE signum IN ('U 82', 'U 83') AND location LIKE '%Järfälla%';

UPDATE runic_inscriptions 
SET coordinates = point(17.9188, 59.4665)
WHERE signum IN ('U 94', 'U 95') AND location LIKE '%Sollentuna%';

UPDATE runic_inscriptions 
SET coordinates = point(18.0242, 59.353)
WHERE signum = 'U 120' AND location LIKE '%Solna%';

UPDATE runic_inscriptions 
SET coordinates = point(17.6742, 59.8579)
WHERE signum IN ('U 959', 'U 960', 'U 962', 'U 963', 'U 964', 'U 965', 'U 966', 'U 967') AND location LIKE '%Vaksala%';

-- Färentuna kyrka with exact coordinates
UPDATE runic_inscriptions 
SET coordinates = point(17.6556, 59.3919)
WHERE signum IN ('U 20', 'U 21') AND location LIKE '%Färentuna%';

-- Arlanda Terminal 2
UPDATE runic_inscriptions 
SET coordinates = point(17.9180, 59.6519), current_location = 'Terminal 2, Arlanda flygplats'
WHERE signum = 'U Fv1992;157';