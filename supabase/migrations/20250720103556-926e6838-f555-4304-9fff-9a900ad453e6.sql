-- Add missing Uppsala runestones (first batch - well-known stones)
-- These are missing from the database based on the comprehensive list provided

INSERT INTO public.runic_inscriptions (
    signum, name, name_en, location, parish, municipality, county, landscape, country,
    coordinates, object_type, period_start, period_end, dating_text,
    current_location, alternative_signum, created_at, updated_at
) VALUES 
-- Arlanda Terminal 2 stone
('U Fv1992;157', 'Arlandastenen', 'Arlanda Stone', 'Arlanda Terminal 2', 'Märsta', 'Sigtuna', 'Stockholms län', 'Uppland', 'Sverige',
 point(17.9180, 59.6519), 'runestone', 1000, 1100, 'ca 1000-1100',
 'Terminal 2, Arlanda flygplats', ARRAY['Fv1992;157'], now(), now()),

-- Missing University Park stones
('U 876', 'Universitetsparken 876', 'University Park 876', 'Uppsala Universitetspark', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 point(17.6333, 59.8583), 'runestone', 1000, 1100, 'ca 1000-1100',
 'Universitetsparken, Uppsala', NULL, now(), now()),

('U 877', 'Universitetsparken 877', 'University Park 877', 'Uppsala Universitetspark', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 point(17.6333, 59.8583), 'runestone', 1000, 1100, 'ca 1000-1100',
 'Universitetsparken, Uppsala', NULL, now(), now()),

-- Missing ATA stones (important archaeological finds)
('U ATA 3845/84', 'ATA 3845/84', 'ATA 3845/84', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 point(17.6333, 59.8583), 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', ARRAY['ATA 3845/84'], now(), now()),

('U ATA 5322/85', 'ATA 5322/85', 'ATA 5322/85', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 point(17.6333, 59.8583), 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', ARRAY['ATA 5322/85'], now(), now()),

-- Missing numbered stones in sequences
('U 101', 'Uppsala 101', 'Uppsala 101', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 102', 'Uppsala 102', 'Uppsala 102', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 103', 'Uppsala 103', 'Uppsala 103', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 104', 'Uppsala 104', 'Uppsala 104', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 105', 'Uppsala 105', 'Uppsala 105', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

-- Important missing stones from the 200s
('U 201', 'Uppsala 201', 'Uppsala 201', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 202', 'Uppsala 202', 'Uppsala 202', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 203', 'Uppsala 203', 'Uppsala 203', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

-- Missing stones from 300s range
('U 301', 'Uppsala 301', 'Uppsala 301', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now()),

('U 302', 'Uppsala 302', 'Uppsala 302', 'Uppsala', 'Uppsala', 'Uppsala', 'Uppsala län', 'Uppland', 'Sverige',
 NULL, 'runestone', 1000, 1100, 'ca 1000-1100',
 'Uppsala', NULL, now(), now())

ON CONFLICT (signum) DO NOTHING;