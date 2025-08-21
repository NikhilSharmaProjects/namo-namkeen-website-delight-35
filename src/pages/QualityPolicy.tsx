import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { useSEO } from "@/hooks/useSEO";
import { seoConfig } from "@/config/seo";

const QualityPolicy = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    useSEO(
        seoConfig.pages.quality || {
            title: "Quality Policy — Namo Namkeen",
            description:
                "Our commitment to quality, hygiene, and authenticity in every batch of namkeen.",
            keywords:
                "quality policy, food quality, hygiene standards, FSSAI, Namo Namkeen quality",
        }
    );

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <div className="pt-24">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-3">
                            Quality Policy
                        </h1>
                        <p className="text-warmBrown/80 font-merriweather">
                            Our promise of authentic taste, premium ingredients,
                            and hygienic preparation.
                        </p>
                    </div>

                    <ScrollAnimation direction="up" delay={150}>
                        <div className="space-y-6 text-warmBrown/90 font-merriweather leading-relaxed">
                            <p>
                                At Namo India Food Industries, quality is our
                                foremost priority. We follow stringent sourcing
                                standards, hygienic preparation methods, and
                                multi-stage quality checks to ensure every pack
                                reflects the authentic taste of Indore.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    FSSAI-compliant facilities and processes
                                </li>
                                <li>
                                    Premium-grade ingredients from trusted
                                    suppliers
                                </li>
                                <li>No artificial preservatives or colors</li>
                                <li>
                                    Small-batch production for consistent
                                    freshness
                                </li>
                                <li>Secure, freshness-preserving packaging</li>
                            </ul>
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

export default QualityPolicy;
