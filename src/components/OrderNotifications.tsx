
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, Package, Truck, AlertCircle, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  phone: string;
  payment_method: string;
  order_items: Array<{
    product_name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
}

interface OrderNotificationsProps {
  newOrderCount: number;
  onClearNotifications: () => void;
}

const OrderNotifications = ({ newOrderCount, onClearNotifications }: OrderNotificationsProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
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

      toast({ title: 'Success', description: 'Order status updated successfully' });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({ title: 'Error', description: 'Failed to update order status', variant: 'destructive' });
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
          <h2 className="text-2xl font-bold text-warmBrown">Order Management</h2>
          {newOrderCount > 0 && (
            <Button
              onClick={onClearNotifications}
              className="bg-chili hover:bg-chili/90 text-white animate-pulse"
            >
              {newOrderCount} New Orders
            </Button>
          )}
        </div>
      </div>

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

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                  className="w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
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
    </div>
  );
};

export default OrderNotifications;
