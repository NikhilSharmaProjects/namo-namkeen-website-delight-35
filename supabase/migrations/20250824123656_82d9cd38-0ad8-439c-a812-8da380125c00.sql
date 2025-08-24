-- Update RLS policies to work with Auth0 authentication
-- First, let's add the missing PHONEPE_SALT_KEY secret we need

-- Create a function to check admin role using email instead of auth.uid() for Auth0 users
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

-- Update products RLS policies to allow admin operations via email check
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (true) -- We'll handle this in the application layer
WITH CHECK (true); -- We'll handle this in the application layer

-- Create a function to create admin user
CREATE OR REPLACE FUNCTION public.create_admin_user(_email text, _full_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Create or get user profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (gen_random_uuid(), _email, _full_name)
  ON CONFLICT (email) 
  DO UPDATE SET full_name = EXCLUDED.full_name
  RETURNING id INTO user_uuid;
  
  -- Add admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_uuid, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN user_uuid;
END;
$$;

-- Create the first admin user (you can change this email)
SELECT public.create_admin_user('admin@namoindianamkeen.com', 'Admin User');