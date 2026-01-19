-- Create table for monasteries and early Christian sites
CREATE TABLE christian_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT,
  coordinates POINT NOT NULL,
  site_type TEXT NOT NULL CHECK (site_type IN ('monastery', 'church', 'holy_place', 'bishopric', 'hospital')),
  religious_order TEXT CHECK (religious_order IN ('cistercian', 'benedictine', 'franciscan', 'dominican', 'birgittine', 'carthusian', 'johanniter', 'other')),
  founded_year INTEGER,
  dissolved_year INTEGER,
  period TEXT NOT NULL CHECK (period IN ('early_christian', 'medieval', 'late_medieval')),
  status TEXT DEFAULT 'historical' CHECK (status IN ('active', 'ruins', 'church_remains', 'historical', 'archaeological')),
  significance_level TEXT DEFAULT 'high' CHECK (significance_level IN ('very_high', 'high', 'medium', 'low')),
  description TEXT,
  description_en TEXT,
  historical_notes TEXT,
  current_condition TEXT,
  region TEXT,
  county TEXT,
  province TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE christian_sites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Christian sites are publicly viewable" 
ON christian_sites 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage Christian sites" 
ON christian_sites 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create indexes for better performance
CREATE INDEX idx_christian_sites_coordinates ON christian_sites USING GIST (coordinates);
CREATE INDEX idx_christian_sites_type ON christian_sites (site_type);
CREATE INDEX idx_christian_sites_order ON christian_sites (religious_order);
CREATE INDEX idx_christian_sites_period ON christian_sites (period);
CREATE INDEX idx_christian_sites_founded ON christian_sites (founded_year);

-- Insert the historical data
INSERT INTO christian_sites (name, name_en, coordinates, site_type, religious_order, founded_year, dissolved_year, period, status, significance_level, description, region, county, province, historical_notes) VALUES

-- Early Christian sites (800-1100)
('Birka (Björkö)', 'Birka (Björkö Island)', POINT(17.5400, 59.3400), 'holy_place', 'other', 829, 850, 'early_christian', 'archaeological', 'very_high', 'Sveriges första kristna församling. Ansgar grundade här en kyrka omkring 829-831.', 'Mälardalen', 'Stockholm', 'Uppland', 'Missionären Ansgar besökte handelsstaden Birka på Björkö omkring år 829–831 och grundade då en liten kyrka eller kapell. Birka brukar betraktas som Sveriges äldsta kristna församling.'),

('Husaby källa', 'Husaby Spring', POINT(13.4339, 58.6339), 'holy_place', 'other', 1000, NULL, 'early_christian', 'historical', 'very_high', 'Kung Olof Skötkonung döptes här omkring år 1000.', 'Västergötland', 'Skaraborg', 'Västergötland', 'Enligt traditionen lät kung Olof Skötkonung döpa sig vid Husaby källa i Västergötland omkring år 1000, vilket markerar ett viktigt steg i landets kristnande.'),

-- Early Cistercian monasteries
('Vreta kloster', 'Vreta Abbey', POINT(15.5200, 58.4833), 'monastery', 'benedictine', 1110, 1595, 'medieval', 'church_remains', 'very_high', 'Sveriges första nunnekloster, grundat omkring 1110.', 'Östergötland', 'Östergötland', 'Östergötland', 'Grundat omkring år 1110 som Sveriges första nunnekloster. Troligen var Vreta ursprungligen ett benediktinskt kloster för nunnor som senare övergick till cisterciensorden. Ruinerna av klosterkyrkan står idag kvar som sockenkyrka.'),

('Alvastra kloster', 'Alvastra Abbey', POINT(14.6600, 58.3000), 'monastery', 'cistercian', 1143, 1530, 'medieval', 'ruins', 'very_high', 'Det första cisterciensklostret i Norden, grundat 1143.', 'Östergötland', 'Östergötland', 'Östergötland', 'Grundat år 1143 av cisterciensermunkar från Clairvaux i Frankrike. Alvastra var, tillsammans med Nydala, det första cisterciensklostret i hela Norden. Särskilt känt som vistelseort för den heliga Birgitta under 1300-talet.'),

('Nydala kloster', 'Nydala Abbey', POINT(14.3400, 57.3200), 'monastery', 'cistercian', 1143, 1540, 'medieval', 'ruins', 'high', 'Grundat 1143, ett av de äldsta cisterciensklostren.', 'Småland', 'Kronoberg', 'Småland', 'Liksom Alvastra grundades Nydala år 1143 av franska cisterciensmunkar och räknas som ett av de äldsta klostren. Namnet "Nydala" (Nova Vallis, "Den nya dalen") anspelar på moderklostret Clairvaux.'),

('Varnhems kloster', 'Varnhem Abbey', POINT(13.5667, 58.3833), 'monastery', 'cistercian', 1150, 1540, 'medieval', 'church_remains', 'high', 'Cistercienskloster grundat ca 1150, dotterkloster till Alvastra.', 'Västergötland', 'Skaraborg', 'Västergötland', 'Grundades ca 1150 av cistercienser (dotterkloster till Alvastra). Flera medlemmar av den erikska kungaätten begravdes här. Varnhems klosterkyrka restaurerades och används ännu idag som kyrka.'),

('Gudhem kloster', 'Gudhem Abbey', POINT(13.5500, 58.2400), 'monastery', 'cistercian', 1152, 1540, 'medieval', 'ruins', 'high', 'Nunnekloster grundat 1152, ett av de första konventen för kvinnor.', 'Västergötland', 'Skaraborg', 'Västergötland', 'Grundat år 1152 som nunnekloster – ett av de första konventen för kvinnor i landet. Gudhem tillhörde initialt benediktinorden men anslöt sig snart till cistercienserna.'),

('Askeby kloster', 'Askeby Abbey', POINT(15.8600, 58.4100), 'monastery', 'cistercian', 1180, 1540, 'medieval', 'ruins', 'medium', 'Cisterciensiskt nunnekloster från senare hälften av 1100-talet.', 'Östergötland', 'Östergötland', 'Östergötland', 'Grundades under senare hälften av 1100-talet som ett cisterciensiskt nunnekloster. Askeby låg vid en viktig medeltida väg mot Söderköping och fungerade som ett slags gästgiveri för resande.'),

('Riseberga kloster', 'Riseberga Abbey', POINT(14.8900, 59.1500), 'monastery', 'cistercian', 1180, 1530, 'medieval', 'ruins', 'high', 'Cisterciensiskt nunnekloster grundat omkring 1180.', 'Närke', 'Örebro', 'Närke', 'Grundat omkring 1180 som ett cisterciensiskt nunnekloster. Riseberga upprättades med stöd av jarl Birger Brosa. Heliga Birgitta hade personlig koppling hit.'),

('Solberga kloster', 'Solberga Abbey', POINT(18.3000, 57.6333), 'monastery', 'cistercian', 1246, 1540, 'medieval', 'ruins', 'medium', 'Det sista medeltida nunneklostret i Sverige, grundat 1246.', 'Gotland', 'Gotland', 'Gotland', 'Ett cisterciensiskt nunnekloster utanför Visby på Gotland. Grundades år 1246 och var det sista av de medeltida nunneklostren i Sverige.'),

('Julita kloster', 'Julita Abbey', POINT(16.0400, 59.1500), 'monastery', 'cistercian', 1160, 1540, 'medieval', 'historical', 'high', 'Cistercienskloster grundat 1160, senare flyttat till Julita.', 'Södermanland', 'Södermanland', 'Södermanland', 'Ursprungligen grundat år 1160 vid Viby nära Sigtuna, flyttades omkring 1180 till Julita vid sjön Öljaren. Idag ligger Julita gård (ett friluftsmuseum) på platsen.'),

('Roma kloster', 'Roma Abbey', POINT(18.4167, 57.4667), 'monastery', 'cistercian', 1164, 1540, 'medieval', 'ruins', 'very_high', 'Gotlands första och största munkkloster, grundat 1164.', 'Gotland', 'Gotland', 'Gotland', 'Grundades år 1164 av cisterciensmunkar från Nydala. Roma blev Gotlands första och största munkkloster och utvecklades till ett religiöst och jordbruksekonomiskt centrum för hela Östersjöregionen.'),

('Herrevad kloster', 'Herrevad Abbey', POINT(13.2400, 56.0833), 'monastery', 'cistercian', 1144, 1540, 'medieval', 'ruins', 'high', 'Danmarks första cistercienskloster för munkar, invigt 1144.', 'Skåne', 'Skåne', 'Skåne', 'Invigdes år 1144 och var Danmarks första cistercienskloster för munkar. Den danske astronomen Tycho Brahe bodde en tid på Herrevad kloster på 1500-talet.'),

('Ås kloster', 'Ås Abbey', POINT(12.2200, 57.2333), 'monastery', 'cistercian', 1194, 1535, 'medieval', 'historical', 'high', 'Hallands enda medeltida kloster, grundat 1192-1194.', 'Halland', 'Halland', 'Halland', 'Grundades 1192–1194 av cisterciensermunkar utskickade från Sorø kloster i Själland. Ås blev Hallands enda medeltida kloster och beskrevs som dess första, största och rikaste kloster.'),

('Gudsberga kloster', 'Gudsberga Abbey', POINT(16.1667, 60.3667), 'monastery', 'cistercian', 1477, 1538, 'late_medieval', 'ruins', 'high', 'Det sista medeltida munkklostret i Sverige, grundat 1477.', 'Dalarna', 'Dalarna', 'Dalarna', 'Grundat år 1477 och officiellt anslutet till cisterciensorden 1486. Gudsberga var det sista medeltida munkklostret som etablerades i Sverige och det nordligaste cisterciensklostret i landet.'),

-- Mendicant orders (Franciscans and Dominicans)
('Gråbrödraklostret Stockholm', 'Franciscan Convent Stockholm', POINT(18.0647, 59.3247), 'monastery', 'franciscan', 1270, 1540, 'medieval', 'church_remains', 'very_high', 'Franciskanernas konvent i Stockholm, nu Riddarholmskyrkan.', 'Stockholm', 'Stockholm', 'Uppland', 'Franciskanernas konvent i huvudstaden grundades omkring år 1270 på Riddarholmen. Kyrkan byggdes i gotisk stil och blev efter reformationen Riddarholmskyrkan – Stockholms äldsta bevarade kyrkobyggnad.'),

('Svartbrödraklostret Stockholm', 'Dominican Convent Stockholm', POINT(18.0733, 59.3233), 'monastery', 'dominican', 1336, 1547, 'medieval', 'historical', 'very_high', 'Dominikanernas konvent i Stockholm, det största medeltida klostret i staden.', 'Stockholm', 'Stockholm', 'Uppland', 'Dominikanernas konvent på Stadsholmen i Stockholm. Det instiftades år 1336 då kung Magnus Eriksson donerade mark. Svartbrödraklostret växte ut till Stockholms största medeltida kloster.'),

('Mariakyrkan Sigtuna', 'St. Mary Church Sigtuna', POINT(17.7231, 59.6172), 'monastery', 'dominican', 1237, 1540, 'medieval', 'church_remains', 'high', 'Dominikanernas klosterkyrka i Sigtuna, uppförd omkring 1237.', 'Uppland', 'Stockholm', 'Uppland', 'I Sigtuna uppförde svartbröderna omkring 1237 en klosterkyrka i tegel, Mariakyrkan, som fortfarande står kvar. Mariakyrkan i Sigtuna är idag den äldsta bevarade dominikankyrkan i Sverige.'),

('Gråbrödraklostret Visby', 'Franciscan Convent Visby', POINT(18.2944, 57.6344), 'monastery', 'franciscan', 1233, 1525, 'medieval', 'ruins', 'high', 'Franciskanernas konvent i Visby, S:ta Katarina kyrka.', 'Gotland', 'Gotland', 'Gotland', 'På Gotland etablerade franciskanerna ett konvent år 1233 i den blomstrande hansestaden Visby. De byggde Sankta Katarina kyrka (S:ta Karin) inne i staden.'),

('Svartbrödraklostret Visby', 'Dominican Convent Visby', POINT(18.2933, 57.6394), 'monastery', 'dominican', 1230, 1525, 'medieval', 'ruins', 'high', 'Dominikanernas konvent i Visby, Sankt Nicolai kyrka.', 'Gotland', 'Gotland', 'Gotland', 'Dominikanordens konvent i Visby grundades strax före år 1230 och deras klosterkyrka Sankt Nicolai uppfördes i norra delen av staden.'),

('Skänninge nunnekloster', 'Skänninge Nunnery', POINT(15.0833, 58.4000), 'monastery', 'dominican', 1272, 1544, 'medieval', 'historical', 'high', 'Dominikanernas nunnekloster i Skänninge, grundat 1272.', 'Östergötland', 'Östergötland', 'Östergötland', 'Dominikanernas enda kloster för nunnor i medeltida Sverige. Det första av dessa grundades i Skänninge 1272 av den lokala adelskvinnan Ingrid Elofsdotter, känd som Sankta Ingrid av Skänninge.'),

-- Late medieval monasteries
('Vadstena kloster', 'Vadstena Abbey', POINT(14.8833, 58.4500), 'monastery', 'birgittine', 1384, 1595, 'late_medieval', 'church_remains', 'very_high', 'Moderkloster för Birgittinorden, invigt 1384.', 'Östergötland', 'Östergötland', 'Östergötland', 'Invigt 1384 som moderkloster för den nygrundade Birgittinorden. Klostret hade grundats på initiativ av den heliga Birgitta själv. Vadstena kloster vann snabbt anseende som Nordens andliga centrum under senmedeltiden.'),

('Kronobäcks kloster', 'Kronobäck Abbey', POINT(16.4500, 57.0333), 'hospital', 'johanniter', 1292, 1520, 'late_medieval', 'ruins', 'medium', 'Hospital och senare johanniterkloster, grundat 1292.', 'Småland', 'Kalmar', 'Småland', 'Ursprungligen grundat som hospital 1292. På 1480-talet ombildades hospitalet till ett regelrätt munkkloster under johanniterorden. Johanniterna drev vidare hospitalverksamheten och härbärge för resande.'),

('Mariefreds kloster', 'Mariefred Abbey', POINT(17.2178, 59.2583), 'monastery', 'carthusian', 1493, 1526, 'late_medieval', 'historical', 'high', 'Det enda kartusianklostret i Norden, grundat 1493.', 'Södermanland', 'Södermanland', 'Södermanland', 'Detta kloster representerar kartusianorden, känd för strikt kontemplativt liv. Mariefred grundades så sent som år 1493 och var det enda kartusianklostret i hela Norden.');

-- Add updated_at trigger
CREATE TRIGGER update_christian_sites_updated_at
  BEFORE UPDATE ON christian_sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();