import api from './api';

export const settingService = {
  // Get general settings
  getGeneralSettings: async () => {
    const response = await api.get('/settings/general');
    return response.data;
  },

  // Get footer info
  getFooter: async () => {
    const response = await api.get('/settings/footer');
    return response.data;
  },

  // Get about page
  getAbout: async () => {
    const response = await api.get('/settings/about');
    return response.data;
  },

  // Get terms and conditions
  getTerms: async () => {
    const response = await api.get('/settings/terms');
    return response.data;
  },

  // Get how it works
  getHowItWorks: async () => {
    const response = await api.get('/settings/how-it-works');
    return response.data;
  },

  // Get vendor conditions
  getVendorConditions: async () => {
    const response = await api.get('/settings/vendor-conditions');
    return response.data;
  }
};
