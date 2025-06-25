
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
      
      {/* Enhanced Hero Section with Multiple Spice Backgrounds */}
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
        
        {/* Secondary Spice Background Layer */}
        <div className="absolute inset-0 z-1">
          <img 
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1920&h=600&fit=crop&crop=center"
            alt="Spice Market Background"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        
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
        
        {/* Enhanced Floating Spice Elements - Many More */}
        <div className="absolute top-28 right-20 w-20 h-20 opacity-40 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop&crop=center"
            alt="Traditional Spices"
            className="w-full h-full object-cover rounded-full border-3 border-white/60 shadow-xl"
          />
        </div>
        <div className="absolute bottom-24 left-16 w-16 h-16 opacity-40 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=64&h=64&fit=crop&crop=center"
            alt="Turmeric Powder"
            className="w-full h-full object-cover rounded-full border-3 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute top-40 left-12 w-24 h-24 opacity-35 animate-float" style={{ animationDelay: '0.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=96&h=96&fit=crop&crop=center"
            alt="Red Chili Powder"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute bottom-40 right-24 w-28 h-28 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=112&h=112&fit=crop&crop=center"
            alt="Fresh Ingredients"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute top-60 right-12 w-18 h-18 opacity-35 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1615334815223-73d0c2cf4d37?w=72&h=72&fit=crop&crop=center"
            alt="Spice Heritage"
            className="w-full h-full object-cover rounded-full border-2 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute bottom-60 left-20 w-22 h-22 opacity-40 animate-float" style={{ animationDelay: '2.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=88&h=88&fit=crop&crop=center"
            alt="Traditional Kitchen"
            className="w-full h-full object-cover rounded-full border-3 border-white/50 shadow-xl"
          />
        </div>
        <div className="absolute top-80 left-1/4 w-16 h-16 opacity-25 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=64&h=64&fit=crop&crop=center"
            alt="Mixed Namkeen"
            className="w-full h-full object-cover rounded-full border-2 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute bottom-80 right-1/3 w-20 h-20 opacity-30 animate-float" style={{ animationDelay: '1.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=80&h=80&fit=crop&crop=center"
            alt="Crunchy Snacks"
            className="w-full h-full object-cover rounded-full border-3 border-white/50 shadow-lg"
          />
        </div>
        <div className="absolute top-48 right-32 w-14 h-14 opacity-35 animate-float" style={{ animationDelay: '0.8s' }}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=56&h=56&fit=crop&crop=center"
            alt="Spicy Mixture"
            className="w-full h-full object-cover rounded-full border-2 border-white/60 shadow-lg"
          />
        </div>
        <div className="absolute bottom-48 left-1/3 w-26 h-26 opacity-25 animate-float" style={{ animationDelay: '3.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=104&h=104&fit=crop&crop=center"
            alt="Delicious Snacks"
            className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl"
          />
        </div>
      </div>

      {/* Enhanced Contact Section */}
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
        
        {/* Secondary Background with Food Pattern */}
        <div className="absolute inset-0 z-1">
          <img 
            src="https://images.unsplash.com/photo-1506906032039-2eed3c1d8d37?w=1920&h=800&fit=crop&crop=center"
            alt="Colorful Spices Background"
            className="w-full h-full object-cover opacity-8"
          />
        </div>
        
        <div className="relative z-10">
          <ScrollAnimation direction="up" delay={200}>
            <Contact />
          </ScrollAnimation>
        </div>
        
        {/* Enhanced Floating Food Elements Throughout Contact Section */}
        <div className="absolute top-20 right-8 w-16 h-16 opacity-25 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=64&h=64&fit=crop&crop=center"
            alt="Turmeric"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-60 left-12 w-20 h-20 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop&crop=center"
            alt="Red Chili"
            className="w-full h-full object-cover rounded-full border-2 border-chili/30 shadow-lg"
          />
        </div>
        <div className="absolute top-80 right-16 w-24 h-24 opacity-25 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=96&h=96&fit=crop&crop=center"
            alt="Delicious Snacks"
            className="w-full h-full object-cover rounded-full border-3 border-saffron/30 shadow-xl"
          />
        </div>
        <div className="absolute bottom-40 left-8 w-18 h-18 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=72&h=72&fit=crop&crop=center"
            alt="Spice Collection"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute bottom-60 right-20 w-28 h-28 opacity-20 animate-float" style={{ animationDelay: '0.8s' }}>
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=112&h=112&fit=crop&crop=center"
            alt="Sweet and Savory"
            className="w-full h-full object-cover rounded-full border-4 border-turmeric/40 shadow-xl"
          />
        </div>
        <div className="absolute top-40 left-1/4 w-14 h-14 opacity-25 animate-float" style={{ animationDelay: '2.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=56&h=56&fit=crop&crop=center"
            alt="Traditional Food"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute bottom-80 right-1/4 w-16 h-16 opacity-35 animate-float" style={{ animationDelay: '1.8s' }}>
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=64&h=64&fit=crop&crop=center"
            alt="Aromatic Spices"
            className="w-full h-full object-cover rounded-full border-2 border-saffron/40 shadow-lg"
          />
        </div>
        <div className="absolute top-96 left-20 w-22 h-22 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=88&h=88&fit=crop&crop=center"
            alt="Premium Ingredients"
            className="w-full h-full object-cover rounded-full border-3 border-green-400/30 shadow-xl"
          />
        </div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 opacity-25 animate-float" style={{ animationDelay: '2.8s' }}>
          <img 
            src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=80&h=80&fit=crop&crop=center"
            alt="Crispy Delights"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="absolute top-32 right-1/3 w-24 h-24 opacity-30 animate-float" style={{ animationDelay: '1.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1599599810694-57a2ca8c5fb1?w=96&h=96&fit=crop&crop=center"
            alt="Flavorful Mix"
            className="w-full h-full object-cover rounded-full border-3 border-chili/40 shadow-xl"
          />
        </div>
        <div className="absolute bottom-32 right-8 w-18 h-18 opacity-35 animate-float" style={{ animationDelay: '3.5s' }}>
          <img 
            src="https://images.unsplash.com/photo-1615334815223-73d0c2cf4d37?w=72&h=72&fit=crop&crop=center"
            alt="Heritage Spices"
            className="w-full h-full object-cover rounded-full border-2 border-warmBrown/40 shadow-lg"
          />
        </div>
        <div className="absolute top-64 left-16 w-26 h-26 opacity-25 animate-float" style={{ animationDelay: '4s' }}>
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=104&h=104&fit=crop&crop=center"
            alt="Traditional Cooking"
            className="w-full h-full object-cover rounded-full border-4 border-turmeric/30 shadow-xl"
          />
        </div>
      </div>

      {/* Fixed Floating Elements for Contact Page */}
      <div className="fixed top-1/4 left-6 w-12 h-12 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '4s' }}>
        <img 
          src="https://images.unsplash.com/photo-1505253213348-cd54c92b37ba?w=48&h=48&fit=crop&crop=center"
          alt="Floating Spice"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-1/2 right-4 w-14 h-14 opacity-20 animate-float z-5 pointer-events-none" style={{ animationDelay: '3.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=56&h=56&fit=crop&crop=center"
          alt="Floating Namkeen"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed bottom-1/4 left-4 w-16 h-16 opacity-15 animate-float z-5 pointer-events-none" style={{ animationDelay: '5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=64&h=64&fit=crop&crop=center"
          alt="Floating Treat"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-3/4 right-10 w-10 h-10 opacity-20 animate-float z-5 pointer-events-none" style={{ animationDelay: '4.5s' }}>
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=40&h=40&fit=crop&crop=center"
          alt="Floating Spice Mix"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="fixed top-1/3 left-2 w-8 h-8 opacity-18 animate-float z-5 pointer-events-none" style={{ animationDelay: '6s' }}>
        <img 
          src="https://images.unsplash.com/photo-1612637395893-8b6b0a08e7a1?w=32&h=32&fit=crop&crop=center"
          alt="Floating Crunch"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default ContactPage;
