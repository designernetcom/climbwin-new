import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../store/slices/authSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { fetchWishlist } from '../store/slices/wishlistSlice';

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication on mount
    console.log('[AppInitializer] Checking authentication...');
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // Fetch cart and wishlist when user is authenticated
    console.log('[AppInitializer] Auth status:', { isAuthenticated, authLoading });
    if (isAuthenticated && !authLoading) {
      console.log('[AppInitializer] Fetching cart and wishlist...');
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, authLoading, dispatch]);

  return children;
};

export default AppInitializer;
