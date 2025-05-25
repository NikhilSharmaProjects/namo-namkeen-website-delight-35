
import Header from '@/components/Header';
import EcommerceProducts from '@/components/EcommerceProducts';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';
import { useState } from 'react';

const Products = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="pt-24">
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
