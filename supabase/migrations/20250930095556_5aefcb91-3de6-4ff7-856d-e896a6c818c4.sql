-- Add important Danish and Scandinavian kings from the 10th century

-- Gorm den gamle (Gorm the Old)
INSERT INTO historical_kings (
  name,
  name_variations,
  region,
  reign_start,
  reign_end,
  death_year,
  status,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Gorm den gamle',
  ARRAY['Gorm Hardeknutsson', 'Vurm'],
  'Denmark',
  920,
  958,
  958,
  'historical',
  'male',
  'Kung av Danmark under första hälften av 900-talet. Den äldste kände danske kungen med obruten historicitet utan avbrott bland hans efterträdare. Far till Harald Blåtand. Under 950-talet tvingades han bli vasall åt den tyske kungen Otto I. Lät resa den lilla Jellingestenen och var gift med Tyra Danebot.',
  true,
  true
);

-- Harald Blåtand (Harald Bluetooth)
INSERT INTO historical_kings (
  name,
  name_variations,
  region,
  reign_start,
  reign_end,
  death_year,
  status,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Harald Blåtand',
  ARRAY['Harald Gormsson', 'Harald Bluetooth'],
  'Denmark',
  958,
  985,
  985,
  'historical',
  'male',
  'Kung av Danmark från 958 och av Norge från 970. Son till Gorm den gamle och Tyra Danebot. Införde kristendomen i Danmark. År 948 vigde ärkebiskop Adaldag tre biskopar för Danmark. Dog omkring 985 och begravdes i Roskilde år 983. Viktig händelse år 983 då han dog och begravdes i Roskilde.',
  true,
  true
);

-- Toke Gormsson
INSERT INTO historical_kings (
  name,
  name_variations,
  region,
  reign_start,
  reign_end,
  death_year,
  status,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Toke Gormsson',
  ARRAY['Toke Gormsen'],
  'Denmark',
  971,
  986,
  986,
  'semi_legendary',
  'male',
  'Hövding, kung eller småkung i västra Skåne, möjligen yngre bror till Harald Blåtand. Lydkung över Skåne. Avsatt år 983 efter händelserna i Roskilde, tillbringade tid i exil i Borgeby vid Löddeköpinge. Återinsatt som lydkung 984 efter vädjan från hans son Asbjörn till Sibir Fultarsson. Besegrade Björn Jarl vid Halör 984. Lät bygga flera kyrkor i Lund, däribland en kyrka till Johannes Döparen. Nämnd på runstenar i Torna Hällestad där han kallas "hulda drott".',
  true,
  true
);

-- Björn Jarl
INSERT INTO historical_kings (
  name,
  name_variations,
  region,
  reign_start,
  reign_end,
  death_year,
  status,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Björn Jarl',
  ARRAY['Björn'],
  'Denmark',
  976,
  984,
  984,
  'semi_legendary',
  'male',
  'Lydkung över västra delen av Skåne. Återgick som palatin år 976 efter att ha fördrevs av Guldharald år 964. Ersatte Toke Gormsson efter händelserna i Roskilde år 983. Omgav sig med män från England. Dog 984 i strid mot Toke Gormsson vid Halör när han kastade sig på sitt svärd. Begravdes med kristen begravning i Lund. Hans söner Olof och Ottar samt halvbrodern Torgisl nämns på Lundagårdsstenen.',
  false,
  true
);

-- Sibir Fultarsson
INSERT INTO historical_kings (
  name,
  name_variations,
  region,
  reign_start,
  reign_end,
  status,
  gender,
  description,
  archaeological_evidence,
  runestone_mentions
) VALUES (
  'Sibir Fultarsson',
  ARRAY['Sibir'],
  'Denmark',
  983,
  990,
  'semi_legendary',
  'male',
  'Gift med Harald Blåtands dotter Estrid. Fick regentskap över Danmark, Jylland och Själland från Harald Blåtand omkring år 983. Godtog år 984 Asbjörns vädjan om att Toke Gormsson skulle få återgå som lydkung över Skåne. Frigav samtidigt många män från Skåne från deras tjänst.',
  false,
  false
);