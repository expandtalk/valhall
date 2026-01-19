
-- Update historical kings with accurate dates and information for Bjälboätten/Folkungaätten members

-- Update Birger jarl (Birger Magnusson)
UPDATE historical_kings 
SET reign_start = 1250,
    reign_end = 1266,
    description = 'Jarl under kung Erik läspe och halte, sedan regent för sin son Valdemar från 1250-1266. Född ca 1210, död 21 oktober 1266.'
WHERE name = 'Birger jarl';

-- Update Valdemar Birgersson 
UPDATE historical_kings 
SET reign_start = 1250,
    reign_end = 1275,
    description = 'Kung av Sverige 1250-1275. Valdes till kung 1250 vid 10 års ålder, död 1302. Son till Birger jarl.'
WHERE name = 'Valdemar Birgersson';

-- Update Magnus Ladulås
UPDATE historical_kings 
SET reign_start = 1275,
    reign_end = 1290,
    description = 'Kung av Sverige 1275-1290. Född ca 1240, död 18 december 1290 på Visingsö. Krönt 24 maj 1276 i Uppsala domkyrka.'
WHERE name = 'Magnus Ladulås';

-- Update Birger Magnusson (son till Magnus Ladulås)
UPDATE historical_kings 
SET reign_start = 1290,
    reign_end = 1318,
    description = 'Kung av Sverige 1290-1318. Född 1280/1281, död 1321. Son till Magnus Ladulås.'
WHERE name = 'Birger Magnusson';

-- Update Erik Magnusson 
UPDATE historical_kings 
SET reign_start = 1300,
    reign_end = 1318,
    description = 'Hertig av Södermanland m.m. Född omkring 1282, död 1318. Son till Magnus Ladulås.',
    status = 'historical'
WHERE name = 'Erik Magnusson';

-- Update Valdemar Magnusson
UPDATE historical_kings 
SET reign_start = 1300,
    reign_end = 1318,
    description = 'Hertig av Finland. Född omkring 1285, död 1318. Son till Magnus Ladulås.',
    status = 'historical'
WHERE name = 'Valdemar Magnusson';

-- Update Magnus Minnesköld with estimated dates
UPDATE historical_kings 
SET reign_start = 1180,
    reign_end = 1210,
    description = 'Birger jarls far, tros ha dött senast 1210. Bror till Birger Brosa. Medlem av Bjälboätten.',
    status = 'semi_legendary'
WHERE name = 'Magnus Minnesköld';

-- Update Bengt snivil with 12th century dates
UPDATE historical_kings 
SET reign_start = 1150,
    reign_end = 1200,
    description = '1100-talet, stamfader till Bjälboätten enligt vissa källor. Hade tre kända söner: Birger, Magnus och Karl.',
    status = 'semi_legendary'
WHERE name = 'Bengt snivil';

-- Update Karl Döve 
UPDATE historical_kings 
SET reign_start = 1180,
    reign_end = 1220,
    description = 'Medlem av Bjälboätten, bror till Magnus Minnesköld och Birger Brosa. Datum okända.',
    status = 'semi_legendary'
WHERE name = 'Karl Döve';

-- Ensure all Bjälboätten members have the correct dynasty_id
UPDATE historical_kings 
SET dynasty_id = (SELECT id FROM royal_dynasties WHERE name = 'Bjälboätten' LIMIT 1)
WHERE name IN (
  'Birger jarl', 'Valdemar Birgersson', 'Magnus Ladulås', 'Birger Magnusson',
  'Erik Magnusson', 'Valdemar Magnusson', 'Magnus Minnesköld', 
  'Bengt snivil', 'Karl Döve'
);
