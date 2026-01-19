-- Phase 1: Critical Database Security Fixes

-- 1. Fix tables without RLS policies (add SELECT policies for public viewing)
CREATE POLICY "Public read access to sparsevec_in" ON extensions.sparsevec_in FOR SELECT USING (true);
CREATE POLICY "Public read access to halfvec_in" ON extensions.halfvec_in FOR SELECT USING (true);
CREATE POLICY "Public read access to vector_in" ON extensions.vector_in FOR SELECT USING (true);

-- Note: The other tables mentioned in linter may be system tables that don't need RLS

-- 2. Enhance user role security with additional safeguards
CREATE OR REPLACE FUNCTION public.validate_role_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent users from granting themselves admin role unless they're already admin
  IF NEW.role = 'admin' AND NEW.user_id = auth.uid() THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Cannot self-elevate to admin role';
    END IF;
  END IF;
  
  -- Prevent users from modifying other users' roles unless they're admin
  IF TG_OP = 'UPDATE' AND OLD.user_id != auth.uid() AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Cannot modify other users roles without admin privileges';
  END IF;
  
  -- Prevent deletion of roles unless admin
  IF TG_OP = 'DELETE' AND OLD.user_id != auth.uid() AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Cannot delete other users roles without admin privileges';
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for role validation if it doesn't exist
DROP TRIGGER IF EXISTS validate_role_changes ON public.user_roles;
CREATE TRIGGER validate_role_changes
  BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.validate_role_change();

-- 3. Add audit logging for security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  target_user_id UUID,
  old_role app_role,
  new_role app_role,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.security_audit_log
  FOR SELECT USING (public.is_admin());

-- 4. Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_target_user_id UUID DEFAULT NULL,
  p_old_role app_role DEFAULT NULL,
  p_new_role app_role DEFAULT NULL,
  p_success BOOLEAN DEFAULT true,
  p_error_message TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    target_user_id,
    old_role,
    new_role,
    success,
    error_message
  ) VALUES (
    p_event_type,
    auth.uid(),
    p_target_user_id,
    p_old_role,
    p_new_role,
    p_success,
    p_error_message
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Update the role validation function to include logging
CREATE OR REPLACE FUNCTION public.validate_role_change()
RETURNS TRIGGER AS $$
DECLARE
  old_role_val app_role;
  new_role_val app_role;
BEGIN
  -- Get role values for logging
  old_role_val := CASE WHEN TG_OP = 'DELETE' THEN OLD.role ELSE NULL END;
  new_role_val := CASE WHEN TG_OP = 'INSERT' THEN NEW.role WHEN TG_OP = 'UPDATE' THEN NEW.role ELSE NULL END;
  
  -- Prevent users from granting themselves admin role unless they're already admin
  IF TG_OP IN ('INSERT', 'UPDATE') AND NEW.role = 'admin' AND NEW.user_id = auth.uid() THEN
    IF NOT public.is_admin() THEN
      PERFORM public.log_security_event('SELF_PRIVILEGE_ESCALATION_ATTEMPT', NEW.user_id, old_role_val, new_role_val, false, 'Attempted to self-elevate to admin role');
      RAISE EXCEPTION 'Cannot self-elevate to admin role';
    END IF;
  END IF;
  
  -- Prevent users from modifying other users' roles unless they're admin
  IF TG_OP = 'UPDATE' AND OLD.user_id != auth.uid() AND NOT public.is_admin() THEN
    PERFORM public.log_security_event('UNAUTHORIZED_ROLE_MODIFICATION_ATTEMPT', OLD.user_id, OLD.role, NEW.role, false, 'Attempted to modify another users role without admin privileges');
    RAISE EXCEPTION 'Cannot modify other users roles without admin privileges';
  END IF;
  
  -- Prevent deletion of roles unless admin
  IF TG_OP = 'DELETE' AND OLD.user_id != auth.uid() AND NOT public.is_admin() THEN
    PERFORM public.log_security_event('UNAUTHORIZED_ROLE_DELETION_ATTEMPT', OLD.user_id, OLD.role, NULL, false, 'Attempted to delete another users role without admin privileges');
    RAISE EXCEPTION 'Cannot delete other users roles without admin privileges';
  END IF;
  
  -- Log successful role changes
  IF TG_OP = 'INSERT' THEN
    PERFORM public.log_security_event('ROLE_GRANTED', NEW.user_id, NULL, NEW.role, true, NULL);
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM public.log_security_event('ROLE_MODIFIED', NEW.user_id, OLD.role, NEW.role, true, NULL);
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM public.log_security_event('ROLE_REVOKED', OLD.user_id, OLD.role, NULL, true, NULL);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Add function to check for suspicious activity
CREATE OR REPLACE FUNCTION public.get_security_alerts(hours_back INTEGER DEFAULT 24)
RETURNS TABLE (
  alert_type TEXT,
  user_count BIGINT,
  last_occurrence TIMESTAMP WITH TIME ZONE
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;