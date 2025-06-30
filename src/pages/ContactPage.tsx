
import { useState } from 'react';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';
import CartSidebar from '@/components/CartSidebar';
import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/config/seo';

const ContactPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Enhanced SEO for contact page
  useSEO(seoConfig.pages.contact);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-4">
              Contact Namo Namkeen
            </h1>
            <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
              Ready to experience authentic Indore flavors? Get in touch with us for fresh namkeen delivery, 
              bulk orders, or any questions about our products. We're here to serve you the best of Indore's culinary heritage.
            </p>
          </div>
        </div>
        
        <ScrollAnimation direction="up" delay={200}>
          <Contact />
        </ScrollAnimation>
      </div>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default ContactPage;
