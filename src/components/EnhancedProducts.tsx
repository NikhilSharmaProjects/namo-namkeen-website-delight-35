import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Star } from "lucide-react";

const EnhancedProducts = () => {
    const [activeCategory, setActiveCategory] = useState("Super Products");
    const [visibleCards, setVisibleCards] = useState(new Set<string>());
    const observerRef = useRef<IntersectionObserver | null>(null);

    const productCategories = [
        {
            title: "Super Products",
            description:
                "Our signature namkeen collection with authentic flavors - Available in 250g, 500g & 1kg",
            image: "/images/459acff4-e21f-412a-8b09-f514738497c2.png",
            products: [
                "NAMO Ratlami Sev",
                "NAMO Laung Sev",
                "NAMO Ujjaini Sev",
                "NAMO Bank Fiki Sev",
                "NAMO Khatta Mitha Mixture",
                "NAMO Tikha Mixture",
                "NAMO Navratn Mixture",
                "NAMO Makka Mixture",
                "NAMO Tikhi Bundi",
                "NAMO Fiki Bundi",
                "NAMO Testy Dane",
                "NAMO Chana Dal",
            ],
            bgColor: "bg-gradient-to-br from-saffron/10 to-turmeric/20",
            badgeColor: "bg-saffron",
        },
        {
            title: "Premium Products",
            description:
                "Premium quality namkeen for special occasions - Available in 250gm & 500gm",
            image: "/images/d98803fc-96ce-4d3c-b6cb-bcb5a29b037a.png",
            products: [
                "NAMO Premium Ratlami Sev",
                "NAMO Premium Laung Sev",
                "NAMO Premium Ujjaini Sev",
                "NAMO Premium Bank Fiki Sev",
                "NAMO Premium Khatta Mitha",
                "NAMO Premium Tikha Mixture",
                "NAMO Premium Navratn",
                "NAMO Premium Makka Mixture",
                "NAMO Premium Tikhi Bundi",
                "NAMO Premium Fiki Bundi",
                "NAMO Premium Testy Dane",
                "NAMO Premium Chana Dal",
            ],
            bgColor: "bg-gradient-to-br from-turmeric/10 to-chili/20",
            badgeColor: "bg-turmeric",
        },
        {
            title: "Shudh Satwik",
            description:
                "Pure vegetarian products made with Sunflower Oil (शुद्ध सूर्यफूली तेल से निर्मित) - Available in 250gm & 450gm",
            image: "/images/725ea45c-9a80-4fc6-ab2e-910e37dfa760.png",
            products: [
                "NAMO Satwik Ratlami Sev",
                "NAMO Satwik Laung Sev",
                "NAMO Satwik Ujjaini Sev",
                "NAMO Satwik Bank Fiki Sev",
                "NAMO Satwik Khatta Mitha Mixture",
                "NAMO Satwik Tikha Mixture",
                "NAMO Satwik Navratn Mixture",
                "NAMO Satwik Makka Mixture",
                "NAMO Satwik Tikhi Bundi",
                "NAMO Satwik Fiki Bundi",
                "NAMO Satwik Testy Dane",
                "NAMO Satwik Chana Dal",
            ],
            bgColor: "bg-gradient-to-br from-green-50 to-green-100",
            badgeColor: "bg-green-600",
        },
        {
            title: "Falahari Products",
            description: "Special fasting products for religious occasions",
            image: "/images/e5b09dae-b7ba-479c-b73e-d76f591f9dac.png",
            products: [
                "NAMO Potato Chips",
                "NAMO Banana Chips",
                "NAMO Falahari Tikha Mixture",
            ],
            bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
            badgeColor: "bg-yellow-600",
        },
        {
            title: "Other Specialties",
            description: "Traditional snacks and regional delicacies",
            image: "/images/e5b09dae-b7ba-479c-b73e-d76f591f9dac.png",
            products: [
                "NAMO Kachori",
                "NAMO Samosa",
                "NAMO Bhakarwadi",
                "NAMO Chakli",
                "Shakar pare",
                "Namkeen pare",
                "Charkhe pare",
                "Ras bhri",
                "Plain Mathri",
                "Masala mathri",
                "Mini bhakarwadi",
                "Sandwich bhakarwadi",
                "Methi biscuit",
                "Saloni",
                "Chaat papdi",
            ],
            bgColor: "bg-gradient-to-br from-chili/10 to-saffron/20",
            badgeColor: "bg-chili",
        },
        {
            title: "Upcoming Sweets",
            description: "Best sweets coming soon from Namo Namkeen",
            image: "/images/b8d5df4b-21c6-453d-afd1-90db0154a696.png",
            products: ["Besan Ladoo", "Soan Papdi", "Rasgulla", "Gulab Jamun"],
            bgColor: "bg-gradient-to-br from-pink-50 to-red-100",
            badgeColor: "bg-pink-600",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetElement = entry.target as HTMLElement;
                        const index = targetElement.getAttribute("data-index");
                        if (index) {
                            setVisibleCards(
                                (prev) => new Set([...prev, index])
                            );
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        observerRef.current = observer;
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const cards = document.querySelectorAll("[data-index]");
        if (observerRef.current) {
            cards.forEach((card) => observerRef.current?.observe(card));
        }
    }, [productCategories]);

    return (
        <section
            id="products"
            className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden"
        >
            {/* Animated background patterns */}
            <div className="absolute inset-0 decorative-pattern opacity-5"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-saffron/5 rounded-full -translate-x-32 -translate-y-32 animate-float"></div>
            <div
                className="absolute bottom-0 right-0 w-80 h-80 bg-turmeric/5 rounded-full translate-x-40 translate-y-40 animate-float"
                style={{ animationDelay: "2s" }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 lg:mb-16 animate-fade-in">
                    <Badge className="bg-saffron text-white font-poppins mb-4 text-sm px-4 py-2 hover:scale-105 transition-transform duration-300">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        Our Products
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6 hover:text-saffron transition-colors duration-500">
                        Authentic Flavors of Indore
                    </h2>
                    <p className="text-lg sm:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather leading-relaxed">
                        From traditional namkeen to premium sweets, discover our
                        wide range of products crafted with the finest
                        ingredients and time-honored recipes.
                    </p>

                    <div className="flex justify-center mt-8">
                        <div className="relative">
                            <img
                                src="/logo.png"
                                alt="Namo Namkeen Logo"
                                className="h-16 sm:h-20 object-contain animate-pulse hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute -top-2 -right-2">
                                <Sparkles className="w-6 h-6 text-saffron animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 lg:mb-10 px-4">
                    {productCategories.map((category, index) => (
                        <button
                            key={category.title}
                            onClick={() => setActiveCategory(category.title)}
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full font-poppins font-medium transition-all duration-300 text-sm sm:text-base transform hover:scale-105 ${
                                activeCategory === category.title
                                    ? `${category.badgeColor} text-white shadow-lg scale-105 hover:shadow-xl`
                                    : "bg-cream text-warmBrown/70 hover:bg-cream/80 hover:text-warmBrown shadow-md"
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {category.title}
                            {activeCategory === category.title && (
                                <Sparkles className="inline w-4 h-4 ml-1 animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {productCategories.map((category, index) => (
                        <Card
                            key={category.title}
                            data-index={index}
                            className={`${category.bgColor} border-2 ${
                                activeCategory === category.title
                                    ? "border-saffron scale-105 shadow-2xl z-10"
                                    : "border-transparent hover:border-saffron/30"
                            } transition-all duration-500 hover:shadow-xl group cursor-pointer hover:-translate-y-2 ${
                                visibleCards.has(index.toString())
                                    ? "animate-fade-in"
                                    : "opacity-1"
                            }`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                            onClick={() => setActiveCategory(category.title)}
                        >
                            <CardContent className="p-0 overflow-hidden">
                                {/* Product Image Header */}
                                <div className="relative h-32 sm:h-40 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={`${category.title} showcase`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <Badge
                                        className={`${category.badgeColor} text-white font-poppins absolute top-3 left-3 text-xs hover:scale-105 transition-transform`}
                                    >
                                        {category.title}
                                    </Badge>
                                    {activeCategory === category.title && (
                                        <div className="absolute top-3 right-3">
                                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <ChevronRight className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold font-poppins text-warmBrown mb-2 group-hover:text-saffron transition-colors flex items-center">
                                            {category.title}
                                            {activeCategory ===
                                                category.title && (
                                                <Star className="ml-2 w-4 h-4 text-saffron fill-current animate-pulse" />
                                            )}
                                        </h3>
                                        <p className="text-warmBrown/70 text-xs sm:text-sm font-merriweather leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2 max-h-32 overflow-hidden">
                                        {category.products
                                            .slice(0, 6)
                                            .map((product, productIndex) => (
                                                <div
                                                    key={product}
                                                    className={`flex items-center gap-2 text-xs sm:text-sm font-merriweather transition-all duration-300 hover:bg-white/30 rounded px-2 py-1 ${
                                                        activeCategory ===
                                                        category.title
                                                            ? "text-warmBrown hover:translate-x-1"
                                                            : "text-warmBrown/80 hover:text-warmBrown"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${
                                                            activeCategory ===
                                                            category.title
                                                                ? "bg-chili animate-pulse"
                                                                : "bg-saffron"
                                                        }`}
                                                    ></div>
                                                    <span className="hover:font-medium transition-all duration-200">
                                                        {product}
                                                    </span>
                                                </div>
                                            ))}
                                        {category.products.length > 6 && (
                                            <div className="text-xs text-warmBrown/60 font-medium italic px-2">
                                                +{category.products.length - 6}{" "}
                                                more varieties...
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 sm:mt-6 pt-4 border-t border-warmBrown/10 flex items-center justify-between">
                                        <p className="text-xs text-warmBrown/60 font-merriweather">
                                            Quality Assured Products
                                        </p>

                                        {activeCategory === category.title && (
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src="/logo.png"
                                                    alt="Namo Mini Logo"
                                                    className="h-5 w-5 object-contain animate-pulse"
                                                />
                                                <Sparkles className="w-3 h-3 text-saffron animate-pulse" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <div className="inline-block bg-gradient-to-r from-saffron to-turmeric text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-poppins font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-current group-hover:animate-pulse" />
                            <span className="text-sm sm:text-base">
                                "Namo Is Not Name It's a Promise Of Good
                                Quality"
                            </span>
                            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedProducts;
