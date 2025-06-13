
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Upload, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const AdminNotificationComposer = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    imageUrl: '',
    targetUrl: '',
  });

  const defaultQuotes = [
    {
      title: "Crunch Break Time! 🍿",
      message: "Kaam ke beech ek crispy break toh banta hai 👀✨",
      targetUrl: "/products"
    },
    {
      title: "Cart Reminder 🛒",
      message: "You left something spicy in your cart. Shall we make it official? 🔥",
      targetUrl: "/checkout"
    },
    {
      title: "Limited Stock Alert! ⚡",
      message: "Sirf 5 packs bache hain… aur humne 4 le liye 😈",
      targetUrl: "/products"
    },
    {
      title: "New Arrival! 🎉",
      message: "Fresh namkeen just landed! Be the first to taste perfection.",
      targetUrl: "/products"
    },
    {
      title: "Weekend Special 🌟",
      message: "Weekend vibes deserve special namkeen! Check out our weekend specials.",
      targetUrl: "/products"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const useQuote = (quote: typeof defaultQuotes[0]) => {
    setFormData({
      title: quote.title,
      message: quote.message,
      imageUrl: '',
      targetUrl: quote.targetUrl,
    });
  };

  const sendNotification = async () => {
    if (!formData.title || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in title and message',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Save notification to database
      const { data: notification, error: dbError } = await supabase
        .from('admin_notifications')
        .insert({
          title: formData.title,
          message: formData.message,
          image_url: formData.imageUrl || null,
          target_url: formData.targetUrl || null,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Send push notification via Edge Function
      const { error: pushError } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: formData.title,
          message: formData.message,
          imageUrl: formData.imageUrl,
          targetUrl: formData.targetUrl,
        },
      });

      if (pushError) throw pushError;

      toast({
        title: 'Success',
        description: 'Notification sent to all subscribed users!',
      });

      // Reset form
      setFormData({
        title: '',
        message: '',
        imageUrl: '',
        targetUrl: '',
      });

    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to send notification. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Push Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Notification Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., New Snacks Arrived! 🎉"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/50 characters</p>
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Write your notification message here..."
              rows={3}
              maxLength={120}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.message.length}/120 characters</p>
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="targetUrl">Target URL (optional)</Label>
            <Input
              id="targetUrl"
              value={formData.targetUrl}
              onChange={(e) => handleInputChange('targetUrl', e.target.value)}
              placeholder="/products or https://example.com"
            />
          </div>

          <Button
            onClick={sendNotification}
            disabled={loading || !formData.title || !formData.message}
            className="w-full bg-saffron hover:bg-saffron/90"
          >
            {loading ? 'Sending...' : 'Send Notification'}
            <Send className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Quick Templates
          </CardTitle>
          <p className="text-sm text-gray-600">Click on any template to use it</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {defaultQuotes.map((quote, index) => (
              <div
                key={index}
                onClick={() => useQuote(quote)}
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{quote.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{quote.message}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Use Template
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotificationComposer;
