
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Package, ShoppingCart, Plus, Bell } from 'lucide-react';
import ProductManagement from './ProductManagement';
import OrderNotifications from './OrderNotifications';
import { supabase } from '@/integrations/supabase/client';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    newOrdersToday: 0
  });
  const [newOrderCount, setNewOrderCount] = useState(0);

  useEffect(() => {
    fetchStats();
    setupRealTimeOrderNotifications();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch orders count
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Fetch pending orders count
      const { count: pendingCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch today's orders
      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        pendingOrders: pendingCount || 0,
        newOrdersToday: todayCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const setupRealTimeOrderNotifications = () => {
    const channel = supabase
      .channel('order-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('New order received:', payload);
          setNewOrderCount(prev => prev + 1);
          fetchStats(); // Refresh stats when new order comes in
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const clearNewOrderNotifications = () => {
    setNewOrderCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/30 via-white to-saffron/10">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-saffron/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Namo Namkeen" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold text-warmBrown">Admin Dashboard</h1>
                <p className="text-warmBrown/70">Namo Namkeen Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {newOrderCount > 0 && (
                <div className="relative">
                  <Bell className="h-6 w-6 text-saffron animate-pulse" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-chili text-white text-xs flex items-center justify-center p-0">
                    {newOrderCount}
                  </Badge>
                </div>
              )}
              
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-warmBrown text-warmBrown hover:bg-warmBrown hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-saffron/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-warmBrown">Total Products</CardTitle>
              <Package className="h-4 w-4 text-saffron" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warmBrown">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="border-saffron/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-warmBrown">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-saffron" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warmBrown">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-saffron/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-warmBrown">Pending Orders</CardTitle>
              <Badge className="bg-chili text-white">{stats.pendingOrders}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warmBrown">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-saffron/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-warmBrown">New Today</CardTitle>
              <Badge className="bg-green-500 text-white">{stats.newOrdersToday}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warmBrown">{stats.newOrdersToday}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
              {newOrderCount > 0 && (
                <Badge className="bg-chili text-white animate-pulse">
                  {newOrderCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManagement onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="orders">
            <OrderNotifications 
              newOrderCount={newOrderCount}
              onClearNotifications={clearNewOrderNotifications}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
