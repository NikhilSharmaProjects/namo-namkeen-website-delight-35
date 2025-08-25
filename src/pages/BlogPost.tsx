import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSEO } from '@/hooks/useSEO';
import { seoConfig } from '@/config/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Toaster } from '@/components/ui/toaster';
import Breadcrumbs from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';
import InternalLinks from '@/components/InternalLinks';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  useSEO(seoConfig.pages.blog);

  useEffect(() => {
    if (slug) {
      fetchBlog(slug);
    }
  }, [slug]);

  const fetchBlog = async (blogSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', blogSlug)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
        setBlog(null);
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-warmBrown mb-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-warmBrown mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-warmBrown mb-3 mt-6">$1</h3>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-warmBrown">$1</strong>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[hl])/gm, '<p class="mb-4">')
      .replace(/<li class="mb-2">(.*?)<\/li>/g, '<ul class="list-disc pl-6 mb-4"><li class="mb-2">$1</li></ul>')
      .replace(/(<\/ul>\s*<ul[^>]*>)/g, '');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Blog link copied to clipboard!',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto mb-4"></div>
              <p className="text-warmBrown">Loading blog post...</p>
            </div>
          </div>
        </main>
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Toaster />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-warmBrown mb-4">Blog Post Not Found</h1>
            <p className="text-warmBrown/70 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmCream to-lightSaffron">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-saffron hover:text-turmeric mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <h1 className="text-4xl font-bold text-warmBrown mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-warmBrown/70 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="ml-auto"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <p className="text-lg text-warmBrown/80 leading-relaxed mb-6">
              {blog.excerpt}
            </p>
          </header>

          {blog.image_url && (
            <div className="mb-8">
              <OptimizedImage
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none text-warmBrown leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
          />

          <div className="mt-12 p-6 bg-gradient-to-r from-saffron/20 to-turmeric/20 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-warmBrown mb-3">
              Hungry for Authentic Indori Namkeen?
            </h3>
            <p className="text-warmBrown/80 mb-4">
              Order fresh, authentic namkeen from Namo Namkeen and taste the real flavors of Indore!
            </p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90">
                Shop Now
              </Button>
            </Link>
          </div>

          <InternalLinks currentPage={`/blog/${blog.slug}`} />
        </article>
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster />
    </div>
  );
};

export default BlogPost;