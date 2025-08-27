import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Star, TrendingUp } from "lucide-react";
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

const EcommerceProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [showFilters, setShowFilters] = useState(false);
    const [searchParams] = useSearchParams();

    const categories = [
        "All",
        "Premium Products",
        "Satwik Products",
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    // Apply deep links from query params
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        const sectionParam = searchParams.get("section");
        if (categoryParam) {
            try {
                const decoded = decodeURIComponent(categoryParam);
                setSelectedCategory(decoded);
            } catch {
                setSelectedCategory(categoryParam);
            }
        }
        if (sectionParam === "featured") {
            // smooth scroll to featured section if present
            const el = document.getElementById("featured-products");
            if (el) {
                setTimeout(
                    () =>
                        el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        }),
                    0
                );
            }
        }
    }, [searchParams]);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching products:", error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price_250g - b.price_250g;
                case "price-high":
                    return b.price_250g - a.price_250g;
                case "discount":
                    return b.discount_percentage - a.discount_percentage;
                case "name":
                    return a.name.localeCompare(b.name);
                case "featured":
                default:
                    return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
            }
        });

    const featuredProducts = products.filter((p) => p.is_featured);
    const discountedProducts = products.filter(
        (p) => p.discount_percentage > 0
    );

    if (loading) {
        return (
            <section className="py-12 md:py-20 bg-gradient-to-br from-cream/30 via-white to-saffron/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <Skeleton className="h-6 w-48 mx-auto mb-4" />
                        <Skeleton className="h-8 w-80 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>

                    {/* Mobile-first skeleton grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-40 md:h-48 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-20 bg-gradient-to-br from-cream/30 via-white to-saffron/10 relative z-10">
            <div className="container mx-auto px-4">
                {/* Header - Clean and Professional */}
                <div className="text-center mb-8 md:mb-12">
                    <Badge className="bg-saffron text-white font-poppins mb-4 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2">
                        ✨ Premium Quality Namkeen
                    </Badge>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-4 md:mb-6 px-4">
                        Authentic Flavors from Indore
                    </h2>
                    <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather px-4">
                        Discover our handcrafted namkeen collection made with
                        traditional recipes and the finest ingredients
                    </p>
                </div>

                {/* Featured Products Section */}
                {featuredProducts.length > 0 && (
                    <div id="featured-products" className="mb-8 md:mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Star className="h-6 w-6 text-saffron" />
                            <h3 className="text-xl md:text-2xl font-bold text-warmBrown">
                                Featured Products
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                            {featuredProducts.slice(0, 4).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Special Offers Section */}
                {discountedProducts.length > 0 && (
                    <div className="mb-8 md:mb-12">
                        <div className="bg-gradient-to-r from-saffron/10 to-turmeric/10 p-4 md:p-6 rounded-lg mb-6">
                            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-chili" />
                                <h3 className="text-xl md:text-2xl font-bold text-warmBrown">
                                    Special Offers
                                </h3>
                            </div>
                            <p className="text-center text-sm md:text-lg text-warmBrown/70">
                                Save on selected premium products
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                            {discountedProducts.slice(0, 4).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Enhanced Search and Filters - Mobile-first */}
                <div className="mb-6 md:mb-8 relative z-20">
                    {/* Mobile filter toggle */}
                    <div className="md:hidden mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full flex items-center justify-between bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-saffron/20 text-warmBrown font-medium"
                        >
                            <span className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filters & Search
                            </span>
                            <span
                                className={`transform transition-transform ${
                                    showFilters ? "rotate-180" : ""
                                }`}
                            >
                                ↓
                            </span>
                        </button>
                    </div>

                    {/* Filters container - responsive */}
                    <div
                        className={`${
                            showFilters ? "block" : "hidden"
                        } md:block space-y-4 md:space-y-0 md:flex md:gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-saffron/20 relative z-30`}
                    >
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-warmBrown/50" />
                            <Input
                                placeholder="Search for your favorite namkeen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-saffron/30 focus:border-saffron transition-colors"
                            />
                        </div>

                        {/* Category filter */}
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-full md:w-48 border-saffron/30 transition-colors">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-saffron/30 z-50">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category}
                                        value={category}
                                        className="hover:bg-saffron/10"
                                    >
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full md:w-48 border-saffron/30 transition-colors">
                                <TrendingUp className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-saffron/30 z-50">
                                <SelectItem
                                    value="featured"
                                    className="hover:bg-saffron/10"
                                >
                                    Featured First
                                </SelectItem>
                                <SelectItem
                                    value="price-low"
                                    className="hover:bg-saffron/10"
                                >
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem
                                    value="price-high"
                                    className="hover:bg-saffron/10"
                                >
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem
                                    value="discount"
                                    className="hover:bg-saffron/10"
                                >
                                    Best Offers
                                </SelectItem>
                                <SelectItem
                                    value="name"
                                    className="hover:bg-saffron/10"
                                >
                                    Name A-Z
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active filters display */}
                    {(searchTerm || selectedCategory !== "All") && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {searchTerm && (
                                <Badge
                                    variant="outline"
                                    className="bg-saffron/10 border-saffron/30 cursor-pointer hover:bg-saffron/20 transition-colors"
                                    onClick={() => setSearchTerm("")}
                                >
                                    Search: "{searchTerm}" ✕
                                </Badge>
                            )}
                            {selectedCategory !== "All" && (
                                <Badge
                                    variant="outline"
                                    className="bg-saffron/10 border-saffron/30 cursor-pointer hover:bg-saffron/20 transition-colors"
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    Category: {selectedCategory} ✕
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Results summary */}
                <div className="flex items-center justify-between mb-6 text-sm text-warmBrown/70">
                    <span>
                        Showing {filteredProducts.length} of {products.length}{" "}
                        products
                    </span>
                </div>

                {/* Products Grid - Mobile-first responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 relative z-10">
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="transform transition-all duration-300 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-warmBrown mb-2">
                            No products found
                        </h3>
                        <p className="text-warmBrown/70 mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setSortBy("featured");
                            }}
                            className="text-saffron hover:text-saffron/80 font-medium transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Category quick access */}
                {filteredProducts.length > 0 && selectedCategory === "All" && (
                    <div
                        id="shop-by-category"
                        className="mt-12 pt-8 border-t border-saffron/20"
                    >
                        <h3 className="text-lg md:text-xl font-bold text-warmBrown mb-4 text-center">
                            Shop by Category
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {categories.slice(1).map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className="px-3 md:px-4 py-2 bg-white/80 border border-saffron/30 rounded-full text-sm md:text-base text-warmBrown hover:bg-saffron/10 hover:border-saffron transition-all duration-300 transform hover:scale-105"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EcommerceProducts;
