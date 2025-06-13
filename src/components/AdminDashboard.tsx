
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, Bell, Users, Settings } from 'lucide-react';
import ProductManagement from './ProductManagement';
import OrderNotifications from './OrderNotifications';
import AdminNotificationComposer from './AdminNotificationComposer';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [newOrderCount, setNewOrderCount] = useState(0);

  const handleClearNotifications = () => {
    setNewOrderCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/30 via-white to-saffron/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-saffron to-turmeric rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-warmBrown">Namo Namkeen Admin</h1>
              <p className="text-warmBrown/70">Manage your store and orders</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
              {newOrderCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                  {newOrderCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrderNotifications 
              newOrderCount={newOrderCount}
              onClearNotifications={handleClearNotifications}
            />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="notifications">
            <AdminNotificationComposer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
