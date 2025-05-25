
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from './ProductCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price_250g: number;
  price_500g: number;
  price_1kg: number;
  stock_250g: number;
  stock_500g: number;
  stock_1kg: number;
  image_url: string;
  is_featured: boolean;
  discount_percentage: number;
}

const EcommerceProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Super Products', 'Premium Products', 'Shudh Satwik', 'Falahari Products'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price_250g - b.price_250g;
        case 'price-high':
          return b.price_250g - a.price_250g;
        case 'discount':
          return b.discount_percentage - a.discount_percentage;
        case 'featured':
        default:
          return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      }
    });

  const featuredProducts = products.filter(p => p.is_featured);
  const flashSaleProducts = products.filter(p => p.discount_percentage > 15);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-cream/30 via-white to-saffron/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cream/30 via-white to-saffron/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-chili text-white font-poppins mb-4 animate-pulse">
            🔥 FLASH SALE - Up to 30% OFF
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-warmBrown mb-6">
            Shop Premium Namkeen
          </h2>
          <p className="text-xl text-warmBrown/80 max-w-3xl mx-auto font-merriweather">
            Discover authentic flavors of Indore with our premium quality namkeen collection
          </p>
        </div>

        {/* Flash Sale Section */}
        {flashSaleProducts.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-chili to-red-600 text-white p-6 rounded-lg mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="h-6 w-6 animate-pulse" />
                <h3 className="text-2xl font-bold">⚡ FLASH SALE ⚡</h3>
                <Zap className="h-6 w-6 animate-pulse" />
              </div>
              <p className="text-center text-lg">Limited time offers - Grab them before they're gone!</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {flashSaleProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-saffron/20">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-warmBrown/50" />
            <Input
              placeholder="Search for your favorite namkeen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-saffron/30 focus:border-saffron"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 border-saffron/30">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 border-saffron/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="discount">Highest Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-warmBrown/70 text-lg">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EcommerceProducts;
