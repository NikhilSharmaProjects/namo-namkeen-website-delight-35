-- Remove all auth.users foreign key constraints for Auth0 compatibility
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;

-- Update profiles table structure for Auth0
-- Add unique constraint on email if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'profiles_email_unique') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);
    END IF;
END $$;

-- Create admin check function for Auth0 users
CREATE OR REPLACE FUNCTION public.is_admin_by_email(_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    JOIN public.user_roles ur ON p.id = ur.user_id
    WHERE p.email = _email AND ur.role = 'admin'
  )
$$;

-- Function to sync Auth0 users
CREATE OR REPLACE FUNCTION public.sync_auth0_user(_email text, _full_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (gen_random_uuid(), _email, _full_name)
  ON CONFLICT (email) 
  DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    updated_at = now()
  RETURNING id INTO user_uuid;
  
  RETURN user_uuid;
END;
$$;

-- Function to make user admin
CREATE OR REPLACE FUNCTION public.make_user_admin(_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Get or create user profile
  SELECT id INTO user_uuid FROM public.profiles WHERE email = _email;
  
  IF user_uuid IS NULL THEN
    user_uuid := public.sync_auth0_user(_email, 'Admin User');
  END IF;
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_uuid, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN true;
END;
$$;

-- Create the first admin (change to your actual email)
SELECT public.make_user_admin('admin@namoindianamkeen.com');