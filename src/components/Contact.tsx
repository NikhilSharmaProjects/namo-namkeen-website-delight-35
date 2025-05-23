
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Globe, Factory } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Address",
      details: ["NAMO INDIA FOOD INDUSTRIES", "65-A, Nagin Nagar", "Indore (M.P.), India"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Customer Care",
      details: ["+91 88238 18001", "Quick Response Guaranteed"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["namoindiaifoodindustriess@gmail.com", "Business Inquiries Welcome"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Online Presence",
      details: ["www.namoindianamkeen.com", "Namo India Namkeen (Facebook)"]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-chili text-white font-poppins mb-4">Contact Us</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6">
            Get In Touch With Us
          </h2>
          <p className="text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
            Have questions about our products? Want to place a bulk order? 
            We'd love to hear from you and help you experience the authentic taste of Indore.
          </p>
          <div className="mt-6 text-lg font-poppins text-saffron font-semibold">
            "Swad Indore Ka, Vishwas Namo Ka"
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title}
                  className="bg-gradient-to-r from-cream to-turmeric/10 border-2 border-saffron/20 hover:border-saffron/40 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-saffron bg-white p-3 rounded-full">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-warmBrown text-lg mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="font-merriweather text-warmBrown/70 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-saffron to-turmeric text-white p-8 rounded-2xl">
              <h3 className="font-poppins font-bold text-2xl mb-4 flex items-center">
                <Factory className="w-6 h-6 mr-2" />
                Visit Our Factory
              </h3>
              <p className="font-merriweather mb-4">
                Experience our manufacturing process firsthand and see how we maintain 
                the highest quality standards in every product we make using premium ingredients 
                and traditional recipes.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>Factory tours available on appointment</span>
              </div>
              <div className="mt-3 text-sm opacity-90">
                "Namo Is Not Name It's a Promise Of Good Quality"
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-cream to-white border-2 border-saffron/20">
              <CardContent className="p-8">
                <h3 className="font-poppins font-bold text-2xl text-warmBrown mb-6">
                  Send Us a Message
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-poppins font-medium text-warmBrown text-sm mb-2 block">
                        First Name
                      </label>
                      <Input 
                        placeholder="Your first name"
                        className="border-turmeric/30 focus:border-saffron"
                      />
                    </div>
                    <div>
                      <label className="font-poppins font-medium text-warmBrown text-sm mb-2 block">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Your last name"
                        className="border-turmeric/30 focus:border-saffron"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-poppins font-medium text-warmBrown text-sm mb-2 block">
                      Email Address
                    </label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="border-turmeric/30 focus:border-saffron"
                    />
                  </div>
                  
                  <div>
                    <label className="font-poppins font-medium text-warmBrown text-sm mb-2 block">
                      Phone Number
                    </label>
                    <Input 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="border-turmeric/30 focus:border-saffron"
                    />
                  </div>
                  
                  <div>
                    <label className="font-poppins font-medium text-warmBrown text-sm mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us about your requirements, bulk orders, or questions about our authentic Indore namkeen..."
                      rows={5}
                      className="border-turmeric/30 focus:border-saffron resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white font-poppins font-semibold py-6 text-lg"
                  >
                    Send Message
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-turmeric/20">
                  <p className="text-center text-sm text-warmBrown/70 font-merriweather">
                    We typically respond within 24 hours during business days
                  </p>
                  <p className="text-center text-xs text-saffron font-poppins mt-2 font-semibold">
                    Quality is not just a name, it's a promise of good quality
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
