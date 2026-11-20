import api from './api';

export const shippingService = {
  // Get all shipping rules
  getShippingRules: async () => {
    const response = await api.get('/shipping-rules');
    return response.data;
  },

  // Get single shipping rule
  getShippingRule: async (id) => {
    const response = await api.get(`/shipping-rules/${id}`);
    return response.data;
  },

  // Calculate shipping
  calculateShipping: async (subTotal) => {
    const response = await api.post('/shipping/calculate', { sub_total: subTotal });
    return response.data;
  }
};
