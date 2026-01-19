
-- Update gender for Olga den fagre who was incorrectly marked as male
UPDATE historical_kings 
SET gender = 'female' 
WHERE name = 'Olga den fagre';
