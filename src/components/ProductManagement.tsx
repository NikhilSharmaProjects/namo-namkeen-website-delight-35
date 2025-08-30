
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Upload, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

interface ProductManagementProps {
  onStatsUpdate: () => void;
}

const ProductManagement = ({ onStatsUpdate }: ProductManagementProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ['Premium Products', 'Satwik Products'];

  const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    category: '',
    description: '',
    price_250g: 80, // Default Premium rate for 250g
    price_500g: 150, // Default Premium rate for 500g
    price_1kg: 0,
    stock_250g: 0,
    stock_500g: 0,
    stock_1kg: 0,
    image_url: '',
    is_featured: false,
    discount_percentage: 0
  };

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
      toast({ title: 'Error', description: 'Failed to load products', variant: 'destructive' });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'> | Product) => {
    try {
      // Convert prices from rupees to paisa (multiply by 100)
      const processedData = {
        ...productData,
        price_250g: Math.round(productData.price_250g * 100),
        price_500g: Math.round(productData.price_500g * 100),
        price_1kg: Math.round(productData.price_1kg * 100)
      };

      if ('id' in productData) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(processedData)
          .eq('id', productData.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Product updated successfully' });
      } else {
        // Add new product
        const { error } = await supabase
          .from('products')
          .insert([processedData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Product added successfully' });
      }

      fetchProducts();
      onStatsUpdate();
      setEditingProduct(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({ title: 'Error', description: 'Failed to save product', variant: 'destructive' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Success', description: 'Product deleted successfully' });
      fetchProducts();
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
    }
  };

  const ProductForm = ({ product, onSave, onCancel }: {
    product: Omit<Product, 'id'> | Product;
    onSave: (product: Omit<Product, 'id'> | Product) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      ...product,
      // Convert prices from paisa to rupees for display
      price_250g: product.price_250g / 100,
      price_500g: product.price_500g / 100,
      price_1kg: product.price_1kg / 100
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Auto-set prices based on category
      let adjustedFormData = { ...formData };
      if (formData.category === 'Premium Products') {
        adjustedFormData.price_250g = 80;
        adjustedFormData.price_500g = 150;
      } else if (formData.category === 'Satwik Products') {
        adjustedFormData.price_250g = 110;
        adjustedFormData.price_500g = 200;
      }
      
      onSave(adjustedFormData);
    };

    return (
      <Card className="border-saffron/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warmBrown">
            {'id' in product ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {'id' in product ? 'Edit Product' : 'Add New Product'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Product Image</Label>
              <Select value={formData.image_url} onValueChange={(value) => setFormData({ ...formData, image_url: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product image" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/images/productImages/cornflakesSweetMix.jpg">Cornflakes Sweet Mix</SelectItem>
                  <SelectItem value="/images/productImages/dalMothMix.jpg">Dal Moth Mix</SelectItem>
                  <SelectItem value="/images/productImages/delicusMixture.jpg">Delicus Mixture</SelectItem>
                  <SelectItem value="/images/productImages/doubleLaungSev.jpg">Double Laung Sev</SelectItem>
                  <SelectItem value="/images/productImages/fikiBarikSev.jpg">Fiki Barik Sev</SelectItem>
                  <SelectItem value="/images/productImages/gujratiMixture.jpg">Gujrati Mixture</SelectItem>
                  <SelectItem value="/images/productImages/khattaMithaMixture.jpg">Khatta Mitha Mixture</SelectItem>
                  <SelectItem value="/images/productImages/navaratanMixture.jpg">Navaratan Mixture</SelectItem>
                  <SelectItem value="/images/productImages/ratalamiSev.jpg">Ratalami Sev</SelectItem>
                  <SelectItem value="/images/productImages/spicyMixture.jpg">Spicy Mixture</SelectItem>
                  <SelectItem value="/images/productImages/ujjainiSev.jpg">Ujjaini Sev</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>250g Price (₹)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price_250g}
                  onChange={(e) => setFormData({ ...formData, price_250g: parseFloat(e.target.value) || 0 })}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-gray-600">Auto-set based on category</p>
              </div>
              <div className="space-y-2">
                <Label>500g Price (₹)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price_500g}
                  onChange={(e) => setFormData({ ...formData, price_500g: parseFloat(e.target.value) || 0 })}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-gray-600">Auto-set based on category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>250g Stock</Label>
                <Input
                  type="number"
                  value={formData.stock_250g}
                  onChange={(e) => setFormData({ ...formData, stock_250g: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>500g Stock</Label>
                <Input
                  type="number"
                  value={formData.stock_500g}
                  onChange={(e) => setFormData({ ...formData, stock_500g: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Percentage</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={(e) => setFormData({ ...formData, discount_percentage: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-saffron/30"
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Product
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-warmBrown">Product Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-saffron to-turmeric hover:from-saffron/90 hover:to-turmeric/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <ProductForm
          product={emptyProduct}
          onSave={handleSaveProduct}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="border-saffron/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-4">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                
                <div>
                  <h3 className="font-bold text-warmBrown">{product.name}</h3>
                  <Badge className="bg-saffron/10 text-saffron border-saffron/30">
                    {product.category}
                  </Badge>
                  {product.is_featured && (
                    <Badge className="ml-2 bg-chili text-white">Featured</Badge>
                  )}
                </div>

                <p className="text-sm text-warmBrown/70 line-clamp-2">{product.description}</p>

                <div className="text-sm space-y-1">
                  <div>250g: ₹{(product.price_250g / 100).toFixed(2)} (Stock: {product.stock_250g})</div>
                  <div>500g: ₹{(product.price_500g / 100).toFixed(2)} (Stock: {product.stock_500g})</div>
                </div>

                {product.discount_percentage > 0 && (
                  <Badge className="bg-green-500 text-white">
                    {product.discount_percentage}% OFF
                  </Badge>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingProduct(product)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
