-- Add Gotlandic runic inscriptions to the database
INSERT INTO runic_inscriptions (
  signum, transliteration, translation_sv, translation_en, dating_text, location, parish, 
  municipality, county, landscape, country, object_type, material, coordinates, 
  uncertainty_level, data_source, condition_notes, historical_context, scholarly_notes,
  raa_number, k_samsok_uri, alternative_signum
) VALUES 
-- G 1 Sundre kyrka
('G 1', 'ro(l)aikr : lit : giara : (s)(t)(a)(i)[n] : ok : skia=ra : yfir : rofin : broþor : sin', 'Rolaik lät göra stenen och skära den över Rofinn, sin broder', 'Hróðleikr had the stone made and chiselled over Hróðfinnr, his brother', '1250-1299', 'Sundre kyrka', 'Sundre', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Gravhäll', 'Ljus kalksten', POINT(18.1818, 56.9359), 'Säker datering', 'Rundata', 'Gravhällen av kalksten ligger i kyrkans golv framför koret, intill södra väggen', 'Andra hälften av 1200-talet, medeltida gravhäll', 'Fornvästnordiska: Hróðleikr lét gera stein ok skera yfir Hróðfinn, bróður sinn', '115:1', 'http://kulturarvsdata.se/uu/srdb/3902492d-253a-4a5d-86d2-f5f6f7ce534c', ARRAY['L 1817']),

-- G 2 Sundre kyrka  
('G 2', '[+ beþa^r : marþa] : [liþ] : gera : þinna : sþa^n : yifir : sina : kuno : o^k : sin : ba^rn :', 'Peter <marþa> lät göra denna sten över sin hustru och sina barn', 'Pétar <marþa> had this stone made over his wife and his child', '1400-1499', 'Sundre kyrka', 'Sundre', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Gravhäll', 'Kalksten', POINT(18.1818, 56.9359), 'Säker datering', 'Rundata', 'Gravhällen från 1400-talet står i ett stenskjul söder om kyrkogården', '1400-talet, medeltida gravhäll', 'Fornvästnordiska: Pétar <marþa> lét gera þenna stein yfir sína konu ok sín bǫrn', '115:3', 'http://kulturarvsdata.se/uu/srdb/1220090f-6503-4bd6-bf05-d78e9d81d5db', ARRAY['L 1818']),

-- G 3 Sundre kyrka
('G 3', '[... ...garþum : lit : geara : mi]k : yfir : sina : (h)(u)(s)proiiu : ha^ldiia^uþu : hua^r : sum : biiþur : fyrri : henna... ...', '... -gårda lät göra mig över sin hustru Haldjaud. Den som beder för hennes (själ) ...', '... of …-garðir/Västergård(?) had me made over his housewife Hallþjóð. Whosoever prays for her …', '1350-1399', 'Sundre kyrka', 'Sundre', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Gravhäll', 'Rödaktig kalksten', POINT(18.1818, 56.9359), 'Osäker tolkning', 'Rundata', 'Fragment av gravhäll från 1300-talet står i ett stenskjul söder om kyrkogården', 'Andra hälften av 1300-talet, fragmentarisk medeltida gravhäll', 'Fornvästnordiska: … …gǫrðum/Västergårde(?) lét gera mik yfir sína húsfreyju Hallþjóðu', '115:2', 'http://kulturarvsdata.se/uu/srdb/353fe390-8820-4207-8335-261fdbd0be9b', ARRAY['L 1819']),

-- G 8 Sigraifs, Vamlingbo
('G 8', 'olafr : (s)uþr * giarþi us', 'Olav söder(?) gjorde oss', 'Ólafr of Suðr/Suders(?) made us', '1266-1299', 'Sigraifs', 'Vamlingbo', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Grindstolpe', 'Kalksten', POINT(18.2462, 56.991), 'Säker datering', 'Rundata', 'De båda grindstolparna av kalksten står nu vid Bottarve hembygdsmuseum. Bara den vänstra stenen har inskrift', 'Slutet av 1200-talet, medeltida grindstolpar', 'Fornvästnordiska: Ólafr Suðr/Suders(?) gerði oss. Ristare: Olaf Suder', '57', 'http://kulturarvsdata.se/uu/srdb/a88fd43d-c15a-4046-82d1-8f12d8f125a5', ARRAY['L 1858']),

-- G 10 Vamlingbo
('G 10', '- raþ| |þu ...-kui...us...', 'Tyd du! ...', '… Interpret …', '725-1100', NULL, 'Vamlingbo', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Ringspänne', 'Brons', POINT(18.231, 56.9749), 'Osäker tolkning', 'Rundata', 'Ringspännet av brons köptes in av Historiska museet 1887', 'Vikingatid, långkvist runor. Enligt Gotlands runinskrifter tyckte sig Brate år 1903 kunna läsa "Tyd du! Jag ristar, jag Ingulv"', 'Fornvästnordiska: … Ráð þú …. Runtyp: fuþark 16-typiga, långkvist', NULL, 'http://kulturarvsdata.se/uu/srdb/fc930448-57a3-4457-809f-02bf91268c9e', NULL),

-- G 13 Hamra kyrka
('G 13', 'iakoub[ar : ... kiara : s]tain : biþin : [bynir : iþrar : fyrir : sealu ...þuiar : k... : ...f]i : kaira : [s-a(s)l- : ...n... ...fb...tekum :] binidikta : in [m(u)... ...sk risti mik]', 'Jakob (lät) göra stenen. Bedjen edra böner för Rudvis(?) själ … benedicta in mu(lieribus) … ristade mig', 'Jakobr … the stone made. Pray your prayers … for the soul of Hróðvé(?) … blessed among women … carved me', '1300-1399', 'Hamra kyrka', 'Hamra', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Gravhäll', 'Kalksten', POINT(18.3139, 56.9761), 'Osäker tolkning', 'Rundata', 'Gravhällen från 1300-talet sitter nu klamrad till långskeppets västra vägg inne i kyrkan', 'Troligen 1300-talet, medeltida gravhäll med blandad runisk och latinsk text', 'Fornvästnordiska: Jakobr … gera stein. Biðið bœnir yðrar fyrir sálu [Hró]ðvéar(?) … benedicta in mu[lieribus] … risti mik', '38:3', 'http://kulturarvsdata.se/uu/srdb/343cc22d-0f64-4b78-aa30-3ca0387e0357', ARRAY['L 1803']),

-- G 14 Hamra kyrka
('G 14', '[+ sial : synkr : litu : a--o : ki... aktr : r--] faþur : [... + guþ : han : barma : sik ...þk...anl...rþas : s :· siman : ier...]', 'Sju söner lät göra (stenen) efter …, sin fader … Gud han förbarme sig …', 'M <sial> <synkr> had … made in memory of … father … May God have compassion …', '1100-1500', 'Hamra kyrka', 'Hamra', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Gravhäll', 'Kalksten', POINT(18.3139, 56.9761), 'Osäker tolkning', 'Rundata', 'Fragment av gravhäll, sitter nu klamrad till långskeppets västra vägg', 'Medeltid, fragmentarisk gravhäll', 'Fornvästnordiska: <sial> <synkr> létu … ge[ra] eptir … fǫður … Guð hann barmi sik', '38:4', 'http://kulturarvsdata.se/uu/srdb/f8b7c0ee-5c86-4221-afee-a889d2766122', ARRAY['L 1804', 'L 1800']),

-- G 18 Hamra kyrka
('G 18', '...', '...', '…', '1100-1500', 'Hamra kyrka', 'Hamra', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Gravhäll', 'Rödaktig kalksten', POINT(18.3139, 56.9761), 'Fragmentarisk', 'Rundata', 'Fragment av gravhäll, sitter nu klamrad till långskeppets södra vägg inne i kyrkan', 'Medeltid, fragmentarisk gravhäll utan läsbar text', 'Fragment utan läsbar runtext', '38:2', 'http://kulturarvsdata.se/uu/srdb/c33c8a2f-63b3-4ba6-a7bd-86082b8d374b', NULL),

-- G 20 Hamra kyrka
('G 20', 'mat^us : s^kris', 'Magnus ...', '…', '1100-1500', 'Hamra kyrka', 'Hamra', 'Gotland', 'Gotland', 'Gotland', 'Sverige', 'Putsinskrift', 'Kalkputs', POINT(18.3134, 56.9761), 'Osäker tolkning', 'Rundata', 'Kalkristningen finns på insidan av långskeppets södra vägg, vid koret 1,5 m över golvet', 'Medeltida putsinskrift', 'Fragmentarisk putsinskrift med möjligen namnet Magnus', '38:8', 'http://kulturarvsdata.se/uu/srdb/47aa870f-444b-47bb-913f-c0ab76d7b02d', NULL)

ON CONFLICT (signum) DO UPDATE SET
  location = EXCLUDED.location,
  parish = EXCLUDED.parish,
  transliteration = EXCLUDED.transliteration,
  translation_sv = EXCLUDED.translation_sv,
  translation_en = EXCLUDED.translation_en,
  dating_text = EXCLUDED.dating_text,
  material = EXCLUDED.material,
  coordinates = EXCLUDED.coordinates,
  object_type = EXCLUDED.object_type,
  uncertainty_level = EXCLUDED.uncertainty_level,
  condition_notes = EXCLUDED.condition_notes,
  historical_context = EXCLUDED.historical_context,
  scholarly_notes = EXCLUDED.scholarly_notes,
  raa_number = EXCLUDED.raa_number,
  k_samsok_uri = EXCLUDED.k_samsok_uri,
  alternative_signum = EXCLUDED.alternative_signum,
  updated_at = now();