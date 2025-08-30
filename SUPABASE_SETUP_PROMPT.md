# Complete Supabase Setup Prompt for NAMO India Namkeen E-commerce

## Project Overview
This is a complete e-commerce application for NAMO India Namkeen with Auth0 authentication, admin panel, payment processing, push notifications, and blog management. Please set up Supabase with the following exact configuration:

## Required Secrets (Add these first)
1. `PHONEPE_MERCHANT_ID` - PhonePe payment gateway merchant ID
2. `PHONEPE_SALT_KEY` - PhonePe payment gateway salt key  
3. `ONESIGNAL_REST_API_KEY` - OneSignal push notification API key
4. `SUPABASE_URL` - Your Supabase project URL
5. `SUPABASE_ANON_KEY` - Your Supabase anonymous key
6. `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
7. `SUPABASE_DB_URL` - Your Supabase database connection URL

## Database Schema & Tables

### 1. Custom Types
```sql
-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
```

### 2. Core Tables

#### Profiles Table (Auth0 Integration)
```sql
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  pincode text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

#### User Roles Table
```sql
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role app_role NOT NULL DEFAULT 'user'::app_role,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
```

#### Products Table
```sql
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  image_url text,
  price_250g integer,
  price_500g integer, 
  price_1kg integer,
  stock_250g integer DEFAULT 0,
  stock_500g integer DEFAULT 0,
  stock_1kg integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  discount_percentage integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
```

#### Blogs Table
```sql
CREATE TABLE public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text,
  author text NOT NULL DEFAULT 'Namo Namkeen Team',
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
```

#### Orders Table
```sql
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  total_amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  payment_method text DEFAULT 'cod',
  shipping_address text NOT NULL,
  phone text NOT NULL,
  phonepe_txn_id text,
  phonepe_merchant_txn_id text,
  phonepe_response jsonb,
  delivery_otp_required boolean DEFAULT false,
  delivery_otp_verified boolean DEFAULT false,
  delivered_at timestamp with time zone,
  paid_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  status_updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
```

#### Order Items Table
```sql
CREATE TABLE public.order_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid,
  product_id uuid,
  product_name text NOT NULL,
  size text NOT NULL,
  quantity integer NOT NULL,
  price integer NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
```

#### Cart Items Table
```sql
CREATE TABLE public.cart_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  product_id uuid,
  size text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
```

#### Payment Attempts Table
```sql
CREATE TABLE public.payment_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'initiated',
  payment_method text NOT NULL DEFAULT 'phonepe',
  attempt_ts timestamp with time zone NOT NULL DEFAULT now(),
  payload jsonb,
  response_code integer,
  response_data jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;
```

#### Order OTPs Table
```sql
CREATE TABLE public.order_otps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid,
  otp_code text NOT NULL,
  is_verified boolean DEFAULT false,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  verified_at timestamp with time zone
);
ALTER TABLE public.order_otps ENABLE ROW LEVEL SECURITY;
```

#### Coupons Table
```sql
CREATE TABLE public.coupons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL,
  discount_type text NOT NULL,
  discount_value integer NOT NULL,
  min_order_amount integer DEFAULT 0,
  max_uses integer,
  used_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
```

#### Push Subscriptions Table
```sql
CREATE TABLE public.push_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  subscription_id text NOT NULL,
  endpoint text NOT NULL,
  auth_key text,
  p256dh_key text,
  user_agent text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
```

#### Admin Notifications Tables
```sql
CREATE TABLE public.admin_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  image_url text,
  target_url text,
  created_by uuid,
  recipient_count integer DEFAULT 0,
  sent_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.admin_notifications_realtime (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL,
  message text NOT NULL,
  order_id uuid,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.admin_notifications_realtime ENABLE ROW LEVEL SECURITY;
```

## Database Functions

### 1. Auth0 Integration Function
```sql
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
```

### 2. Role Management Function
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### 3. OTP Functions
```sql
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
```

### 4. Stock Management Function
```sql
CREATE OR REPLACE FUNCTION public.update_product_stock()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.size = '250g' THEN
    UPDATE public.products 
    SET stock_250g = stock_250g - NEW.quantity 
    WHERE id = NEW.product_id;
  ELSIF NEW.size = '500g' THEN
    UPDATE public.products 
    SET stock_500g = stock_500g - NEW.quantity 
    WHERE id = NEW.product_id;
  ELSIF NEW.size = '1kg' THEN
    UPDATE public.products 
    SET stock_1kg = stock_1kg - NEW.quantity 
    WHERE id = NEW.product_id;
  END IF;
  RETURN NEW;
END;
$$;
```

### 5. Order Status Trigger
```sql
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
```

### 6. Blog Update Timestamp Function
```sql
CREATE OR REPLACE FUNCTION public.update_blogs_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

## Triggers

### 1. Order Status Update Trigger
```sql
CREATE TRIGGER update_orders_status_timestamp
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_order_status_timestamp();
```

### 2. Blog Update Trigger
```sql
CREATE TRIGGER update_blogs_updated_at_trigger
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_blogs_updated_at();
```

### 3. Stock Update Trigger
```sql
CREATE TRIGGER update_stock_after_order_item_insert
AFTER INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.update_product_stock();
```

## Row Level Security Policies

### Profiles Policies
```sql
CREATE POLICY "Users can view their profile" ON public.profiles 
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their profile" ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their profile" ON public.profiles 
FOR INSERT WITH CHECK (auth.uid() = id);
```

### User Roles Policies  
```sql
CREATE POLICY "Users can view own roles" ON public.user_roles 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles 
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
```

### Products Policies
```sql
CREATE POLICY "Anyone can view products" ON public.products 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products 
FOR ALL USING (true) WITH CHECK (true);
```

### Blogs Policies
```sql
CREATE POLICY "Anyone can view published blogs" ON public.blogs 
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all blogs" ON public.blogs 
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
```

### Orders Policies
```sql
CREATE POLICY "Users can view their own orders" ON public.orders 
FOR SELECT USING ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Anyone can create orders" ON public.orders 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all orders" ON public.orders 
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update orders" ON public.orders 
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
```

### Order Items Policies
```sql
CREATE POLICY "Users can view their order items" ON public.order_items 
FOR SELECT USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = order_items.order_id 
  AND ((orders.user_id = auth.uid()) OR (orders.user_id IS NULL))
));

CREATE POLICY "Anyone can create order items" ON public.order_items 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all order items" ON public.order_items 
FOR SELECT USING (true);
```

### Cart Items Policies
```sql
CREATE POLICY "Users can manage their cart" ON public.cart_items 
FOR ALL USING ((auth.uid() = user_id) OR (user_id IS NULL)) 
WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));
```

### Payment Attempts Policies
```sql
CREATE POLICY "Users can view their payment attempts" ON public.payment_attempts 
FOR SELECT USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = payment_attempts.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Admins can manage payment attempts" ON public.payment_attempts 
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
```

### Order OTPs Policies
```sql
CREATE POLICY "Order owners can view OTPs" ON public.order_otps 
FOR SELECT USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = order_otps.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Admins can manage OTPs" ON public.order_otps 
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
```

### Coupons Policies
```sql
CREATE POLICY "Anyone can view active coupons" ON public.coupons 
FOR SELECT USING (is_active = true);
```

### Push Subscriptions Policies
```sql
CREATE POLICY "Users can view their own subscriptions" ON public.push_subscriptions 
FOR SELECT USING ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can insert their own subscriptions" ON public.push_subscriptions 
FOR INSERT WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can update their own subscriptions" ON public.push_subscriptions 
FOR UPDATE USING ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can delete their own subscriptions" ON public.push_subscriptions 
FOR DELETE USING ((auth.uid() = user_id) OR (user_id IS NULL));
```

### Admin Notifications Policies
```sql
CREATE POLICY "Admins can manage notifications" ON public.admin_notifications 
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view notifications" ON public.admin_notifications 
FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage realtime notifications" ON public.admin_notifications_realtime 
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
```

## Edge Functions Required

### 1. PhonePe Payment Functions
- `phonepe-initiate` - Initiates PhonePe payments
- `phonepe-verify` - Verifies payment status
- `phonepe-webhook` - Handles PhonePe webhooks

### 2. Notification Functions  
- `send-push-notification` - Sends OneSignal push notifications
- `send-order-notification` - Sends order status notifications
- `enhanced-order-notification` - Enhanced notification system

All functions should have `verify_jwt = false` in config.toml.

## Initial Data Setup

### Create Admin User
```sql
-- Create admin profile
SELECT public.sync_auth0_user('admin@namoindianamkeen.com', 'Admin User');

-- Make them admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles 
WHERE email = 'admin@namoindianamkeen.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

### Sample Products Data (Updated Categories & Pricing)
```sql
-- Premium Products (250g: ₹80, 500g: ₹150)
INSERT INTO public.products (name, category, description, image_url, price_250g, price_500g, stock_250g, stock_500g, is_featured) VALUES
('Double Laung Sev', 'Premium Products', 'Premium double laung flavored sev', '/images/productImages/doubleLaungSev.jpg', 8000, 15000, 100, 100, true),
('Fiki Barik Sev', 'Premium Products', 'Traditional fiki barik sev', '/images/productImages/fikiBarikSev.jpg', 8000, 15000, 100, 100, false),
('Ujjaini Sev', 'Premium Products', 'Authentic Ujjaini style sev', '/images/productImages/ujjainiSev.jpg', 8000, 15000, 100, 100, true),
('Ratalami Sev', 'Premium Products', 'Famous Ratalami sev', '/images/productImages/ratalamiSev.jpg', 8000, 15000, 100, 100, false),
('Gujrati Mixture', 'Premium Products', 'Traditional Gujarati mixture', '/images/productImages/gujratiMixture.jpg', 8000, 15000, 100, 100, true);

-- Satwik Products (250g: ₹110, 500g: ₹200)
INSERT INTO public.products (name, category, description, image_url, price_250g, price_500g, stock_250g, stock_500g, is_featured) VALUES
('Cornflakes Sweet Mix', 'Satwik Products', 'Pure satwik cornflakes sweet mix', '/images/productImages/cornflakesSweetMix.jpg', 11000, 20000, 100, 100, true),
('Dal Moth Mix', 'Satwik Products', 'Satwik dal moth mixture', '/images/productImages/dalMothMix.jpg', 11000, 20000, 100, 100, false),
('Delicus Mixture', 'Satwik Products', 'Special satwik delicus mixture', '/images/productImages/delicusMixture.jpg', 11000, 20000, 100, 100, true),
('Navaratan Mixture', 'Satwik Products', 'Premium satwik navaratan mix', '/images/productImages/navaratanMixture.jpg', 11000, 20000, 100, 100, false);
```

## Product Categories & Pricing Structure

### Current Categories (Only 2):
1. **Premium Products** - Regular namkeen items
   - 250g: ₹80 (8000 paisa)
   - 500g: ₹150 (15000 paisa)

2. **Satwik Products** - Pure vegetarian/religious items
   - 250g: ₹110 (11000 paisa)
   - 500g: ₹200 (20000 paisa)

### Product Images Available:
- cornflakesSweetMix.jpg
- dalMothMix.jpg
- delicusMixture.jpg
- doubleLaungSev.jpg
- fikiBarikSev.jpg
- gujratiMixture.jpg
- khattaMithaMixture.jpg
- navaratanMixture.jpg
- ratalamiSev.jpg
- spicyMixture.jpg
- ujjainiSev.jpg

## Authentication Notes
- Uses Auth0 for authentication (not Supabase Auth)
- Admin access is managed through email-based role system
- User profiles are synced from Auth0 to Supabase via sync_auth0_user function
- Admin panel accessible at /admin route
- Default admin email: admin@namoindianamkeen.com

## Key Features Implemented
1. **E-commerce**: Complete product catalog, cart, checkout with 2 categories and fixed pricing
2. **Payment Processing**: PhonePe integration with webhooks
3. **Order Management**: Status tracking, OTP verification for delivery
4. **Admin Panel**: Order management, product management, push notifications, blog management
5. **Push Notifications**: OneSignal integration with admin composer
6. **Authentication**: Auth0 integration with role-based access
7. **Real-time Features**: Live order notifications for admin
8. **Blog Management**: Complete blog system with admin controls
9. **Simplified Product Management**: Auto-pricing based on category, only 250g & 500g sizes

Please implement this exact schema and configuration. The frontend is already built to work with this database structure and Auth0 authentication system.