
-- Add gender column to historical_kings table
ALTER TABLE historical_kings 
ADD COLUMN gender text NOT NULL DEFAULT 'male';

-- Add check constraint to ensure valid gender values
ALTER TABLE historical_kings 
ADD CONSTRAINT check_gender CHECK (gender IN ('male', 'female', 'unknown'));

-- Update some known female rulers
UPDATE historical_kings 
SET gender = 'female' 
WHERE name ILIKE '%margrete%' 
   OR name ILIKE '%margareta%' 
   OR name ILIKE '%kristina%'
   OR name ILIKE '%drottning%';

-- Create index for efficient filtering
CREATE INDEX idx_historical_kings_gender ON historical_kings(gender);
