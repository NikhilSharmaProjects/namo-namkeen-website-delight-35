
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-warmBrown text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-poppins">नमो</span>
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl">NAMO NAMKEEN</h3>
                <p className="text-sm text-white/80">Authentic Indian Snacks</p>
              </div>
            </div>
            
            <p className="text-white/80 font-merriweather text-sm leading-relaxed">
              Celebrating the rich flavors of Indore with traditional recipes and premium quality ingredients. 
              स्वाद इंदौर का, विश्वास नमो का
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="bg-saffron hover:bg-saffron/80 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-turmeric hover:bg-turmeric/80 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Products', 'About Us', 'Contact', 'Quality Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-saffron transition-colors font-merriweather text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Our Products</h4>
            <ul className="space-y-3">
              {['Super Products', 'Premium Range', 'Satwik Products', 'Falahari Items', 'Traditional Sweets'].map((product) => (
                <li key={product}>
                  <a href="#" className="text-white/80 hover:text-turmeric transition-colors font-merriweather text-sm">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 font-merriweather text-sm">
                    65-A, Nagin Nagar<br />
                    Indore (M.P.), India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-turmeric flex-shrink-0" />
                <p className="text-white/80 font-merriweather text-sm">
                  +91 88238 18001
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-chili flex-shrink-0" />
                <p className="text-white/80 font-merriweather text-sm break-all">
                  namoindiaifoodindustriess@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 font-merriweather text-sm text-center md:text-left">
              © 2024 Namo India Food Industries. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-white/80 font-merriweather">
              <a href="#" className="hover:text-saffron transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-turmeric transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-chili transition-colors">Quality Assurance</a>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <div className="inline-block bg-gradient-to-r from-saffron to-turmeric text-white px-6 py-2 rounded-full font-poppins font-medium text-sm">
              "Namo Is Not Name It's a Promise Of Good Quality"
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
