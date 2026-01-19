-- Security Fix: Add missing RLS policies for tables without them

-- 1. Add RLS policies for aliases_canonical table
CREATE POLICY "Allow public read access to aliases_canonical" 
ON public.aliases_canonical 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage aliases_canonical" 
ON public.aliases_canonical 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- 2. Add RLS policies for alts_canonical table  
CREATE POLICY "Allow public read access to alts_canonical" 
ON public.alts_canonical 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage alts_canonical" 
ON public.alts_canonical 
FOR ALL 
USING (is_admin()) 
WITH CHECK (is_admin());

-- 3. Add RLS policies for her_SE table
CREATE POLICY "Allow public read access to her_SE" 
ON public.her_SE 
FOR SELECT 
USING (true);

CREATE POLICY "Allow admins to manage her_SE" 
ON public.her_SE 
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

-- 6. Fix function search path issues - Update functions to include search_path
CREATE OR REPLACE FUNCTION public.get_carver_statistics()
RETURNS TABLE(carver_name text, total_inscriptions bigint, signed_count bigint, attributed_count bigint, certain_count bigint, uncertain_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    c.name::text as carver_name,
    COUNT(*)::bigint as total_inscriptions,
    COUNT(CASE WHEN ci.attribution = 'signed' THEN 1 END)::bigint as signed_count,
    COUNT(CASE WHEN ci.attribution = 'attributed' THEN 1 END)::bigint as attributed_count,
    COUNT(CASE WHEN ci.certainty = true THEN 1 END)::bigint as certain_count,
    COUNT(CASE WHEN ci.certainty = false THEN 1 END)::bigint as uncertain_count
  FROM carvers c
  JOIN carver_inscription ci ON encode(ci.carverid, 'hex') = replace(c.id::text, '-', '')
  GROUP BY c.name
  ORDER BY total_inscriptions DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_carver_inscriptions()
RETURNS TABLE(carverid text, inscriptionid text, attribution attribution_type, certainty boolean, notes text, inscription jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    c.id::text as carverid,
    encode(ci.inscriptionid, 'hex') as inscriptionid,
    ci.attribution,
    ci.certainty,
    ci.notes,
    jsonb_build_object(
      'id', encode(ci.inscriptionid, 'hex'),
      'signum', COALESCE(r.signum, 'Unknown'),
      'location', COALESCE(r.location, c.region),
      'coordinates', 
      CASE 
        WHEN r.coordinates IS NOT NULL THEN 
          jsonb_build_object('lat', ST_Y(r.coordinates), 'lng', ST_X(r.coordinates))
        ELSE NULL 
      END
    ) as inscription
  FROM carvers c
  JOIN carver_inscription ci ON encode(ci.carverid, 'hex') = replace(c.id::text, '-', '')
  LEFT JOIN runic_inscriptions r ON encode(ci.inscriptionid, 'hex') = replace(r.id::text, '-', '')
  ORDER BY c.name, ci.certainty DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.map_b_signum_to_modern(old_signum text, parish_name text, province_name text)
RETURNS text
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  -- Mappa B-signum till Närke (Nä) format
  IF province_name ILIKE '%örebro%' OR province_name ILIKE '%närke%' THEN
    CASE old_signum
      WHEN 'B 768' THEN RETURN 'Nä 33';
      -- Lägg till fler mappningar här när vi hittar dem
    END CASE;
  END IF;
  
  -- Behåll original signum om ingen mapping finns
  RETURN old_signum;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_viking_names_stats()
RETURNS TABLE(total_names integer, male_names integer, female_names integer, total_frequency integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_names,
    COUNT(*) FILTER (WHERE gender = 'male')::INTEGER as male_names,
    COUNT(*) FILTER (WHERE gender = 'female')::INTEGER as female_names,
    COALESCE(SUM(frequency), 0)::INTEGER as total_frequency
  FROM viking_names;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT public.has_role(auth.uid(), 'admin')
$function$;