
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HalwaiHero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Show welcome bubble after component mounts
    const timer = setTimeout(() => setShowWelcome(true), 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-cream via-white to-saffron/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 decorative-pattern opacity-30"></div>
      
      {/* Hero Content Container */}
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-6rem)]">
          
          {/* Left Content - Text */}
          <div className="flex-1 text-center lg:text-left lg:pr-12 mb-8 lg:mb-0 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-warmBrown leading-tight">
                <span className="block halwai-text-glow">Welcome to</span>
                <span className="block text-saffron spice-text">NAMO NAMKEEN</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-warmBrown/80 font-merriweather max-w-2xl mx-auto lg:mx-0">
                Experience the authentic taste of Indore's finest namkeen, 
                crafted with love by our traditional halwai
              </p>
              
              <div className={`transform transition-all duration-500 ${isScrolled ? 'scale-110' : 'scale-100'}`}>
                <p className="text-lg md:text-xl font-bold font-poppins halwai-tagline mb-6">
                  🌶️ Crunch into Tradition 🌶️
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-bold py-4 px-8 text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 halwai-button-glow">
                    <ShoppingCart className="mr-3 h-5 w-5" />
                    Shop Now
                  </Button>
                </Link>
                
                <Button variant="outline" className="border-2 border-warmBrown text-warmBrown hover:bg-warmBrown hover:text-white font-bold py-4 px-8 text-lg rounded-full transition-all duration-300">
                  <Sparkles className="mr-3 h-5 w-5" />
                  Our Story
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Content - Halwai Character */}
          <div className="flex-1 relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="halwai-container relative max-w-md mx-auto lg:max-w-lg">
              
              {/* Character Image */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/6ff54ce7-124d-4ddd-8fa0-4cbc0e15ab66.png"
                  alt="Namo Namkeen Halwai Character"
                  className="halwai-character w-full h-auto relative z-20 drop-shadow-2xl"
                />
                
                {/* Interactive hand area for hover effects */}
                <div className="halwai-hand-area absolute top-1/4 right-1/4 w-20 h-20 z-30"></div>
              </div>
              
              {/* Welcome Speech Bubble - Improved mobile positioning */}
              {showWelcome && (
                <div className="absolute top-4 md:top-16 left-2 md:left-4 lg:left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-xl border-2 border-saffron/30 animate-fade-in z-30 max-w-[280px] md:max-w-xs">
                  <div className="text-warmBrown font-merriweather text-xs md:text-sm">
                    <p className="font-bold text-saffron mb-1">Namaste! 🙏</p>
                    <p>Welcome to our traditional namkeen shop. Try our authentic Indore specialties!</p>
                  </div>
                  <div className="absolute -bottom-2 left-4 md:left-6 w-4 h-4 bg-white/95 transform rotate-45 border-r border-b border-saffron/30"></div>
                </div>
              )}
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 text-4xl animate-float">🌶️</div>
              <div className="absolute top-1/2 -left-8 text-3xl animate-float" style={{animationDelay: '1s'}}>✨</div>
              <div className="absolute bottom-1/4 -right-8 text-3xl animate-float" style={{animationDelay: '2s'}}>🥜</div>
              
              {/* Brand Integration Background */}
              <div className="halwai-brand-integration absolute inset-0 -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto text-white/50">
          <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HalwaiHero;
