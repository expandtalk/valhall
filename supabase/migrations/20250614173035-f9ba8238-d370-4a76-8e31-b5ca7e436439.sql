
-- Create a table to store Swedish hundred data
CREATE TABLE public.hundreds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  province_external_id TEXT,
  division_external_id TEXT,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger to automatically update 'updated_at' column
CREATE TRIGGER handle_hundreds_updated_at
  BEFORE UPDATE ON public.hundreds
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

-- Add RLS policies
ALTER TABLE public.hundreds ENABLE ROW LEVEL SECURITY;

-- Policy: Hundreds are public and viewable by everyone
CREATE POLICY "Hundreds are viewable by everyone"
  ON public.hundreds FOR SELECT
  USING (true);

-- Policy: Admins can insert, update, and delete hundreds
CREATE POLICY "Admins can manage hundreds"
  ON public.hundreds FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
