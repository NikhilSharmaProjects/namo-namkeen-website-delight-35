
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollAnimation } from '@/components/ScrollAnimations';

const ContactPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-24">
        <ScrollAnimation direction="up" delay={200}>
          <Contact />
        </ScrollAnimation>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default ContactPage;
