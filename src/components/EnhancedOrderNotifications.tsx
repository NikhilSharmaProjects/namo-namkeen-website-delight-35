
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, Package, Truck, AlertCircle, Eye, Shield, Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import OTPVerificationModal from './OTPVerificationModal';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  phone: string;
  payment_method: string;
  delivery_otp_required: boolean;
  delivery_otp_verified: boolean;
  delivered_at: string | null;
  order_items: Array<{
    product_name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
}

interface EnhancedOrderNotificationsProps {
  newOrderCount: number;
  onClearNotifications: () => void;
}

const EnhancedOrderNotifications = ({ newOrderCount, onClearNotifications }: EnhancedOrderNotificationsProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [otpModalOrder, setOtpModalOrder] = useState<Order | null>(null);
  const { notifications, unreadCount, markAllAsRead } = useRealtimeNotifications();

  useEffect(() => {
    fetchOrders();
    
    // Set up real-time subscription for orders
    const channel = supabase
      .channel('orders-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_name,
            size,
            quantity,
            price
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({ title: 'Error', description: 'Failed to load orders', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Create admin notification
      await supabase
        .from('admin_notifications_realtime')
        .insert({
          type: 'status_update',
          order_id: orderId,
          message: `Order #${orderId.slice(-8)} status updated to ${newStatus}`,
        });

      // Send customer notification based on status
      if (newStatus === 'confirmed') {
        await supabase.functions.invoke('send-order-notification', {
          body: {
            type: 'order_confirmed',
            orderId: orderId,
          },
        });
      } else if (newStatus === 'shipped') {
        await supabase.functions.invoke('send-order-notification', {
          body: {
            type: 'out_for_delivery',
            orderId: orderId,
          },
        });
      }

      toast({ title: 'Success', description: `Order status updated to ${newStatus}` });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({ title: 'Error', description: 'Failed to update order status', variant: 'destructive' });
    }
  };

  const handleShipOrder = (order: Order) => {
    if (order.status === 'shipped') {
      setOtpModalOrder(order);
    } else {
      updateOrderStatus(order.id, 'shipped');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <Package className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-warmBrown">Enhanced Order Management</h2>
          {unreadCount > 0 && (
            <Button
              onClick={() => { onClearNotifications(); markAllAsRead(); }}
              className="bg-chili hover:bg-chili/90 text-white animate-pulse"
            >
              <Bell className="h-4 w-4 mr-2" />
              {unreadCount} New Notifications
            </Button>
          )}
        </div>
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <Card className="border-saffron/20">
          <CardHeader>
            <CardTitle className="text-lg text-warmBrown flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`text-sm p-2 rounded ${
                    notification.is_read ? 'bg-gray-50' : 'bg-blue-50 font-medium'
                  }`}
                >
                  {notification.message}
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(notification.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card 
            key={order.id} 
            className={`border-saffron/20 hover:shadow-lg transition-all cursor-pointer ${
              newOrderCount > 0 && orders.indexOf(order) < newOrderCount ? 'ring-2 ring-chili animate-pulse' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-sm font-medium text-warmBrown">
                    Order #{order.id.slice(-8)}
                  </CardTitle>
                  <p className="text-xs text-warmBrown/60">
                    {new Date(order.created_at).toLocaleDateString()} at{' '}
                    {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-bold text-warmBrown">
                  ₹{(order.total_amount / 100).toFixed(2)}
                </p>
                <p className="text-sm text-warmBrown/70">
                  {order.order_items?.length || 0} items • {order.payment_method.toUpperCase()}
                </p>
              </div>

              <div className="text-sm space-y-1">
                <p className="font-medium text-warmBrown">Items:</p>
                {order.order_items?.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-warmBrown/70">
                    {item.quantity}x {item.product_name} ({item.size})
                  </p>
                ))}
                {order.order_items?.length > 2 && (
                  <p className="text-warmBrown/70">
                    +{order.order_items.length - 2} more items
                  </p>
                )}
              </div>

              <div className="text-sm">
                <p className="font-medium text-warmBrown">Contact:</p>
                <p className="text-warmBrown/70">{order.phone}</p>
              </div>

              {/* OTP Status */}
              {order.delivery_otp_required && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className={order.delivery_otp_verified ? 'text-green-600' : 'text-blue-600'}>
                    {order.delivery_otp_verified ? 'OTP Verified ✓' : 'OTP Required'}
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <Select 
                  value={order.status} 
                  onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  
                  {order.status === 'shipped' && (
                    <Button
                      size="sm"
                      onClick={() => handleShipOrder(order)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      OTP Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-warmBrown/70">No orders found</p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order #{selectedOrder.id.slice(-8)}</CardTitle>
                  <p className="text-warmBrown/70">
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Badge>
                <p className="text-lg font-bold text-warmBrown">
                  ₹{(selectedOrder.total_amount / 100).toFixed(2)}
                </p>
              </div>

              {/* OTP Information */}
              {selectedOrder.delivery_otp_required && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Delivery Verification
                  </h3>
                  <p className="text-sm text-blue-700">
                    Status: {selectedOrder.delivery_otp_verified ? 'Verified ✓' : 'Pending'}
                  </p>
                  {selectedOrder.delivered_at && (
                    <p className="text-sm text-blue-700">
                      Delivered: {new Date(selectedOrder.delivered_at).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              <div>
                <h3 className="font-bold text-warmBrown mb-2">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.order_items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-cream/30 rounded">
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-warmBrown/70">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{(item.price / 100).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(selectedOrder.total_amount / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-warmBrown mb-2">Shipping Details</h3>
                <p className="text-warmBrown/70">{selectedOrder.shipping_address}</p>
                <p className="text-warmBrown/70">Phone: {selectedOrder.phone}</p>
                <p className="text-warmBrown/70">Payment: {selectedOrder.payment_method.toUpperCase()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* OTP Verification Modal */}
      {otpModalOrder && (
        <OTPVerificationModal
          orderId={otpModalOrder.id}
          orderNumber={otpModalOrder.id.slice(-8)}
          onClose={() => setOtpModalOrder(null)}
          onVerified={fetchOrders}
        />
      )}
    </div>
  );
};

export default EnhancedOrderNotifications;
