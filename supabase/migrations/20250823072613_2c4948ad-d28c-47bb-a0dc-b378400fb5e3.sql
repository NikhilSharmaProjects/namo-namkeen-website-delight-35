-- Phase 1: Critical Security Fixes

-- Create user roles system for proper admin authentication
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Add role-checking function (SECURITY DEFINER to avoid recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fix RLS policies on orders table - remove overly permissive admin policy
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Add secure admin policies for orders
CREATE POLICY "Authenticated users can view own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all orders" 
ON public.orders FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders" 
ON public.orders FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Fix RLS policies on order_otps table
DROP POLICY IF EXISTS "Admins can manage OTPs" ON public.order_otps;

CREATE POLICY "Order owners can view OTPs" 
ON public.order_otps FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_otps.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Admins can manage OTPs" 
ON public.order_otps FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Secure admin notifications tables
DROP POLICY IF EXISTS "Admins can manage notifications" ON public.admin_notifications;
DROP POLICY IF EXISTS "Everyone can view admin notifications" ON public.admin_notifications;

CREATE POLICY "Admins can manage notifications" 
ON public.admin_notifications FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can view notifications" 
ON public.admin_notifications FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Secure realtime admin notifications
DROP POLICY IF EXISTS "Admins can manage realtime notifications" ON public.admin_notifications_realtime;

CREATE POLICY "Admins can manage realtime notifications" 
ON public.admin_notifications_realtime FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Fix RLS on payment_attempts
DROP POLICY IF EXISTS "Admins can manage payment attempts" ON public.payment_attempts;

CREATE POLICY "Users can view own payment attempts" 
ON public.payment_attempts FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = payment_attempts.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Admins can manage payment attempts" 
ON public.payment_attempts FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Create policies for user_roles table
CREATE POLICY "Users can view own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update database functions with proper security
CREATE OR REPLACE FUNCTION public.update_order_status_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    NEW.status_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_delivery_otp(order_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  otp_code TEXT;
BEGIN
  -- Check if user is admin or order owner
  IF NOT (public.has_role(auth.uid(), 'admin') OR 
          EXISTS (SELECT 1 FROM public.orders WHERE id = order_uuid AND user_id = auth.uid())) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  
  -- Generate 6-digit OTP
  otp_code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  -- Insert OTP record
  INSERT INTO public.order_otps (order_id, otp_code, expires_at)
  VALUES (order_uuid, otp_code, NOW() + INTERVAL '24 hours');
  
  -- Update order to require OTP
  UPDATE public.orders 
  SET delivery_otp_required = true 
  WHERE id = order_uuid;
  
  RETURN otp_code;
END;
$$;

CREATE OR REPLACE FUNCTION public.verify_delivery_otp(order_uuid uuid, provided_otp text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_valid BOOLEAN := false;
BEGIN
  -- Check if user is admin or order owner
  IF NOT (public.has_role(auth.uid(), 'admin') OR 
          EXISTS (SELECT 1 FROM public.orders WHERE id = order_uuid AND user_id = auth.uid())) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  
  -- Check if OTP is valid and not expired
  UPDATE public.order_otps 
  SET is_verified = true, verified_at = NOW()
  WHERE order_id = order_uuid 
    AND otp_code = provided_otp 
    AND expires_at > NOW() 
    AND is_verified = false;
  
  -- Check if update was successful
  GET DIAGNOSTICS is_valid = ROW_COUNT;
  
  IF is_valid THEN
    -- Update order status
    UPDATE public.orders 
    SET delivery_otp_verified = true, 
        delivered_at = NOW(),
        status = 'delivered'
    WHERE id = order_uuid;
  END IF;
  
  RETURN is_valid > 0;
END;
$$;