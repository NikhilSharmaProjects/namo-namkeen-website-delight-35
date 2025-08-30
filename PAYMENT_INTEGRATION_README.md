# NAMO Namkeen - Secure PhonePe Payment Integration

## 🚀 Overview

This project implements a **production-ready, enterprise-grade PhonePe payment integration** with comprehensive security measures, input validation, rate limiting, and error handling. The system is designed to prevent common security vulnerabilities and provide a robust payment experience.

## 🔒 Security Features

### 1. **Input Validation & Sanitization**

-   **Comprehensive validation** for all input fields (order ID, amount, customer info, etc.)
-   **SQL injection prevention** through parameterized queries
-   **XSS protection** with input sanitization
-   **Phone number validation** (10-digit Indian format)
-   **Email format validation** with RFC compliance
-   **Amount validation** (₹1.00 to ₹100,000.00)

### 2. **Rate Limiting & DDoS Protection**

-   **Per-client rate limiting** based on IP address
-   **Configurable limits** for different operations:
    -   Payment initiation: 10 requests per 15 minutes
    -   Payment verification: 20 requests per 15 minutes
    -   Webhook processing: 30 requests per 15 minutes
-   **Exponential backoff** for retry mechanisms
-   **Rate limit headers** in responses

### 3. **CORS & Origin Validation**

-   **Restricted CORS** to allowed domains only
-   **Origin validation** for all requests
-   **Security headers** to prevent common attacks
-   **Content Security Policy (CSP)** implementation

### 4. **Webhook Security**

-   **Signature verification** using PhonePe's salt key
-   **Constant-time comparison** to prevent timing attacks
-   **Payload validation** and sanitization
-   **Duplicate webhook prevention**

### 5. **Data Protection**

-   **No sensitive data logging** (passwords, tokens, keys)
-   **Encrypted communication** with PhonePe APIs
-   **Secure session management**
-   **Audit logging** for all payment attempts

## 🏗️ Architecture

```
Frontend (React) → Supabase Edge Functions → PhonePe API
     ↓                    ↓                    ↓
  Validation         Rate Limiting      Signature Verification
  Sanitization      Input Validation    Webhook Processing
  Error Handling    Security Headers    Response Validation
```

## 📁 File Structure

```
src/
├── hooks/
│   └── usePhonePePayment.tsx          # Secure payment hook
├── config/
│   └── security.ts                     # Security configuration
├── pages/
│   ├── Checkout.tsx                    # Enhanced checkout with validation
│   └── PaymentStatus.tsx               # Payment status with retry logic

supabase/functions/
├── phonepe-initiate/                   # Payment initiation with security
├── phonepe-verify/                     # Payment verification with validation
└── phonepe-webhook/                    # Webhook processing with signature verification
```

## 🛠️ Setup Instructions

### 1. **Environment Variables**

Create a `.env` file in your project root:

```bash
# PhonePe Configuration
PHONEPE_MERCHANT_ID=your_merchant_id_here
PHONEPE_SALT_KEY=your_salt_key_here
PHONEPE_SALT_INDEX=1
PHONEPE_ENVIRONMENT=preprod  # or 'prod' for production

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Security Configuration
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # Max requests per window

# PhonePe API URLs
PHONEPE_BASE_URL_PREPROD=https://api-preprod.phonepe.com/apis/pg-sandbox
PHONEPE_BASE_URL_PROD=https://api.phonepe.com/apis/hermes
```

### 2. **Database Setup**

Run the following SQL migrations in your Supabase SQL editor:

```sql
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
  client_ip TEXT,
  user_agent TEXT,
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
CREATE INDEX idx_payment_attempts_client_ip ON public.payment_attempts(client_ip);
```

### 3. **Deploy Edge Functions**

Deploy the Supabase Edge Functions:

```bash
supabase functions deploy phonepe-initiate
supabase functions deploy phonepe-verify
supabase functions deploy phonepe-webhook
```

### 4. **Update Supabase Configuration**

Update your `supabase/config.toml`:

```toml
[functions.phonepe-initiate]
verify_jwt = false

[functions.phonepe-verify]
verify_jwt = false

[functions.phonepe-webhook]
verify_jwt = false
```

## 🔧 Usage

### 1. **Frontend Integration**

```tsx
import { usePhonePePayment } from "@/hooks/usePhonePePayment";

const { initiatePayment, verifyPayment, loading } = usePhonePePayment();

// Initiate payment
const handlePayment = async () => {
    const result = await initiatePayment({
        orderId: "order_123",
        amount: 100000, // ₹1,000 in paise
        customerInfo: {
            name: "John Doe",
            email: "john@example.com",
            phone: "9876543210",
        },
    });

    if (result.success) {
        window.location.href = result.redirectUrl;
    }
};
```

### 2. **Payment Verification**

```tsx
// Verify payment status
const verifyResult = await verifyPayment("order_123");

if (verifyResult.success) {
    console.log("Payment Status:", verifyResult.paymentStatus);
    console.log("Order Status:", verifyResult.orderStatus);
}
```

### 3. **Advanced Verification with Retry**

```tsx
// Retry verification with exponential backoff
const result = await retryVerification("order_123", 5, 2000);
```

## 🚨 Security Best Practices

### 1. **Input Validation**

-   Always validate and sanitize user inputs
-   Use the provided validation utilities
-   Implement client-side and server-side validation

### 2. **Rate Limiting**

-   Monitor rate limit violations
-   Implement progressive delays for repeated violations
-   Log suspicious activity patterns

### 3. **Error Handling**

-   Never expose internal errors to clients
-   Use standardized error codes
-   Log errors securely without sensitive data

### 4. **Webhook Security**

-   Verify webhook signatures
-   Validate payload structure
-   Implement idempotency checks

### 5. **Monitoring & Logging**

-   Monitor payment success/failure rates
-   Track webhook processing times
-   Alert on security violations

## 📊 Monitoring & Analytics

### 1. **Payment Metrics**

-   Success rate by payment method
-   Average processing time
-   Failure reasons and patterns

### 2. **Security Metrics**

-   Rate limit violations
-   Failed signature verifications
-   Suspicious origin attempts

### 3. **Performance Metrics**

-   API response times
-   Database query performance
-   Webhook processing latency

## 🐛 Troubleshooting

### Common Issues

1. **Rate Limit Exceeded**

    - Wait for the rate limit window to reset
    - Check if multiple requests are being sent
    - Implement proper retry logic

2. **Invalid Signature**

    - Verify PhonePe salt key configuration
    - Check webhook payload format
    - Ensure proper signature generation

3. **Order Not Found**

    - Verify order ID format
    - Check database connectivity
    - Ensure proper order creation flow

4. **Payment Initiation Failed**
    - Verify PhonePe credentials
    - Check amount limits
    - Validate customer information

### Debug Mode

Enable debug logging by setting environment variables:

```bash
DEBUG_PAYMENTS=true
LOG_LEVEL=debug
```

## 🔄 Testing

### 1. **Test Environment**

-   Use PhonePe preprod environment
-   Test with small amounts
-   Verify webhook callbacks

### 2. **Test Cases**

-   Valid payment flow
-   Invalid input handling
-   Rate limiting behavior
-   Webhook signature verification
-   Error handling scenarios

### 3. **Load Testing**

-   Multiple concurrent payments
-   High-volume webhook processing
-   Rate limit enforcement

## 📈 Performance Optimization

### 1. **Database Optimization**

-   Proper indexing on payment tables
-   Query optimization for payment lookups
-   Connection pooling

### 2. **Caching Strategy**

-   Cache payment status results
-   Implement Redis for rate limiting
-   Cache PhonePe API responses

### 3. **Async Processing**

-   Background webhook processing
-   Queue-based payment verification
-   Non-blocking payment initiation

## 🚀 Production Deployment

### 1. **Environment Setup**

-   Use production PhonePe environment
-   Enable HTTPS everywhere
-   Configure proper CORS origins

### 2. **Monitoring Setup**

-   Set up error tracking (Sentry, etc.)
-   Implement health checks
-   Configure alerting for failures

### 3. **Backup & Recovery**

-   Database backup strategy
-   Payment data recovery procedures
-   Disaster recovery plan

## 📚 API Reference

### PhonePe Initiate Endpoint

```http
POST /functions/v1/phonepe-initiate
Content-Type: application/json

{
  "orderId": "string",
  "amount": "number",
  "customerInfo": {
    "name": "string",
    "email": "string",
    "phone": "string"
  }
}
```

### PhonePe Verify Endpoint

```http
POST /functions/v1/phonepe-verify
Content-Type: application/json

{
  "orderId": "string"
}
```

### PhonePe Webhook Endpoint

```http
POST /functions/v1/phonepe-webhook
Content-Type: application/json
X-VERIFY: "signature"

{
  "response": "base64_encoded_payload"
}
```

## 🤝 Support

For technical support or security concerns:

-   **Email**: namoindifoodindustries@gmail.com
-   **Documentation**: [Project Wiki]
-   **Issues**: [GitHub Issues]

## 📄 License

This payment integration is proprietary to NAMO India Namkeen. All rights reserved.

---

**⚠️ Security Notice**: This system implements enterprise-grade security measures. Regular security audits and updates are recommended to maintain the highest level of protection.
