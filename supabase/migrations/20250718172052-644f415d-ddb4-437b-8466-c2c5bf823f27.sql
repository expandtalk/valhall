-- Lägg till Dalarnas runstenar
INSERT INTO runic_inscriptions (signum, name, location, parish, municipality, landscape, country, object_type, dating_text, period_start, period_end) VALUES 
('D Fv1979;229', 'Blybleck', 'Dalarna', 'Okänd socken', 'Okänd kommun', 'Dalarna', 'Sverige', 'blybleck', 'Medeltiden', 1050, 1520),
('D Fv1980;230', 'Blybleck', 'Dalarna', 'Okänd socken', 'Okänd kommun', 'Dalarna', 'Sverige', 'blybleck', 'Medeltiden', 1050, 1520),
('D Fv1984;250', 'Bronsbleck', 'Dalarna', 'Okänd socken', 'Okänd kommun', 'Dalarna', 'Sverige', 'bronsbleck', 'Medeltiden', 1050, 1520),
('D Fv1993;174', 'By socken', 'By socken', 'By socken', 'Avesta kommun', 'Dalarna', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066),
('D TUNUM1972;25', 'Norr Hesse', 'Norr Hesse', 'Stora Tuna socken', 'Borlänge kommun', 'Dalarna', 'Sverige', 'runstensfragment', 'Vikingatiden', 793, 1066)

ON CONFLICT (signum) DO NOTHING;

-- Lägg till även de andra runfynden från Dalarna
INSERT INTO runic_inscriptions (signum, name, location, parish, municipality, landscape, country, object_type, dating_text, period_start, period_end) VALUES 
('D Hedemora', 'Hedemora kyrka', 'Hedemora', 'Hedemora socken', 'Hedemora kommun', 'Dalarna', 'Sverige', 'förmodad runsten', 'Okänd', NULL, NULL),
('D Transtrand', 'Norra Barrvallkojan', 'Norra Barrvallkojan', 'Transtrand socken', 'Malung-Sälen kommun', 'Dalarna', 'Sverige', 'runhäll', 'Medeltiden', 1050, 1520),
('D Våmhus', 'Nybolet', 'Nybolet', 'Våmhus socken', 'Rättvik kommun', 'Dalarna', 'Sverige', 'runhäll', 'Medeltiden', 1050, 1520)

ON CONFLICT (signum) DO NOTHING;