import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../../services';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  cart: {
    items: [],
    subtotal: 0,
    total: 0,
    item_count: 0,
  },
  loading: false,
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue('Failed to fetch cart');
    } catch (error) {
      console.error('Error fetching cart:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(data);
      if (response.success) {
        toast.success('Product added to cart!');
        dispatch(fetchCart());
        return response.data;
      }
      return rejectWithValue('Failed to add to cart');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, qty }, { dispatch, rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(id, { qty });
      if (response.success) {
        dispatch(fetchCart());
        return response.data;
      }
      return rejectWithValue('Failed to update cart');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await cartService.removeCartItem(id);
      if (response.success) {
        toast.success('Item removed from cart');
        dispatch(fetchCart());
        return id;
      }
      return rejectWithValue('Failed to remove item');
    } catch (error) {
      toast.error('Failed to remove item');
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.clearCart();
      if (response.success) {
        toast.success('Cart cleared');
        return null;
      }
      return rejectWithValue('Failed to clear cart');
    } catch (error) {
      toast.error('Failed to clear cart');
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await cartService.applyCoupon(couponCode);
      if (response.success) {
        toast.success('Coupon applied successfully!');
        return response.data;
      }
      return rejectWithValue('Invalid coupon code');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid coupon code';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = {
          items: [],
          subtotal: 0,
          total: 0,
          item_count: 0,
        };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector to check if a product is in the cart
export const selectIsProductInCart = (state, productId, purchaseType = 'buy') => {
  const { cart } = state.cart;

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
};

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
