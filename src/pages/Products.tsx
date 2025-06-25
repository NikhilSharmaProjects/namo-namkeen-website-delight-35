
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
      
      {/* Hero Section with Food Background */}
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
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-10 w-24 h-24 opacity-30 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=96&h=96&fit=crop&crop=center"
            alt="Traditional Snack"
            className="w-full h-full object-cover rounded-full border-4 border-white/50"
          />
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-30 animate-float" style={{animationDelay: '1.5s'}}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=128&h=128&fit=crop&crop=center"
            alt="Spicy Mixture"
            className="w-full h-full object-cover rounded-full border-4 border-white/50"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="relative">
        <ParallaxElement speed={0.3} className="absolute top-0 left-0 w-full h-40">
          <div className="w-full h-full bg-gradient-to-b from-turmeric/20 to-transparent"></div>
        </ParallaxElement>
        
        <ScrollAnimation direction="up" delay={200}>
          <EnhancedProducts />
        </ScrollAnimation>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 decorative-pattern opacity-5 pointer-events-none"></div>
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Products;
