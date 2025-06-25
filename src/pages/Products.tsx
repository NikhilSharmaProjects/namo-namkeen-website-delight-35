
import Header from '@/components/Header';
import EnhancedProducts from '@/components/EnhancedProducts';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation, ParallaxElement } from '@/components/ScrollAnimations';
import { useState } from 'react';

const Products = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Enhanced Hero Section with Multiple Food Backgrounds */}
      <div className="relative pt-20 pb-12">
        <ParallaxElement speed={0.5} className="absolute inset-0 z-0">
          <div className="h-full bg-gradient-to-br from-saffron/30 to-turmeric/40">
            <img 
              src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1920&h=600&fit=crop&crop=center"
              alt="Variety of Indian Snacks"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        </ParallaxElement>
        
        {/* Secondary Background Layer */}
        <div className="absolute inset-0 z-1">
          <img 
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1920&h=600&fit=crop&crop=center"
            alt="Spice Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          <ScrollAnimation direction="up" delay={100}>
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6 drop-shadow-2xl">
              Our Premium Collection
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-merriweather max-w-3xl mx-auto drop-shadow-lg">
              Discover the authentic taste of Indore with our handcrafted namkeen varieties
            </p>
          </ScrollAnimation>
        </div>
        
        {/* Enhanced Floating Elements - Many More Images */}
        <div className="absolute top-32 left-10 w-24 h-24 opacity-30 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=96&h=96&fit=crop&crop=center"
            alt="Traditional Snack"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=128&h=128&fit=crop&crop=center"
            alt="Spicy Mixture"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute top-24 right-20 w-20 h-20 opacity-35 animate-float" style={{ animationDelay: '0.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=80&h=80&fit=crop&crop=center"
            alt="Mixed Namkeen"
            className="w-full h-full object-cover rounded-full border-3 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute bottom-32 left-20 w-28 h-28 opacity-40 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=112&h=112&fit=crop&crop=center"
            alt="Premium Spices"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute top-60 left-1/4 w-18 h-18 opacity-25 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=72&h=72&fit=crop&crop=center"
            alt="Traditional Cooking"
            className="w-full h-full object-cover rounded-full border-2 border-white/50 shadow-lg"
          />
        </div>
        <div className="absolute bottom-60 right-1/3 w-22 h-22 opacity-30 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=88&h=88&fit=crop&crop=center"
            alt="Fresh Ingredients"
            className="w-full h-full object-cover rounded-full border-3 border-white/50 shadow-lg"
          />
        </div>
        <div className="absolute top-48 left-16 w-16 h-16 opacity-35 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=64&h=64&fit=crop&crop=center"
            alt="Sweet Delights"
            className="w-full h-full object-cover rounded-full border-2 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute bottom-48 right-24 w-26 h-26 opacity-25 animate-float" style={{ animationDelay: '1.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=104&h=104&fit=crop&crop=center"
            alt="Delicious Snacks"
            className="w-full h-full object-cover rounded-full border-3 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute top-80 right-12 w-14 h-14 opacity-40 animate-float" style={{ animationDelay: '3.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=56&h=56&fit=crop&crop=center"
            alt="Turmeric Spice"
            className="w-full h-full object-cover rounded-full border-2 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute bottom-80 left-1/3 w-20 h-20 opacity-30 animate-float" style={{ animationDelay: '0.8s' }}>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&crop=center"
            alt="Red Chili"
            className="w-full h-full object-cover rounded-full border-3 border-white/50 shadow-lg"
          />
        </div>
      </div>

      {/* Enhanced Products Section */}
      <div className="relative">
        <ParallaxElement speed={0.3} className="absolute top-0 left-0 w-full h-40">
          <div className="w-full h-full bg-gradient-to-b from-turmeric/20 to-transparent"></div>
        </ParallaxElement>
        
        {/* Multiple Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1615334815223-73d0c2cf4d37?w=1920&h=800&fit=crop&crop=center"
            alt="Spice Heritage Background"
            className="w-full h-full object-cover opacity-8"
          />
        </div>
        
        <ScrollAnimation direction="up" delay={200}>
          <EnhancedProducts />
        </ScrollAnimation>
        
        {/* Enhanced Background Pattern with Food Elements */}
        <div className="absolute inset-0 decorative-pattern opacity-5 pointer-events-none"></div>
        
        {/* Multiple Floating Food Elements Throughout */}
        <div className="absolute top-20 right-8 w-18 h-18 opacity-25 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=72&h=72&fit=crop&crop=center"
            alt="Spicy Mix"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-60 left-12 w-22 h-22 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=88&h=88&fit=crop&crop=center"
            alt="Traditional Spices"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/30 shadow-lg"
          />
        </div>
        <div className="absolute top-80 right-20 w-16 h-16 opacity-35 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=64&h=64&fit=crop&crop=center"
            alt="Crunchy Snacks"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute bottom-20 left-16 w-24 h-24 opacity-40 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=96&h=96&fit=crop&crop=center"
            alt="Flavorful Mixture"
            className="w-full h-full object-cover rounded-full border-3 border-turmeric/40 shadow-xl"
          />
        </div>
        <div className="absolute bottom-60 right-12 w-20 h-20 opacity-25 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=80&h=80&fit=crop&crop=center"
            alt="Sweet Treats"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-40 left-1/4 w-14 h-14 opacity-30 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=56&h=56&fit=crop&crop=center"
            alt="Premium Namkeen"
            className="w-full h-full object-cover rounded-full border-2 border-chili/30 shadow-lg"
          />
        </div>
        <div className="absolute bottom-40 right-1/4 w-26 h-26 opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=104&h=104&fit=crop&crop=center"
            alt="Traditional Kitchen"
            className="w-full h-full object-cover rounded-full border-3 border-warmBrown/30 shadow-xl"
          />
        </div>
        <div className="absolute top-96 left-20 w-18 h-18 opacity-35 animate-float" style={{ animationDelay: '1.8s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=72&h=72&fit=crop&crop=center"
            alt="Fresh Ingredients"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute bottom-80 left-1/3 w-16 h-16 opacity-25 animate-float" style={{ animationDelay: '2.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center"
            alt="Delicious Variety"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-32 right-1/3 w-22 h-22 opacity-30 animate-float" style={{ animationDelay: '3.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=88&h=88&fit=crop&crop=center"
            alt="Golden Turmeric"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/40 shadow-lg"
          />
        </div>
      </div>

      {/* Fixed Floating Elements for Products Page */}
      <div className="fixed top-1/4 left-6 w-10 h-10 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '4s' }}>
        <img 
          src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=40&h=40&fit=crop&crop=center"
          alt="Floating Spice"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-1/2 right-4 w-12 h-12 opacity-20 animate-float z-5 pointer-events-none" style={{ animationDelay: '3.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=48&h=48&fit=crop&crop=center"
          alt="Floating Namkeen"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed bottom-1/4 left-4 w-14 h-14 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=56&h=56&fit=crop&crop=center"
          alt="Floating Treat"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-3/4 right-8 w-16 h-16 opacity-18 animate-float z-5 pointer-events-none" style={{ animationDelay: '4.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=64&h=64&fit=crop&crop=center"
          alt="Floating Spice Mix"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Products;
