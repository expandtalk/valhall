-- Add missing name for U 1132 (Gimostenen)
UPDATE runic_inscriptions 
SET 
    name = 'Gimostenen',
    name_en = 'Gimo Stone',
    also_known_as = ARRAY['Gimostenen']
WHERE signum = 'U 1132' AND name IS NULL;