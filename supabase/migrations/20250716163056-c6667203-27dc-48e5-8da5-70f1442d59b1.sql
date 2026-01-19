-- Critical Security Fixes - Phase 1: Add Missing RLS Policies

-- Archaeological sites - public read access
CREATE POLICY "Archaeological sites are publicly viewable"
ON public.archaeological_sites
FOR SELECT USING (true);

CREATE POLICY "Admins can manage archaeological sites"
ON public.archaeological_sites
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Genetic individuals - public read access for research
CREATE POLICY "Genetic individuals are publicly viewable"
ON public.genetic_individuals
FOR SELECT USING (true);

CREATE POLICY "Admins can manage genetic individuals"
ON public.genetic_individuals
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Historical events - public read access
CREATE POLICY "Historical events are publicly viewable"
ON public.historical_events
FOR SELECT USING (true);

CREATE POLICY "Admins can manage historical events"
ON public.historical_events
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Historical periods - public read access
CREATE POLICY "Historical periods are publicly viewable"
ON public.historical_periods
FOR SELECT USING (true);

CREATE POLICY "Admins can manage historical periods"
ON public.historical_periods
FOR ALL USING (is_admin())
WITH CHECK (is_admin());

-- Genetic markers - public read access for research
CREATE POLICY "Genetic markers are publicly viewable"
ON public.genetic_markers
FOR SELECT USING (true);

CREATE POLICY "Admins can manage genetic markers"
ON public.genetic_markers
FOR ALL USING (is_admin())
WITH CHECK (is_admin());