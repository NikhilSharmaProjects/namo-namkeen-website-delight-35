-- Fix remaining function security issues

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

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