-- Add international runic inscriptions from Latvia, Greece, Greenland, and France

-- Latvia
INSERT INTO runic_inscriptions (
  signum, transliteration, translation_en, translation_sv, location, 
  parish, country, coordinates, object_type, material, dating_text, 
  period_start, period_end, current_location, historical_context,
  data_source
) VALUES
('LtRR 1987;248', '...- ÷ runar ÷ þesar ÷ o -...', '... these runes ...', '... dessa runor ...', 
 'Daugmale', 'Daugmale', 'Latvia', point(24.103832, 56.948719), 'spindle whorl fragment', 'limestone',
 '800-900', 800, 900, 'Latvijas Nacionālais vēstures muzejs, Riga', 
 'Found during excavation in 1937 in Daugmale fortress. Fragment of spindle whorl-like club made of limestone, about 4.6 cm high and ca 8 cm in diameter. Daugmale was a dense trading place on the route between Varangians and Greeks.',
 'manual_import'),

-- Greece  
('Pireuslejonet', 'hiuku þir hilfniks milum hna : en i hafn þesi þir min eoku runar at haursa buta kupan a uah riþu suiar þita linu fur aþum kul uan farin trikiar istu runar [a rikan strin]k hiuku × þair × isk ... rlifr litu auka × ui l roþrs × lanti × b ... a × sun iuk × runar þisar ufr uk ... ii sti a uan farn ×', 
 'They carved him in the midst of the army, but in this harbor men carved runes after Horse, a good farmer, by the bay. The Swedes placed this on the lion. He proceeded with wisdom, gold he won on his journey. Warriors carved runes, [on richly decorated band] they carved. They Äskil and [To]rlev had carved well, who lived in Rodrsland (Roslagen, sea coast). N.N., son of N.N., carved these runes. Ulv and N.N. painted [after Horse.(?) Gold] he won on his journey.',
 'Höggo de honom i härskarans mitt, men i denna hamn höggo männen runor efter Horse, en bonde god, vid viken. Anbragte svear detta på lejonet. Han förfor med klokhet, guld vann han på sin färd. Kämpar ristade runor, [på rikt sirad slinga] höggo. De Äskil (m.fl. och [To])rlev läto hugga väl, som i Rodrsland (Roslagen, sjökusten) bodde. N.N., son till N.N., högg dessa runor. Ulv och N.N. målade [efter Horse.(?) Guld] vann han på sin färd.',
 'Pireus', 'Pireus', 'Greece', point(23.6370, 37.9469), 'marble lion', 'marble',
 'Viking Age', 900, 1100, 'Venice (original), Historiska museet Stockholm (plaster cast)',
 'The Pireus Lion from Athens harbor town Pireus, later moved to Venice. The runes are extremely difficult to read, and the text has been interpreted in very different ways. This interpretation is Erik Brates.',
 'manual_import'),

-- Greenland inscriptions
('Gr 1', '÷ el=likr * sikuaþs : so=n:r * ok * baan=ne : torta=r son : ¶ ÷ ok enriþi * os son : laukardak*in : fyrir * gakndag ¶ hloþu * ua=rda te * ok rydu : ??????',
 'Erling Sigvatsson and Bjarne Thordarson and Einride Oddsson Saturday before Rogation Day built the cairns and [?] 1333',
 'Erling Sigvatsson och Bjarne Thordarson och Einride Oddsson lördagen före gångdag byggde rösena och [?] 1333',
 'Kingittorsuaq', 'Kingittorsuaq', 'Greenland', point(-55.0, 73.0), 'stone', 'stone',
 '1333', 1333, 1333, 'Nationalmuseet, København',
 'The decimeter-sized stone was found in 1824 on the small island Kingittorsuaq at almost 73° north latitude, far north of inhabited areas. The text is difficult to interpret, but one can at least say that the men had overwintered on the island, since Rogation Day is April 25. The inscription ends with cipher runes.',
 'manual_import'),

('Gr 6', 'ᛘᛆᚱᛁᛆ', 'Maria', 'Maria', 'Herjolfsnes', 'Herjolfsnes', 'Greenland', point(-44.72, 59.99), 'cross', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Cross from Herjolfsnes', 'manual_import'),

('Gr 7', 'ᛘᛆᛁᛆ', 'Maria', 'Maria', 'Herjolfsnes', 'Herjolfsnes', 'Greenland', point(-44.72, 59.99), 'cross', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Cross from Herjolfsnes', 'manual_import'),

('Gr 13', 'ma=ria : ilYihi-- ¶ iY i(Y)a=nis fa=þi(i)(r) ¶ (-)isu tius (*) mius ilYi ¶ Yk sunr Yk anti',
 'Maria, Eloihim, Johannes, Johannes father, Jesus, my God, Eloi and the son and spirit',
 'Maria, Eloihim, Johannes, Johannes fader, Jesus, min Gud, Eloi och sonen och anden',
 'Ikigaat/Herjolfsnes', 'Herjolfsnes', 'Greenland', point(-44.72, 59.99), 'wooden cross', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Wooden cross from Herjolfsnes', 'manual_import'),

('Gr 15', '+ þæsi : kona : uar : lagþ ÷ firi : borþ : i : grøna¶laz : haf(e) : ær : guþu(e)h : het',
 'This woman was laid overboard in the Greenland sea, who was called Gudveig',
 'Denna kvinna blev lagd över bord i Grönlandshavet, som hette Gudveig',
 'Ikigaat / Herjolfsnes', 'Herjolfsnes', 'Greenland', point(-44.72, 59.99), 'wooden stick', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Wooden stick from Herjolfsnes', 'manual_import'),

('Gr 16', '...(l)*dur : a : mik ÷ (t)', 'Hildur (?) owns me', 'Hildur (?) äger mig', 
 'Garðar', 'Garðar', 'Greenland', point(-45.42, 60.99), 'spindle mold', 'soapstone',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Spindle mold from soapstone from Garðar, episcopal seat, Eastern Settlement', 'manual_import'),

('Gr 25', 'bi=a=r=n=i', 'Bjarne', 'Bjarne', 'Garðar', 'Garðar', 'Greenland', point(-45.42, 60.99), 'spindle whorl', 'soapstone',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Spindle whorl from soapstone from Garðar, episcopal seat, Eastern Settlement', 'manual_import'),

('Gr 32', '[untranslatable runes]', '[untranslatable]', '[otolkbar]', 'Qassiarsuk/Brattahlid', 'Brattahlid', 'Greenland', point(-45.52, 61.15), 'mold/weight', 'soapstone',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Piece of soapstone with rune-like characters that have not been interpreted. From Erik the Reds farm, main seat of the Eastern Settlement', 'manual_import'),

('Gr 34', '[fragment]', '[fragment]', '[fragment]', 'Sandnes', 'Sandnes', 'Greenland', point(-50.0, 64.10), 'fragment', 'soapstone',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Fragment from Sandnes, Western Settlement', 'manual_import'),

('Gr 35', 'hæl(k)i (y)(-)', 'Helge', 'Helge', 'Kilaarsarfik / Sandnes', 'Sandnes', 'Greenland', point(-50.0, 64.10), 'chair armrest', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Armrest from a chair from Sandnes, Western Settlement, at Ameralla fjord', 'manual_import'),

('Gr 36', 'fuþork(h)---l????? fi', '-', '-', 'Kilaarsarfik / Sandnes', 'Sandnes', 'Greenland', point(-50.0, 64.10), 'wooden stick', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Wooden stick from Sandnes', 'manual_import'),

('Gr 43', '÷ ilon ÷ (æ)(l)rikum : nonim ÷ ilon | illy : þ : ilon : r : br * sabaot : zion ilion : giun : a=þ:o(n)ay : luc : (i)a(i)r : | gr(a)maton : saba:ag : mizial : gabrel rafa(e)l',
 'Elon ... ... Elon ... ... Elon ... ... Sebaoth Zion Elion ... Adonai lux(?) ... grammaton Sebaoth(?) Michael Gabriel Rafael.',
 'Elon ... ... Elon ... ... Elon ... ... Sebaoth Zion Elion ... Adonai lux(?) ... grammaton Sebaoth(?) Michael Gabriel Rafael.',
 'Kilaarsarfik / Sandnes', 'Sandnes', 'Greenland', point(-50.0, 64.10), 'wooden amulet', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Medieval wooden amulet with runes on three sides from Sandnes', 'manual_import'),

('Gr 51', '(m)aria m(e)mor (e)- tu u(e)bit ti suo auo i ko=n miki sm oi(a)ii', '-', '-', 'Umiviiarsuk', 'Umiviiarsuk', 'Greenland', point(-45.42, 60.99), 'fish-shaped object', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Fish-shaped wooden piece from Umiviiarsuk', 'manual_import'),

('Gr Austmannadal 5', '[runes]', '[toy sword]', '[leksak svärd]', 'Austmannadal', 'Austmannadal', 'Greenland', point(-45.26, 61.0), 'toy sword', 'wood',
 'Medieval', 1200, 1400, 'Nationalmuseet, København', 'Wooden object found in 1937, presented as a toy sword', 'manual_import'),

-- France inscriptions
('Charnay', 'fuþarkgwhnijïpzstblem :uþfnþai:id dan:liano ïia', 'May Liano now learn to know Idda', 'Må Liano nu lära känna Idda',
 'Charnay', 'Charnay', 'France', point(2.0934, 48.8980), 'fibula', 'metal',
 '500-550', 500, 550, 'Musée des Antiquités Nationales, St. Germain-en-Laye', 
 'Fibula from the second half of the 6th century found in 1830 in a Frankish burial field by Saône. Contains the longest futharc inscription alongside personal names.',
 'manual_import'),

('Le Mans', 'ᚮᚱᛘᚱ ᛬ ᚴᛅᛁᛐ ᛬ ᛆ ᛬ ᚼᚯᚤᛍ ᚦᛂᚿᛆ', 'Orm Get owns this skull', 'Orm Get äger denna skalle',
 'Le Mans', 'Le Mans', 'France', point(0.1996, 48.0061), 'walrus skull', 'bone',
 '1200-1300', 1200, 1300, 'Musée Vert, Le Mans', 
 'Front part of a walrus skull with runic inscription from 13th century on one tusk. The skull probably comes from Greenland, but it cannot be said whether the inscription was made in Greenland or Norway. It came to the museum from a private collection in 1816.',
 'manual_import'),

('Saint-Dizier', 'ᚨᛚᚢ', 'alu', 'alu', 'Saint-Dizier', 'Saint-Dizier', 'France', point(4.9489, 48.6373), 'sword pommel', 'metal',
 'Merovingian', 500, 700, 'Musée de Saint-Dizier', 
 'Sword with runic inscription on the sword pommel found during excavation of a Merovingian grave in Saint-Dizier in 2002.',
 'manual_import');