import api from './api';

export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategory: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  getCategoryBySlug: async (slug) => {
    const response = await api.get(`/categories/slug/${slug}`);
    return response.data;
  },

  getSubcategories: async (params = {}) => {
    const response = await api.get('/subcategories', { params });
    return response.data;
  },

  getSubcategory: async (id) => {
    const response = await api.get(`/subcategories/${id}`);
    return response.data;
  },

  getChildCategories: async (params = {}) => {
    const response = await api.get('/child-categories', { params });
    return response.data;
  },

  getChildCategory: async (id) => {
    const response = await api.get(`/child-categories/${id}`);
    return response.data;
  },

  getBrands: async () => {
    const response = await api.get('/brands');
    return response.data;
  },

  getBrand: async (id) => {
    const response = await api.get(`/brands/${id}`);
    return response.data;
  },

  getBrandBySlug: async (slug) => {
    const response = await api.get(`/brands/slug/${slug}`);
    return response.data;
  },
};
