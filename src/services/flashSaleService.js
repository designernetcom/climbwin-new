import api from './api';

export const flashSaleService = {
  // Get flash sale items
  getFlashSales: async (params = {}) => {
    const response = await api.get('/flash-sales', { params });
    return response.data;
  },

  // Get flash sale end date
  getEndDate: async () => {
    const response = await api.get('/flash-sales/end-date');
    return response.data;
  }
};
