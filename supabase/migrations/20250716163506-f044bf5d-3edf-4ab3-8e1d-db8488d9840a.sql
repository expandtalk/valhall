-- Fix missing RLS policies for artefacts and other tables

-- Artefacts - public read access
CREATE POLICY "Artefacts are publicly viewable"
ON public.artefacts
FOR SELECT USING (true);

CREATE POLICY "Admins can manage artefacts"
ON public.artefacts
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Add policies for other tables that might be missing
-- Bracteatetypes - public read access  
CREATE POLICY "Bracteate types are publicly viewable"
ON public.bracteatetypes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage bracteate types"
ON public.bracteatetypes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Carver inscription - public read access
CREATE POLICY "Carver inscriptions are publicly viewable"
ON public.carver_inscription
FOR SELECT USING (true);

CREATE POLICY "Admins can manage carver inscriptions"
ON public.carver_inscription
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Counties - public read access
CREATE POLICY "Counties are publicly viewable"
ON public.counties
FOR SELECT USING (true);

CREATE POLICY "Admins can manage counties"
ON public.counties
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Countries - public read access
CREATE POLICY "Countries are publicly viewable"
ON public.countries
FOR SELECT USING (true);

CREATE POLICY "Admins can manage countries"
ON public.countries
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Material types - public read access
CREATE POLICY "Material types are publicly viewable"
ON public.materialtypes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage material types"
ON public.materialtypes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Municipalities - public read access
CREATE POLICY "Municipalities are publicly viewable"
ON public.municipalities
FOR SELECT USING (true);

CREATE POLICY "Admins can manage municipalities"
ON public.municipalities
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Norwegian localities - public read access
CREATE POLICY "Norwegian localities are publicly viewable"
ON public.norwegian_localities
FOR SELECT USING (true);

CREATE POLICY "Admins can manage Norwegian localities"
ON public.norwegian_localities
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Notes - public read access
CREATE POLICY "Notes are publicly viewable"
ON public.notes
FOR SELECT USING (true);

CREATE POLICY "Admins can manage notes"
ON public.notes
FOR ALL USING (is_admin())
WITH CHECK (is_admin());