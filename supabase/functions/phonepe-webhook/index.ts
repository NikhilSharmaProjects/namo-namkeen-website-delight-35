import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PhonePe API configuration
const PHONEPE_SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";

// Verify PhonePe webhook signature
async function verifyWebhookSignature(
  payload: string,
  receivedSignature: string,
  saltKey: string
): Promise<boolean> {
  try {
    const [hash, saltIndex] = receivedSignature.split('###');
    const stringToHash = payload + saltKey;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return calculatedHash === hash;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
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

    const body = await req.text();
    const webhookSignature = req.headers.get('X-VERIFY');

    if (!webhookSignature) {
      console.error('Missing webhook signature');
      return new Response(
        JSON.stringify({ error: 'Missing webhook signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify webhook signature
    const isValidSignature = await verifyWebhookSignature(body, webhookSignature, PHONEPE_SALT_KEY);
    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid webhook signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookData = JSON.parse(body);
    console.log('PhonePe Webhook Data:', webhookData);

    // Decode the response from base64
    let paymentData;
    try {
      const decodedResponse = atob(webhookData.response);
      paymentData = JSON.parse(decodedResponse);
    } catch (error) {
      console.error('Error decoding webhook response:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid webhook payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const merchantTransactionId = paymentData.data?.merchantTransactionId;
    if (!merchantTransactionId) {
      console.error('Missing merchantTransactionId in webhook');
      return new Response(
        JSON.stringify({ error: 'Missing transaction ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find the order by merchant transaction ID
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('id, payment_status')
      .eq('phonepe_merchant_txn_id', merchantTransactionId)
      .single();

    if (orderError || !orderData) {
      console.error('Order not found for transaction ID:', merchantTransactionId);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orderId = orderData.id;
    const currentPaymentStatus = orderData.payment_status;

    // Prevent duplicate processing (idempotency check)
    if (currentPaymentStatus === 'paid') {
      console.log('Payment already processed for order:', orderId);
      return new Response(
        JSON.stringify({ success: true, message: 'Payment already processed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentState = paymentData.data?.state;
    let orderStatus = 'pending';
    let paymentStatus = 'pending';

    if (paymentState === 'COMPLETED') {
      orderStatus = 'confirmed';
      paymentStatus = 'paid';
    } else if (paymentState === 'FAILED') {
      orderStatus = 'cancelled';
      paymentStatus = 'failed';
    }

    // Update order with webhook data
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        phonepe_txn_id: paymentData.data?.transactionId,
        phonepe_response: paymentData,
        payment_status: paymentStatus,
        status: orderStatus,
        paid_at: paymentState === 'COMPLETED' ? new Date().toISOString() : null
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order from webhook:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log webhook processing
    await supabase.from('payment_attempts').insert({
      order_id: orderId,
      response_data: paymentData,
      status: `webhook_${paymentState?.toLowerCase() || 'unknown'}`,
      payment_method: 'phonepe'
    });

    // If payment is successful, trigger order confirmation
    if (paymentState === 'COMPLETED') {
      try {
        // Send order notification
        await supabase.functions.invoke('send-order-notification', {
          body: { orderId: orderId }
        });
      } catch (notificationError) {
        console.error('Error sending order notification:', notificationError);
        // Don't fail the webhook if notification fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderId,
        paymentStatus: paymentStatus,
        orderStatus: orderStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in phonepe-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});