-- Add Dalarna runic inscriptions to the database
INSERT INTO runic_inscriptions (
  signum, transliteration, translation_sv, translation_en, dating_text, location, parish, 
  municipality, county, landscape, country, object_type, material, coordinates, 
  uncertainty_level, data_source, condition_notes, historical_context
) VALUES 
-- Isala, Svärdsjö
('Isala', 'u kaahlir', NULL, NULL, 'ca 1520 eller senare', 'Isala', 'Svärdsjö', 'Svärdsjö', 'Dalarna', 'Dalarna', 'Sverige', 'Byggnadsinskrift', 'Trä', ST_SetSRID(ST_MakePoint(15.943672, 60.770426), 4326), 'Osäker datering', 'Rundata', 'Skuren i fjärde stocken nedifrån, ca 15 cm lång', 'Kungsladan i Isala ska vara en av de platser Gustav Vasa besökte när han flydde undan danskarna vintern 1520. Berättelserna är dock först upptecknade 1667 och bör tas med försiktighet. Risk att inskriften är betydligt yngre.'),

-- D RAÄ Silvberg 152
('D RAÄ Silvberg 152', 'tiyillminiirinalttn', NULL, NULL, 'Vikingatid', 'Sandvik', 'Silvberg', 'Säter', 'Dalarna', 'Dalarna', 'Sverige', 'Runsten', 'Sten', NULL, 'Osäker tolkning', 'Rundata', NULL, NULL),

-- D RAÄ Vika 182
('D RAÄ Vika 182', 'iifuaþumlraþRitio', NULL, NULL, 'Vikingatid (runor), möjligen 1800-tal (ristning)', 'Nyhyttan', 'Vika', 'Rättvik', 'Dalarna', 'Dalarna', 'Sverige', 'Byggnadsinskrift', 'Trä', NULL, 'Osäker datering', 'Rundata', 'Finns i byggnadsminnesmärkt lada', 'Inskriften finns i en lada med äldsta stockar från 1472-1473, men runorna är av vikingatida typ och kan vara ristade på 1800-talet. Omnämns i Riksantikvarieämbetets handlingar 1991.'),

-- D Rv 3
('D Rv 3', 'EOS afuer giol läla lrug den 29 oclober anno 1752', 'Erik Olsson har gjort detta tråg den 29 oktober anno 1752', 'Erik Olsson made this trough on October 29, anno 1752', '1752', 'Rot', 'Älvdalen', 'Älvdalen', 'Dalarna', 'Dalarna', 'Sverige', 'Föremålsinskrift', 'Trä', NULL, 'Säker datering', 'Rundata', 'Finns nu i hembygdsmuseet Rots Skans', 'Erik Olsson vände konsekvent t-runan åt fel håll så den blev ett l. Enligt Helmer Gustavson en av de sista inskrifter där t-runan använts. Ärtränna.'),

-- D Rv 20
('D Rv 20', 'anders olsun . hafer . giort . sklä . utaf : grån . at . hån . skal . giära : sina : tinest 1608 PMMLD 1726', 'Anders Olsson har gjort skålen av gran att hon ska göra sin tjänst. 1608', 'Anders Olsson made the bowl from spruce so that it shall do its service. 1608', '1608', 'Blyberg', 'Älvdalen', 'Älvdalen', 'Dalarna', 'Dalarna', 'Sverige', 'Föremålsinskrift', 'Trä (gran)', NULL, 'Säker datering', 'Rundata', 'Träskål, finns i hembygdsmuseet Rots Skans', 'Träskål gjord av Anders Olsson. Senare inskrift med initialer finns också. Anders Olsson gjorde även en skål 1596 (D Rv 174).'),

-- D Rv 29A
('D Rv 29A', 'EES M1D7CCL8XX0X den XXVIII iuli då : uar : ui : är : i stak : kiön : en : uiko oc : in : tet : ber : gat : gug : nåde : os : 1783 den 19 iuli om afton kom et bod som war för suårt LSS A C', 'Erik Ersson 1780 den 28 juli, då var vi här i Stackkölen en vecka och intet bärgat. Gud nåde oss. 1783 den 19 juli om aftonen kom ett bud som var för svårt. Lars Larsson.', 'Erik Ersson 1780 July 28, then we were here in Stackkölen for a week and harvested nothing. God have mercy on us. 1783 July 19 in the evening came a message that was too harsh. Lars Larsson.', '1780, 1783', NULL, 'Älvdalen', 'Älvdalen', 'Dalarna', 'Dalarna', 'Sverige', 'Byggnadsinskrift', 'Trä', NULL, 'Säker datering', 'Rundata', NULL, 'Berättar om svåra tider och missväxt i Älvdalen under 1780-talet.'),

-- D Rv 40 (listed as D Rv 41 in text)
('D Rv 40', '1696 AED oc : tå : uar : ett : suårt : ugers : år oc : dyr : tiid gudh bettre EMS', '1696 Anna Ersdotter och då var ett svårt hungersår och dyrtid. Gud bättre! Erik Mattsson', '1696 Anna Ersdotter and then it was a harsh famine year and expensive times. God make it better! Erik Mattsson', '1696', NULL, 'Älvdalen', 'Älvdalen', 'Dalarna', 'Dalarna', 'Sverige', 'Byggnadsinskrift', 'Trä', NULL, 'Säker datering', 'Rundata', NULL, 'Vittnar om svåra tider med hungersnöd och dyrtid 1696.')

ON CONFLICT (signum) DO NOTHING;