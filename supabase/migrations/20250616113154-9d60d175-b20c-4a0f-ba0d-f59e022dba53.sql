
-- Update gender for female rulers that were incorrectly marked as male
UPDATE historical_kings 
SET gender = 'female' 
WHERE name IN ('Ingegärd Birgersdotter', 'Katarina Sunesdotter');
