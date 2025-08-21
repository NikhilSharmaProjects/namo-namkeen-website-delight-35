import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { useSEO } from "@/hooks/useSEO";
import { seoConfig } from "@/config/seo";

const ShippingPolicy = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    useSEO(seoConfig.pages.shipping);

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <div className="pt-24">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-3">
                            Shipping Policy
                        </h1>
                        <p className="text-warmBrown/80 font-merriweather">
                            Information about order dispatch, delivery
                            timelines, and related terms.
                        </p>
                    </div>

                    <ScrollAnimation direction="up" delay={150}>
                        <div className="space-y-6 text-warmBrown/90 font-merriweather leading-relaxed">
                            <p>
                                Orders are Delivered through registered domestic
                                courier companies and/or Speed Post only. Orders
                                are typically Delivered within 3–6 days from the
                                date of order and/or payment, or as per the
                                delivery date agreed at the time of order
                                confirmation, subject to courier/postal norms.
                            </p>
                            <p>
                                The Platform Owner shall not be liable for any
                                delay in delivery by the courier company/postal
                                authority. Delivery of all orders will be made
                                to the address provided by the buyer at the time
                                of purchase. Delivery confirmation of our
                                services will be sent to your email ID as
                                specified at the time of registration.
                            </p>
                            <p>
                                If any shipping cost(s) are levied by the seller
                                or the Platform Owner, the same are not
                                refundable.
                            </p>
                            <h2 className="text-2xl font-semibold text-warmBrown pt-4">
                                Refunds, Returns, and Exchanges
                            </h2>
                            <p>
                                We do not offer any kind of refund, return, or
                                exchange. All sales are final.
                            </p>
                        </div>
                    </ScrollAnimation>
                </div>
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

export default ShippingPolicy;
