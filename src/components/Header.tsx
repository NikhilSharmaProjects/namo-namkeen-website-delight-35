
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User, Menu, X, ExternalLink } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-saffron/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-transparent rounded-full flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="Namo Namkeen - Authentic Indore Snacks Logo" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-warmBrown">Namo Namkeen</h1>
              <p className="text-xs md:text-sm text-warmBrown/70">Authentic Indore Flavors</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-warmBrown hover:text-saffron transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-warmBrown hover:text-saffron transition-colors font-medium">
              Products
            </Link>
            <Link to="/about" className="text-warmBrown hover:text-saffron transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-warmBrown hover:text-saffron transition-colors font-medium">
              Contact
            </Link>
            {user && (
              <Link to="/my-orders" className="text-warmBrown hover:text-saffron transition-colors font-medium">
                My Orders
              </Link>
            )}
            
            {/* External Links */}
            <a 
              href="https://www.fssai.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-warmBrown/70 hover:text-saffron transition-colors font-medium text-sm flex items-center gap-1"
            >
              FSSAI
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://www.mptourism.com/destination/indore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-warmBrown/70 hover:text-saffron transition-colors font-medium text-sm flex items-center gap-1"
            >
              Indore Tourism
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative text-warmBrown hover:text-saffron hover:bg-saffron/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-chili text-white text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleAuthClick}
              className="hidden sm:flex items-center space-x-2 text-warmBrown hover:text-saffron hover:bg-saffron/10"
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
          <div className="md:hidden border-t border-saffron/20 bg-white/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-saffron/10 transition-colors rounded"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-saffron/10 transition-colors rounded"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-saffron/10 transition-colors rounded"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-saffron/10 transition-colors rounded"
              >
                Contact
              </Link>
              {user && (
                <Link
                  to="/my-orders"
                  onClick={toggleMenu}
                  className="block py-2 px-4 text-warmBrown hover:text-saffron hover:bg-saffron/10 transition-colors rounded"
                >
                  My Orders
                </Link>
              )}
              
              {/* Mobile External Links */}
              <div className="px-4 py-2 border-t border-saffron/10 mt-2">
                <p className="text-xs text-warmBrown/60 mb-2">External Links:</p>
                <a 
                  href="https://www.fssai.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block py-1 text-warmBrown/70 hover:text-saffron transition-colors text-sm flex items-center gap-1"
                >
                  FSSAI Certification
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.mptourism.com/destination/indore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block py-1 text-warmBrown/70 hover:text-saffron transition-colors text-sm flex items-center gap-1"
                >
                  Visit Indore
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <button
                onClick={() => {
                  handleAuthClick();
                  toggleMenu();
                }}
                className="block w-full text-left py-2 px-4 text-warmBrown hover:text-saffron hover:bg-saffron/10 transition-colors rounded"
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
