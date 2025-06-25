
import { useState } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation, ParallaxElement } from '@/components/ScrollAnimations';
import CartSidebar from '@/components/CartSidebar';

const AboutUs = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section with Traditional Kitchen Background */}
      <div className="relative pt-20 pb-12">
        <ParallaxElement speed={0.5} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-br from-warmBrown/40 to-turmeric/30">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=600&fit=crop&crop=center"
              alt="Traditional Indian Kitchen"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </ParallaxElement>
        
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          <ScrollAnimation direction="up" delay={100}>
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6 drop-shadow-2xl">
              Our Heritage Story
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-merriweather max-w-3xl mx-auto drop-shadow-lg">
              Three decades of tradition, trust, and the authentic taste of Indore
            </p>
          </ScrollAnimation>
        </div>
        
        {/* Traditional Elements */}
        <div className="absolute top-32 left-12 w-28 h-28 opacity-40 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=112&h=112&fit=crop&crop=center"
            alt="Traditional Cooking"
            className="w-full h-full object-cover rounded-full border-4 border-white/50"
          />
        </div>
        <div className="absolute bottom-16 right-16 w-24 h-24 opacity-40 animate-float" style={{animationDelay: '2s'}}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=96&h=96&fit=crop&crop=center"
            alt="Traditional Ingredients"
            className="w-full h-full object-cover rounded-full border-4 border-white/50"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="relative">
        <ParallaxElement speed={0.3} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-r from-cream/80 to-turmeric/20">
            <img 
              src="https://images.unsplash.com/photo-1615334815223-73d0c2cf4d37?w=1920&h=800&fit=crop&crop=center"
              alt="Indian Spice Heritage"
              className="w-full h-full object-cover opacity-15"
            />
          </div>
        </ParallaxElement>
        
        <div className="relative z-10">
          <ScrollAnimation direction="up" delay={200}>
            <About />
          </ScrollAnimation>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-40 right-8 w-12 h-12 opacity-20 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=48&h=48&fit=crop&crop=center"
            alt="Turmeric"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute bottom-20 left-8 w-14 h-14 opacity-20 animate-float" style={{animationDelay: '1.5s'}}>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=56&h=56&fit=crop&crop=center"
            alt="Red Chili"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default AboutUs;
