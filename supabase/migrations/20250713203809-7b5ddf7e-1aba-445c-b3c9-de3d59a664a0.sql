-- Insert British Isles runic inscriptions
-- Urgermanic and Anglo-Frisian runes, and Nordic runes from Britain

INSERT INTO runic_inscriptions (
  signum, name, name_en, location, parish, country, landscape, 
  transliteration, normalization, translation_en, translation_sv,
  coordinates, object_type, material, dating_text, rune_type, 
  data_source, scholarly_notes, current_location
) VALUES

-- England - Urgermanic and Anglo-Frisian
('Auzon casket', 'Auzon-skrinet', 'Auzon casket', 'Northumbria', NULL, 'United Kingdom', 'England',
 'hronæs ban fisc · flodu · ahof on ferg enberig warþ ga : sric grorn þær he on greut giswom',
 'hronæs ban fisc flodu ahof on ferg enberig warþ ga sric grorn þær he on greut giswom',
 'Whale bone. The fish cast the flood on the cliff-berg. The king was sad where he swam on the gravel.',
 'Valben. Floden kastade fisken på granberget. Spökkungen var ledsen där han simmade på gruset.',
 NULL, 'casket', 'whale bone', '600-talet, mitten', 'anglo_frisian', 
 'British Museum', 'Made in Northumbria, mid-7th century. Most beautiful runic object.', 'British Museum, London'),

-- England - Nordic runes with coordinates
('Br E1', 'Bridekirk', 'Bridekirk font', 'Bridekirk', 'Bridekirk', 'United Kingdom', 'Cumbria',
 '+ rikarþ : he : m=e : iwr(o)kt=e : 7 : to : þis : me:rð : 3er : -- : m=e : brokt=e',
 'rikarþ he me iwrokte 7 to þis merð ger me brokte',
 'Rickard he made me, and brought me to this glory.',
 'Rickard han gjorde mig, och tog mig till denna härlighet.',
 POINT(-3.372487, 54.690414), 'baptismal font', 'stone', '1100-talet', 'nordic', 
 'Bridekirk Church', 'Font from 12th century with carver possibly depicted', 'Bridekirk Church, Cumbria'),

('Br E2', 'St Paul''s, London', 'St Paul''s London', 'London', 'St Paul''s', 'United Kingdom', 'London',
 ': k-na : let : legia : stin : þensi : auk : tuki :',
 'ginna let legia stin þensi auk tuki',
 'Ginna had this stone laid, and Toke',
 'Ginna lät lägga denna sten, och Toke',
 POINT(-0.0983, 51.5155), 'grave slab', 'limestone', '1000-talet', 'nordic', 
 'Museum of London', 'Found 1852 during excavations. 46 x 57 x 10 cm', 'Museum of London'),

('Br E3', 'Carlisle', 'Carlisle Cathedral', 'Carlisle', 'Carlisle Cathedral', 'United Kingdom', 'Cumbria',
 'tolf(i)n urait þ-sar| |runr a þisa stain',
 'tolfin urait þesar runr a þisa stain',
 'Dolgfinn wrote these runes on this stone',
 'Dolgfinn skrev dessa runor på denna sten',
 POINT(-2.938779, 54.894551), 'wall stone', 'stone', '1100-talet, början', 'nordic', 
 'Carlisle Cathedral', 'Graffiti in cathedral wall, built early 12th century', 'Carlisle Cathedral'),

('Br E4', 'Lincoln I', 'Lincoln comb case', 'Lincoln', NULL, 'United Kingdom', 'Lincolnshire',
 'kamb : koþan : kiari : þorfastr',
 'kamb koþan kiari þorfastr',
 'Torfast made the good comb',
 'Torfast gjorde den goda kammen',
 POINT(-0.5375, 53.2307), 'comb case', 'antler', '900-talet', 'nordic', 
 'British Museum', 'Found 1851 during railway construction', 'British Museum, London'),

('Br E6', 'Dearham', 'Dearham stone', 'Dearham', 'St. Mungo''s', 'United Kingdom', 'Cumbria',
 'hnirm', 'hnirm', NULL, NULL,
 POINT(-3.441350, 54.713927), 'grave slab', 'stone', '1100-talet', 'nordic', 
 'St. Mungo''s Church', 'Runes carved upside down, with ADAM in Latin letters', 'St. Mungo''s Church, Dearham'),

('Br E8', 'Skelton-in-Cleveland', 'Skelton sundial', 'Skelton-in-Cleveland', NULL, 'United Kingdom', 'Yorkshire',
 '...--iebel • ok • ...', 'iebel ok', '... and ...', '... och ...',
 POINT(-0.980055, 54.561655), 'sundial', 'stone', '1100-talet', 'nordic', 
 'Skelton Church', 'Originally a sundial, found 1891 in old churchyard', 'Skelton Church, Yorkshire'),

('Br E9', 'Pennington', 'Pennington door lintel', 'Pennington', 'St Michael''s', 'United Kingdom', 'Cumbria',
 '... kml : leta : þena : kirk : -ub-rt : masun : --- : ----... +',
 'gamal leta þena kirk hubert masun',
 '... Gamal left this church. Hubert mason ...',
 '... Gammal lämnade denna kyrka. Hubert murare ...',
 POINT(-3.131050, 54.187296), 'door lintel', 'red sandstone', '1100-talet', 'nordic', 
 'St Michael''s Church', 'Relates to donation of church to Conishead Priory', 'St Michael''s Church, Pennington'),

-- Scotland
('Br Sc 2', 'Hunterston brooch', 'Hunterston brooch', 'Hunterston', NULL, 'United Kingdom', 'Ayrshire',
 'malbriþa a stilk ...', 'malbriþa a stilk',
 'Melbrigða owns the pin', 'Melbrigða äger nålen',
 POINT(-4.8579, 55.7088), 'brooch', 'silver', '900-talet', 'nordic', 
 'Museum of Scotland', 'Found 1830. Made 8th century Ireland/W Scotland, runes added 10th c.', 'Museum of Scotland, Edinburgh'),

('Br Sc 8', 'Kilbar, Barra', 'Kilbar cross', 'Kilbar', NULL, 'United Kingdom', 'Outer Hebrides',
 '...-ir : þur(:)kirþu : s(t)i-(a)r ¶ ...-r (:) is (:) kurs : s-- (:) ristr ¶ ...- (:) --',
 'þorkere steinar is kors ristr',
 'After Torgerd, Steinar''s daughter, the cross is carved',
 'Efter Torgerd, Steinars dotter, är korset ristat',
 POINT(-7.5397, 56.9544), 'stone cross', 'stone', '900-1100', 'nordic', 
 'Museum of Scotland', 'Found 1865 in abandoned churchyard on Barra', 'Museum of Scotland, Edinburgh'),

-- Isle of Man
('MM 134', 'Braddan III', 'Braddan III cross', 'Braddan', 'Old Kirk Braddan', 'United Kingdom', 'Isle of Man',
 'utr : risti : krus : þono : aft : fro(k)(a) [: f](a)(þ)[ur sin : in :] (þ)[urbiaurn : ...]',
 'utr risti krus þono aft froka faþur sin in þurbiaurn',
 'Odd raised this cross in memory of Frakki, his father, but Torbjörn [made it]',
 'Odd reste detta kors till minne av Frakki, sin fader, men Torbjörn [gjorde det]',
 POINT(-4.5681, 54.1544), 'stone cross', 'stone', '1000-talet', 'nordic', 
 'Old Kirk Braddan', 'Lower part of cross, inscription damaged mid-19th century', 'Old Kirk Braddan, Isle of Man'),

('MM 135', 'Braddan IV', 'Braddan IV cross', 'Braddan', 'Old Kirk Braddan', 'United Kingdom', 'Isle of Man',
 'þurlibr : nhaki : risti : krus : þono : aft [:] fiak : s(u)[n] (s)in : (b)ruþur:sun : habrs × {IHSVS}',
 'þurlibr nhaki risti krus þono aft fiak sun sin bruþur sun habrs',
 'Torleif Nacke raised this cross after Fiac, his son, Hafr''s brother''s son',
 'Torleif Nacke reste detta kors efter Fiac, sin son, Hafrs brorson',
 POINT(-4.5681, 54.1544), 'stone cross', 'stone', '1000-talet', 'nordic', 
 'Old Kirk Braddan', 'Complete cross with Christian symbol', 'Old Kirk Braddan, Isle of Man'),

-- Orkney
('Br Barnes 17', 'Maeshowe', 'Maeshowe chamber', 'Maeshowe', NULL, 'United Kingdom', 'Orkney',
 '[o=framr sih]urþa=r sonr ræist r[u]n[ar] þæs(a)=r',
 'ofram sigurþar sonr ræist runar þesar',
 'Ofram Sigurdsson carved these runes',
 'Ofram Sigurdsson ristade dessa runor',
 POINT(-3.1883, 59.0007), 'chamber wall', 'stone', '1153 eller senare', 'nordic', 
 'Museum of Scotland', 'Carved during storm shelter, described in Orkneyinga saga', 'Museum of Scotland, Edinburgh'),

('Br Or 3', 'Stromness', 'Stromness spindle whorl', 'Stromness', NULL, 'United Kingdom', 'Orkney',
 '--ka---r (r)es- run--', 'ristade runorna',
 '... carved the runes', '... ristade runorna',
 POINT(-3.2958, 58.9580), 'spindle whorl', 'steatite', '1100-1200', 'nordic', 
 'Museum of Scotland', 'Soapstone from Shetland, diameter 37mm', 'Museum of Scotland, Edinburgh'),

('Br Or 6', 'Birsay 1', 'Birsay 1', 'Birsay', NULL, 'United Kingdom', 'Orkney',
 '... filibus ra=nru', 'filibus ranru',
 '... Filippus runes (?)', '... Filippus runor (?)',
 POINT(-3.3264, 59.1356), 'church stone', 'stone', '1100-1200', 'nordic', 
 'Museum of Scotland', 'Found 1921 in north choir wall of church ruin', 'Museum of Scotland, Edinburgh'),

('Br Or 11', 'Birsay 4', 'Birsay 4 seal tooth', 'Birsay', NULL, 'United Kingdom', 'Orkney',
 'fuþorki', 'fuþorki', 'fuþorki', 'fuþorki',
 POINT(-3.3264, 59.1356), 'seal tooth', 'tooth', '1100-1200', 'nordic', 
 'Museum of Scotland', 'Seal tooth 71 x 22 mm with fuþark', 'Museum of Scotland, Edinburgh'),

-- Shetland
('Br Sh 3', 'Cunningsburgh 3', 'Cunningsburgh stone', 'Cunningsburgh', NULL, 'United Kingdom', 'Shetland',
 '...þi---- (+) -ftir + foþur (:) sin (:) þurbio-...',
 'þenna eftir faþur sin þurbiorn',
 '... this [stone] after his father Torbjörn ...',
 '... denna [sten] efter sin fader Torbjörn ...',
 POINT(-1.1833, 60.0167), 'runestone', 'sandstone', '1000-talet, början', 'nordic', 
 'Museum of Scotland', 'Inscription along narrow side, probably originally erected', 'Museum of Scotland, Edinburgh'),

-- Other English locations
('Br E12', 'Winchester', 'Winchester fragment', 'Winchester', 'St Maurice', 'United Kingdom', 'Hampshire',
 'R : aukol- -ausk', 'aukol ausk', NULL, NULL,
 POINT(-1.3176, 51.0632), 'stone fragment', 'stone', '1000-1200', 'nordic', 
 'Winchester City Museum', 'Found 1970 during church tower renovation', 'Winchester City Museum'),

('Br E16', 'Lincoln II', 'Lincoln rib bone', 'Lincoln', NULL, 'United Kingdom', 'Lincolnshire',
 'þ---k-l × hitir × stin × ...', 'hitir stin',
 '... heats stone ... / ... warms the stone ...', '... heter sten ... / ... värmer stenen ...',
 POINT(-0.5375, 53.2307), 'rib bone', 'bone', '1100-1200', 'nordic', 
 'The Collection Lincoln', 'Found 1992 at St Benedict''s Square excavations', 'The Collection, Lincoln'),

('Scotterthorpe', 'Scotterthorpe', 'Scotterthorpe lead sheet', 'Scotterthorpe', NULL, 'United Kingdom', 'Lincolnshire',
 '--or--luiao- uil-aniatlt o-uitlta_n -ou--ALF-- -E-', 'nonsense runes',
 NULL, NULL,
 POINT(-0.6771, 53.5053), 'lead sheet', 'lead', '1100-talet', 'nordic', 
 'North Lincolnshire Museum', 'Metal detector find, 33 x 17 mm, possible charm', 'North Lincolnshire Museum, Scunthorpe'),

('St. Benets Abbey', 'St. Benets Abbey', 'St. Benets lead sheet', 'Horning', 'St. Benets Abbey', 'United Kingdom', 'Norfolk',
 '?(k)kofrukR(m)þ okinifuitR wartRsom (i)RsoRnRs? ?þ(u)__r?hR', 'nonsense runes',
 NULL, NULL,
 POINT(1.4350, 52.7017), 'lead sheet', 'lead', '1100-1200', 'nordic', 
 'Norwich Museum', 'Weighted lead sheet with nonsense runes, probably charm', 'Norwich Museum');