import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistService } from '../../services';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.getWishlist();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue('Failed to fetch wishlist');
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      if (response.success) {
        toast.success('Added to wishlist!');
        dispatch(fetchWishlist());
        return response.data;
      }
      return rejectWithValue('Failed to add to wishlist');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await wishlistService.removeFromWishlist(id);
      if (response.success) {
        toast.success('Removed from wishlist');
        dispatch(fetchWishlist());
        return id;
      }
      return rejectWithValue('Failed to remove from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const response = await wishlistService.toggleWishlist(productId);
      if (response.success) {
        const message = response.message || (response.in_wishlist ? 'Added to wishlist!' : 'Removed from wishlist');
        toast.success(message);
        dispatch(fetchWishlist());
        return { inWishlist: response.in_wishlist };
      }
      return rejectWithValue('Failed to update wishlist');
    } catch (error) {
      console.error('Toggle wishlist error:', error);
      const message = error.response?.data?.message || 'Failed to update wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.clearWishlist();
      if (response.success) {
        toast.success('Wishlist cleared');
        return null;
      }
      return rejectWithValue('Failed to clear wishlist');
    } catch (error) {
      toast.error('Failed to clear wishlist');
      return rejectWithValue(error.response?.data?.message || 'Failed to clear wishlist');
    }
  }
);

// Wishlist slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Wishlist
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Clear Wishlist
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;
        state.wishlist = [];
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector to check if a product is in the wishlist
export const selectIsInWishlist = (state, productId) => {
  return state.wishlist.wishlist.some(item => item.product_id === productId);
};

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
