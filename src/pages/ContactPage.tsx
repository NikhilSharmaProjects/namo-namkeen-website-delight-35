
import { useState } from 'react';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation, ParallaxElement } from '@/components/ScrollAnimations';
import CartSidebar from '@/components/CartSidebar';

const ContactPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section with Spice Background */}
      <div className="relative pt-20 pb-12">
        <ParallaxElement speed={0.5} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-br from-chili/30 to-saffron/40">
            <img 
              src="https://images.unsplash.com/photo-1506906032039-2eed3c1d8d37?w=1920&h=600&fit=crop&crop=center"
              alt="Colorful Indian Spices"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </ParallaxElement>
        
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          <ScrollAnimation direction="up" delay={100}>
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6 drop-shadow-2xl">
              Connect With Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-merriweather max-w-3xl mx-auto drop-shadow-lg">
              From our kitchen to your heart - let's talk about authentic flavors
            </p>
          </ScrollAnimation>
        </div>
        
        {/* Floating Spice Elements */}
        <div className="absolute top-28 right-20 w-20 h-20 opacity-40 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop&crop=center"
            alt="Traditional Spices"
            className="w-full h-full object-cover rounded-full border-3 border-white/60"
          />
        </div>
        <div className="absolute bottom-24 left-16 w-16 h-16 opacity-40 animate-float" style={{animationDelay: '1s'}}>
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=64&h=64&fit=crop&crop=center"
            alt="Turmeric Powder"
            className="w-full h-full object-cover rounded-full border-3 border-white/60"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative">
        <ParallaxElement speed={0.3} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-r from-cream/50 to-turmeric/10">
            <img 
              src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1920&h=800&fit=crop&crop=center"
              alt="Spice Market"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
        </ParallaxElement>
        
        <div className="relative z-10">
          <ScrollAnimation direction="up" delay={200}>
            <Contact />
          </ScrollAnimation>
        </div>
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default ContactPage;
