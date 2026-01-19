-- Security Fix: Add missing RLS policies for tables without them (corrected table names)

-- Enable RLS on her_SE table (correct case)
ALTER TABLE public."her_SE" ENABLE ROW LEVEL SECURITY;

-- 1. Add RLS policies for her_SE table (correct case)
CREATE POLICY "Allow public read access to her_SE" 
ON public."her_SE" 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage her_SE" 
ON public."her_SE" 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- 2. Add RLS policies for aliases_canonical table
CREATE POLICY "Allow public read access to aliases_canonical" 
ON public.aliases_canonical 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage aliases_canonical" 
ON public.aliases_canonical 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- 3. Add RLS policies for alts_canonical table  
CREATE POLICY "Allow public read access to alts_canonical" 
ON public.alts_canonical 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage alts_canonical" 
ON public.alts_canonical 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- 4. Add RLS policies for her_dk_notes table
CREATE POLICY "Allow public read access to her_dk_notes" 
ON public.her_dk_notes 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage her_dk_notes" 
ON public.her_dk_notes 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- 5. Add RLS policies for admixture_analysis table
CREATE POLICY "Allow public read access to admixture_analysis" 
ON public.admixture_analysis 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage admixture_analysis" 
ON public.admixture_analysis 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());