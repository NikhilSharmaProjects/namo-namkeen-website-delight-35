
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  product_id: string;
  size: '250g' | '500g' | '1kg';
  quantity: number;
  product: {
    name: string;
    image_url: string;
    price_250g: number;
    price_500g: number;
    price_1kg: number;
    stock_250g: number;
    stock_500g: number;
    stock_1kg: number;
  };
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (productId: string, size: '250g' | '500g' | '1kg') => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCartItems = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(name, image_url, price_250g, price_500g, price_1kg, stock_250g, stock_500g, stock_1kg)
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching cart:', error);
      toast({ title: 'Error', description: 'Failed to load cart', variant: 'destructive' });
    } else {
      // Type assertion to ensure size is properly typed
      const typedItems = (data || []).map(item => ({
        ...item,
        size: item.size as '250g' | '500g' | '1kg'
      })) as CartItem[];
      setItems(typedItems);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const addToCart = async (productId: string, size: '250g' | '500g' | '1kg') => {
    if (!user) {
      toast({ title: 'Please login', description: 'You need to login to add items to cart' });
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: productId,
        size,
        quantity: 1
      }, {
        onConflict: 'user_id,product_id,size',
        ignoreDuplicates: false
      });

    if (error) {
      console.error('Error adding to cart:', error);
      toast({ title: 'Error', description: 'Failed to add item to cart', variant: 'destructive' });
    } else {
      toast({ title: 'Added to cart!', description: 'Item added successfully' });
      fetchCartItems();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      console.error('Error updating quantity:', error);
      toast({ title: 'Error', description: 'Failed to update quantity', variant: 'destructive' });
    } else {
      fetchCartItems();
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing from cart:', error);
      toast({ title: 'Error', description: 'Failed to remove item', variant: 'destructive' });
    } else {
      toast({ title: 'Removed', description: 'Item removed from cart' });
      fetchCartItems();
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing cart:', error);
    } else {
      setItems([]);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.size === '250g' ? item.product.price_250g :
                  item.size === '500g' ? item.product.price_500g :
                  item.product.price_1kg;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalAmount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
