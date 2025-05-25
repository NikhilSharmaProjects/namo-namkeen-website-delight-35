
import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');

  if (!isOpen) return null;

  const formatPrice = (price: number) => `₹${(price / 100).toFixed(2)}`;

  if (!user) {
    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-warmBrown">Shopping Cart</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 text-center">
            <ShoppingBag className="h-16 w-16 text-warmBrown/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-warmBrown mb-2">Please Login</h3>
            <p className="text-warmBrown/70 mb-4">You need to login to view your cart</p>
            <Link to="/auth">
              <Button className="bg-saffron hover:bg-saffron/90 text-white">
                Login Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-warmBrown">Shopping Cart</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Badge className="bg-saffron text-white mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-warmBrown/30 mx-auto mb-4" />
              <p className="text-warmBrown/70">Your cart is empty</p>
              <Button 
                onClick={onClose}
                className="mt-4 bg-saffron hover:bg-saffron/90 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const price = item.size === '250g' ? item.product.price_250g :
                          item.size === '500g' ? item.product.price_500g :
                          item.product.price_1kg;
              
              return (
                <div key={item.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex gap-3">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-warmBrown line-clamp-2">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-warmBrown/60">Size: {item.size}</p>
                      <p className="text-sm font-semibold text-chili">
                        {formatPrice(price)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="font-semibold text-warmBrown">
                      {formatPrice(price * item.quantity)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  <Percent className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 rounded text-xs text-green-700">
                💡 Add ₹{formatPrice(50000 - totalAmount)} more for FREE delivery!
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Delivery:</span>
                <span>{totalAmount >= 50000 ? 'FREE' : '₹50'}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-1">
                <span>Total:</span>
                <span className="text-chili">
                  {formatPrice(totalAmount + (totalAmount >= 50000 ? 0 : 5000))}
                </span>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="w-full bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-300">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
