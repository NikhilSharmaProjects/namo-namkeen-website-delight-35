
import { useState } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';
import CartSidebar from '@/components/CartSidebar';
import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/config/seo';

const AboutUs = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Enhanced SEO for about page
  useSEO(seoConfig.pages.about);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-4">
              About Namo Namkeen — Our Heritage Story
            </h1>
            <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
              Since 1990, Namo India Food Industries has been the trusted name for authentic Indore namkeen. 
              What started as a small family business has grown into one of India's most beloved traditional snack brands, 
              while never compromising on the quality and authenticity that our customers love.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-warmBrown">Our Journey</h2>
              <p className="text-warmBrown/80 font-merriweather">
                Founded in the heart of Indore, Madhya Pradesh, our story began with a simple mission: to share the authentic 
                flavors of Indore's rich culinary heritage with families across India. Over three decades, we've perfected our 
                recipes, maintained our quality standards, and expanded our reach while staying true to our roots.
              </p>
              
              <h2 className="text-3xl font-bold text-warmBrown">Quality Promise</h2>
              <p className="text-warmBrown/80 font-merriweather">
                Every product at Namo Namkeen is crafted with premium ingredients, traditional methods, and modern hygiene standards. 
                We source our spices directly from trusted suppliers, use no artificial preservatives, and maintain FSSAI certification 
                to ensure every bite meets our high-quality standards.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-warmBrown">Our Values</h2>
              <ul className="space-y-4 text-warmBrown/80 font-merriweather">
                <li className="flex items-start gap-3">
                  <span className="text-saffron font-bold">•</span>
                  <span><strong>Authenticity:</strong> Traditional recipes preserved for generations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-turmeric font-bold">•</span>
                  <span><strong>Quality:</strong> Premium ingredients with no compromises</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-chili font-bold">•</span>
                  <span><strong>Trust:</strong> Building relationships with 5000+ families</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-saffron font-bold">•</span>
                  <span><strong>Innovation:</strong> Modern techniques with traditional taste</span>
                </li>
              </ul>
              
              <h2 className="text-3xl font-bold text-warmBrown">Looking Forward</h2>
              <p className="text-warmBrown/80 font-merriweather">
                As we continue to grow, our commitment remains unchanged: to bring you the authentic taste of Indore with every order. 
                We're constantly innovating our delivery methods, expanding our product range, and ensuring that wherever you are in India, 
                the true flavors of Indore are just an order away.
              </p>
            </div>
          </div>
        </div>
        
        <ScrollAnimation direction="up" delay={200}>
          <About />
        </ScrollAnimation>
      </div>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default AboutUs;
