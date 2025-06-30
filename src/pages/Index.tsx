
import Header from '@/components/Header';
import SEOHero from '@/components/SEOHero';
import EcommerceProducts from '@/components/EcommerceProducts';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';
import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/config/seo';
import { useState } from 'react';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Enhanced SEO for homepage
  useSEO(seoConfig.pages.home);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <SEOHero />
      <ScrollAnimation direction="up" delay={200}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-warmBrown text-center mb-8">
              Why Choose Namo Namkeen?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-warmBrown">Premium Quality Since 1990</h3>
                <p className="text-warmBrown/70">Finest ingredients sourced directly from Indore's traditional suppliers. No preservatives, no artificial colors - just pure, authentic taste that has been perfecting for over three decades.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-turmeric/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold text-warmBrown">Fresh Delivery Across India</h3>
                <p className="text-warmBrown/70">Direct from our hygienic kitchens in Indore to your doorstep anywhere in India. We ensure maximum freshness with secure packaging and fast delivery within 3-5 business days.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-chili/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold text-warmBrown">Trusted by 5000+ Families</h3>
                <p className="text-warmBrown/70">From Indore to Mumbai, Delhi to Bangalore - families across India trust Namo Namkeen for festivals, celebrations, and everyday snacking. Join our growing family of satisfied customers.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation direction="up" delay={300}>
        <section className="py-12 bg-gradient-to-br from-cream/50 to-saffron/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-warmBrown text-center mb-8">
              Our Bestsellers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Premium Ratlami Sev", desc: "Crispy, spicy, and authentic - our signature sev that captures the true essence of Ratlam's famous street food culture." },
                { name: "Satwik Khatta Meetha", desc: "Perfect balance of tangy and sweet flavors, made with 100% groundnut oil following traditional Satwik principles." },
                { name: "Navratna Mixture", desc: "A royal blend of nine different ingredients creating a symphony of textures and flavors in every bite." },
                { name: "Tikhi Bundi", desc: "Spice lovers' paradise - these perfectly round, crunchy bundis pack a fiery punch that will awaken your taste buds." }
              ].map((product, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-saffron to-turmeric rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-warmBrown mb-2">{product.name}</h3>
                  <p className="text-warmBrown/70 text-sm">{product.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>
      
      <ScrollAnimation direction="up" delay={300}>
        <EcommerceProducts />
      </ScrollAnimation>
      <SocialShare />
      <ScrollAnimation direction="left" delay={400}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation direction="right" delay={500}>
        <Contact />
      </ScrollAnimation>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Index;
