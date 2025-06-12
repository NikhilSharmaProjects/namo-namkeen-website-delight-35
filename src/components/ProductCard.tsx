
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Zap, Clock, Users, Star, Heart, Share2 } from 'lucide-react';
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
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      toast({ 
        title: 'Please login', 
        description: 'You need to login to add items to cart',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await addToCart(product.id, selectedSize);
      toast({
        title: 'Added to cart!',
        description: `${product.name} (${selectedSize}) added to your cart`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied!', description: 'Product link copied to clipboard' });
    }
  };

  const isLowStock = currentStock <= 5;
  const isOutOfStock = currentStock === 0;
  const rating = 4 + Math.random() * 0.9; // Simulated rating between 4.0-4.9
  const reviewCount = Math.floor(Math.random() * 100) + 10;
  const buyersToday = Math.floor(Math.random() * 50) + 10;

  return (
    <Card className="group overflow-hidden border-2 border-transparent hover:border-saffron/40 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm relative">
      {/* Image container with loading state */}
      <div className="relative overflow-hidden">
        {/* Image skeleton */}
        {!imageLoaded && (
          <div className="w-full h-40 md:h-48 bg-gradient-to-r from-cream/50 via-saffron/20 to-cream/50 animate-pulse" />
        )}
        
        <img
          src={product.image_url}
          alt={product.name}
          className={`w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-warmBrown hover:bg-red-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-warmBrown hover:bg-saffron/10 transition-all duration-300 transform hover:scale-110"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount_percentage > 0 && (
            <Badge className="bg-chili text-white animate-pulse text-xs px-2 py-1">
              {product.discount_percentage}% OFF
            </Badge>
          )}
          
          {product.is_featured && (
            <Badge className="bg-saffron text-white text-xs px-2 py-1">
              ⭐ Featured
            </Badge>
          )}

          {isLowStock && !isOutOfStock && (
            <Badge className="bg-red-500 text-white animate-bounce text-xs px-2 py-1">
              🔥 Only {currentStock} left!
            </Badge>
          )}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <Badge className="bg-red-600 text-white text-sm md:text-lg px-3 md:px-4 py-2">
              OUT OF STOCK
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-3 md:p-4 space-y-3">
        {/* Product info */}
        <div>
          <h3 className="font-bold text-base md:text-lg text-warmBrown group-hover:text-saffron transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-warmBrown/70 line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs text-warmBrown/60">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{buyersToday} bought today</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)} ({reviewCount})</span>
          </div>
        </div>

        {/* Size selector */}
        <div className="space-y-2">
          <Select value={selectedSize} onValueChange={(value: '250g' | '500g' | '1kg') => setSelectedSize(value)}>
            <SelectTrigger className="w-full border-saffron/30 hover:border-saffron transition-colors text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-saffron/30">
              <SelectItem value="250g" className="hover:bg-saffron/10">
                250g - ₹{(product.price_250g / 100).toFixed(2)}
                {product.stock_250g <= 5 && product.stock_250g > 0 && (
                  <span className="text-red-500 ml-2 text-xs">Low stock!</span>
                )}
              </SelectItem>
              <SelectItem value="500g" className="hover:bg-saffron/10">
                500g - ₹{(product.price_500g / 100).toFixed(2)}
                {product.stock_500g <= 5 && product.stock_500g > 0 && (
                  <span className="text-red-500 ml-2 text-xs">Low stock!</span>
                )}
              </SelectItem>
              <SelectItem value="1kg" className="hover:bg-saffron/10">
                1kg - ₹{(product.price_1kg / 100).toFixed(2)}
                {product.stock_1kg <= 5 && product.stock_1kg > 0 && (
                  <span className="text-red-500 ml-2 text-xs">Low stock!</span>
                )}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Price display */}
          <div className="flex items-center justify-between">
            <div>
              {product.discount_percentage > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-bold text-chili">
                    ₹{(discountedPrice / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-warmBrown/60 line-through">
                    ₹{(currentPrice / 100).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg md:text-xl font-bold text-warmBrown">
                  ₹{(currentPrice / 100).toFixed(2)}
                </span>
              )}
              <div className="text-xs text-warmBrown/50">
                ₹{((discountedPrice / 100) / (selectedSize === '250g' ? 0.25 : selectedSize === '500g' ? 0.5 : 1)).toFixed(2)}/kg
              </div>
            </div>
            
            {isLowStock && !isOutOfStock && (
              <div className="flex items-center gap-1 text-red-500 text-xs animate-pulse">
                <Clock className="h-3 w-3" />
                <span>Hurry!</span>
              </div>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isLoading}
          className={`w-full font-semibold py-2 md:py-3 text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
            isOutOfStock 
              ? 'bg-gray-400 cursor-not-allowed' 
              : isLoading
              ? 'bg-saffron/70 cursor-wait'
              : 'bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        {/* Social proof */}
        {isLowStock && !isOutOfStock && (
          <div className="flex items-center justify-center gap-1 text-xs text-red-500 animate-pulse bg-red-50 rounded-md py-1">
            <Zap className="h-3 w-3" />
            <span>⚡ {Math.floor(Math.random() * 20) + 5} people viewing this</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
