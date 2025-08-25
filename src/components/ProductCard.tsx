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
        <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative">
            {/* Featured Badge */}
            {product.is_featured && (
                <Badge className="absolute top-3 left-3 z-10 bg-saffron text-white">
                    Bestseller
                </Badge>
            )}

            {/* Discount Badge */}
            {product.discount_percentage > 0 && (
                <Badge className="absolute top-3 right-3 z-10 bg-red-500 text-white">
                    {product.discount_percentage}% OFF
                </Badge>
            )}

            {/* Product Image */}
            <div className="relative h-80 bg-gray-50 overflow-hidden">
                {!imageLoaded && (
                    <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <img
                    src={product.image_url}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 ${
                        imageLoaded ? "opacity-100" : "opacity-1"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                {/* Category */}
                <p className="text-xs text-saffron font-medium uppercase tracking-wide">
                    {product.category}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-warmBrown text-lg line-clamp-2 group-hover:text-saffron transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-warmBrown/70 line-clamp-2">
                    {product.description}
                </p>

                {/* Rating (simulated) */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${
                                i < 4
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                    <span className="text-xs text-warmBrown/60 ml-1">
                        (4.2)
                    </span>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-warmBrown">Size:</p>
                    <Select
                        value={selectedSize}
                        onValueChange={(value: "250g" | "500g" | "1kg") =>
                            setSelectedSize(value)
                        }
                    >
                        <SelectTrigger className="w-full border-saffron/30">
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
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {product.discount_percentage > 0 ? (
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-chili">
                                    {formatPrice(discountedPrice)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(currentPrice)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-chili">
                                {formatPrice(currentPrice)}
                            </span>
                        )}
                        <p className="text-xs text-warmBrown/60">
                            {isOutOfStock
                                ? "Out of Stock"
                                : `${currentStock} units available`}
                        </p>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isLoading}
                    className={`w-full transition-all duration-300 ${
                        isOutOfStock
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white transform hover:scale-105"
                    }`}
                >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isLoading
                        ? "Adding..."
                        : isOutOfStock
                        ? "Out of Stock"
                        : "Add to Cart"}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
