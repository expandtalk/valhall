-- Update Sibbe's region to Sweden since he was historically associated with Mälardalen
UPDATE historical_kings 
SET region = 'Sweden'
WHERE name = 'Sibbe' AND dynasty_id = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';