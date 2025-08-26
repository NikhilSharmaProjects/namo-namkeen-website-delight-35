import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Award, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const SEOHero = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-primary/5 overflow-hidden">
            {/* Indore Pride Banner */}
            <div className="indore-banner absolute top-0 left-0 right-0 py-3 z-20">
                <div className="container mx-auto px-4">
                    <p className="indore-pride-text text-center text-sm font-bold tracking-wide">
                        🏛️ Straight from Indore's heart to your plate - India's Cleanest City & Food Capital 🍽️
                    </p>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 luxury-pattern opacity-20"></div>

            <div className="container mx-auto px-4 pt-32 pb-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-8rem)]">
                    {/* Left Content - SEO Rich Text */}
                    <div className="flex-1 text-center lg:text-left lg:pr-12 mb-8 lg:mb-0 order-2 lg:order-1">
                        <div className="space-y-8">
                            {/* SEO Optimized H1 */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
                                <span className="block text-foreground">
                                    Authentic Indori Namkeen
                                </span>
                                <span className="block premium-text mt-2">
                                    Fresh From Indore To Your Doorstep
                                </span>
                            </h1>

                            {/* Rich SEO Content */}
                            <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-merriweather max-w-2xl mx-auto lg:mx-0">
                                <p className="leading-relaxed">
                                    Since 2021, <strong className="premium-text">Namo Namkeen</strong>{" "}
                                    has been crafting authentic Indore namkeen
                                    using traditional recipes passed down
                                    through generations. Our premium quality
                                    snacks are made with the finest ingredients,
                                    absolutely no preservatives, and delivered
                                    fresh to your doorstep across India.
                                </p>

                                <p className="leading-relaxed">
                                    From our signature{" "}
                                     <strong className="premium-text">Ratlami Sev</strong> to
                                     mouth-watering{" "}
                                     <strong className="premium-text">Khatta Meetha</strong>, each product
                                     embodies the rich culinary heritage of
                                     Indore. We maintain the highest hygiene
                                     standards and use only pure groundnut oil in
                                     our Satwik range, ensuring every bite
                                     delivers authentic taste and superior
                                     quality.
                                 </p>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 my-8">
                                <div className="authenticity-badge flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    <span className="text-sm font-semibold">
                                        FSSAI Certified
                                    </span>
                                </div>
                                <div className="authenticity-badge flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    <span className="text-sm font-semibold">
                                        30+ Years Trust
                                    </span>
                                </div>
                                <div className="authenticity-badge flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    <span className="text-sm font-semibold">
                                        Pan India Delivery
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/products">
                                    <Button variant="premium" size="lg" className="py-4 px-8 text-lg rounded-full shadow-lg font-bold">
                                        <ShoppingCart className="mr-3 h-5 w-5" />
                                        Order Fresh Namkeen Now
                                    </Button>
                                </Link>

                                <Link to="/about">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold py-4 px-8 text-lg rounded-full transition-all duration-300"
                                    >
                                        Our Heritage Story
                                    </Button>
                                </Link>
                            </div>

                            {/* Customer Stats */}
                            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold font-poppins premium-text flex items-center">
                                        <Star className="w-6 h-6 text-amber-500 fill-current mr-1" />
                                        4.8
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Customer Rating
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold font-poppins premium-text">
                                        50+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Product Varieties
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold font-poppins premium-text">
                                        5000+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Happy Families
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Showcase */}
                    <div className="flex-1 relative order-1 lg:order-2 mb-8 lg:mb-0">
                        <div className="relative max-w-md mx-auto lg:max-w-lg">
                            <img
                                src="/images/6ff54ce7-124d-4ddd-8fa0-4cbc0e15ab66.png"
                                alt="Namo Namkeen Traditional Halwai - Authentic Indore Snacks"
                                className="w-full h-auto relative z-20 drop-shadow-2xl"
                            />

                            {/* Floating Product Elements */}
                            <div className="absolute -top-4 -right-4 text-4xl animate-float">
                                🌶️
                            </div>
                            <div
                                className="absolute top-1/2 -left-8 text-3xl animate-float"
                                style={{ animationDelay: "1s" }}
                            >
                                ✨
                            </div>
                            <div
                                className="absolute bottom-1/4 -right-8 text-3xl animate-float"
                                style={{ animationDelay: "2s" }}
                            >
                                🥜
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Testimonial Section */}
            <div className="bg-card/80 backdrop-blur-sm py-12 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins premium-text mb-8">
                            What Our Customers Say
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="luxury-card p-8 rounded-2xl">
                                <div className="flex items-center justify-center mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-6 h-6 text-amber-500 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground font-merriweather italic mb-6 text-lg leading-relaxed">
                                    "Best Ratlami Sev I've ever tasted! Reminds
                                    me of my childhood visits to Indore. The
                                    quality and freshness are unmatched."
                                </p>
                                <p className="font-bold premium-text text-lg">
                                    - Priya Sharma, Mumbai
                                </p>
                            </div>

                            <div className="luxury-card p-8 rounded-2xl">
                                <div className="flex items-center justify-center mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-6 h-6 text-amber-500 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground font-merriweather italic mb-6 text-lg leading-relaxed">
                                    "Authentic taste, perfect packaging, quick
                                    delivery. Namo Namkeen has become our
                                    family's go-to for all festivals and
                                    celebrations!"
                                </p>
                                <p className="font-bold premium-text text-lg">
                                    - Rajesh Patel, Delhi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SEOHero;
