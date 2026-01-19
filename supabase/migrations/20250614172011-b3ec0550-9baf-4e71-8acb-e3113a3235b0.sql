
-- Create a table to store Swedish parish data
CREATE TABLE public.parishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  code TEXT,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trigger to automatically update 'updated_at' column
CREATE TRIGGER handle_parishes_updated_at
  BEFORE UPDATE ON public.parishes
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

-- Add RLS policies
ALTER TABLE public.parishes ENABLE ROW LEVEL SECURITY;

-- Policy: Parishes are public and viewable by everyone
CREATE POLICY "Parishes are viewable by everyone"
  ON public.parishes FOR SELECT
  USING (true);

-- Policy: Admins can insert, update, and delete parishes
CREATE POLICY "Admins can manage parishes"
  ON public.parishes FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
