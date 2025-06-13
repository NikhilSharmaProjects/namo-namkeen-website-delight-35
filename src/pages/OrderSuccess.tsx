
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Phone } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const formatPrice = (price: number) => `₹${(price / 100).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Order Placed Successfully!</CardTitle>
          <p className="text-green-600">Thank you for your order. We've received it and will process it soon.</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-warmBrown mb-2">Order Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Order Number</p>
                <p className="font-semibold">#{orderData.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="font-semibold text-chili">{formatPrice(orderData.total)}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-warmBrown">What happens next?</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Order Processing</p>
                  <p className="text-sm text-blue-600">We'll prepare your order within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Truck className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-800">Shipping</p>
                  <p className="text-sm text-purple-600">Your order will be delivered in 2-4 business days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <Phone className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Stay Updated</p>
                  <p className="text-sm text-yellow-600">We'll call you to confirm delivery details</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-saffron/10 p-4 rounded-lg">
            <h3 className="font-semibold text-warmBrown mb-2">Need Help?</h3>
            <p className="text-sm text-warmBrown/80 mb-2">
              If you have any questions about your order, feel free to contact us:
            </p>
            <div className="text-sm space-y-1">
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> orders@namonamkeen.com</p>
              <p><strong>WhatsApp:</strong> +91 98765 43210</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button className="w-full bg-saffron hover:bg-saffron/90">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Social Sharing */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Share your experience with NAMO Namkeen!</p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">Facebook</Button>
              <Button variant="outline" size="sm">Instagram</Button>
              <Button variant="outline" size="sm">WhatsApp</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
