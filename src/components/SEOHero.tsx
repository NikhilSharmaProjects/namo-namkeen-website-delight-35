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
        <section className="relative min-h-screen bg-gradient-to-br from-cream via-white to-saffron/10 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 decorative-pattern opacity-30"></div>

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-6rem)]">
                    {/* Left Content - SEO Rich Text */}
                    <div className="flex-1 text-center lg:text-left lg:pr-12 mb-8 lg:mb-0 order-2 lg:order-1">
                        <div className="space-y-6">
                            {/* SEO Optimized H1 */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-warmBrown leading-tight">
                                <span className="block">
                                    Authentic Indori Namkeen
                                </span>
                                <span className="block text-saffron">
                                    Fresh From Indore To Your Doorstep
                                </span>
                            </h1>

                            {/* Rich SEO Content */}
                            <div className="space-y-4 text-lg md:text-xl text-warmBrown/80 font-merriweather max-w-2xl mx-auto lg:mx-0">
                                <p>
                                    Since 2021, <strong>Namo Namkeen</strong>{" "}
                                    has been crafting authentic Indore namkeen
                                    using traditional recipes passed down
                                    through generations. Our premium quality
                                    snacks are made with the finest ingredients,
                                    absolutely no preservatives, and delivered
                                    fresh to your doorstep across India.
                                </p>

                                <p>
                                    From our signature{" "}
                                    <strong>Ratlami Sev</strong> to
                                    mouth-watering{" "}
                                    <strong>Khatta Meetha</strong>, each product
                                    embodies the rich culinary heritage of
                                    Indore. We maintain the highest hygiene
                                    standards and use only pure groundnut oil in
                                    our Satwik range, ensuring every bite
                                    delivers authentic taste and superior
                                    quality.
                                </p>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 my-6">
                                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                                    <Shield className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-semibold text-warmBrown">
                                        FSSAI Certified
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                                    <Award className="w-5 h-5 text-gold" />
                                    <span className="text-sm font-semibold text-warmBrown">
                                        30+ Years Trust
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-semibold text-warmBrown">
                                        Pan India Delivery
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/products">
                                    <Button className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-bold py-4 px-8 text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
                                        <ShoppingCart className="mr-3 h-5 w-5" />
                                        Order Fresh Namkeen
                                    </Button>
                                </Link>

                                <Link to="/about">
                                    <Button
                                        variant="outline"
                                        className="border-2 border-warmBrown text-warmBrown hover:bg-warmBrown hover:text-white font-bold py-4 px-8 text-lg rounded-full transition-all duration-300"
                                    >
                                        Our Heritage Story
                                    </Button>
                                </Link>
                            </div>

                            {/* Customer Stats */}
                            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold font-poppins text-warmBrown flex items-center">
                                        <Star className="w-6 h-6 text-yellow-500 fill-current mr-1" />
                                        4.8
                                    </div>
                                    <div className="text-sm text-warmBrown/70">
                                        Customer Rating
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
                                        5000+
                                    </div>
                                    <div className="text-sm text-warmBrown/70">
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
            <div className="bg-white/80 backdrop-blur-sm py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins text-warmBrown mb-6">
                            What Our Customers Say
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-saffron/10 to-turmeric/10 p-6 rounded-2xl border border-saffron/20">
                                <div className="flex items-center justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-yellow-500 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-warmBrown/80 font-merriweather italic mb-4">
                                    "Best Ratlami Sev I've ever tasted! Reminds
                                    me of my childhood visits to Indore. The
                                    quality and freshness are unmatched."
                                </p>
                                <p className="font-bold text-warmBrown">
                                    - Priya Sharma, Mumbai
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-chili/10 to-saffron/10 p-6 rounded-2xl border border-chili/20">
                                <div className="flex items-center justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-yellow-500 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-warmBrown/80 font-merriweather italic mb-4">
                                    "Authentic taste, perfect packaging, quick
                                    delivery. Namo Namkeen has become our
                                    family's go-to for all festivals and
                                    celebrations!"
                                </p>
                                <p className="font-bold text-warmBrown">
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
