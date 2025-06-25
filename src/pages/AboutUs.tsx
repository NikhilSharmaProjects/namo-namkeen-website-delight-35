
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
        
        {/* Multiple Floating Food Elements */}
        <div className="absolute top-24 left-8 w-20 h-20 opacity-50 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop&crop=center"
            alt="Traditional Cooking"
            className="w-full h-full object-cover rounded-full border-3 border-white/60 shadow-lg"
          />
        </div>
        <div 
          className="absolute top-32 right-12 w-28 h-28 opacity-50 animate-float" 
          style={{ animationDelay: '1s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=112&h=112&fit=crop&crop=center"
            alt="Traditional Ingredients"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-lg"
          />
        </div>
        <div 
          className="absolute bottom-28 left-16 w-24 h-24 opacity-45 animate-float" 
          style={{ animationDelay: '2s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=96&h=96&fit=crop&crop=center"
            alt="Indian Snacks"
            className="w-full h-full object-cover rounded-full border-3 border-white/60 shadow-lg"
          />
        </div>
        <div 
          className="absolute bottom-16 right-20 w-32 h-32 opacity-40 animate-float" 
          style={{ animationDelay: '0.5s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=128&h=128&fit=crop&crop=center"
            alt="Spicy Mixture"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-lg"
          />
        </div>
        <div 
          className="absolute top-40 left-1/3 w-16 h-16 opacity-35 animate-float" 
          style={{ animationDelay: '1.5s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=64&h=64&fit=crop&crop=center"
            alt="Crunchy Snacks"
            className="w-full h-full object-cover rounded-full border-2 border-white/50 shadow-lg"
          />
        </div>
        <div 
          className="absolute bottom-32 right-1/3 w-18 h-18 opacity-40 animate-float" 
          style={{ animationDelay: '2.5s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=72&h=72&fit=crop&crop=center"
            alt="Mixed Namkeen"
            className="w-full h-full object-cover rounded-full border-2 border-white/50 shadow-lg"
          />
        </div>
      </div>

      {/* About Section with Enhanced Food Imagery */}
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
        
        {/* Enhanced Decorative Food Elements */}
        <div className="absolute top-20 right-8 w-14 h-14 opacity-25 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=56&h=56&fit=crop&crop=center"
            alt="Turmeric"
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div 
          className="absolute top-60 left-12 w-16 h-16 opacity-30 animate-float" 
          style={{ animationDelay: '1s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=64&h=64&fit=crop&crop=center"
            alt="Red Chili"
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div 
          className="absolute top-80 right-16 w-20 h-20 opacity-25 animate-float" 
          style={{ animationDelay: '2s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop&crop=center"
            alt="Delicious Snacks"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/30 shadow-md"
          />
        </div>
        <div 
          className="absolute bottom-40 left-8 w-18 h-18 opacity-30 animate-float" 
          style={{ animationDelay: '1.5s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=72&h=72&fit=crop&crop=center"
            alt="Spice Collection"
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div 
          className="absolute bottom-60 right-20 w-24 h-24 opacity-20 animate-float" 
          style={{ animationDelay: '0.8s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=96&h=96&fit=crop&crop=center"
            alt="Sweet and Savory"
            className="w-full h-full object-cover rounded-full border-2 border-turmeric/40 shadow-md"
          />
        </div>
        <div 
          className="absolute top-40 left-1/4 w-12 h-12 opacity-25 animate-float" 
          style={{ animationDelay: '2.2s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=48&h=48&fit=crop&crop=center"
            alt="Traditional Food"
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div 
          className="absolute bottom-80 right-1/4 w-14 h-14 opacity-35 animate-float" 
          style={{ animationDelay: '1.8s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=56&h=56&fit=crop&crop=center"
            alt="Aromatic Spices"
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div 
          className="absolute top-96 left-20 w-22 h-22 opacity-20 animate-food-float" 
          style={{ animationDelay: '3s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=88&h=88&fit=crop&crop=center"
            alt="Premium Ingredients"
            className="w-full h-full object-cover rounded-full border-2 border-chili/30 shadow-lg"
          />
        </div>
        <div 
          className="absolute bottom-20 left-1/3 w-16 h-16 opacity-25 animate-sizzle" 
          style={{ animationDelay: '2.8s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=64&h=64&fit=crop&crop=center"
            alt="Crispy Delights"
            className="w-full h-full object-cover rounded-full shadow-md"
          />
        </div>
        <div 
          className="absolute top-32 right-1/3 w-20 h-20 opacity-30 animate-spice-sparkle" 
          style={{ animationDelay: '1.2s' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=80&h=80&fit=crop&crop=center"
            alt="Flavorful Mix"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/40 shadow-lg"
          />
        </div>
      </div>

      {/* Additional Floating Elements Throughout */}
      <div className="fixed top-1/4 left-4 w-10 h-10 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '4s' }}>
        <img 
          src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=40&h=40&fit=crop&crop=center"
          alt="Floating Spice"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-1/2 right-6 w-12 h-12 opacity-20 animate-float z-5 pointer-events-none" style={{ animationDelay: '3.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=48&h=48&fit=crop&crop=center"
          alt="Floating Namkeen"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed bottom-1/4 left-8 w-14 h-14 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=56&h=56&fit=crop&crop=center"
          alt="Floating Treat"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default AboutUs;
