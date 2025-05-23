
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Heart, Leaf } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Heritage & Tradition",
      description: "Celebrating the rich flavors of Indore with time-honored recipes passed down through generations."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Excellence",
      description: "Using only the finest ingredients and maintaining the highest standards of hygiene and quality."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Trust",
      description: "Building lasting relationships with families across India through consistent quality and taste."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Pure & Natural",
      description: "Committed to natural ingredients and traditional preparation methods for authentic flavors."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cream to-turmeric/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <Badge className="bg-chili text-white font-poppins mb-4">About Namo Namkeen</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6">
                From Namo India Namkeen
                <span className="block text-saffron">स्वाद इंदौर का, विश्वास नमो का</span>
              </h2>
            </div>

            <div className="space-y-6 font-merriweather text-warmBrown/80 leading-relaxed">
              <p>
                Welcome to Namo India Namkeen, where tradition meets trust, and taste meets purity. 
                Founded with a vision to celebrate the rich and diverse flavors of Indore, we stand 
                as a symbol of authenticity, quality, and customer trust.
              </p>
              
              <p>
                We believe that "Namo" is not just a name; it's a promise - a promise of unmatched 
                quality, health-conscious ingredients, and taste that leaves a lasting impression. 
                Our commitment to excellence starts from the very foundation - the ingredients we choose.
              </p>
              
              <p>
                We use only the finest and most trusted brands, including premium spices, 
                high-quality oils, and pure ingredients. Every product is a result of careful 
                selection, clean preparation, and traditional recipes perfected over time.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border-2 border-saffron/20">
              <h3 className="font-poppins font-bold text-warmBrown text-xl mb-3">Our Mission</h3>
              <p className="font-merriweather text-warmBrown/80">
                To deliver authentic, high-quality Indian snacks and sweets made with purity, 
                trust, and the rich taste of tradition. We aim to bring the flavors of Indore 
                to every home by using the finest ingredients and maintaining the highest 
                standards of hygiene, health, and customer satisfaction.
              </p>
            </div>

            <div className="bg-gradient-to-r from-saffron to-turmeric text-white p-6 rounded-2xl">
              <h3 className="font-poppins font-bold text-xl mb-3">Future Vision</h3>
              <p className="font-merriweather">
                To take our products to the global market and establish Namo as a trusted 
                international brand, while creating meaningful employment opportunities and 
                contributing to India's economic growth.
              </p>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold font-poppins text-warmBrown mb-4">Our Core Values</h3>
              <p className="font-merriweather text-warmBrown/80">
                The principles that guide everything we do at Namo Namkeen
              </p>
            </div>

            <div className="grid gap-6">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className="bg-white/90 border-2 border-transparent hover:border-saffron/30 transition-all duration-300 hover:shadow-lg group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-saffron group-hover:text-chili transition-colors">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-warmBrown text-lg mb-2 group-hover:text-saffron transition-colors">
                          {value.title}
                        </h4>
                        <p className="font-merriweather text-warmBrown/70 text-sm">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-6">
              <div className="bg-gradient-to-r from-warmBrown to-chili text-white px-6 py-3 rounded-full inline-block font-poppins font-semibold">
                <span className="text-sm">NAMO INDIA FOOD INDUSTRIES</span>
                <div className="text-xs opacity-90 mt-1">65-A, Nagin Nagar, Indore (M.P.)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
