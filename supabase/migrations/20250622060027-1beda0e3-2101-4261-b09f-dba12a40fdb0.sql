
-- Enable RLS on all tables if not already enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;

DROP POLICY IF EXISTS "Users can manage their cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can view their profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their profile" ON public.profiles;

-- Create proper RLS policies for orders
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all orders" 
  ON public.orders 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update orders" 
  ON public.orders 
  FOR UPDATE 
  USING (true);

-- Create RLS policies for order_items
CREATE POLICY "Users can view their order items" 
  ON public.order_items 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
  ));

CREATE POLICY "Anyone can create order items" 
  ON public.order_items 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all order items" 
  ON public.order_items 
  FOR SELECT 
  USING (true);

-- Create RLS policies for cart_items
CREATE POLICY "Users can manage their cart" 
  ON public.cart_items 
  FOR ALL 
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create RLS policies for profiles
CREATE POLICY "Users can view their profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Add OTP verification table for delivery
CREATE TABLE IF NOT EXISTS public.order_otps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  otp_code TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on OTP table
ALTER TABLE public.order_otps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage OTPs" 
  ON public.order_otps 
  FOR ALL 
  USING (true);

-- Add delivery status tracking
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_otp_required BOOLEAN DEFAULT false;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_otp_verified BOOLEAN DEFAULT false;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE;

-- Create function to generate OTP
CREATE OR REPLACE FUNCTION public.generate_delivery_otp(order_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  otp_code TEXT;
BEGIN
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to verify OTP
CREATE OR REPLACE FUNCTION public.verify_delivery_otp(order_uuid UUID, provided_otp TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  is_valid BOOLEAN := false;
BEGIN
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create notification table for real-time updates
CREATE TABLE IF NOT EXISTS public.admin_notifications_realtime (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'new_order', 'status_update', etc.
  order_id UUID REFERENCES public.orders(id),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_notifications_realtime ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage realtime notifications" 
  ON public.admin_notifications_realtime 
  FOR ALL 
  USING (true);

-- Enable realtime for admin notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_notifications_realtime;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
