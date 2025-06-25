
import Header from '@/components/Header';
import HalwaiHero from '@/components/HalwaiHero';
import EnhancedProducts from '@/components/EnhancedProducts';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation, ParallaxElement } from '@/components/ScrollAnimations';
import { useState } from 'react';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section with Parallax Background */}
      <div className="relative">
        <ParallaxElement speed={0.5} className="absolute inset-0 z-0">
          <div className="h-screen bg-gradient-to-br from-saffron/20 to-turmeric/30">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1920&h=1080&fit=crop&crop=center"
              alt="Delicious Indian Snacks Background"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        </ParallaxElement>
        <div className="relative z-10">
          <HalwaiHero />
        </div>
      </div>

      {/* Products Section with Image Backgrounds */}
      <div className="relative bg-white">
        <ParallaxElement speed={0.3} className="absolute top-0 left-0 w-full h-32">
          <div className="w-full h-full bg-gradient-to-b from-turmeric/10 to-transparent"></div>
        </ParallaxElement>
        
        <ScrollAnimation direction="up" delay={200}>
          <div className="relative z-10">
            <EnhancedProducts />
          </div>
        </ScrollAnimation>
        
        {/* Floating Food Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 opacity-20 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=80&h=80&fit=crop&crop=center"
            alt="Spicy Mix"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-40 left-10 w-16 h-16 opacity-20 animate-float" style={{animationDelay: '2s'}}>
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=64&h=64&fit=crop&crop=center"
            alt="Sweet Treats"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* About Section with Parallax */}
      <div className="relative">
        <ParallaxElement speed={0.4} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-r from-cream to-turmeric/20">
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&h=800&fit=crop&crop=center"
              alt="Traditional Indian Kitchen"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        </ParallaxElement>
        <div className="relative z-10">
          <ScrollAnimation direction="left" delay={300}>
            <About />
          </ScrollAnimation>
        </div>
      </div>

      {/* Contact Section with Food Background */}
      <div className="relative">
        <ParallaxElement speed={0.2} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-bl from-saffron/10 to-chili/10">
            <img 
              src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1920&h=600&fit=crop&crop=center"
              alt="Colorful Spices"
              className="w-full h-full object-cover opacity-15"
            />
          </div>
        </ParallaxElement>
        <div className="relative z-10">
          <ScrollAnimation direction="right" delay={400}>
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

export default Index;
