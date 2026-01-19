
-- Aktivera Row Level Security (RLS) på dating-tabellen om det inte redan är gjort.
ALTER TABLE public.dating ENABLE ROW LEVEL SECURITY;

-- Skapa en policy som tillåter alla användare att läsa (SELECT) data.
-- Detta gör datan publikt läsbar.
CREATE POLICY "Allow public read access on dating"
ON public.dating
FOR SELECT
USING (true);

-- Skapa en policy som ger administratörer fulla rättigheter (INSERT, UPDATE, DELETE).
-- Funktionen is_admin() kollar om den inloggade användaren har rollen 'admin'.
CREATE POLICY "Allow admin full access on dating"
ON public.dating
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
