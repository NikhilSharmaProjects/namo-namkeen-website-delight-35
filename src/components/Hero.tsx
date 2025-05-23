import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen bg-gradient-to-br from-cream via-cream to-turmeric/20 pt-32 pb-16"
        >
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-saffron">
                                <Star className="fill-current" size={20} />
                                <span className="font-poppins font-medium">
                                    Premium Quality Since 1990
                                </span>
                                <Star className="fill-current" size={20} />
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold font-poppins text-warmBrown leading-tight">
                                स्वाद
                                <span className="text-saffron block">
                                    इंदौर का
                                </span>
                                <span className="text-chili text-3xl lg:text-4xl block mt-2">
                                    विश्वास नमो का
                                </span>
                            </h1>

                            <p className="text-xl text-warmBrown/80 max-w-lg font-merriweather leading-relaxed">
                                Experience the authentic taste of Indore with
                                our traditional namkeen, crafted with love and
                                the finest ingredients. From our family to
                                yours.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-saffron hover:bg-saffron/90 text-white font-poppins font-semibold px-8 py-6 text-lg group"
                            >
                                Explore Products
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-chili text-chili hover:bg-chili hover:text-white font-poppins font-semibold px-8 py-6 text-lg"
                            >
                                Our Story
                            </Button>
                        </div>

                        <div className="flex items-center gap-8 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold font-poppins text-warmBrown">
                                    30+
                                </div>
                                <div className="text-sm text-warmBrown/70">
                                    Years of Trust
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold font-poppins text-warmBrown">
                                    50+
                                </div>
                                <div className="text-sm text-warmBrown/70">
                                    Product Varieties
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold font-poppins text-warmBrown">
                                    1000+
                                </div>
                                <div className="text-sm text-warmBrown/70">
                                    Happy Families
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Showcase */}
                    <div className="relative">
                        <div className="relative z-10">
                            {/* Main product image with logo */}
                            <div className="w-full h-96 bg-gradient-to-br from-saffron/20 to-turmeric/30 rounded-3xl border-4 border-saffron/30 flex items-center justify-center traditional-border animate-float">
                                <div className="text-center">
                                    <img
                                        src="/logo.png"
                                        alt="Namo Namkeen Logo"
                                        className="w-40 h-40 object-contain mx-auto mb-4 drop-shadow-lg hover:scale-105 transition-transform duration-500"
                                    />
                                    <h3 className="text-2xl font-bold font-poppins text-warmBrown">
                                        Premium Namkeen
                                    </h3>
                                    <p className="text-warmBrown/70">
                                        Traditional Taste, Modern Quality
                                    </p>
                                </div>
                            </div>

                            {/* Floating product cards */}
                            <div
                                className="absolute -top-8 -left-8 w-24 h-24 bg-white rounded-2xl shadow-lg border-2 border-turmeric/30 flex items-center justify-center animate-float"
                                style={{ animationDelay: "1s" }}
                            >
                                <span className="text-saffron font-bold">
                                    सेव
                                </span>
                            </div>

                            <div
                                className="absolute -bottom-8 -right-8 w-28 h-28 bg-white rounded-2xl shadow-lg border-2 border-chili/30 flex items-center justify-center animate-float"
                                style={{ animationDelay: "2s" }}
                            >
                                <span className="text-chili font-bold">
                                    मिठाई
                                </span>
                            </div>
                        </div>

                        {/* Background decorative elements */}
                        <div className="absolute inset-0 decorative-pattern opacity-20 rounded-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
