
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star, Crown } from "lucide-react";

const Products = () => {
    const [activeCategory, setActiveCategory] = useState("Best Sellers");

    const bestSellers = [
        "NAMO Premium Ratlami Sev",
        "NAMO Satwik Khatta Mitha Mixture", 
        "NAMO Premium Laung Sev",
        "NAMO Satwik Tikha Mixture",
        "NAMO Premium Navratn Mixture",
        "NAMO Satwik Ratlami Sev"
    ];

    const productCategories = [
        {
            title: "Best Sellers",
            description: "Our most loved products across all categories",
            products: bestSellers,
            bgColor: "bg-gradient-to-br from-gold/20 to-yellow-100",
            badgeColor: "bg-yellow-600",
            icon: <Crown className="w-4 h-4" />
        },
        {
            title: "Premium Products",
            description: "Premium quality namkeen for special occasions - Available in 250gm & 500gm",
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
                "NAMO Premium Chana Dal"
            ],
            bgColor: "bg-gradient-to-br from-turmeric/10 to-chili/20",
            badgeColor: "bg-turmeric",
        },
        {
            title: "Shudh Satwik",
            description: "Pure vegetarian products made with 100% groundnut oil - Available in 250gm & 450gm",
            tagline: "Satwik made in 100% ground nut's oil",
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
                "NAMO Satwik Chana Dal"
            ],
            bgColor: "bg-gradient-to-br from-green-50 to-green-100",
            badgeColor: "bg-green-600",
        },
        {
            title: "Falahari Products",
            description: "Special fasting products for religious occasions",
            products: ["NAMO Potato Chips", "NAMO Banana Chips", "NAMO Falahari Tikha Mixture"],
            bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
            badgeColor: "bg-yellow-600",
        },
        {
            title: "Other Specialties",
            description: "Traditional snacks and regional delicacies",
            products: [
                "NAMO Kachori",
                "NAMO Samosa",
                "NAMO Bhakarwadi",
                "NAMO Chakli",
                "Shakar Pare",
                "Namkeen Pare",
                "Charkhe Pare",
                "Ras Bhri",
                "Plain Mathri",
                "Masala Mathri",
                "Mini Bhakarwadi",
            ],
            bgColor: "bg-gradient-to-br from-chili/10 to-saffron/20",
            badgeColor: "bg-chili",
        },
    ];

    return (
        <section id="products" className="py-12 md:py-20 bg-white relative">
            {/* Background patterns */}
            <div className="absolute inset-0 decorative-pattern opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <Badge className="bg-saffron text-white font-poppins mb-4">
                        Our Products
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6">
                        Authentic Flavors of Indore
                    </h2>
                    <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
                        From traditional namkeen to premium sweets, discover our
                        wide range of products crafted with the finest
                        ingredients and time-honored recipes.
                    </p>

                    <div className="flex justify-center mt-8">
                        <img
                            src="/logo.png"
                            alt="Namo Namkeen Logo"
                            className="h-16 md:h-20 object-contain animate-pulse"
                        />
                    </div>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10">
                    {productCategories.map((category) => (
                        <button
                            key={category.title}
                            onClick={() => setActiveCategory(category.title)}
                            className={`px-3 py-2 md:px-4 md:py-2 rounded-full font-poppins font-medium transition-all duration-300 text-sm md:text-base ${
                                activeCategory === category.title
                                    ? `${category.badgeColor} text-white shadow-lg scale-105`
                                    : "bg-cream text-warmBrown/70 hover:bg-cream/80"
                            }`}
                        >
                            {category.icon && <span className="mr-2">{category.icon}</span>}
                            {category.title}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {productCategories.map((category, index) => (
                        <Card
                            key={category.title}
                            className={`${category.bgColor} border-2 ${
                                activeCategory === category.title
                                    ? "border-saffron scale-105 shadow-xl z-10"
                                    : "border-transparent hover:border-saffron/30"
                            } transition-all duration-500 hover:shadow-xl group`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <CardContent className="p-4 md:p-6">
                                <div className="mb-4">
                                    <Badge
                                        className={`${category.badgeColor} text-white font-poppins mb-3 text-xs md:text-sm`}
                                    >
                                        {category.icon && <span className="mr-1">{category.icon}</span>}
                                        {category.title}
                                    </Badge>
                                    <h3 className="text-lg md:text-xl font-bold font-poppins text-warmBrown mb-2 group-hover:text-saffron transition-colors flex items-center">
                                        {category.title}
                                        {activeCategory === category.title && (
                                            <ChevronRight
                                                className="ml-1 text-saffron"
                                                size={18}
                                            />
                                        )}
                                    </h3>
                                    <p className="text-warmBrown/70 text-xs md:text-sm font-merriweather">
                                        {category.description}
                                    </p>
                                    {category.tagline && (
                                        <p className="text-green-700 font-bold text-xs md:text-sm font-poppins mt-2 bg-green-100 px-2 py-1 rounded-full inline-block">
                                            ✨ {category.tagline}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {category.products.map(
                                        (product, productIndex) => (
                                            <div
                                                key={product}
                                                className={`flex items-center gap-2 text-xs md:text-sm font-merriweather transition-all duration-300 ${
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
                                                            ? "bg-chili"
                                                            : "bg-saffron"
                                                    }`}
                                                ></div>
                                                <span>{product}</span>
                                                {category.title === "Best Sellers" && (
                                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="mt-4 md:mt-6 pt-4 border-t border-warmBrown/10 flex items-center justify-between">
                                    <p className="text-xs text-warmBrown/60 font-merriweather">
                                        Available in multiple sizes
                                    </p>

                                    {activeCategory === category.title && (
                                        <img
                                            src="/logo.png"
                                            alt="Namo Mini Logo"
                                            className="h-5 w-5 md:h-6 md:w-6 object-contain"
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8 md:mt-12">
                    <div className="inline-block bg-gradient-to-r from-saffron to-turmeric text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-poppins font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-sm md:text-base">
                        Namo is not just a name, it's a promise of good quality
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
