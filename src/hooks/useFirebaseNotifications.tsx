import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

interface FirebaseNotificationContextType {
  isSubscribed: boolean;
  isInitialized: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  sendNotification: (title: string, message: string, data?: any) => Promise<void>;
}

const FirebaseNotificationContext = createContext<FirebaseNotificationContextType | undefined>(undefined);

// Firebase configuration - to be set via environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const FirebaseNotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    initializeFirebase();
  }, []);

  const initializeFirebase = async () => {
    try {
      // Check if Firebase config is available
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.warn('Firebase configuration not found. Push notifications disabled.');
        setIsInitialized(true); // Still mark as initialized to prevent loading states
        return;
      }

      // Dynamically import Firebase modules
      const [
        { initializeApp },
        { getMessaging, isSupported, getToken, onMessage }
      ] = await Promise.all([
        import('firebase/app'),
        import('firebase/messaging')
      ]);

      // Check if messaging is supported
      const supported = await isSupported();
      if (!supported) {
        console.log('Firebase messaging not supported in this browser');
        setIsInitialized(true);
        return;
      }

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      
      // Get registration token
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });

      if (currentToken) {
        setIsSubscribed(true);
        await saveSubscriptionToDatabase(currentToken);
      }

      // Handle foreground messages
      onMessage(messaging, (payload) => {
        console.log('Received foreground message:', payload);
        toast({
          title: payload.notification?.title || 'New Notification',
          description: payload.notification?.body || 'You have a new notification',
        });
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Firebase messaging:', error);
      setIsInitialized(true); // Still mark as initialized to prevent loading states
    }
  };

  const saveSubscriptionToDatabase = async (token: string) => {
    try {
      await supabase.from('push_subscriptions').upsert({
        user_id: user?.id || null,
        subscription_id: token,
        endpoint: 'firebase-endpoint',
        auth_key: null,
        p256dh_key: null,
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

      // Check if Firebase is available
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        toast({
          title: 'Notifications Not Available',
          description: 'Push notifications are not configured.',
          variant: 'destructive',
        });
        return;
      }

      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // Get token and save to database
      const [
        { initializeApp },
        { getMessaging, getToken }
      ] = await Promise.all([
        import('firebase/app'),
        import('firebase/messaging')
      ]);
      
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });

      if (currentToken) {
        setIsSubscribed(true);
        await saveSubscriptionToDatabase(currentToken);
        toast({
          title: 'Notifications Enabled',
          description: 'You will now receive push notifications from Namo Namkeen!',
        });
      }
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
      // Mark subscription as inactive in database
      setIsSubscribed(false);
      toast({
        title: 'Notifications Disabled',
        description: 'You will no longer receive push notifications.',
      });
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  const sendNotification = async (title: string, message: string, data: any = {}) => {
    try {
      const { data: functionData, error } = await supabase.functions.invoke('send-firebase-notification', {
        body: {
          title,
          message,
          data,
        }
      });

      if (error) throw error;
      
      return functionData;
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  };

  return (
    <FirebaseNotificationContext.Provider
      value={{
        isSubscribed,
        isInitialized,
        subscribe,
        unsubscribe,
        sendNotification,
      }}
    >
      {children}
    </FirebaseNotificationContext.Provider>
  );
};

export const useFirebaseNotifications = () => {
  const context = useContext(FirebaseNotificationContext);
  if (context === undefined) {
    throw new Error('useFirebaseNotifications must be used within a FirebaseNotificationProvider');
  }
  return context;
};