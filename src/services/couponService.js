import api from './api';

export const couponService = {
  // Validate coupon
  validateCoupon: async (code) => {
    const response = await api.post('/coupons/validate', { code });
    return response.data;
  },

  // Get coupon by code
  getCoupon: async (code) => {
    const response = await api.get(`/coupons/${code}`);
    return response.data;
  }
};
