-- Remove duplicate entries for Harald Blåtand and Gorm den Gamle
-- Keep only the ones in the Sjökungar dynasty and remove the old ones

-- First, let's see what duplicates we have
-- Delete Harald Blåtand entries that are NOT in the Sjökungar dynasty
DELETE FROM historical_kings 
WHERE name = 'Harald Blåtand' 
AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';

-- Delete Gorm den Gamle entries that are NOT in the Sjökungar dynasty  
DELETE FROM historical_kings 
WHERE name = 'Gorm den Gamle' 
AND dynasty_id != 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';