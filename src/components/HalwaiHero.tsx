
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const HalwaiHero = () => {
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
            className="relative min-h-screen bg-gradient-to-br from-cream via-cream to-turmeric/20 pt-32 pb-16 overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
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
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
                    {/* Left Content - Text Section */}
                    <div className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 lg:order-1 order-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                                <span className="text-saffron block animate-pulse halwai-text-glow">
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
                                className="bg-saffron hover:bg-saffron/90 text-white font-poppins font-semibold px-6 sm:px-8 py-6 text-lg group transform hover:scale-105 transition-all duration-300 hover:shadow-lg halwai-button-glow"
                            >
                                Shop Now
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

                        {/* Tagline that scales on scroll */}
                        <div 
                            className="text-center lg:text-left"
                            style={{ 
                                transform: `scale(${1 + Math.min(scrollY * 0.0002, 0.1)})`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            <p className="text-xl sm:text-2xl font-poppins font-bold text-chili halwai-tagline">
                                "Crunch into Tradition"
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Halwai Character */}
                    <div className="relative lg:order-2 order-1 mb-8 lg:mb-0">
                        <div className="relative z-10 halwai-container">
                            {/* Main Halwai Character */}
                            <div className="relative group cursor-pointer">
                                {/* Desktop Character - Offering Bowl */}
                                <div className="hidden lg:block relative">
                                    <img
                                        src="/lovable-uploads/6ff54ce7-124d-4ddd-8fa0-4cbc0e15ab66.png"
                                        alt="Namo Namkeen Halwai - Welcome to Traditional Taste"
                                        className="w-full max-w-md mx-auto drop-shadow-2xl halwai-character transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            filter: 'drop-shadow(0 10px 30px rgba(255, 153, 51, 0.3))'
                                        }}
                                    />
                                    
                                    {/* Interactive hand animation */}
                                    <div className="absolute top-1/3 left-1/4 w-20 h-20 halwai-hand-area group-hover:animate-pulse">
                                        <div className="w-full h-full rounded-full bg-saffron/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                                    </div>
                                </div>

                                {/* Mobile Character - Holding Plate */}
                                <div className="lg:hidden block">
                                    <img
                                        src="/lovable-uploads/3576e860-103f-43f4-9fe0-4de77a5c59dc.png"
                                        alt="Namo Namkeen Halwai - Traditional Namkeen"
                                        className="w-full max-w-xs mx-auto drop-shadow-2xl halwai-character transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            filter: 'drop-shadow(0 10px 30px rgba(255, 153, 51, 0.3))'
                                        }}
                                    />
                                </div>

                                {/* Welcome bubble */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-4 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-saffron/30 animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm font-poppins font-medium text-warmBrown whitespace-nowrap">
                                        स्वागत है! 🙏
                                    </p>
                                </div>
                            </div>

                            {/* Floating spice elements around character */}
                            <div className="absolute top-10 -right-4 w-8 h-8 bg-gradient-to-br from-turmeric to-saffron rounded-full shadow-lg animate-float opacity-80" style={{ animationDelay: "0.5s" }}></div>
                            <div className="absolute bottom-20 -left-4 w-6 h-6 bg-gradient-to-br from-chili to-warmBrown rounded-full shadow-lg animate-float opacity-80" style={{ animationDelay: "1.5s" }}></div>
                            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-br from-saffron to-turmeric rounded-full shadow-lg animate-float opacity-60" style={{ animationDelay: "2.5s" }}></div>

                            {/* Brand integration elements */}
                            <div className="absolute inset-0 halwai-brand-integration rounded-3xl opacity-20"></div>
                        </div>

                        {/* Background decorative pattern */}
                        <div className="absolute inset-0 decorative-pattern opacity-10 rounded-3xl"></div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for Halwai-specific styling */}
            <style jsx>{`
                .halwai-text-glow {
                    text-shadow: 0 0 20px rgba(255, 153, 51, 0.5);
                }
                
                .halwai-button-glow:hover {
                    box-shadow: 0 0 30px rgba(255, 153, 51, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                
                .halwai-tagline {
                    text-shadow: 2px 2px 4px rgba(231, 111, 81, 0.3);
                    background: linear-gradient(45deg, #E76F51, #FF9933);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .halwai-character {
                    transition: transform 0.5s ease, filter 0.3s ease;
                }
                
                .halwai-container:hover .halwai-character {
                    transform: translateY(-5px) scale(1.02);
                }
                
                .halwai-hand-area {
                    transition: all 0.3s ease;
                }
                
                .halwai-brand-integration {
                    background: radial-gradient(circle at center, rgba(255, 153, 51, 0.1) 0%, transparent 70%);
                }
                
                @keyframes gentle-wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-2deg); }
                    75% { transform: rotate(2deg); }
                }
                
                .halwai-container:hover .halwai-hand-area {
                    animation: gentle-wave 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default HalwaiHero;
