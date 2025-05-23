
import Header from '@/components/Header';
import EnhancedHero from '@/components/EnhancedHero';
import EnhancedProducts from '@/components/EnhancedProducts';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <EnhancedHero />
      <EnhancedProducts />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
