
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';
import { useOneSignal } from '@/hooks/useOneSignal';

const NotificationBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { isSubscribed, isInitialized, subscribe } = useOneSignal();

  useEffect(() => {
    // Show banner on first visit if not subscribed
    const hasSeenBanner = localStorage.getItem('notification-banner-seen');
    if (isInitialized && !isSubscribed && !hasSeenBanner) {
      setShowBanner(true);
    }
  }, [isInitialized, isSubscribed]);

  const handleSubscribe = async () => {
    await subscribe();
    setShowBanner(false);
    localStorage.setItem('notification-banner-seen', 'true');
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('notification-banner-seen', 'true');
  };

  if (!showBanner) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 bg-saffron text-white border-none shadow-lg mx-auto max-w-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Stay Updated!</h3>
            <p className="text-xs text-white/90 mb-3">
              Get notified about fresh snacks, order updates, and special offers from Namo Namkeen!
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSubscribe}
                className="bg-white text-saffron hover:bg-white/90 text-xs"
              >
                Enable Notifications
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-white hover:text-white/80 text-xs"
              >
                Maybe Later
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-white hover:text-white/80 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationBanner;
