export { authService } from './authService';
export { productService } from './productService';
export { cartService } from './cartService';
export { categoryService } from './categoryService';
export { flashSaleService } from './flashSaleService';
export { settingService } from './settingService';

import api from './api';

// Wishlist Service
export const wishlistService = {
  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },
  addToWishlist: async (productId) => {
    const response = await api.post('/wishlist', { product_id: productId });
    return response.data;
  },
  removeFromWishlist: async (id) => {
    const response = await api.delete(`/wishlist/${id}`);
    return response.data;
  },
  toggleWishlist: async (productId) => {
    const response = await api.post('/wishlist/toggle', { product_id: productId });
    return response.data;
  },
  clearWishlist: async () => {
    const response = await api.delete('/wishlist');
    return response.data;
  },
};

// Order Service
export const orderService = {
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  trackOrder: async (invoiceId) => {
    const response = await api.post('/orders/track', { invoice_id: invoiceId });
    return response.data;
  },
  getCheckoutData: async () => {
    const response = await api.get('/checkout-data');
    return response.data;
  },
  createOrder: async (data) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
  cancelOrder: async (id) => {
    const response = await api.post(`/orders/${id}/cancel`);
    return response.data;
  },
};

// Review Service
export const reviewService = {
  getProductReviews: async (productId) => {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data;
  },
  getUserReviews: async () => {
    const response = await api.get('/my-reviews');
    return response.data;
  },
  createReview: async (data) => {
    // If images are provided, use FormData
    if (data.images) {
      const formData = new FormData();
      formData.append('product_id', data.product_id);
      formData.append('rating', data.rating);
      formData.append('review', data.review);

      if (data.images && data.images.length > 0) {
        data.images.forEach((image, index) => {
          formData.append('images[]', image);
        });
      }

      const response = await api.post('/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } else {
      // If no images, send as JSON
      const response = await api.post('/reviews', data);
      return response.data;
    }
  },
  updateReview: async (id, data) => {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },
  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

// User Service
export const userService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.post('/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updatePassword: async (data) => {
    const response = await api.post('/profile/password', data);
    return response.data;
  },
  getAddresses: async () => {
    const response = await api.get('/addresses');
    return response.data;
  },
  createAddress: async (data) => {
    const response = await api.post('/addresses', data);
    return response.data;
  },
  updateAddress: async (id, data) => {
    const response = await api.put(`/addresses/${id}`, data);
    return response.data;
  },
  deleteAddress: async (id) => {
    const response = await api.delete(`/addresses/${id}`);
    return response.data;
  },
};

// Payment Service
export const paymentService = {
  getPaymentMethods: async () => {
    const response = await api.get('/payment-methods');
    return response.data;
  },
  createStripeIntent: async (orderId) => {
    const response = await api.post('/payment/stripe/intent', { order_id: orderId });
    return response.data;
  },
  confirmStripePayment: async (orderId, paymentIntentId) => {
    const response = await api.post('/payment/stripe/confirm', {
      order_id: orderId,
      payment_intent_id: paymentIntentId,
    });
    return response.data;
  },
  createPaypalOrder: async (orderId) => {
    const response = await api.post('/payment/paypal/create', { order_id: orderId });
    return response.data;
  },
  confirmPaypalPayment: async (orderId, paypalOrderId) => {
    const response = await api.post('/payment/paypal/confirm', {
      order_id: orderId,
      paypal_order_id: paypalOrderId,
    });
    return response.data;
  },
  createRazorpayOrder: async (orderId) => {
    const response = await api.post('/payment/razorpay/create', { order_id: orderId });
    return response.data;
  },
  confirmRazorpayPayment: async (orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature) => {
    const response = await api.post('/payment/razorpay/confirm', {
      order_id: orderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_order_id: razorpayOrderId,
      razorpay_signature: razorpaySignature,
    });
    return response.data;
  },
  confirmCodPayment: async (orderId) => {
    const response = await api.post('/payment/cod/confirm', { order_id: orderId });
    return response.data;
  },
};

// Vendor Service
export const vendorService = {
  getVendors: async () => {
    const response = await api.get('/vendors');
    return response.data;
  },
  getVendor: async (id) => {
    const response = await api.get(`/vendors/${id}`);
    return response.data;
  },
  getVendorProducts: async (id, params = {}) => {
    const response = await api.get(`/vendors/${id}/products`, { params });
    return response.data;
  },
  requestVendor: async (data) => {
    const response = await api.post('/vendor/request', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getVendorDashboard: async () => {
    const response = await api.get('/vendor/dashboard');
    return response.data;
  },
  getVendorOrders: async () => {
    const response = await api.get('/vendor/orders');
    return response.data;
  },
  updateVendorProfile: async (data) => {
    const response = await api.post('/vendor/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
