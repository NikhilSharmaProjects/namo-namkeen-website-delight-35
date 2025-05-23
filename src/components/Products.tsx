
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Super Products");
  
  const productCategories = [
    {
      title: "Super Products",
      description: "Our signature namkeen collection with authentic flavors",
      products: [
        "Ratlami Sev", "Laung Sev", "Ujjaini Sev", "Bank Fiki Sev",
        "Khatta Mitha Mixture", "Tikha Mixture", "Navratn Mixture", "Makka Mixture",
        "Tikhi Bundi", "Fiki Bundi", "Testy Dane", "Chana Dal"
      ],
      bgColor: "bg-gradient-to-br from-saffron/10 to-turmeric/20",
      badgeColor: "bg-saffron"
    },
    {
      title: "Premium Products",
      description: "Premium quality namkeen for special occasions",
      products: [
        "Premium Ratlami Sev", "Premium Laung Sev", "Premium Ujjaini Sev", "Premium Bank Fiki Sev",
        "Premium Khatta Mitha", "Premium Tikha Mixture", "Premium Navratn", "Premium Makka Mixture"
      ],
      bgColor: "bg-gradient-to-br from-turmeric/10 to-chili/20",
      badgeColor: "bg-turmeric"
    },
    {
      title: "Shudh Satwik",
      description: "Pure vegetarian products made with traditional methods",
      products: [
        "Satwik Ratlami Sev", "Satwik Laung Sev", "Satwik Ujjaini Sev", "Satwik Bank Fiki Sev",
        "Satwik Khatta Mitha", "Satwik Tikha Mixture", "Satwik Navratn", "Satwik Makka Mixture"
      ],
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      badgeColor: "bg-green-600"
    },
    {
      title: "Falahari Products",
      description: "Special fasting products for religious occasions",
      products: [
        "Potato Chips", "Banana Chips", "Falahari Tikha Mixture"
      ],
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      badgeColor: "bg-yellow-600"
    },
    {
      title: "Other Specialties",
      description: "Traditional snacks and regional delicacies",
      products: [
        "Kachori", "Samosa", "Bhakarwadi", "Chakli",
        "Shakar Pare", "Namkeen Pare", "Charkhe Pare", "Ras Bhri",
        "Plain Mathri", "Masala Mathri", "Mini Bhakarwadi"
      ],
      bgColor: "bg-gradient-to-br from-chili/10 to-saffron/20",
      badgeColor: "bg-chili"
    }
  ];

  return (
    <section id="products" className="py-20 bg-white relative">
      {/* Background patterns */}
      <div className="absolute inset-0 decorative-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-saffron text-white font-poppins mb-4">Our Products</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6">
            Authentic Flavors of Indore
          </h2>
          <p className="text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
            From traditional namkeen to premium sweets, discover our wide range of 
            products crafted with the finest ingredients and time-honored recipes.
          </p>
          
          <div className="flex justify-center mt-8">
            <img 
              src="/lovable-uploads/fc1f54b5-c514-4ad3-9005-edac9f3abace.png" 
              alt="Namo Namkeen Logo" 
              className="h-20 object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {productCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`px-4 py-2 rounded-full font-poppins font-medium transition-all duration-300 ${
                activeCategory === category.title 
                ? `${category.badgeColor} text-white shadow-lg scale-105` 
                : 'bg-cream text-warmBrown/70 hover:bg-cream/80'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <Card 
              key={category.title}
              className={`${category.bgColor} border-2 ${
                activeCategory === category.title 
                  ? 'border-saffron scale-105 shadow-xl z-10' 
                  : 'border-transparent hover:border-saffron/30'
              } transition-all duration-500 hover:shadow-xl group`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge className={`${category.badgeColor} text-white font-poppins mb-3`}>
                    {category.title}
                  </Badge>
                  <h3 className="text-xl font-bold font-poppins text-warmBrown mb-2 group-hover:text-saffron transition-colors flex items-center">
                    {category.title}
                    {activeCategory === category.title && <ChevronRight className="ml-1 text-saffron" size={18} />}
                  </h3>
                  <p className="text-warmBrown/70 text-sm font-merriweather">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {category.products.map((product, productIndex) => (
                    <div 
                      key={product}
                      className={`flex items-center gap-2 text-sm font-merriweather transition-all duration-300 ${
                        activeCategory === category.title 
                          ? 'text-warmBrown hover:translate-x-1' 
                          : 'text-warmBrown/80 hover:text-warmBrown'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        activeCategory === category.title ? 'bg-chili' : 'bg-saffron'
                      }`}></div>
                      <span>{product}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-warmBrown/10 flex items-center justify-between">
                  <p className="text-xs text-warmBrown/60 font-merriweather">
                    Available in multiple sizes: 250g, 500g & 1kg
                  </p>
                  
                  {activeCategory === category.title && (
                    <img 
                      src="/lovable-uploads/fc1f54b5-c514-4ad3-9005-edac9f3abace.png" 
                      alt="Namo Mini Logo" 
                      className="h-6 w-6 object-contain"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-r from-saffron to-turmeric text-white px-8 py-4 rounded-full font-poppins font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            Quality is not just a name, it's a promise of good quality
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
