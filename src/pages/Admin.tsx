import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, AlertTriangle } from 'lucide-react';
import EnhancedAdminDashboard from '@/components/EnhancedAdminDashboard';
import { RealtimeNotificationsProvider } from '@/hooks/useRealtimeNotifications';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const Admin = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading } = useAdminAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-warmBrown">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please log in to access the admin panel.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => window.location.href = '/auth'} 
              className="w-full mt-4"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-warmBrown">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You don't have admin privileges. Please contact an administrator if you believe this is an error.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full mt-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <RealtimeNotificationsProvider>
      <EnhancedAdminDashboard onLogout={handleLogout} />
    </RealtimeNotificationsProvider>
  );
};

export default Admin;