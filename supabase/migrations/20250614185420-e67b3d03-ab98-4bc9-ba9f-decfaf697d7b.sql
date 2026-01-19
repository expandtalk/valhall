
-- Add a column to store the original Rundata reading ID.
-- This is a necessary step before importing reading-to-source relationships.
ALTER TABLE public.readings
ADD COLUMN rundata_readingid TEXT;

-- Add a unique constraint to ensure data integrity.
ALTER TABLE public.readings
ADD CONSTRAINT readings_rundata_readingid_key UNIQUE (rundata_readingid);
