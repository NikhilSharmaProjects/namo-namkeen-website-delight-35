
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, Bell, Users, Settings, ShieldCheck, TrendingUp } from 'lucide-react';
import ProductManagement from './ProductManagement';
import EnhancedOrderNotifications from './EnhancedOrderNotifications';
import AdminNotificationComposer from './AdminNotificationComposer';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedAdminDashboardProps {
  onLogout: () => void;
}

const EnhancedAdminDashboard = ({ onLogout }: EnhancedAdminDashboardProps) => {
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    todayOrders: 0,
  });
  const { unreadCount } = useRealtimeNotifications();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch order statistics
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total_amount, status, created_at');

      if (error) throw error;

      const today = new Date().toDateString();
      const todayOrders = orders?.filter(order => 
        new Date(order.created_at).toDateString() === today
      ).length || 0;

      const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      setStats({
        totalOrders: orders?.length || 0,
        pendingOrders,
        totalRevenue,
        todayOrders,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleClearNotifications = () => {
    setNewOrderCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/30 via-white to-saffron/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-saffron to-turmeric rounded-full flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-warmBrown">Namo Namkeen Admin Pro</h1>
              <p className="text-warmBrown/70">Advanced E-commerce Management System</p>
            </div>
          </div>
          <Button onClick={onLogout}variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending Orders</p>
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                </div>
                <Bell className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{(stats.totalRevenue / 100).toFixed(0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Today's Orders</p>
                  <p className="text-2xl font-bold">{stats.todayOrders}</p>
                </div>
                <Package className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Push Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <EnhancedOrderNotifications 
              newOrderCount={newOrderCount}
              onClearNotifications={handleClearNotifications}
            />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="notifications">
            <AdminNotificationComposer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
