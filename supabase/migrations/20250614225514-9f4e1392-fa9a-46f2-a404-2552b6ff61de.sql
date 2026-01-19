
-- Create the findnumbers table to store find numbers for objects
CREATE TABLE public.findnumbers (
    objectid UUID NOT NULL,
    findnumber VARCHAR(16) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (objectid, findnumber),
    CONSTRAINT fk_object
        FOREIGN KEY(objectid) 
        REFERENCES public.objects(objectid)
        ON DELETE CASCADE
);

COMMENT ON TABLE public.findnumbers IS 'Stores find numbers for archaeological objects, linking them to the objects table.';
COMMENT ON COLUMN public.findnumbers.objectid IS 'Foreign key to the objects table, identifying the object.';
COMMENT ON COLUMN public.findnumbers.findnumber IS 'The find number, e.g., a museum inventory number.';

-- Add a trigger to automatically update the updated_at timestamp
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.findnumbers
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.findnumbers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for findnumbers table
CREATE POLICY "Findnumbers are viewable by everyone"
  ON public.findnumbers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage findnumbers"
  ON public.findnumbers FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

