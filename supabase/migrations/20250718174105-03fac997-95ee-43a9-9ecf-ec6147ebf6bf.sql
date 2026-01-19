-- Lägg till koordinater för isländska runinskrifter
INSERT INTO additional_coordinates (signum, latitude, longitude, source, confidence, notes) VALUES 
('IS IR;174', 65.691, -17.5977, 'User provided exact coordinates', 'high', 'Ljósavatn, runsten i basalt, 1400-talet, gravsten för Halldóra Þorgísls dóttir'),
('IS IR;181', 66.2398, -16.4301, 'User provided exact coordinates', 'high', 'Valþjófsstaðir, kyrkdörr i trä, ca 1200, med drakberättelse'),
('IS IR;166', 65.543, -18.0758, 'User provided exact coordinates', 'high', 'Munkaþverá, runsten i basalt, 1400-talet, gravsten för Vígdís Árna dóttir'),
('IS RunaIslandi52', 65.8199, -17.3799, 'User provided exact coordinates', 'high', 'Múli, prisma i basalt, 1475-1500, namninskrift Ingiríðr'),
('IS IR;200', 63.9598, -17.577, 'User provided exact coordinates', 'high', 'Núpstaðir, fragment av runsten i basalt, medeltid, gravsten för Bjǫrn'),
('IS RunaIslandi16', 63.683, -19.5289, 'User provided exact coordinates', 'high', 'Kalmanstunga, prisma i basalt, ca 1429, gravsten för Jón Gísl son'),
('IS IR;207B', 63.6699, -19.8986, 'User provided exact coordinates', 'high', 'Stóramörk, sländtrissa i sten, 1300-talet, Maria och fuþark-alfabet')

ON CONFLICT (signum) DO NOTHING;