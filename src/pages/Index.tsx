
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
import { useState } from 'react';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <SEOHero />
      <ScrollAnimation direction="up" delay={200}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-warmBrown text-center mb-8">
              Why Namo Namkeen?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-warmBrown">Premium Quality</h3>
                <p className="text-warmBrown/70">Finest ingredients, no preservatives, traditional recipes from 1990.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-turmeric/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold text-warmBrown">Fresh Delivery</h3>
                <p className="text-warmBrown/70">Direct from Indore kitchens to your doorstep across India.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-chili/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold text-warmBrown">Family Trust</h3>
                <p className="text-warmBrown/70">Trusted by 5000+ families for authentic Indore flavors.</p>
              </div>
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
