
import Header from '@/components/Header';
import EnhancedProducts from '@/components/EnhancedProducts';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';

const Products = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-24">
        <ScrollAnimation direction="up" delay={200}>
          <EnhancedProducts />
        </ScrollAnimation>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Products;
