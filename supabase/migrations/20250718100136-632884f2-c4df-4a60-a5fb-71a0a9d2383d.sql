-- Insert additional important Viking Age events
INSERT INTO historical_events (event_name, event_name_en, year_start, year_end, event_type, significance_level, description, description_en, region_affected) VALUES

-- 845 Ragnar attacks Paris
('Ragnar leder angrepp mot Paris', 'Ragnar leads attack on Paris', 845, 845, 'raid', 'very_high', 'Vikingahövdingen Ragnar leder ett angrepp mot Paris vars befolkning undkommer plundring genom att erlägga en stor summa i silver', 'Viking chieftain Ragnar leads an attack on Paris whose population escapes plundering by paying a large sum in silver', ARRAY['Frankrike', 'Paris', 'Seine']),

-- 859 Mediterranean expedition
('Vikingar når Medelhavet och plundrar Nordafrika', 'Vikings reach Mediterranean and plunder North Africa', 859, 859, 'raid', 'very_high', 'Vikingarna tar sig till medelhavet och övervintrar vid Rhones delta. Härjningar i Nordafrika. Nakur plundras och emiren av Cordoba betalar lösensummor', 'Vikings reach the Mediterranean and winter at the Rhône delta. Raids in North Africa. Nakur is plundered and the Emir of Cordoba pays ransoms', ARRAY['Medelhavet', 'Nordafrika', 'Spanien', 'Rhone']),

-- 858-863 Weser and Rhine raids
('Vikingar plundrar vid Weser och Rhen', 'Vikings plunder areas near Weser and Rhine', 858, 863, 'raid', 'high', 'Vikingar plundrar områden vid Weser och Rhen under flera år', 'Vikings plunder areas near Weser and Rhine rivers for several years', ARRAY['Tyskland', 'Nederländerna', 'Weser', 'Rhen']),

-- 865 Great Viking Army
('Stora vikingahären anländer till England', 'Great Viking Army arrives in England', 865, 865, 'military', 'very_high', 'En stor vikingahär anländer till England. Anglosaxiska kungar dödas och ersätts av skandinaviska härskare. Danelagen etableras', 'A great Viking army arrives in England. Anglo-Saxon kings are killed and replaced by Scandinavian rulers. The Danelaw is established', ARRAY['England', 'Northumbria', 'East Anglia', 'Danelagen']),

-- 892-896 Alfred fights back
('Alfred den store slår tillbaka vikingaattacker', 'Alfred the Great repels Viking attacks', 892, 896, 'military', 'very_high', 'Alfred den store slår tillbaka en ny våg av vikingaattacker mot England', 'Alfred the Great repels a new wave of Viking attacks against England', ARRAY['England', 'Wessex']),

-- 902 Norse expelled from Dublin
('Nordborna fördrivs från Dublin', 'Norse expelled from Dublin', 902, 902, 'political', 'high', 'Nordborna fördrivs från Dublin', 'The Norse are expelled from Dublin', ARRAY['Irland', 'Dublin']);