
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, User, Mail, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({ title: 'Welcome back!', description: 'Successfully logged in' });
      } else {
        await signUp(email, password, fullName);
        toast({ title: 'Account created!', description: 'Please check your email to verify your account' });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
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
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
          <Badge className="bg-chili text-white mt-4 animate-pulse">
            🎉 Get 10% OFF on your first order with code FIRST10
          </Badge>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-saffron/20">
          <CardHeader>
            <CardTitle className="text-center text-warmBrown font-poppins">
              {isLogin ? 'Login' : 'Sign Up'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-warmBrown/50" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="pl-10 border-saffron/30 focus:border-saffron"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-warmBrown/50" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-saffron/30 focus:border-saffron"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-warmBrown/50" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-saffron/30 focus:border-saffron"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-saffron hover:text-turmeric font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
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
