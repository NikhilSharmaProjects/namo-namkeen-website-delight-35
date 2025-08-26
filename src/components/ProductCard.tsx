import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Skeleton } from "@/components/ui/skeleton";
import ProductSchema from "@/components/ProductSchema";
import OptimizedImage from "@/components/OptimizedImage";

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
    const [selectedSize, setSelectedSize] = useState<"250g" | "500g" | "1kg">(
        "250g"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart } = useCart();

    const prices = {
        "250g": product.price_250g,
        "500g": product.price_500g,
        "1kg": product.price_1kg,
    };

    const stocks = {
        "250g": product.stock_250g,
        "500g": product.stock_500g,
        "1kg": product.stock_1kg,
    };

    const formatPrice = (price: number) => `₹${(price / 100).toFixed(2)}`;
    const currentPrice = prices[selectedSize];
    const currentStock = stocks[selectedSize];
    const isOutOfStock = currentStock === 0;

    const handleAddToCart = async () => {
        if (isOutOfStock) return;

        setIsLoading(true);
        await addToCart(product.id, selectedSize);
        setIsLoading(false);
    };

    const discountedPrice =
        product.discount_percentage > 0
            ? currentPrice * (1 - product.discount_percentage / 100)
            : currentPrice;

    return (
        <>
            <ProductSchema product={product} />
            <div className="luxury-card group overflow-hidden hover:animate-luxury-hover relative bg-white rounded-xl border shadow-lg">
                {/* Featured Badge */}
            {product.is_featured && (
                <div className="authenticity-badge absolute top-4 left-4 z-10">
                    Bestseller
                </div>
            )}

            {/* Discount Badge */}
            {product.discount_percentage > 0 && (
                <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold">
                    {product.discount_percentage}% OFF
                </Badge>
            )}

            {/* Product Image */}
            <div className="relative h-80 bg-gradient-to-br from-cream to-white overflow-hidden">
                <OptimizedImage
                    src={product.image_url}
                    alt={`${product.name} by Namo Namkeen - Authentic Indori Snacks Online | Buy ${product.name} | Premium Quality Namkeen Delivery`}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                    width={320}
                    height={320}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-4">
                {/* Category */}
                <p className="premium-text text-xs font-bold uppercase tracking-wider">
                    {product.category}
                </p>

                {/* Product Name */}
                <h3 className="font-bold text-foreground text-xl line-clamp-2 group-hover:premium-text transition-all duration-300">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${
                                i < 4
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2 font-medium">
                        4.8 ⭐ (124 reviews)
                    </span>
                </div>

                {/* Size Selector */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Select Size:</p>
                    <Select
                        value={selectedSize}
                        onValueChange={(value: "250g" | "500g" | "1kg") =>
                            setSelectedSize(value)
                        }
                    >
                        <SelectTrigger className="w-full border-primary/30 hover:border-primary/50 transition-colors">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="250g">
                                250g - {formatPrice(product.price_250g)}
                            </SelectItem>
                            <SelectItem value="500g">
                                500g - {formatPrice(product.price_500g)}
                            </SelectItem>
                            <SelectItem value="1kg">
                                1kg - {formatPrice(product.price_1kg)}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between bg-gradient-to-r from-cream/50 to-transparent p-3 rounded-lg">
                    <div className="space-y-1">
                        {product.discount_percentage > 0 ? (
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold premium-text">
                                    {formatPrice(discountedPrice)}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(currentPrice)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-2xl font-bold premium-text">
                                {formatPrice(currentPrice)}
                            </span>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {isOutOfStock
                                ? "❌ Out of Stock"
                                : `✅ ${currentStock} units available`}
                        </p>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isLoading}
                    variant={isOutOfStock ? "outline" : "premium"}
                    size="lg"
                    className={`w-full text-base font-semibold transition-all duration-300 ${
                        isOutOfStock
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isLoading
                        ? "Adding to Cart..."
                        : isOutOfStock
                        ? "Currently Unavailable"
                        : "Add to Cart"}
                </Button>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                    <span className="flex items-center gap-1">
                        🚚 Free Delivery
                    </span>
                    <span className="flex items-center gap-1">
                        🔒 Secure Payment
                    </span>
                    <span className="flex items-center gap-1">
                        ⭐ FSSAI Certified
                    </span>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductCard;
