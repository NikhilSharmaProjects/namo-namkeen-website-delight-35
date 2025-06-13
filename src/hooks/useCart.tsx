
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

interface GuestCartItem {
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
  items: (CartItem | GuestCartItem)[];
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
  const [items, setItems] = useState<(CartItem | GuestCartItem)[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage for guest users
  const loadGuestCart = () => {
    const guestCart = localStorage.getItem('guest_cart');
    return guestCart ? JSON.parse(guestCart) : [];
  };

  // Save cart to localStorage for guest users
  const saveGuestCart = (cartItems: GuestCartItem[]) => {
    localStorage.setItem('guest_cart', JSON.stringify(cartItems));
  };

  const fetchCartItems = async () => {
    if (!user) {
      // Load from localStorage for guest users
      const guestItems = loadGuestCart();
      setItems(guestItems);
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
    // Fetch product details first
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      toast({ title: 'Error', description: 'Product not found', variant: 'destructive' });
      return;
    }

    if (!user) {
      // Guest user - store in localStorage
      const guestCart = loadGuestCart();
      const existingItemIndex = guestCart.findIndex((item: GuestCartItem) => 
        item.product_id === productId && item.size === size
      );

      if (existingItemIndex >= 0) {
        guestCart[existingItemIndex].quantity += 1;
      } else {
        guestCart.push({
          product_id: productId,
          size,
          quantity: 1,
          product: {
            name: product.name,
            image_url: product.image_url,
            price_250g: product.price_250g,
            price_500g: product.price_500g,
            price_1kg: product.price_1kg,
            stock_250g: product.stock_250g,
            stock_500g: product.stock_500g,
            stock_1kg: product.stock_1kg,
          }
        });
      }

      saveGuestCart(guestCart);
      setItems(guestCart);
      toast({ title: 'Added to cart!', description: 'Item added successfully' });
      return;
    }

    // Logged in user - store in database
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

    if (!user) {
      // Guest user
      const guestCart = loadGuestCart();
      const itemIndex = guestCart.findIndex((item: GuestCartItem) => 
        `${item.product_id}-${item.size}` === itemId
      );
      
      if (itemIndex >= 0) {
        guestCart[itemIndex].quantity = quantity;
        saveGuestCart(guestCart);
        setItems(guestCart);
      }
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
    if (!user) {
      // Guest user
      const guestCart = loadGuestCart();
      const filteredCart = guestCart.filter((item: GuestCartItem) => 
        `${item.product_id}-${item.size}` !== itemId
      );
      saveGuestCart(filteredCart);
      setItems(filteredCart);
      toast({ title: 'Removed', description: 'Item removed from cart' });
      return;
    }

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
    if (!user) {
      localStorage.removeItem('guest_cart');
      setItems([]);
      return;
    }

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
