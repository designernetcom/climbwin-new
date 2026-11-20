import { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total: 0, item_count: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (data) => {
    try {
      const response = await cartService.addToCart(data);
      if (response.success) {
        await fetchCart();
        toast.success('Product added to cart!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await cartService.updateCartItem(id, { qty });
      if (response.success) {
        await fetchCart();
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
      return { success: false };
    }
  };

  const removeCartItem = async (id) => {
    try {
      const response = await cartService.removeCartItem(id);
      if (response.success) {
        await fetchCart();
        toast.success('Item removed from cart');
        return { success: true };
      }
    } catch (error) {
      toast.error('Failed to remove item');
      return { success: false };
    }
  };

  const clearCart = async () => {
    try {
      const response = await cartService.clearCart();
      if (response.success) {
        setCart({ items: [], subtotal: 0, total: 0, item_count: 0 });
        toast.success('Cart cleared');
        return { success: true };
      }
    } catch (error) {
      toast.error('Failed to clear cart');
      return { success: false };
    }
  };

  const applyCoupon = async (couponCode) => {
    try {
      const response = await cartService.applyCoupon(couponCode);
      if (response.success) {
        toast.success('Coupon applied successfully!');
        return { success: true, data: response.data };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid coupon code';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Check if a product is in the cart
  const isProductInCart = (productId, purchaseType = 'buy') => {
    if (!cart || !cart.items || cart.items.length === 0) {
      return false;
    }

    return cart.items.some(item => {
      // Check if the item matches the product ID
      const itemProductId = item.options?.product_id || item.product_id;
      const itemIsRental = item.options?.is_rental || item.is_rental || false;

      if (purchaseType === 'rent') {
        return itemProductId == productId && itemIsRental;
      } else {
        return itemProductId == productId && !itemIsRental;
      }
    });
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    applyCoupon,
    isProductInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
