
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  type: 'new_order' | 'order_confirmed' | 'out_for_delivery' | 'delivered' | 'otp_generated';
  orderId: string;
  customerName?: string;
  customerPhone?: string;
  total?: number;
  items?: Array<any>;
  otp?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, orderId, customerName, customerPhone, total, items, otp }: NotificationRequest = await req.json();

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseKey);

    let notificationMessage = '';
    let pushTitle = '';
    let pushMessage = '';

    // Generate messages based on notification type
    switch (type) {
      case 'new_order':
        notificationMessage = `🎉 New Order Alert! Order #${orderId.slice(-8)} placed by ${customerName} for ₹${(total! / 100).toFixed(2)}`;
        pushTitle = '🔔 New Order Received!';
        pushMessage = `Order #${orderId.slice(-8)} - ₹${(total! / 100).toFixed(2)} from ${customerName}`;
        break;
      
      case 'order_confirmed':
        notificationMessage = `✅ Order #${orderId.slice(-8)} confirmed and being prepared`;
        pushTitle = '✅ Order Confirmed!';
        pushMessage = `Your order #${orderId.slice(-8)} has been confirmed and is being prepared`;
        break;
      
      case 'out_for_delivery':
        notificationMessage = `🚚 Order #${orderId.slice(-8)} is out for delivery`;
        pushTitle = '🚚 Out for Delivery!';
        pushMessage = `Your order #${orderId.slice(-8)} is on its way! OTP will be shared soon.`;
        break;
      
      case 'delivered':
        notificationMessage = `📦 Order #${orderId.slice(-8)} delivered successfully`;
        pushTitle = '📦 Order Delivered!';
        pushMessage = `Your order #${orderId.slice(-8)} has been delivered. Thank you for choosing us!`;
        break;
      
      case 'otp_generated':
        notificationMessage = `🔐 Delivery OTP generated for Order #${orderId.slice(-8)}: ${otp}`;
        pushTitle = '🔐 Delivery OTP';
        pushMessage = `Your delivery OTP: ${otp} for order #${orderId.slice(-8)}`;
        break;
    }

    // Insert into admin notifications for real-time updates
    if (type === 'new_order') {
      await supabase
        .from('admin_notifications_realtime')
        .insert({
          type: type,
          order_id: orderId,
          message: notificationMessage,
        });
    }

    // Send push notifications using existing OneSignal integration
    if (['order_confirmed', 'out_for_delivery', 'delivered', 'otp_generated'].includes(type)) {
      try {
        await supabase.functions.invoke('send-push-notification', {
          body: {
            title: pushTitle,
            message: pushMessage,
            targetUrl: '/my-orders',
          },
        });
      } catch (pushError) {
        console.error('Push notification error:', pushError);
      }
    }

    console.log(`Notification processed: ${type} for order ${orderId}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in enhanced-order-notification function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
