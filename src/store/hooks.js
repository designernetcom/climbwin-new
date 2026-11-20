import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import * as authActions from './slices/authSlice';
import * as cartActions from './slices/cartSlice';
import * as wishlistActions from './slices/wishlistSlice';

// Auth Hook
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, error } = useSelector((state) => state.auth);

  const login = useCallback(async (credentials) => {
    const result = await dispatch(authActions.login(credentials));
    if (authActions.login.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const register = useCallback(async (data) => {
    const result = await dispatch(authActions.register(data));
    if (authActions.register.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const logout = useCallback(async () => {
    await dispatch(authActions.logout());
  }, [dispatch]);

  const updateUser = useCallback((userData) => {
    dispatch(authActions.updateUser(userData));
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    await dispatch(authActions.checkAuth());
  }, [dispatch]);

  return {
    user,
    loading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };
};

// Cart Hook
export const useCart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  const fetchCart = useCallback(async () => {
    await dispatch(cartActions.fetchCart());
  }, [dispatch]);

  const addToCart = useCallback(async (data) => {
    const result = await dispatch(cartActions.addToCart(data));
    if (cartActions.addToCart.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const updateCartItem = useCallback(async (id, qty) => {
    const result = await dispatch(cartActions.updateCartItem({ id, qty }));
    if (cartActions.updateCartItem.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const removeCartItem = useCallback(async (id) => {
    const result = await dispatch(cartActions.removeCartItem(id));
    if (cartActions.removeCartItem.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const clearCart = useCallback(async () => {
    const result = await dispatch(cartActions.clearCart());
    if (cartActions.clearCart.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const applyCoupon = useCallback(async (couponCode) => {
    const result = await dispatch(cartActions.applyCoupon(couponCode));
    if (cartActions.applyCoupon.fulfilled.match(result)) {
      return { success: true, data: result.payload };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const isProductInCart = useCallback((productId, purchaseType = 'buy') => {
    if (!cart || !cart.items || cart.items.length === 0) {
      return false;
    }

    return cart.items.some(item => {
      const itemProductId = item.options?.product_id || item.product_id;
      const itemIsRental = item.options?.is_rental || item.is_rental || false;

      if (purchaseType === 'rent') {
        return itemProductId == productId && itemIsRental;
      } else {
        return itemProductId == productId && !itemIsRental;
      }
    });
  }, [cart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    applyCoupon,
    isProductInCart,
  };
};

// Wishlist Hook
export const useWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  const fetchWishlist = useCallback(async () => {
    await dispatch(wishlistActions.fetchWishlist());
  }, [dispatch]);

  const addToWishlist = useCallback(async (productId) => {
    const result = await dispatch(wishlistActions.addToWishlist(productId));
    if (wishlistActions.addToWishlist.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const removeFromWishlist = useCallback(async (id) => {
    const result = await dispatch(wishlistActions.removeFromWishlist(id));
    if (wishlistActions.removeFromWishlist.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const toggleWishlist = useCallback(async (productId) => {
    const result = await dispatch(wishlistActions.toggleWishlist(productId));
    if (wishlistActions.toggleWishlist.fulfilled.match(result)) {
      return { success: true, inWishlist: result.payload.inWishlist };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const clearWishlist = useCallback(async () => {
    const result = await dispatch(wishlistActions.clearWishlist());
    if (wishlistActions.clearWishlist.fulfilled.match(result)) {
      return { success: true };
    }
    return { success: false, message: result.payload };
  }, [dispatch]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.product_id === productId);
  }, [wishlist]);

  return {
    wishlist,
    loading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
  };
};
