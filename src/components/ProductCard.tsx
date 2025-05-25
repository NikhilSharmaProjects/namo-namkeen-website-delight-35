
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Zap, Clock, Users, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price_250g: number;
  price_500g: number;
  price_1kg: number;
  stock_250g: number;
  stock_500g: number;
  stock_1kg: number;
  image_url: string;
  is_featured: boolean;
  discount_percentage: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<'250g' | '500g' | '1kg'>('250g');
  const { addToCart } = useCart();
  const { user } = useAuth();

  const prices = {
    '250g': product.price_250g,
    '500g': product.price_500g,
    '1kg': product.price_1kg
  };

  const stocks = {
    '250g': product.stock_250g,
    '500g': product.stock_500g,
    '1kg': product.stock_1kg
  };

  const currentPrice = prices[selectedSize];
  const currentStock = stocks[selectedSize];
  const discountedPrice = currentPrice - (currentPrice * product.discount_percentage / 100);

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: 'Please login', description: 'You need to login to add items to cart' });
      return;
    }
    await addToCart(product.id, selectedSize);
  };

  const isLowStock = currentStock <= 5;
  const isOutOfStock = currentStock === 0;

  return (
    <Card className="group overflow-hidden border-2 border-transparent hover:border-saffron/30 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 bg-white/95 backdrop-blur-sm">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.discount_percentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-chili text-white animate-pulse">
            {product.discount_percentage}% OFF
          </Badge>
        )}
        
        {product.is_featured && (
          <Badge className="absolute top-2 right-2 bg-saffron text-white">
            ⭐ Featured
          </Badge>
        )}

        {isLowStock && !isOutOfStock && (
          <Badge className="absolute bottom-2 left-2 bg-red-500 text-white animate-bounce">
            🔥 Only {currentStock} left!
          </Badge>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-red-600 text-white text-lg px-4 py-2">
              OUT OF STOCK
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-warmBrown group-hover:text-saffron transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-warmBrown/70 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-warmBrown/60">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{Math.floor(Math.random() * 50) + 10} bought today</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>4.{Math.floor(Math.random() * 9) + 1}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Select value={selectedSize} onValueChange={(value: '250g' | '500g' | '1kg') => setSelectedSize(value)}>
            <SelectTrigger className="w-full border-saffron/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="250g">250g - ₹{(product.price_250g / 100).toFixed(2)}</SelectItem>
              <SelectItem value="500g">500g - ₹{(product.price_500g / 100).toFixed(2)}</SelectItem>
              <SelectItem value="1kg">1kg - ₹{(product.price_1kg / 100).toFixed(2)}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between">
            <div>
              {product.discount_percentage > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-chili">
                    ₹{(discountedPrice / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-warmBrown/60 line-through">
                    ₹{(currentPrice / 100).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-warmBrown">
                  ₹{(currentPrice / 100).toFixed(2)}
                </span>
              )}
            </div>
            
            {isLowStock && !isOutOfStock && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <Clock className="h-3 w-3" />
                <span>Hurry!</span>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full font-semibold py-2 transition-all duration-300 transform hover:scale-105 ${
            isOutOfStock 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        {isLowStock && !isOutOfStock && (
          <div className="flex items-center justify-center gap-1 text-xs text-red-500 animate-pulse">
            <Zap className="h-3 w-3" />
            <span>⚡ {Math.floor(Math.random() * 20) + 5} people viewing this</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
