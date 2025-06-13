
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

interface OneSignalContextType {
  isSubscribed: boolean;
  isInitialized: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  sendNotification: (title: string, message: string, data?: any) => Promise<void>;
}

const OneSignalContext = createContext<OneSignalContextType | undefined>(undefined);

const ONESIGNAL_APP_ID = 'ef329d29-6d7c-4ab0-a7bf-08e742f73123'; // Your OneSignal App ID

export const OneSignalProvider = ({ children }: { children: ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    initializeOneSignal();
  }, []);

  const initializeOneSignal = async () => {
    try {
      // Load OneSignal SDK
      if (!window.OneSignal) {
        const script = document.createElement('script');
        script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
        script.async = true;
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize OneSignal using the new v16 API
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function(OneSignal: any) {
        await OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          safari_web_id: 'web.onesignal.auto.54cd441e-7f12-4aed-9845-f98eb5c10ecb',
          allowLocalhostAsSecureOrigin: true,
        });

        // Check if already subscribed
        const subscription = await OneSignal.User.PushSubscription.optedIn;
        setIsSubscribed(subscription);

        // Listen for subscription changes
        OneSignal.User.PushSubscription.addEventListener('change', (event: any) => {
          setIsSubscribed(event.current.optedIn);
          if (event.current.optedIn) {
            saveSubscriptionToDatabase();
          }
        });
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize OneSignal:', error);
    }
  };

  const saveSubscriptionToDatabase = async () => {
    try {
      window.OneSignalDeferred.push(async function(OneSignal: any) {
        const playerId = OneSignal.User.PushSubscription.id;
        if (!playerId) return;

        await supabase.from('push_subscriptions').upsert({
          user_id: user?.id || null,
          subscription_id: playerId,
          endpoint: 'onesignal-endpoint',
          auth_key: null,
          p256dh_key: null,
          user_agent: navigator.userAgent,
          is_active: true,
        });
      });
    } catch (error) {
      console.error('Failed to save subscription:', error);
    }
  };

  const subscribe = async () => {
    try {
      if (!isInitialized) return;
      
      window.OneSignalDeferred.push(async function(OneSignal: any) {
        await OneSignal.Slidedown.promptPush();
      });
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast({
        title: 'Subscription Failed',
        description: 'Unable to enable notifications. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const unsubscribe = async () => {
    try {
      window.OneSignalDeferred.push(async function(OneSignal: any) {
        await OneSignal.User.PushSubscription.optOut();
        setIsSubscribed(false);
      });
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  const sendNotification = async (title: string, message: string, data: any = {}) => {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  return (
    <OneSignalContext.Provider
      value={{
        isSubscribed,
        isInitialized,
        subscribe,
        unsubscribe,
        sendNotification,
      }}
    >
      {children}
    </OneSignalContext.Provider>
  );
};

export const useOneSignal = () => {
  const context = useContext(OneSignalContext);
  if (context === undefined) {
    throw new Error('useOneSignal must be used within a OneSignalProvider');
  }
  return context;
};

// Type declarations for OneSignal v16
declare global {
  interface Window {
    OneSignal: any;
    OneSignalDeferred: any[];
  }
}
