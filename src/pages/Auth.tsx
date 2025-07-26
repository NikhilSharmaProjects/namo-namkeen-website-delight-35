
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Smartphone, Mail } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = () => {
  const { user, loading } = useAuth();
  const { loginWithRedirect, loginWithPopup } = useAuth0();

  useEffect(() => {
    // Handle Auth0 callback and redirect to home
    if (user && !loading) {
      // Small delay to ensure state is properly set
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron/10 via-cream to-turmeric/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron mx-auto"></div>
          <p className="mt-4 text-warmBrown">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'Username-Password-Authentication'
      }
    });
  };

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2'
      }
    });
  };

  const handleFacebookLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'facebook'
      }
    });
  };

  const handleAppleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'apple'
      }
    });
  };

  const handlePhoneLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'sms'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/10 via-cream to-turmeric/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-saffron p-3 rounded-full">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-warmBrown font-poppins">
            Welcome to NAMO Namkeen
          </h2>
          <p className="text-warmBrown/70 mt-2 font-merriweather">
            Sign in to your account or create a new one
          </p>
          <Badge className="bg-chili text-white mt-4 animate-pulse">
            🎉 Get 10% OFF on your first order with code FIRST10
          </Badge>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-saffron/20">
          <CardHeader>
            <CardTitle className="text-center text-warmBrown font-poppins">
              Choose Your Login Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleEmailLogin}
              className="w-full bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Mail className="h-5 w-5" />
              Continue with Email
            </Button>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-2 border-saffron/30 hover:bg-saffron/10 text-warmBrown font-semibold py-3 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <Button
              onClick={handleFacebookLogin}
              variant="outline"
              className="w-full border-2 border-saffron/30 hover:bg-saffron/10 text-warmBrown font-semibold py-3 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </Button>

            <Button
              onClick={handleAppleLogin}
              variant="outline"
              className="w-full border-2 border-saffron/30 hover:bg-saffron/10 text-warmBrown font-semibold py-3 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 8.87 3.606 8.87 3.606s-3.235.3-3.235 4.209c0 3.91 3.235 4.209 3.235 4.209s-.474 3.606 2.147 3.606c2.62 0 2.147-3.606 2.147-3.606s3.235-.3 3.235-4.209c0-3.91-3.235-4.209-3.235-4.209S15.637 0 12.017 0z"/>
              </svg>
              Continue with Apple
            </Button>

            <Button
              onClick={handlePhoneLogin}
              variant="outline"
              className="w-full border-2 border-saffron/30 hover:bg-saffron/10 text-warmBrown font-semibold py-3 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Smartphone className="h-5 w-5" />
              Continue with Phone (OTP)
            </Button>

            <div className="text-center text-xs text-warmBrown/60 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <img
            src="/logo.png"
            alt="Namo Namkeen"
            className="h-16 mx-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
