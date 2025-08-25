-- Remove ALL foreign key constraints from profiles table
DO $$
DECLARE
    constraint_record RECORD;
BEGIN
    -- Find and drop all foreign key constraints on profiles table
    FOR constraint_record IN (
        SELECT conname as constraint_name
        FROM pg_constraint
        WHERE conrelid = 'public.profiles'::regclass
        AND contype = 'f'
    )
    LOOP
        EXECUTE 'ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS ' || quote_ident(constraint_record.constraint_name);
    END LOOP;
END $$;

-- Do the same for user_roles table
DO $$
DECLARE
    constraint_record RECORD;
BEGIN
    -- Find and drop all foreign key constraints on user_roles table
    FOR constraint_record IN (
        SELECT conname as constraint_name
        FROM pg_constraint
        WHERE conrelid = 'public.user_roles'::regclass
        AND contype = 'f'
    )
    LOOP
        EXECUTE 'ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS ' || quote_ident(constraint_record.constraint_name);
    END LOOP;
END $$;

-- Add unique constraint on email if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'profiles_email_unique' 
                   AND table_name = 'profiles') THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);
    END IF;
END $$;

-- Now create the admin functions
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

-- Create admin user
SELECT public.sync_auth0_user('admin@namoindianamkeen.com', 'Admin User');

-- Make them admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles 
WHERE email = 'admin@namoindianamkeen.com'
ON CONFLICT (user_id, role) DO NOTHING;