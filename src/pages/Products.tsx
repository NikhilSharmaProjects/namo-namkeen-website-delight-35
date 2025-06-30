
import Header from '@/components/Header';
import EcommerceProducts from '@/components/EcommerceProducts';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';
import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/config/seo';
import { useState } from 'react';

const Products = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Enhanced SEO for products page
  useSEO(seoConfig.pages.products);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-4">
              Buy Authentic Indori Namkeen Online
            </h1>
            <p className="text-lg md:text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
              Discover our complete range of premium quality namkeen, from traditional Ratlami Sev to innovative Satwik mixtures. 
              Each product is crafted using time-honored recipes and the finest ingredients, ensuring you get the authentic taste of Indore 
              delivered fresh to your doorstep. Perfect for festivals, celebrations, or everyday snacking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-saffron/10 to-turmeric/10 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-warmBrown mb-4">Why Our Namkeen Stands Out</h2>
              <ul className="space-y-2 text-warmBrown/80">
                <li>• Traditional recipes passed down through generations</li>
                <li>• Premium quality ingredients with no preservatives</li>
                <li>• Hygienic preparation in FSSAI certified facilities</li>
                <li>• Fresh packaging ensuring maximum shelf life</li>
                <li>• Available in multiple sizes to suit your needs</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green/10 to-turmeric/10 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-warmBrown mb-4">Product Categories</h2>
              <ul className="space-y-2 text-warmBrown/80">
                <li>• <strong>Premium Range:</strong> Our signature products in 250gm & 500gm</li>
                <li>• <strong>Satwik Collection:</strong> Made with 100% groundnut oil</li>
                <li>• <strong>Falahari Items:</strong> Perfect for fasting periods</li>
                <li>• <strong>Traditional Sweets:</strong> Regional delicacies from Indore</li>
                <li>• <strong>Seasonal Specials:</strong> Festival-themed varieties</li>
              </ul>
            </div>
          </div>
        </div>
        
        <ScrollAnimation direction="up" delay={200}>
          <EcommerceProducts />
        </ScrollAnimation>
      </div>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Products;
