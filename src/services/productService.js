import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductBySlug: async (slug) => {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  getFeaturedProducts: async (params = {}) => {
    const response = await api.get('/products/featured/list', { params });
    return response.data;
  },

  getProductsByType: async (type, params = {}) => {
    const response = await api.get(`/products/type/${type}`, { params });
    return response.data;
  },

  getRelatedProducts: async (id, params = {}) => {
    const response = await api.get(`/products/${id}/related`, { params });
    return response.data;
  },
};
