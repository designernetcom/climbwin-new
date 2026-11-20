import api from './api';

export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  // Verify newsletter subscription
  verify: async (token) => {
    const response = await api.get(`/newsletter/verify/${token}`);
    return response.data;
  }
};
