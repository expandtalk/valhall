
-- Helper function to check for admin role, useful for RLS policies
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the user has the 'admin' role in the user_roles table
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = p_user_id AND role = 'admin'::public.app_role
  );
END;
$$;

-- Create the objects table to store artefact and object data from Rundata
CREATE TABLE public.objects (
    objectid UUID NOT NULL PRIMARY KEY,
    placeid UUID,
    artefact VARCHAR(255),
    material VARCHAR(255),
    extant BOOLEAN NOT NULL DEFAULT TRUE,
    originallocation BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_place
        FOREIGN KEY(placeid) 
        REFERENCES public.places(placeid)
        ON UPDATE CASCADE
);

COMMENT ON TABLE public.objects IS 'Stores individual objects, often runic artefacts, linking them to places. Based on Rundata''s objects table.';
COMMENT ON COLUMN public.objects.objectid IS 'Primary key, UUID of the object, from Rundata binary(16).';
COMMENT ON COLUMN public.objects.placeid IS 'Foreign key to the places table.';
COMMENT ON COLUMN public.objects.artefact IS 'Type of artefact (e.g., Runsten, Berghäll).';
COMMENT ON COLUMN public.objects.material IS 'Material of the artefact (e.g., Sten, Sandsten).';
COMMENT ON COLUMN public.objects.extant IS 'True if the object is still in existence, false if lost.';
COMMENT ON COLUMN public.objects.originallocation IS 'True if the object is at its original location, false if moved, NULL if unknown.';


-- Enable Row Level Security on the new table
ALTER TABLE public.objects ENABLE ROW LEVEL SECURITY;

-- Grant permissions using RLS policies
CREATE POLICY "Allow public read access to objects"
ON public.objects
FOR SELECT
USING (true);

CREATE POLICY "Allow admin users to insert new objects"
ON public.objects
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Allow admin users to update objects"
ON public.objects
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Allow admin users to delete objects"
ON public.objects
FOR DELETE
USING (public.is_admin(auth.uid()));
