
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';
import { useOneSignal } from '@/hooks/useOneSignal';

const NotificationBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { isSubscribed, isInitialized, subscribe } = useOneSignal();

  useEffect(() => {
    // Add logging for notification status
    console.log("OneSignal initialized?", isInitialized, "Subscribed?", isSubscribed);
    const hasSeenBanner = localStorage.getItem('notification-banner-seen');
    if (isInitialized && !isSubscribed && !hasSeenBanner) {
      setShowBanner(true);
    }
  }, [isInitialized, isSubscribed]);

  const handleSubscribe = async () => {
    try {
      await subscribe();
      setShowBanner(false);
      localStorage.setItem('notification-banner-seen', 'true');
      console.log("Subscribed to notifications!");
    } catch (error) {
      console.error("Subscribe error:", error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('notification-banner-seen', 'true');
  };

  if (!showBanner) return null;

  // Saffron gradient background updated for lighter look
  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 border-none shadow-lg mx-auto max-w-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-yellow-700 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1 text-yellow-900">Stay Updated!</h3>
            <p className="text-xs text-yellow-900/80 mb-3">
              Get notified about fresh snacks, order updates, and special offers from Namo Namkeen!
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-yellow-900 hover:bg-gradient-to-l hover:from-yellow-300 hover:to-yellow-400 text-xs"
              >
                Enable Notifications
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-yellow-900 hover:text-yellow-800 text-xs"
              >
                Maybe Later
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-yellow-900 hover:text-yellow-800 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationBanner;
