-- Add more authentic Viking names with etymology from various sources
-- Using INSERT with duplicate handling

INSERT INTO viking_names (name, gender, meaning, etymology, historical_info, frequency, regions) 
SELECT * FROM (VALUES
-- Names from Historical Kings and Notable Figures
('Harald', 'male', 'Härskarens makt', 'Fornnordiska: harjaz (här) + waldaz (härskare)', 'Flera svenska och norska kungar, bl.a. Harald Blåtand', 15, ARRAY['Danmark', 'Sverige', 'Norge']),
('Erik', 'male', 'Ensam härskare', 'Fornnordiska: ainaz (ensam) + rikaz (härskare)', 'Många svenska kungar, Erik den Helige', 22, ARRAY['Sverige', 'Danmark', 'Norge']),
('Olof', 'male', 'Anfäders efterlämning', 'Fornnordiska: anu (förfader) + laibaz (lämning)', 'Sankt Olof, Olof Skötkonung', 18, ARRAY['Sverige', 'Norge']),
('Knut', 'male', 'Knut, sammanbindare', 'Fornnordiska: knutr (knut)', 'Knut den Store, Knut den Helige', 12, ARRAY['Danmark', 'Sverige', 'England']),
('Magnus', 'male', 'Den store', 'Latiniserad form av stor/mäktig', 'Magnus den Gode, Magnus Ladulås', 8, ARRAY['Norge', 'Sverige']),
('Valdemar', 'male', 'Berömda härskaren', 'Fornnordiska: valdis (berömda) + marr (berömda)', 'Danska kungar Valdemar I-IV', 6, ARRAY['Danmark', 'Sverige']),
('Birger', 'male', 'Hjälparen', 'Fornnordiska: bjarga (hjälpa, rädda)', 'Birger Jarl, Birger Magnusson', 9, ARRAY['Sverige']),
('Håkan', 'male', 'Höge son', 'Fornnordiska: hár (hög) + konr (son)', 'Håkan den Röde, flera svenska kungar', 7, ARRAY['Sverige']),
('Inge', 'male', 'Ing-gud', 'Fornnordiska: Yngvi/Ing (gud)', 'Inge den äldre, Inge den yngre', 5, ARRAY['Sverige']),
('Ragnvald', 'male', 'Gudarnas rådgivare', 'Fornnordiska: regin (gudar) + valdr (härskare)', 'Ragnvald Knaphövde', 4, ARRAY['Sverige', 'Norge']),

-- Names from Carvers and Craftsmen
('Åsmund', 'male', 'Gud-skydd', 'Fornnordiska: áss (gud) + mundr (skydd)', 'Runristare Åsmund Kåresson', 8, ARRAY['Sverige']),
('Öpir', 'male', 'Vildsvin-krigare', 'Fornnordiska: jörfr (vildsvin)', 'Berömd runristare', 12, ARRAY['Sverige']),
('Fot', 'male', 'Fot', 'Fornnordiska: fótr (fot)', 'Runristare som signerade sina verk', 6, ARRAY['Sverige']),
('Lief', 'male', 'Efterlämning', 'Fornnordiska: leifr (lämning)', 'Förekommer i flera runinskrifter', 4, ARRAY['Sverige', 'Norge']),
('Toke', 'male', 'Thors vapenbärare', 'Fornnordiska: Þórr + vápn', 'Dansk/svensk runristare', 7, ARRAY['Danmark', 'Sverige']),

-- Names from Runic Inscriptions (frequent names)
('Ulf', 'male', 'Varg', 'Fornnordiska: úlfr (varg)', 'Mycket vanligt i runinskrifter, krigarnamn', 45, ARRAY['Sverige', 'Danmark', 'Norge']),
('Bjorn', 'male', 'Björn', 'Fornnordiska: bjorn (björn)', 'Kraftsymbol, vanligt krigarnamn', 38, ARRAY['Sverige', 'Norge', 'Island']),
('Sven', 'male', 'Yngling', 'Fornnordiska: sveinn (yngling, pojke)', 'Sven Tveskägg, vanligt namn', 32, ARRAY['Sverige', 'Danmark']),
('Sigurd', 'male', 'Segerväktare', 'Fornnordiska: sigr (seger) + vardr (väktare)', 'Hjälte i Völsungasagan', 28, ARRAY['Sverige', 'Norge', 'Island']),
('Ragnar', 'male', 'Gudarnas krigare', 'Fornnordiska: regin (gudar) + harjaz (krigare)', 'Ragnar Lodbrok, legendarisk kung', 24, ARRAY['Sverige', 'Danmark', 'Norge']),
('Torsten', 'male', 'Tors sten', 'Fornnordiska: Þórr + steinn', 'Thor-namn, vanligt i runinskrifter', 35, ARRAY['Sverige']),
('Gunnar', 'male', 'Stridskämpe', 'Fornnordiska: gunnr (strid) + arr (krigare)', 'Hjälte i sagalitteraturen', 29, ARRAY['Sverige', 'Norge', 'Island']),
('Einar', 'male', 'Ensam krigare', 'Fornnordiska: ein (ensam) + harjaz (krigare)', 'Förekommer ofta i runinskrifter', 21, ARRAY['Norge', 'Sverige']),
('Torkel', 'male', 'Tors kedja', 'Fornnordiska: Þórr + ketill', 'Vanligt namn i Mälardalen', 18, ARRAY['Sverige']),
('Eskil', 'male', 'Guds kedja', 'Fornnordiska: áss + ketill', 'Helgon, även vanligt världsligt namn', 16, ARRAY['Sverige']),

-- Female names with proper etymology
('Astrid', 'female', 'Gud-ryttare', 'Fornnordiska: áss (gud) + ríðr (ryttare)', 'Drottning Astrid, mycket vanligt namn', 25, ARRAY['Sverige', 'Norge', 'Danmark']),
('Sigrid', 'female', 'Seger-ryttare', 'Fornnordiska: sigr (seger) + ríðr (ryttare)', 'Sigrid Storråda, mäktig drottning', 22, ARRAY['Sverige']),
('Ingrid', 'female', 'Ing-ryttare', 'Fornnordiska: Yngvi (gud) + ríðr (ryttare)', 'Vanligt namn i runinskrifter', 19, ARRAY['Sverige', 'Norge']),
('Gudrun', 'female', 'Guds runa', 'Fornnordiska: guð (gud) + rún (runa)', 'Hjältinna i Völsungasagan', 17, ARRAY['Sverige', 'Norge', 'Island']),
('Ragnhild', 'female', 'Gudarnas strid', 'Fornnordiska: regin (gudar) + hildr (strid)', 'Många nordiska drottningar', 15, ARRAY['Norge', 'Danmark', 'Sverige']),
('Kristina', 'female', 'Kristen', 'Grekiska: khristos (smord)', 'Kristendomens intåg, svensk drottning', 13, ARRAY['Sverige']),
('Margareta', 'female', 'Pärla', 'Grekiska: margarites (pärla)', 'Margareta Valdemarsdotter', 11, ARRAY['Danmark', 'Sverige', 'Norge']),
('Cecilia', 'female', 'Blind', 'Latinsk: caecus (blind)', 'Helgon, blev populärt i Norden', 9, ARRAY['Sverige']),
('Helena', 'female', 'Ljus', 'Grekiska: helios (sol)', 'Helgon Helena, blev nordiskt namn', 8, ARRAY['Sverige']),
('Birgitta', 'female', 'Hjälperskan', 'Keltiska: Brigid (kraftgudinna)', 'Heliga Birgitta, patrona för Sverige', 12, ARRAY['Sverige']),

-- More traditional Norse female names
('Tora', 'female', 'Thor-kvinna', 'Fornnordiska: Þórr + kvinnligt suffix', 'Thor-namn för kvinnor', 14, ARRAY['Sverige', 'Norge']),
('Solveig', 'female', 'Solens väg', 'Fornnordiska: sól (sol) + veig (väg)', 'Poetiskt namn från sagorna', 10, ARRAY['Norge', 'Sverige']),
('Thyra', 'female', 'Thor-kvinna', 'Fornnordiska: Þórr + kvinnligt suffix', 'Drottning Thyra Danebod', 7, ARRAY['Danmark']),
('Gunhild', 'female', 'Strids-kämpe', 'Fornnordiska: gunnr (strid) + hildr (strid)', 'Mäktig nordisk drottning', 13, ARRAY['Danmark', 'Norge']),
('Alfhild', 'female', 'Alv-strid', 'Fornnordiska: alfr (alv) + hildr (strid)', 'Mytisk sköldmö', 6, ARRAY['Sverige', 'Norge']),

-- God names that became personal names
('Tor', 'male', 'Åskguden', 'Fornnordiska: Þórr (åskgud)', 'Åskguden Thor, blev vanligt personnamn', 31, ARRAY['Sverige', 'Norge', 'Danmark']),
('Oden', 'male', 'Rasande', 'Fornnordiska: Óðinn (rasande)', 'Högste guden, sällsynt som personnamn', 3, ARRAY['Sverige', 'Norge']),
('Frej', 'male', 'Herre', 'Fornnordiska: Freyr (herre)', 'Fruktbarhetsgud, blev personnamn', 5, ARRAY['Sverige']),
('Balder', 'male', 'Herre/prins', 'Fornnordiska: baldr (herre)', 'Ljusets gud, poetiskt namn', 2, ARRAY['Sverige', 'Norge']),
('Freja', 'female', 'Fru/dam', 'Fornnordiska: Freyja (fru)', 'Kärleksgudinnan, blev kvinnonamn', 8, ARRAY['Sverige', 'Norge']),

-- Occupational and descriptive names
('Smed', 'male', 'Smed', 'Fornnordiska: smiðr (smed)', 'Yrkesnamn som blev personnamn', 12, ARRAY['Sverige']),
('Jarl', 'male', 'Adelsman', 'Fornnordiska: jarl (adelsman)', 'Titel som blev namn', 9, ARRAY['Sverige', 'Norge']),
('Skald', 'male', 'Poet', 'Fornnordiska: skáld (poet)', 'Yrke som blev namn', 4, ARRAY['Norge', 'Island']),
('Karl', 'male', 'Man/bonde', 'Fornnordiska: karl (man)', 'Vanligt namn, även Karl den Store', 20, ARRAY['Sverige', 'Tyskland']),
('Bonde', 'male', 'Bonde', 'Fornnordiska: bóndi (bonde)', 'Yrkesnamn', 6, ARRAY['Sverige']),

-- Compound names with nature elements
('Bjarne', 'male', 'Björn-lik', 'Fornnordiska: bjorn + -ni (suffix)', 'Björnnamn', 11, ARRAY['Norge', 'Danmark']),
('Arne', 'male', 'Örn', 'Fornnordiska: arn (örn)', 'Fågelnamn, styrka-symbol', 16, ARRAY['Sverige', 'Norge']),
('Sten', 'male', 'Sten', 'Fornnordiska: steinn (sten)', 'Enkelt naturnamn', 14, ARRAY['Sverige']),
('Hakon', 'male', 'Höge son', 'Fornnordiska: hár + konr', 'Norska kungar', 10, ARRAY['Norge']),
('Brand', 'male', 'Svärd/brand', 'Fornnordiska: brandr (svärd)', 'Vapennamn', 8, ARRAY['Sverige', 'Norge'])
) AS new_names(name, gender, meaning, etymology, historical_info, frequency, regions)
WHERE NOT EXISTS (
  SELECT 1 FROM viking_names vn 
  WHERE vn.name = new_names.name AND vn.gender = new_names.gender
);