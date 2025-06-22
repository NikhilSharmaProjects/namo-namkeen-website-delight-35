
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface OTPVerificationModalProps {
  orderId: string;
  orderNumber: string;
  onClose: () => void;
  onVerified: () => void;
}

const OTPVerificationModal = ({ orderId, orderNumber, onClose, onVerified }: OTPVerificationModalProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingOtp, setGeneratingOtp] = useState(false);

  const generateOTP = async () => {
    setGeneratingOtp(true);
    try {
      const { data, error } = await supabase.rpc('generate_delivery_otp', {
        order_uuid: orderId
      });

      if (error) throw error;

      toast({
        title: 'OTP Generated! 📱',
        description: `Delivery OTP: ${data}. Share this with the customer.`,
        duration: 10000,
      });
    } catch (error: any) {
      console.error('Error generating OTP:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setGeneratingOtp(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('verify_delivery_otp', {
        order_uuid: orderId,
        provided_otp: otp
      });

      if (error) throw error;

      if (data) {
        toast({
          title: 'Order Delivered Successfully! 🎉',
          description: 'OTP verified and order marked as delivered.',
        });
        onVerified();
        onClose();
      } else {
        toast({
          title: 'Invalid OTP',
          description: 'The OTP is incorrect or expired. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-saffron to-turmeric rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl text-warmBrown">Delivery Verification</CardTitle>
          <p className="text-warmBrown/70">Order #{orderNumber}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Clock className="h-3 w-3 mr-1" />
              Out for Delivery
            </Badge>
            <p className="text-sm text-warmBrown/70">
              Generate and share OTP with customer for delivery verification
            </p>
          </div>

          <Button
            onClick={generateOTP}
            disabled={generatingOtp}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {generatingOtp ? 'Generating OTP...' : 'Generate Delivery OTP'}
          </Button>

          <div className="space-y-2">
            <label className="text-sm font-medium text-warmBrown">
              Enter OTP from Customer:
            </label>
            <Input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              {loading ? 'Verifying...' : 'Verify & Complete'}
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="text-xs text-center text-warmBrown/60 space-y-1">
            <p>🔒 Secure OTP verification ensures authentic delivery</p>
            <p>⏰ OTP expires in 24 hours</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerificationModal;
