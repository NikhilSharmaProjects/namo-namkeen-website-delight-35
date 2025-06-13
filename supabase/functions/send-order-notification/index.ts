
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, orderId, customerName, total, items } = await req.json()

    const ONESIGNAL_APP_ID = Deno.env.get('ONESIGNAL_APP_ID')
    const ONESIGNAL_REST_API_KEY = Deno.env.get('ONESIGNAL_REST_API_KEY')

    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      throw new Error('OneSignal configuration missing')
    }

    let notificationPayload

    switch (type) {
      case 'new_order':
        // Notification for admin
        const itemSummary = items.slice(0, 2).map((item: any) => 
          `${item.quantity}x ${item.product_name}`
        ).join(', ')
        
        notificationPayload = {
          app_id: ONESIGNAL_APP_ID,
          included_segments: ['Admin'], // You can create admin segment in OneSignal
          headings: { en: `🔥 New Order #${orderId.slice(-8)}` },
          contents: { 
            en: `${customerName} ordered ${itemSummary}${items.length > 2 ? ` +${items.length - 2} more` : ''} for ₹${(total / 100).toFixed(2)}` 
          },
          url: `/admin`,
          web_push_topic: 'admin-orders',
        }
        break

      case 'order_confirmed':
        // Notification for customer
        notificationPayload = {
          app_id: ONESIGNAL_APP_ID,
          included_segments: ['All'],
          headings: { en: `🎉 Order Confirmed!` },
          contents: { 
            en: `Order #${orderId.slice(-8)} confirmed! Crunch time begins. We'll keep you updated.` 
          },
          url: `/my-orders`,
          web_push_topic: 'order-updates',
        }
        break

      case 'out_for_delivery':
        notificationPayload = {
          app_id: ONESIGNAL_APP_ID,
          included_segments: ['All'],
          headings: { en: `🚚 Out for Delivery!` },
          contents: { 
            en: `Your namkeen is at your doorstep! Order #${orderId.slice(-8)} will arrive soon.` 
          },
          url: `/my-orders`,
          web_push_topic: 'delivery-updates',
        }
        break

      case 'delivered':
        notificationPayload = {
          app_id: ONESIGNAL_APP_ID,
          included_segments: ['All'],
          headings: { en: `✅ Order Delivered!` },
          contents: { 
            en: `Order #${orderId.slice(-8)} completed. Hope it was delicious! Rate us?` 
          },
          url: `/my-orders`,
          web_push_topic: 'delivery-updates',
        }
        break

      default:
        throw new Error('Invalid notification type')
    }

    // Send notification via OneSignal API
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify(notificationPayload),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OneSignal API error: ${error}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: result.id,
        recipients: result.recipients 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending order notification:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
