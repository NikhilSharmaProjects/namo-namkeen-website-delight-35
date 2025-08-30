import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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

interface BlogManagementProps {
  onStatsUpdate?: (stats: any) => void;
}

const BlogManagement = ({ onStatsUpdate }: BlogManagementProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    author: 'Namo Namkeen Team',
    is_published: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
      onStatsUpdate?.({ blogCount: data?.length || 0 });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch blogs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      author: 'Namo Namkeen Team',
      is_published: true
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const blogData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title)
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog created successfully',
        });
      }

      resetForm();
      fetchBlogs();
    } catch (error: any) {
      console.error('Error saving blog:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      });
      fetchBlogs();
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog',
        variant: 'destructive',
      });
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || '',
      author: blog.author,
      is_published: blog.is_published
    });
    setShowForm(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading blogs...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Blog
        </Button>
      </div>

      {/* Blog Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Blog title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="blog-url-slug"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the blog post"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full blog content in markdown format..."
                  rows={15}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_url">Blog Image</Label>
                  <select
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select an image (optional)</option>
                    <option value="/images/productImages/cornflakesSweetMix.jpg">Cornflakes Sweet Mix</option>
                    <option value="/images/productImages/dalMothMix.jpg">Dal Moth Mix</option>
                    <option value="/images/productImages/delicusMixture.jpg">Delicus Mixture</option>
                    <option value="/images/productImages/doubleLaungSev.jpg">Double Laung Sev</option>
                    <option value="/images/productImages/fikiBarikSev.jpg">Fiki Barik Sev</option>
                    <option value="/images/productImages/gujratiMixture.jpg">Gujrati Mixture</option>
                    <option value="/images/productImages/khattaMithaMixture.jpg">Khatta Mitha Mixture</option>
                    <option value="/images/productImages/navaratanMixture.jpg">Navaratan Mixture</option>
                    <option value="/images/productImages/ratalamiSev.jpg">Ratalami Sev</option>
                    <option value="/images/productImages/spicyMixture.jpg">Spicy Mixture</option>
                    <option value="/images/productImages/ujjainiSev.jpg">Ujjaini Sev</option>
                  </select>
                  <p className="text-xs text-gray-600 mt-1">Or enter custom URL below:</p>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="/images/custom-blog-image.jpg"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, is_published: checked }))
                  }
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog List */}
      <div className="grid grid-cols-1 gap-4">
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No blogs found. Create your first blog!</p>
            </CardContent>
          </Card>
        ) : (
          blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{blog.title}</h3>
                      {!blog.is_published && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Slug: /blog/{blog.slug}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {blog.excerpt}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
                      {blog.updated_at !== blog.created_at && (
                        <span> • Updated {new Date(blog.updated_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBlog(blog)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {blog.image_url && (
                  <img 
                    src={blog.image_url} 
                    alt={blog.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManagement;