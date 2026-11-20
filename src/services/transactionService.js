import api from './api';

export const transactionService = {
  // Get user transactions
  getTransactions: async (params = {}) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  // Get single transaction
  getTransaction: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // Get transaction by transaction ID
  getTransactionByTid: async (transactionId) => {
    const response = await api.get(`/transactions/tid/${transactionId}`);
    return response.data;
  }
};
