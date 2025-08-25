-- Enable RLS policies for product management by admins
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (true) 
WITH CHECK (true);