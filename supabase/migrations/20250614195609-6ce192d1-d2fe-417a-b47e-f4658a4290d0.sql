
CREATE TABLE public.inscription_group (
    inscriptionid bytea NOT NULL,
    groupid bytea NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT inscription_group_pkey PRIMARY KEY (inscriptionid, groupid)
);

COMMENT ON TABLE public.inscription_group IS 'Maps inscriptions to groups. Based on Rundata''s inscription_group table.';
COMMENT ON COLUMN public.inscription_group.inscriptionid IS 'Foreign key to an inscriptions identifier. Stored as bytea, converted from Rundata binary(16).';
COMMENT ON COLUMN public.inscription_group.groupid IS 'Foreign key to a groups identifier. Stored as bytea, converted from Rundata binary(16).';

-- Note: Foreign key constraints are not added at this time as the referenced tables (`groups`, `inscriptions`)
-- do not have matching primary keys in the current schema. The relationship will be maintained logically.

-- Add RLS policies
ALTER TABLE public.inscription_group ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on inscription_group"
ON public.inscription_group
FOR SELECT
USING (true);

CREATE POLICY "Allow admin full access on inscription_group"
ON public.inscription_group
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
