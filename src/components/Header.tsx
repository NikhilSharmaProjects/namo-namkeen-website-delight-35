
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    // Use bg-cream for header and eliminate strips
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-lg border-b border-saffron/10 shadow-none">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with image instead of icon */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Namo Namkeen Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg"
              style={{ background: 'linear-gradient(90deg, #ffe9b2, #fff5cc)' }}
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-warmBrown flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-6 w-6 rounded-full md:hidden" />
                Namo Namkeen
              </h1>
              <p className="text-xs md:text-sm text-warmBrown/70">Authentic Indore Flavors</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-warmBrown hover:underline decoration-saffron underline-offset-4 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-warmBrown hover:underline decoration-saffron underline-offset-4 font-medium transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-warmBrown hover:underline decoration-saffron underline-offset-4 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-warmBrown hover:underline decoration-saffron underline-offset-4 font-medium transition-colors">
              Contact
            </Link>
            {user && (
              <Link to="/my-orders" className="text-warmBrown hover:underline decoration-saffron underline-offset-4 font-medium transition-colors">
                My Orders
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-chili text-white text-xs shadow-md">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuthClick}
              className="hidden sm:flex items-center space-x-2 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="text-sm">{user ? 'Logout' : 'Login'}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden text-warmBrown hover:text-saffron"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-saffron/10 bg-cream/95 backdrop-blur-lg shadow-lg">
            <nav className="py-4 space-y-2">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors rounded"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors rounded"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors rounded"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors rounded"
              >
                Contact
              </Link>
              {user && (
                <Link
                  to="/my-orders"
                  onClick={toggleMenu}
                  className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors rounded"
                >
                  My Orders
                </Link>
              )}
              <button
                onClick={() => {
                  handleAuthClick();
                  toggleMenu();
                }}
                className="block w-full text-left py-2 px-4 text-warmBrown hover:text-saffron hover:bg-gradient-yellow transition-colors rounded"
              >
                {user ? 'Logout' : 'Login'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
