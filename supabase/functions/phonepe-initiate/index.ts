import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PhonePe API configuration
const PHONEPE_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const PHONEPE_MERCHANT_ID = Deno.env.get('PHONEPE_CLIENT_KEY'); // Using CLIENT_KEY as merchant ID
const PHONEPE_SALT_KEY = Deno.env.get('PHONEPE_CLIENT_SECRET'); // Using CLIENT_SECRET as salt key
const PHONEPE_SALT_INDEX = 1;

if (!PHONEPE_MERCHANT_ID || !PHONEPE_SALT_KEY) {
  throw new Error('PhonePe credentials not configured - CLIENT_KEY and CLIENT_SECRET required');
}

// Create checksum for PhonePe API
async function generateChecksum(payload: string, saltKey: string, saltIndex: number): Promise<string> {
  const stringToHash = payload + '/pg/v1/pay' + saltKey;
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToHash);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${hashHex}###${saltIndex}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { orderId, amount, customerInfo } = await req.json();

    if (!orderId || !amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: orderId, amount' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique merchant transaction ID
    const merchantTransactionId = `TXN_${orderId}_${Date.now()}`;
    
    // Create PhonePe payment payload
    const paymentPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: customerInfo?.userId || 'GUEST_USER',
      amount: amount, // Amount in paise (already converted from frontend)
      redirectUrl: `${req.headers.get('origin')}/payment-status?orderId=${orderId}`,
      redirectMode: 'POST',
      callbackUrl: `${req.headers.get('origin')}/api/phonepe/webhook`,
      mobileNumber: customerInfo?.phone || '',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // Convert payload to base64
    const base64Payload = btoa(JSON.stringify(paymentPayload));
    
    // Generate checksum
    const checksum = await generateChecksum(base64Payload, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX);

    // Log payment attempt
    await supabase.from('payment_attempts').insert({
      order_id: orderId,
      payload: paymentPayload,
      status: 'initiated',
      payment_method: 'phonepe'
    });

    // Call PhonePe API
    const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      body: JSON.stringify({
        request: base64Payload
      })
    });

    const responseData = await phonePeResponse.json();
    console.log('PhonePe API Response:', responseData);

    // Update payment attempt with response
    await supabase.from('payment_attempts').insert({
      order_id: orderId,
      response_code: phonePeResponse.status,
      response_data: responseData,
      status: responseData.success ? 'redirect_ready' : 'failed',
      payment_method: 'phonepe'
    });

    if (responseData.success && responseData.data?.instrumentResponse?.redirectInfo?.url) {
      // Update order with PhonePe transaction details
      await supabase
        .from('orders')
        .update({
          phonepe_merchant_txn_id: merchantTransactionId,
          payment_method: 'phonepe',
          payment_status: 'pending'
        })
        .eq('id', orderId);

      return new Response(
        JSON.stringify({
          success: true,
          redirectUrl: responseData.data.instrumentResponse.redirectInfo.url,
          merchantTransactionId: merchantTransactionId
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to initiate PhonePe payment',
          details: responseData
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in phonepe-initiate:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});