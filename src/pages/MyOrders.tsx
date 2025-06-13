
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Package, Search, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

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

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase
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

      // If user is logged in, filter by user_id, otherwise get all orders (for guest checkout)
      if (user) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
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

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.order_items?.some(item => 
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">Loading your orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-saffron" />
            <h1 className="text-3xl font-bold text-warmBrown">My Orders</h1>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders by ID or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-warmBrown mb-2">No orders found</h3>
              <p className="text-warmBrown/70 mb-4">
                {searchTerm ? 'No orders match your search.' : "You haven't placed any orders yet."}
              </p>
              <Link to="/products">
                <Button className="bg-saffron hover:bg-saffron/90">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                      <p className="text-warmBrown/70">
                        {new Date(order.created_at).toLocaleDateString()} at{' '}
                        {new Date(order.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-warmBrown">
                        ₹{(order.total_amount / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-warmBrown/70">
                        {order.order_items?.length || 0} items • {order.payment_method.toUpperCase()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-warmBrown mb-2">Items:</p>
                    <div className="space-y-1">
                      {order.order_items?.slice(0, 2).map((item, index) => (
                        <p key={index} className="text-sm text-warmBrown/70">
                          {item.quantity}x {item.product_name} ({item.size})
                        </p>
                      ))}
                      {order.order_items?.length > 2 && (
                        <p className="text-sm text-warmBrown/70">
                          +{order.order_items.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                </div>

                <div>
                  <h3 className="font-bold text-warmBrown mb-2">Delivery Details</h3>
                  <p className="text-warmBrown/70">{selectedOrder.shipping_address}</p>
                  <p className="text-warmBrown/70">Phone: {selectedOrder.phone}</p>
                  <p className="text-warmBrown/70">Payment: {selectedOrder.payment_method.toUpperCase()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
