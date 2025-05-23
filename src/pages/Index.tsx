
import Header from '@/components/Header';
import EnhancedHero from '@/components/EnhancedHero';
import EnhancedProducts from '@/components/EnhancedProducts';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <EnhancedHero />
      <ScrollAnimation direction="up" delay={200}>
        <EnhancedProducts />
      </ScrollAnimation>
      <ScrollAnimation direction="left" delay={300}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation direction="right" delay={400}>
        <Contact />
      </ScrollAnimation>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
