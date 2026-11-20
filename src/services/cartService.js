import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (data) => {
    const response = await api.post('/cart', data);
    return response.data;
  },

  updateCartItem: async (id, data) => {
    const response = await api.put(`/cart/${id}`, data);
    return response.data;
  },

  removeCartItem: async (id) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },

  applyCoupon: async (couponCode) => {
    const response = await api.post('/cart/apply-coupon', { coupon_code: couponCode });
    return response.data;
  },

  checkProductInCart: async (productId, purchaseType = 'buy', rentalDuration = 1) => {
    const response = await api.post('/cart/check-product-in-cart', {
      product_id: productId,
      purchase_type: purchaseType,
      rental_duration: rentalDuration
    });
    return response.data;
  },
};
