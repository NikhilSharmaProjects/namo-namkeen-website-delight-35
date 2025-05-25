
import Header from '@/components/Header';
import EnhancedHero from '@/components/EnhancedHero';
import EcommerceProducts from '@/components/EcommerceProducts';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';
import { useState } from 'react';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <EnhancedHero />
      <ScrollAnimation direction="up" delay={200}>
        <EcommerceProducts />
      </ScrollAnimation>
      <ScrollAnimation direction="left" delay={300}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation direction="right" delay={400}>
        <Contact />
      </ScrollAnimation>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Index;
