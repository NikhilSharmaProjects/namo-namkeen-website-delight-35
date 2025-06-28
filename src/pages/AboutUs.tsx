import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Heart, Leaf, Factory, Globe } from "lucide-react";
import CartSidebar from "@/components/CartSidebar";

const AboutUs = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Heritage & Tradition",
            description:
                "Celebrating the rich flavors of Indore with time-honored recipes passed down through generations.",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Quality Excellence",
            description:
                "Using only the finest ingredients including Mirch Masale spices, premium-grade besan, and pure, high-quality oils.",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Customer Trust",
            description:
                "Building lasting relationships with families across India through consistent quality and taste.",
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "Pure & Natural",
            description:
                "Committed to natural ingredients and traditional preparation methods for authentic flavors.",
        },
        {
            icon: <Factory className="w-8 h-8" />,
            title: "Modern Facilities",
            description:
                "State-of-the-art manufacturing with dedicated team maintaining highest standards of hygiene and health.",
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Vision",
            description:
                "Aspiring to take Namo products to the global market and establish as a trusted international brand.",
        },
    ];

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <div className="pt-24">
                <section className="py-20 bg-gradient-to-br from-cream to-turmeric/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-60 h-60 bg-saffron/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-turmeric/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <ScrollAnimation direction="up">
                            <div className="text-center mb-16">
                                <Badge className="bg-chili text-white font-poppins mb-4">
                                    About Namo India Namkeen
                                </Badge>
                                <h1 className="text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6">
                                    From Namo India Namkeen
                                    <span className="block text-saffron text-3xl lg:text-4xl mt-2">
                                        स्वाद इंदौर का, विश्वास नमो का
                                    </span>
                                </h1>
                                <p className="text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
                                    "Swad Indore Ka, Vishwas Namo Ka"
                                </p>
                            </div>
                        </ScrollAnimation>

                        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                            <ScrollAnimation direction="left">
                                <div className="space-y-8">
                                    <div className="flex justify-center lg:justify-start">
                                        <img
                                            src="/images/c9d0ba86-c908-4704-8a09-2c9834c40c06.png"
                                            alt="Namo Namkeen Products"
                                            className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500 drop-shadow-lg rounded-lg"
                                        />
                                    </div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation direction="right">
                                <div className="space-y-6 font-merriweather text-warmBrown/80 leading-relaxed">
                                    <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-saffron first-letter:mr-1 first-letter:float-left text-lg">
                                        Welcome to Namo India Namkeen, where
                                        tradition meets trust, and taste meets
                                        purity. Founded with a vision to
                                        celebrate the rich and diverse flavors
                                        of Indore, we stand as a symbol of
                                        authenticity, quality, and customer
                                        trust.
                                    </p>

                                    <p className="text-lg">
                                        We believe that "Namo" is not just a
                                        name; it's a promise - a promise of
                                        unmatched quality, health-conscious
                                        ingredients, and taste that leaves a
                                        lasting impression. Our commitment to
                                        excellence starts from the very
                                        foundation - the ingredients we choose.
                                    </p>

                                    <p className="text-lg">
                                        We use only the finest and most trusted
                                        brands, including Mirch Masale spices,
                                        premium-grade besan, and pure,
                                        high-quality oils. Every product is a
                                        result of careful selection, clean
                                        preparation, and traditional recipes
                                        perfected over time.
                                    </p>
                                </div>
                            </ScrollAnimation>
                        </div>

                        <ScrollAnimation direction="up">
                            <div className="mb-16">
                                <img
                                    src="/images/f52630d8-6ae6-4849-a24b-93aa2c71cfdb.png"
                                    alt="The Authentic Special Food of Indore"
                                    className="w-full object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                />
                            </div>
                        </ScrollAnimation>

                        <div className="grid lg:grid-cols-2 gap-16 mb-16">
                            <ScrollAnimation direction="left">
                                <div className="space-y-6">
                                    <div className="bg-white/80 p-8 rounded-2xl border-2 border-saffron/20 traditional-border hover:shadow-lg transition-all duration-300">
                                        <h3 className="font-poppins font-bold text-warmBrown text-2xl mb-4 flex items-center">
                                            <Award className="w-6 h-6 text-saffron mr-2" />
                                            Our Mission
                                        </h3>
                                        <p className="font-merriweather text-warmBrown/80 text-lg leading-relaxed">
                                            At Namo India Namkeen, our mission
                                            is to deliver authentic,
                                            high-quality Indian snacks and
                                            sweets made with purity, trust, and
                                            the rich taste of tradition. We aim
                                            to bring the flavors of Indore to
                                            every home by using the finest
                                            ingredients and maintaining the
                                            highest standards of hygiene,
                                            health, and customer satisfaction.
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-saffron to-turmeric text-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                                        <h3 className="font-poppins font-bold text-2xl mb-4 flex items-center">
                                            <Globe className="w-6 h-6 mr-2" />
                                            Future Goal
                                        </h3>
                                        <p className="font-merriweather text-lg leading-relaxed">
                                            At Namo India Namkeen, our goal is
                                            to take our products to the global
                                            market and establish Namo as a
                                            trusted international brand. While
                                            expanding our reach, we also aim to
                                            create meaningful employment
                                            opportunities for the youth and
                                            women of our country.
                                        </p>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation direction="right">
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold font-poppins text-warmBrown mb-6 text-center">
                                        Our Core Values
                                    </h3>

                                    <div className="grid gap-4">
                                        {values.map((value, index) => (
                                            <Card
                                                key={value.title}
                                                className="bg-white/90 border-2 border-transparent hover:border-saffron/30 transition-all duration-300 hover:shadow-lg group hover:-translate-y-1"
                                            >
                                                <CardContent className="p-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="text-saffron group-hover:text-chili transition-colors">
                                                            {value.icon}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-poppins font-semibold text-warmBrown text-base mb-1 group-hover:text-saffron transition-colors">
                                                                {value.title}
                                                            </h4>
                                                            <p className="font-merriweather text-warmBrown/70 text-sm leading-relaxed">
                                                                {
                                                                    value.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>

                        <ScrollAnimation direction="up">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-warmBrown to-chili text-white px-8 py-6 rounded-2xl inline-block font-poppins font-semibold hover:scale-105 transition-all duration-300">
                                    <div className="text-2xl mb-2">
                                        NAMO INDIA FOOD INDUSTRIES
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-lg opacity-90">
                                        <img
                                            src="/logo.png"
                                            alt="Namo Logo"
                                            className="h-6 w-6 object-contain"
                                        />
                                        65-A, Nagin Nagar, Indore (M.P.)
                                    </div>
                                    <div className="text-sm mt-2 opacity-80">
                                        Customer Care: +91 88238 18001
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>
                </section>
            </div>
            <Footer />
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
            <Toaster />
        </div>
    );
};

export default AboutUs;
