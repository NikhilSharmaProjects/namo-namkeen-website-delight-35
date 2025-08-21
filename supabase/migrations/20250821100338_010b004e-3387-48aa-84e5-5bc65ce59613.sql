-- Add PhonePe payment support to orders table
ALTER TABLE public.orders 
ADD COLUMN phonepe_txn_id TEXT,
ADD COLUMN phonepe_merchant_txn_id TEXT,
ADD COLUMN phonepe_response JSONB,
ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled'));

-- Create payment_attempts table for tracking payment attempts
CREATE TABLE public.payment_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL,
  attempt_ts TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  payment_method TEXT NOT NULL DEFAULT 'phonepe',
  payload JSONB,
  response_code INTEGER,
  response_data JSONB,
  status TEXT NOT NULL DEFAULT 'initiated',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on payment_attempts
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for payment_attempts
CREATE POLICY "Admins can manage payment attempts" 
ON public.payment_attempts 
FOR ALL 
USING (true);

CREATE POLICY "Users can view their payment attempts" 
ON public.payment_attempts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = payment_attempts.order_id 
  AND orders.user_id = auth.uid()
));

-- Add indexes for better performance
CREATE INDEX idx_orders_phonepe_txn_id ON public.orders(phonepe_txn_id);
CREATE INDEX idx_orders_phonepe_merchant_txn_id ON public.orders(phonepe_merchant_txn_id);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_payment_attempts_order_id ON public.payment_attempts(order_id);
CREATE INDEX idx_payment_attempts_status ON public.payment_attempts(status);