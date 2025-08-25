import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/config/seo';
import { supabase } from '@/integrations/supabase/client';
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const Blog = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  
  useSEO(seoConfig.pages.blog);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-warmBrown mb-4">
            Namo Namkeen Blog
          </h1>
          <p className="text-lg text-warmBrown/80 max-w-2xl mx-auto">
            Discover the rich heritage, authentic recipes, and fascinating stories behind India's most beloved namkeen varieties.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto mb-4"></div>
              <p className="text-warmBrown">Loading blog posts...</p>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-warmBrown mb-4">No Blog Posts Yet</h2>
            <p className="text-warmBrown/70">Check back soon for exciting stories about Indori namkeen!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage
                    src={post.image_url || '/images/productImages/gujratiMixture.jpg'} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-warmBrown mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-warmBrown/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-warmBrown/60 mb-4">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-saffron hover:text-turmeric font-medium"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-saffron/20 to-turmeric/20 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-warmBrown mb-4">
            Craving Authentic Indori Snacks?
          </h2>
          <p className="text-lg text-warmBrown/80 mb-6 max-w-2xl mx-auto">
            After reading about these delicious snacks, why not experience them yourself? 
            Order fresh, authentic Indori namkeen delivered straight to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="bg-gradient-to-r from-saffron to-turmeric text-white px-8 py-3 rounded-lg font-semibold hover:from-saffron/90 hover:to-turmeric/90 transition-all duration-300 transform hover:scale-105"
            >
              Shop Our Products
            </Link>
            <Link 
              to="/about"
              className="border-2 border-saffron text-saffron px-8 py-3 rounded-lg font-semibold hover:bg-saffron hover:text-white transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default Blog;