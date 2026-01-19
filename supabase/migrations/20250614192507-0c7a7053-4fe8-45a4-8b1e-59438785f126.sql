
CREATE TABLE public.material_materialsubtype (
    materialid bytea NOT NULL,
    subtypeid bytea NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    PRIMARY KEY (materialid, subtypeid)
);

-- Note: Foreign key constraints to `materials` and `materialsubtypes` tables
-- have been omitted as these tables do not exist in the database.
-- They can be added later if the parent tables are created.

-- Add RLS policies
ALTER TABLE public.material_materialsubtype ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on material_materialsubtype"
ON public.material_materialsubtype
FOR SELECT
USING (true);

CREATE POLICY "Allow admin full access on material_materialsubtype"
ON public.material_materialsubtype
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
