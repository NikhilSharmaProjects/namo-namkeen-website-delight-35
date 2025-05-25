
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  onCartClick?: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Namo Namkeen" 
              className="h-12 w-12 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className={`text-2xl font-bold font-poppins transition-colors duration-300 ${
                isScrolled ? 'text-warmBrown' : 'text-white'
              }`}>
                NAMO
              </span>
              <span className={`text-sm font-merriweather transition-colors duration-300 ${
                isScrolled ? 'text-saffron' : 'text-cream'
              }`}>
                Namkeen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === item.path
                    ? isScrolled 
                      ? 'text-saffron border-b-2 border-saffron' 
                      : 'text-turmeric border-b-2 border-turmeric'
                    : isScrolled 
                      ? 'text-warmBrown hover:text-saffron' 
                      : 'text-white hover:text-turmeric'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className={`relative p-2 transition-colors duration-300 ${
                isScrolled 
                  ? 'text-warmBrown hover:text-saffron hover:bg-saffron/10' 
                  : 'text-white hover:text-turmeric hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-chili text-white text-xs flex items-center justify-center p-0 animate-pulse">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className={`hidden md:flex items-center space-x-2 ${
                  isScrolled ? 'text-warmBrown' : 'text-white'
                }`}>
                  <User className="h-4 w-4" />
                  <span className="text-sm">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-warmBrown hover:text-chili hover:bg-chili/10' 
                      : 'text-white hover:text-red-300 hover:bg-white/10'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className={`transition-all duration-300 transform hover:scale-105 ${
                  isScrolled 
                    ? 'bg-saffron hover:bg-saffron/90 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                }`}>
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden transition-colors duration-300 ${
                isScrolled 
                  ? 'text-warmBrown hover:text-saffron' 
                  : 'text-white hover:text-turmeric'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 py-4 px-6 shadow-lg border border-saffron/20">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-saffron border-l-4 border-saffron pl-4'
                      : 'text-warmBrown hover:text-saffron hover:pl-4'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user && (
                <div className="border-t border-saffron/20 pt-4 mt-4">
                  <div className="flex items-center space-x-2 text-warmBrown mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-chili hover:text-chili/80 justify-start p-0"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
