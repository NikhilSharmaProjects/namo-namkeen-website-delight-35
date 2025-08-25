import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import CartSidebar from "@/components/CartSidebar";
import { useSEO } from "@/hooks/useSEO";
import { seoConfig } from "@/config/seo";
import { ChevronDown, ChevronUp, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useSEO(seoConfig.pages.faq);

    const faqData = [
        {
            question: "Which is the best Indori Namkeen available online?",
            answer: "Our Premium Ratlami Sev is considered the best Indori namkeen available online. Made with traditional recipes and premium ingredients, it captures the authentic taste of Indore's famous street food culture. Other popular choices include our Satwik Khatta Meetha and Navratna Mixture."
        },
        {
            question: "Can I order Namkeen online for delivery across India?",
            answer: "Yes! Namo Namkeen delivers fresh, authentic Indori snacks across India. We cover 500+ locations including all major metros, tier-2 cities, and smaller towns. Delivery typically takes 2-5 business days depending on your location."
        },
        {
            question: "Does Namo Namkeen deliver to Mumbai, Delhi, Bangalore?",
            answer: "Absolutely! We deliver to all major Indian cities including Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad, and many more. Metro cities typically receive orders within 2-3 business days."
        },
        {
            question: "How fast is namkeen delivery from Namo Namkeen?",
            answer: "Delivery speed depends on your location: Metro cities (2-3 days), Tier-2 cities (3-4 days), and smaller towns (4-5 days). All orders are processed within 24 hours and dispatched with real-time tracking."
        },
        {
            question: "Is Namo Namkeen authentic Indori snacks?",
            answer: "Yes, absolutely! Namo Namkeen is based in Indore and follows traditional recipes passed down through generations. We use premium ingredients sourced locally and maintain authentic preparation methods while ensuring modern hygiene standards."
        },
        {
            question: "What makes Ratlami Sev different from normal sev?",
            answer: "Ratlami Sev uses premium gram flour, a secret blend of spices, and traditional preparation techniques. It has a distinctive golden color, perfect crunch, and balanced spice level that sets it apart from regular sev. Our Ratlami Sev maintains this authentic quality."
        },
        {
            question: "Are Namo Namkeen products FSSAI certified?",
            answer: "Yes, all our products are prepared in FSSAI certified facilities following strict quality and hygiene standards. We maintain certifications for food safety and quality assurance to ensure you receive the best products."
        },
        {
            question: "Do you use preservatives in your namkeen?",
            answer: "No, we don't use any artificial preservatives in our namkeen. Our products maintain freshness through traditional preparation methods, quality packaging, and quick delivery. This ensures you get the authentic taste and natural shelf life."
        },
        {
            question: "What sizes are available for namkeen products?",
            answer: "We offer three convenient sizes for most products: 250g (perfect for trying new flavors), 500g (ideal for families), and 1kg (great value for regular consumers or celebrations). Prices vary by size and product."
        },
        {
            question: "How do I track my namkeen order?",
            answer: "Once your order is dispatched, you'll receive a tracking number via email/SMS. You can track your order in real-time through our courier partner's website or contact our customer service team for updates."
        },
        {
            question: "What if I'm not satisfied with my order?",
            answer: "We offer a satisfaction guarantee! If you're not completely happy with the freshness or quality of your order, contact us within 48 hours of delivery. We'll provide a hassle-free return or replacement."
        },
        {
            question: "Can I order namkeen for festivals and celebrations?",
            answer: "Absolutely! Our namkeen makes perfect festival treats and celebration snacks. For bulk orders or special occasions, contact us in advance to ensure timely delivery. We also offer attractive packaging for gifting."
        },
        {
            question: "How should I store namkeen after delivery?",
            answer: "Store your namkeen in a cool, dry place away from direct sunlight. Keep the packaging sealed tightly after opening to maintain crispiness. Properly stored, our products maintain their quality for weeks."
        },
        {
            question: "Do you offer cash on delivery (COD)?",
            answer: "Payment options vary by location. We accept online payments, UPI, and cash on delivery where available. Check available payment methods during checkout for your specific location."
        },
        {
            question: "Can I get wholesale rates for bulk orders?",
            answer: "Yes, we offer competitive wholesale rates for bulk orders, retail stores, and business requirements. Contact our sales team directly for bulk pricing and terms. Minimum order quantities apply."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header onCartClick={() => setIsCartOpen(true)} />
            
            {/* FAQ Structured Data */}
            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            
            <div className="pt-24">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
                            Get answers to common questions about ordering authentic Indori namkeen, 
                            delivery across India, quality standards, and more. Still have questions? 
                            Contact our friendly customer service team.
                        </p>
                    </div>

                    <ScrollAnimation direction="up" delay={200}>
                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-4">
                                {faqData.map((faq, index) => (
                                    <div 
                                        key={index}
                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full p-6 text-left flex justify-between items-center hover:bg-saffron/5 transition-colors"
                                        >
                                            <h3 className="text-lg font-semibold text-warmBrown pr-4">
                                                {faq.question}
                                            </h3>
                                            {openFaq === index ? (
                                                <ChevronUp className="h-5 w-5 text-saffron flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-saffron flex-shrink-0" />
                                            )}
                                        </button>
                                        
                                        {openFaq === index && (
                                            <div className="px-6 pb-6">
                                                <div className="border-t border-gray-200 pt-4">
                                                    <p className="text-warmBrown/80 font-merriweather leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation direction="up" delay={400}>
                        <div className="max-w-4xl mx-auto mt-16">
                            <div className="bg-gradient-to-br from-saffron/10 to-turmeric/10 rounded-xl p-8 text-center">
                                <h2 className="text-3xl font-bold text-warmBrown mb-4">
                                    Still Have Questions?
                                </h2>
                                <p className="text-lg text-warmBrown/80 mb-8 font-merriweather">
                                    Our friendly customer service team is here to help! Contact us through 
                                    any of the following methods and we'll get back to you quickly.
                                </p>
                                
                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-saffron/20 rounded-full flex items-center justify-center">
                                            <Phone className="h-6 w-6 text-saffron" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-warmBrown">Call Us</h3>
                                            <p className="text-warmBrown/70">+91-88238-18001</p>
                                            <p className="text-sm text-warmBrown/60">Mon-Sat: 9AM-6PM</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-turmeric/20 rounded-full flex items-center justify-center">
                                            <Mail className="h-6 w-6 text-turmeric" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-warmBrown">Email Us</h3>
                                            <p className="text-warmBrown/70">info@namoindianamkeen.com</p>
                                            <p className="text-sm text-warmBrown/60">24-48 hour response</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-chili/20 rounded-full flex items-center justify-center">
                                            <MapPin className="h-6 w-6 text-chili" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-warmBrown">Visit Us</h3>
                                            <p className="text-warmBrown/70">65-A, Nagin Nagar</p>
                                            <p className="text-sm text-warmBrown/60">Indore, Madhya Pradesh</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link 
                                        to="/contact"
                                        className="bg-gradient-to-r from-saffron to-turmeric text-white px-8 py-3 rounded-lg font-semibold hover:from-saffron/90 hover:to-turmeric/90 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Contact Us
                                    </Link>
                                    <Link 
                                        to="/products"
                                        className="border-2 border-saffron text-saffron px-8 py-3 rounded-lg font-semibold hover:bg-saffron hover:text-white transition-all duration-300"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
            <Footer />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <Toaster />
        </div>
    );
};

export default FAQ;