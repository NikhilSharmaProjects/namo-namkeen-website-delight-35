
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const EnhancedHero = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        setIsVisible(true);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="home"
            className="min-h-screen bg-gradient-to-br from-cream via-cream to-turmeric/20 pt-32 pb-16 relative overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div 
                    className="absolute top-20 left-10 w-32 h-32 bg-saffron/10 rounded-full animate-float"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                ></div>
                <div 
                    className="absolute bottom-20 right-10 w-40 h-40 bg-turmeric/10 rounded-full animate-float"
                    style={{ transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }}
                ></div>
                <div 
                    className="absolute top-1/2 left-1/4 w-20 h-20 bg-chili/10 rounded-full animate-float"
                    style={{ transform: `translateY(${scrollY * 0.3}px)`, animationDelay: '2s' }}
                ></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-saffron justify-center lg:justify-start">
                                <Star className="fill-current animate-pulse" size={20} />
                                <span className="font-poppins font-medium text-sm sm:text-base">
                                    Premium Quality Since 1990
                                </span>
                                <Star className="fill-current animate-pulse" size={20} />
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-poppins text-warmBrown leading-tight text-center lg:text-left">
                                स्वाद
                                <span className="text-saffron block animate-pulse">
                                    इंदौर का
                                </span>
                                <span className="text-chili text-2xl sm:text-3xl lg:text-4xl block mt-2 hover:scale-105 transition-transform duration-300">
                                    विश्वास नमो का
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-warmBrown/80 max-w-lg font-merriweather leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                                Experience the authentic taste of Indore with
                                our traditional namkeen, crafted with love and
                                the finest ingredients. From our family to
                                yours.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="bg-saffron hover:bg-saffron/90 text-white font-poppins font-semibold px-6 sm:px-8 py-6 text-lg group transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                            >
                                Explore Products
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                <Sparkles className="ml-1 w-4 h-4 animate-pulse" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-chili text-chili hover:bg-chili hover:text-white font-poppins font-semibold px-6 sm:px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                            >
                                Our Story
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
                            {[
                                { number: "30+", label: "Years of Trust" },
                                { number: "50+", label: "Product Varieties" },
                                { number: "1000+", label: "Happy Families" }
                            ].map((stat, index) => (
                                <div 
                                    key={stat.label}
                                    className="text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="text-2xl sm:text-3xl font-bold font-poppins text-warmBrown hover:text-saffron transition-colors">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs sm:text-sm text-warmBrown/70">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Enhanced Product Showcase */}
                    <div className="relative mt-8 lg:mt-0">
                        <div className="relative z-10">
                            {/* Main product showcase with food image */}
                            <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-saffron/20 to-turmeric/30 rounded-3xl border-4 border-saffron/30 flex items-center justify-center traditional-border animate-float overflow-hidden group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 group-hover:from-black/10 group-hover:to-black/30 transition-all duration-500"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=center"
                                    alt="Delicious Namkeen Collection"
                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="relative z-10 text-center text-white p-6">
                                    <img
                                        src="/logo.png"
                                        alt="Namo Namkeen Logo"
                                        className="w-32 h-32 sm:w-40 sm:h-40 object-contain mx-auto mb-4 drop-shadow-2xl hover:scale-105 transition-transform duration-500 filter brightness-110"
                                    />
                                    <h3 className="text-xl sm:text-2xl font-bold font-poppins drop-shadow-lg">
                                        Premium Namkeen
                                    </h3>
                                    <p className="text-sm sm:text-base drop-shadow-md">
                                        Traditional Taste, Modern Quality
                                    </p>
                                </div>
                            </div>

                            {/* Floating product cards with food images */}
                            <div
                                className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-xl border-2 border-turmeric/30 overflow-hidden animate-float group cursor-pointer"
                                style={{ animationDelay: "1s" }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop&crop=center"
                                    alt="Spicy Sev"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs sm:text-sm drop-shadow-lg">
                                        सेव
                                    </span>
                                </div>
                            </div>

                            <div
                                className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl shadow-xl border-2 border-chili/30 overflow-hidden animate-float group cursor-pointer"
                                style={{ animationDelay: "2s" }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=120&h=120&fit=crop&crop=center"
                                    alt="Sweet Treats"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm sm:text-base drop-shadow-lg">
                                        मिठाई
                                    </span>
                                </div>
                            </div>

                            {/* Additional floating elements for mobile */}
                            <div
                                className="absolute top-1/2 -right-2 w-16 h-16 bg-gradient-to-br from-saffron to-turmeric rounded-full shadow-lg animate-float flex items-center justify-center"
                                style={{ animationDelay: "3s" }}
                            >
                                <Sparkles className="text-white w-6 h-6 animate-pulse" />
                            </div>
                        </div>

                        {/* Background decorative elements */}
                        <div className="absolute inset-0 decorative-pattern opacity-20 rounded-3xl"></div>
                        
                        {/* Floating spice elements */}
                        <div className="absolute top-10 right-10 w-6 h-6 bg-chili rounded-full animate-float opacity-60" style={{ animationDelay: "0.5s" }}></div>
                        <div className="absolute bottom-20 left-10 w-4 h-4 bg-turmeric rounded-full animate-float opacity-60" style={{ animationDelay: "1.5s" }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedHero;
