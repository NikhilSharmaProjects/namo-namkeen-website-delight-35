
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

const ONESIGNAL_APP_ID = 'your-onesignal-app-id'; // Replace with actual OneSignal App ID

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
        script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
        script.async = true;
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize OneSignal
      window.OneSignal = window.OneSignal || [];
      window.OneSignal.push(function() {
        window.OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          safari_web_id: 'web.onesignal.auto.safari-id', // Replace with actual Safari Web ID
          allowLocalhostAsSecureOrigin: true,
          autoRegister: false,
        });

        window.OneSignal.on('subscriptionChange', function(isSubscribed: boolean) {
          setIsSubscribed(isSubscribed);
          if (isSubscribed) {
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
      const playerId = await window.OneSignal.getUserId();
      if (!playerId) return;

      const subscription = await window.OneSignal.getSubscription();
      
      await supabase.from('push_subscriptions').upsert({
        user_id: user?.id || null,
        subscription_id: playerId,
        endpoint: subscription?.endpoint || '',
        auth_key: subscription?.keys?.auth || null,
        p256dh_key: subscription?.keys?.p256dh || null,
        user_agent: navigator.userAgent,
        is_active: true,
      });
    } catch (error) {
      console.error('Failed to save subscription:', error);
    }
  };

  const subscribe = async () => {
    try {
      if (!isInitialized) return;
      
      await window.OneSignal.showSlidedownPrompt();
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
      await window.OneSignal.setSubscription(false);
      setIsSubscribed(false);
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

// Type declarations for OneSignal
declare global {
  interface Window {
    OneSignal: any;
  }
}
