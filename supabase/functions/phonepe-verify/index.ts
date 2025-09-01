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
async function generateChecksum(endpoint: string, saltKey: string, saltIndex: number): Promise<string> {
  const stringToHash = endpoint + saltKey;
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

    const { orderId, merchantTransactionId } = await req.json();

    if (!orderId && !merchantTransactionId) {
      return new Response(
        JSON.stringify({ error: 'Either orderId or merchantTransactionId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If only orderId is provided, get merchantTransactionId from database
    let txnId = merchantTransactionId;
    if (!txnId && orderId) {
      const { data: orderData } = await supabase
        .from('orders')
        .select('phonepe_merchant_txn_id')
        .eq('id', orderId)
        .single();
      
      if (!orderData?.phonepe_merchant_txn_id) {
        return new Response(
          JSON.stringify({ error: 'Transaction ID not found for this order' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      txnId = orderData.phonepe_merchant_txn_id;
    }

    // Create checksum for status check
    const endpoint = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${txnId}`;
    const checksum = await generateChecksum(endpoint, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX);

    // Call PhonePe status API
    const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': PHONEPE_MERCHANT_ID,
      }
    });

    const responseData = await phonePeResponse.json();
    console.log('PhonePe Status Response:', responseData);

    // Log verification attempt
    await supabase.from('payment_attempts').insert({
      order_id: orderId,
      response_code: phonePeResponse.status,
      response_data: responseData,
      status: 'verification_attempted',
      payment_method: 'phonepe'
    });

    if (responseData.success && responseData.data) {
      const paymentData = responseData.data;
      const paymentState = paymentData.state;
      
      let orderStatus = 'pending';
      let paymentStatus = 'pending';
      
      if (paymentState === 'COMPLETED') {
        orderStatus = 'confirmed';
        paymentStatus = 'paid';
      } else if (paymentState === 'FAILED') {
        orderStatus = 'cancelled';
        paymentStatus = 'failed';
      }

      // Update order with payment verification results
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          phonepe_txn_id: paymentData.transactionId,
          phonepe_response: responseData,
          payment_status: paymentStatus,
          status: orderStatus,
          paid_at: paymentState === 'COMPLETED' ? new Date().toISOString() : null
        })
        .eq(orderId ? 'id' : 'phonepe_merchant_txn_id', orderId || txnId);

      if (updateError) {
        console.error('Error updating order:', updateError);
      }

      // If payment is successful, trigger order confirmation
      if (paymentState === 'COMPLETED' && orderId) {
        try {
          // Send order notification
          await supabase.functions.invoke('send-order-notification', {
            body: { orderId: orderId }
          });
        } catch (notificationError) {
          console.error('Error sending order notification:', notificationError);
          // Don't fail the payment verification if notification fails
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          paymentStatus: paymentStatus,
          orderStatus: orderStatus,
          transactionId: paymentData.transactionId,
          amount: paymentData.amount,
          responseCode: paymentData.responseCode,
          state: paymentState
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to verify payment status',
          details: responseData
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in phonepe-verify:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});