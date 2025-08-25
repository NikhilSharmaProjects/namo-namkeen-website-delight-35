-- Remove foreign key constraint and fix Auth0 integration
-- Drop the foreign key constraint since we're using Auth0, not Supabase auth
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Add unique constraint on email if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'profiles_email_unique') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);
    END IF;
END $$;

-- Create a function to check admin role using email for Auth0 users
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

-- Update products RLS policies to allow admin operations
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create a function to sync Auth0 user with Supabase profile
CREATE OR REPLACE FUNCTION public.sync_auth0_user(_email text, _full_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Create or update user profile for Auth0 user
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

-- Create a function to make user admin
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
    -- Create profile if it doesn't exist
    user_uuid := public.sync_auth0_user(_email, 'Admin User');
  END IF;
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_uuid, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN true;
END;
$$;

-- Make the admin user (change this to your actual login email)
SELECT public.make_user_admin('admin@namoindianamkeen.com');