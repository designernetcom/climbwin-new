import api from './api';

export const advertisementService = {
  // Get all advertisements
  getAdvertisements: async () => {
    const response = await api.get('/advertisements');
    return response.data;
  },

  // Get homepage advertisements
  getHomepageAds: async () => {
    const response = await api.get('/advertisements/homepage');
    return response.data;
  },

  // Get product page advertisement
  getProductPageAd: async () => {
    const response = await api.get('/advertisements/product-page');
    return response.data;
  },

  // Get cart page advertisement
  getCartPageAd: async () => {
    const response = await api.get('/advertisements/cart-page');
    return response.data;
  },

  // Get specific advertisement
  getAdvertisement: async (key) => {
    const response = await api.get(`/advertisements/${key}`);
    return response.data;
  }
};
