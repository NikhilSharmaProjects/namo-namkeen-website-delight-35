
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
      
      {/* Hero Section with Enhanced Parallax Background */}
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
        
        {/* Multiple Hero Background Food Elements */}
        <div className="absolute top-20 left-8 w-24 h-24 opacity-25 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=96&h=96&fit=crop&crop=center"
            alt="Spice Mixture"
            className="w-full h-full object-cover rounded-full border-3 border-white/40 shadow-lg"
          />
        </div>
        <div className="absolute top-40 right-12 w-32 h-32 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=128&h=128&fit=crop&crop=center"
            alt="Traditional Namkeen"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute top-60 left-16 w-20 h-20 opacity-35 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=80&h=80&fit=crop&crop=center"
            alt="Crunchy Snacks"
            className="w-full h-full object-cover rounded-full border-3 border-white/40 shadow-lg"
          />
        </div>
        <div className="absolute bottom-32 right-20 w-28 h-28 opacity-40 animate-float" style={{ animationDelay: '0.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=112&h=112&fit=crop&crop=center"
            alt="Mixed Varieties"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute bottom-48 left-24 w-18 h-18 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=72&h=72&fit=crop&crop=center"
            alt="Spicy Mix"
            className="w-full h-full object-cover rounded-full border-2 border-white/40 shadow-lg"
          />
        </div>
        <div className="absolute top-80 left-1/3 w-16 h-16 opacity-25 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=64&h=64&fit=crop&crop=center"
            alt="Premium Ingredients"
            className="w-full h-full object-cover rounded-full border-2 border-white/50 shadow-lg"
          />
        </div>
        <div className="absolute bottom-60 right-1/3 w-22 h-22 opacity-35 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=88&h=88&fit=crop&crop=center"
            alt="Traditional Cooking"
            className="w-full h-full object-cover rounded-full border-3 border-white/50 shadow-xl"
          />
        </div>
        
        <div className="relative z-10">
          <HalwaiHero />
        </div>
      </div>

      {/* Products Section with Enhanced Image Backgrounds */}
      <div className="relative bg-white">
        <ParallaxElement speed={0.3} className="absolute top-0 left-0 w-full h-32">
          <div className="w-full h-full bg-gradient-to-b from-turmeric/10 to-transparent"></div>
        </ParallaxElement>
        
        {/* Background Food Pattern */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1920&h=800&fit=crop&crop=center"
            alt="Spice Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        
        <ScrollAnimation direction="up" delay={200}>
          <div className="relative z-10">
            <EnhancedProducts />
          </div>
        </ScrollAnimation>
        
        {/* Enhanced Floating Food Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 opacity-20 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=80&h=80&fit=crop&crop=center"
            alt="Spicy Mix"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute bottom-40 left-10 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=64&h=64&fit=crop&crop=center"
            alt="Sweet Treats"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-60 left-20 w-24 h-24 opacity-25 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=96&h=96&fit=crop&crop=center"
            alt="Traditional Spices"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/30 shadow-lg"
          />
        </div>
        <div className="absolute bottom-80 right-16 w-28 h-28 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=112&h=112&fit=crop&crop=center"
            alt="Crunchy Delights"
            className="w-full h-full object-cover rounded-full border-3 border-turmeric/40 shadow-xl"
          />
        </div>
        <div className="absolute top-80 right-1/4 w-18 h-18 opacity-25 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=72&h=72&fit=crop&crop=center"
            alt="Flavorful Mix"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 opacity-30 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=80&h=80&fit=crop&crop=center"
            alt="Premium Namkeen"
            className="w-full h-full object-cover rounded-full border-2 border-chili/30 shadow-lg"
          />
        </div>
      </div>

      {/* About Section with Enhanced Parallax */}
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
        
        {/* Enhanced Floating Elements for About */}
        <div className="absolute top-16 left-12 w-16 h-16 opacity-30 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=64&h=64&fit=crop&crop=center"
            alt="Turmeric Powder"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/40 shadow-lg"
          />
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 opacity-35 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=96&h=96&fit=crop&crop=center"
            alt="Traditional Kitchen"
            className="w-full h-full object-cover rounded-full border-3 border-warmBrown/30 shadow-xl"
          />
        </div>
        <div className="absolute bottom-32 left-16 w-20 h-20 opacity-40 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=80&h=80&fit=crop&crop=center"
            alt="Fresh Ingredients"
            className="w-full h-full object-cover rounded-full border-2 border-green-400/40 shadow-lg"
          />
        </div>
        <div className="absolute bottom-60 right-12 w-18 h-18 opacity-25 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=72&h=72&fit=crop&crop=center"
            alt="Red Chili"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        
        <div className="relative z-10">
          <ScrollAnimation direction="left" delay={300}>
            <About />
          </ScrollAnimation>
        </div>
      </div>

      {/* Contact Section with Enhanced Food Background */}
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
        
        {/* Multiple Contact Section Food Elements */}
        <div className="absolute top-20 left-8 w-22 h-22 opacity-30 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1615334815223-73d0c2cf4d37?w=88&h=88&fit=crop&crop=center"
            alt="Spice Heritage"
            className="w-full h-full object-cover rounded-full border-3 border-saffron/40 shadow-lg"
          />
        </div>
        <div className="absolute top-60 right-12 w-28 h-28 opacity-35 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=112&h=112&fit=crop&crop=center"
            alt="Delicious Snacks"
            className="w-full h-full object-cover rounded-full border-4 border-turmeric/50 shadow-xl"
          />
        </div>
        <div className="absolute bottom-40 left-20 w-20 h-20 opacity-40 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop&crop=center"
            alt="Traditional Food"
            className="w-full h-full object-cover rounded-full border-2 border-chili/40 shadow-lg"
          />
        </div>
        <div className="absolute bottom-80 right-24 w-16 h-16 opacity-25 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=64&h=64&fit=crop&crop=center"
            alt="Mixed Snacks"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-80 left-1/4 w-24 h-24 opacity-30 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=96&h=96&fit=crop&crop=center"
            alt="Sweet and Savory"
            className="w-full h-full object-cover rounded-full border-3 border-warmBrown/40 shadow-xl"
          />
        </div>
        
        <div className="relative z-10">
          <ScrollAnimation direction="right" delay={400}>
            <Contact />
          </ScrollAnimation>
        </div>
      </div>

      {/* Fixed Floating Elements Throughout Page */}
      <div className="fixed top-1/4 left-4 w-12 h-12 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '4s' }}>
        <img 
          src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=48&h=48&fit=crop&crop=center"
          alt="Floating Spice"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-1/2 right-6 w-14 h-14 opacity-20 animate-float z-5 pointer-events-none" style={{ animationDelay: '3.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=56&h=56&fit=crop&crop=center"
          alt="Floating Namkeen"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed bottom-1/4 left-8 w-16 h-16 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=64&h=64&fit=crop&crop=center"
          alt="Floating Treat"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-3/4 right-12 w-10 h-10 opacity-20 animate-float z-5 pointer-events-none" style={{ animationDelay: '4.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=40&h=40&fit=crop&crop=center"
          alt="Floating Ingredient"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Index;
