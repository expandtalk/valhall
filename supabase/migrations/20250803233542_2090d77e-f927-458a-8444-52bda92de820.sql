-- Security Fix 1: Add missing RLS policies for tables with RLS enabled but no policies

-- First, let's check which tables have RLS enabled but no policies
-- Based on the linter, we need to add policies for several tables

-- Fix for profiles table (if it doesn't have proper policies)
DO $$
BEGIN
  -- Check if profiles table exists and add policy if needed
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles' AND table_schema = 'public') THEN
    -- Add policy for users to view their own profile
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
      EXECUTE 'CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id)';
    END IF;
    
    -- Add policy for users to update their own profile
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
      EXECUTE 'CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id)';
    END IF;
    
    -- Add policy for users to insert their own profile
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
      EXECUTE 'CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id)';
    END IF;
  END IF;
END $$;

-- Security Fix 2: Update functions to include proper search_path settings
-- Update functions that are missing search_path

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE OR REPLACE FUNCTION public.get_security_alerts(hours_back integer DEFAULT 24)
RETURNS TABLE(alert_type text, user_count bigint, last_occurrence timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    event_type as alert_type,
    COUNT(*) as user_count,
    MAX(created_at) as last_occurrence
  FROM public.security_audit_log 
  WHERE success = false 
    AND created_at > now() - (hours_back || ' hours')::INTERVAL
  GROUP BY event_type
  ORDER BY user_count DESC, last_occurrence DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_viking_names_stats()
RETURNS TABLE(total_names integer, male_names integer, female_names integer, total_frequency integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_names,
    COUNT(*) FILTER (WHERE gender = 'male')::INTEGER as male_names,
    COUNT(*) FILTER (WHERE gender = 'female')::INTEGER as female_names,
    COALESCE(SUM(frequency), 0)::INTEGER as total_frequency
  FROM viking_names;
END;
$$;