import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Truck, CreditCard, Banknote, Lock, Shield } from 'lucide-react';

const Checkout = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const formatPrice = (price: number) => `₹${(price / 100).toFixed(2)}`;
  const deliveryFee = totalAmount >= 50000 ? 0 : 5000;
  const finalTotal = totalAmount + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast({ title: 'Error', description: 'Your cart is empty', variant: 'destructive' });
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        user_id: user?.id || null,
        total_amount: finalTotal,
        status: 'pending',
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        phone: formData.phone,
        payment_method: formData.paymentMethod,
        delivery_otp_required: false,
        delivery_otp_verified: false
      };

      console.log("Submitting enhanced order:", orderData);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error("Order DB error", orderError);
        toast({ title: 'Order Error', description: orderError.message, variant: 'destructive' });
        return;
      }

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.size === '250g' ? item.product.price_250g :
               item.size === '500g' ? item.product.price_500g :
               item.product.price_1kg
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        toast({ title: 'Problem creating order items', description: itemsError.message, variant: 'destructive' });
        console.error("Order items error", itemsError);
        return;
      }

      // Send enhanced notifications
      try {
        await supabase.functions.invoke('enhanced-order-notification', {
          body: {
            type: 'new_order',
            orderId: order.id,
            customerName: formData.fullName,
            customerPhone: formData.phone,
            total: finalTotal,
            items: orderItems,
          },
        });
      } catch (notificationError) {
        console.error('Failed to send enhanced admin notification:', notificationError);
      }

      await clearCart();
      toast({ 
        title: '✅ Order Placed Successfully!', 
        description: `Order #${order.id.slice(-8)} confirmed. You'll receive notifications for updates!`,
        duration: 5000,
      });

      navigate('/order-success', { 
        state: { 
          orderId: order.id,
          orderNumber: order.id.slice(-8),
          total: finalTotal 
        } 
      });
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast({ 
        title: 'Order Failed', 
        description: error.message || 'Something went wrong. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-warmBrown mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate('/products')} className="bg-saffron hover:bg-saffron/90">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-8 text-center">
          Secure Checkout
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-900">
                <Truck className="h-5 w-5 text-yellow-700" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House no, Street, Area"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base font-semibold flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4" />
                    Payment Method
                  </Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          Cash on Delivery
                        </div>
                      </SelectItem>
                      <SelectItem value="online">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Online Payment
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-semibold py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {loading ? 'Processing Order...' : 'Place Order Securely'}
                  <Shield className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="h-fit bg-gradient-to-tr from-yellow-100 via-yellow-50 to-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-yellow-900">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item, index) => {
                  const price = item.size === '250g' ? item.product.price_250g :
                              item.size === '500g' ? item.product.price_500g :
                              item.product.price_1kg;
                  
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-xs text-gray-600">Size: {item.size}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatPrice(price * item.quantity)}</p>
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-chili">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Enhanced Security & Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-yellow-900 bg-yellow-50 p-3 rounded-lg">
                  <Lock className="h-4 w-4 text-yellow-700" />
                  <span>256-bit SSL encryption & secure processing</span>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  <p className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    🚚 Smart Delivery System
                  </p>
                  <p>• Real-time order tracking</p>
                  <p>• OTP verification for delivery</p>
                  <p>• Expected delivery: 2-4 business days</p>
                  <p>• Free delivery on orders above ₹500</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                  <p className="font-medium">📱 You'll receive notifications for:</p>
                  <p>• Order confirmation</p>
                  <p>• Order shipped with OTP</p>
                  <p>• Delivery completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
