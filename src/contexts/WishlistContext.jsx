import { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../services';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      if (response.success) {
        setWishlist(response.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      if (response.success) {
        await fetchWishlist();
        toast.success('Added to wishlist!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to wishlist';
      toast.error(message);
      return { success: false };
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const response = await wishlistService.removeFromWishlist(id);
      if (response.success) {
        await fetchWishlist();
        toast.success('Removed from wishlist');
        return { success: true };
      }
    } catch (error) {
      toast.error('Failed to remove from wishlist');
      return { success: false };
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const response = await wishlistService.toggleWishlist(productId);
      if (response.success) {
        await fetchWishlist();
        const message = response.message || (response.in_wishlist ? 'Added to wishlist!' : 'Removed from wishlist');
        toast.success(message);
        return { success: true, inWishlist: response.in_wishlist };
      }
    } catch (error) {
      console.error('Toggle wishlist error:', error);
      const message = error.response?.data?.message || 'Failed to update wishlist';
      toast.error(message);
      return { success: false };
    }
  };

  const clearWishlist = async () => {
    try {
      const response = await wishlistService.clearWishlist();
      if (response.success) {
        setWishlist([]);
        toast.success('Wishlist cleared');
        return { success: true };
      }
    } catch (error) {
      toast.error('Failed to clear wishlist');
      return { success: false };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId);
  };

  const value = {
    wishlist,
    loading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
