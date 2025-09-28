import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { title, message, imageUrl, targetUrl, data = {} } = await req.json()

    // Get Firebase server key from environment
    const firebaseServerKey = Deno.env.get('FIREBASE_SERVER_KEY')
    const firebaseProjectId = Deno.env.get('FIREBASE_PROJECT_ID')
    
    if (!firebaseServerKey || !firebaseProjectId) {
      console.error('Firebase configuration missing')
      return new Response(
        JSON.stringify({ error: 'Firebase configuration not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Firebase FCM payload
    const fcmPayload = {
      to: '/topics/all-users', // Send to all subscribed users
      notification: {
        title: title,
        body: message,
        icon: '/logo.png',
        badge: '/logo.png',
        image: imageUrl || undefined,
        click_action: targetUrl || '/',
        tag: 'namo-namkeen-notification'
      },
      data: {
        url: targetUrl || '/',
        ...data
      },
      webpush: {
        headers: {
          Urgency: 'high'
        },
        notification: {
          title: title,
          body: message,
          icon: '/logo.png',
          badge: '/logo.png',
          image: imageUrl || undefined,
          requireInteraction: true,
          actions: [
            {
              action: 'view',
              title: 'View',
              icon: '/logo.png'
            }
          ]
        }
      }
    }

    console.log('Sending Firebase notification:', fcmPayload)

    // Send to Firebase FCM
    const fcmResponse = await fetch(`https://fcm.googleapis.com/fcm/send`, {
      method: 'POST',
      headers: {
        'Authorization': `key=${firebaseServerKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fcmPayload),
    })

    const fcmResult = await fcmResponse.json()
    console.log('Firebase FCM response:', fcmResult)

    if (!fcmResponse.ok) {
      console.error('Firebase FCM error:', fcmResult)
      return new Response(
        JSON.stringify({ error: 'Failed to send Firebase notification', details: fcmResult }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update notification record in Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Update admin_notifications table with recipient count
    const { error: updateError } = await supabase
      .from('admin_notifications')
      .update({ 
        recipient_count: fcmResult.success || 0,
        sent_at: new Date().toISOString()
      })
      .eq('title', title)
      .eq('message', message)
      .is('sent_at', null)
      .order('created_at', { ascending: false })
      .limit(1)

    if (updateError) {
      console.error('Error updating notification record:', updateError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Firebase notification sent successfully',
        recipient_count: fcmResult.success || 0,
        firebase_response: fcmResult
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-firebase-notification function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})