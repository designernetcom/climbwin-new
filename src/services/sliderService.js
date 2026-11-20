import api from './api';

export const sliderService = {
  // Get all active sliders
  getSliders: async () => {
    const response = await api.get('/sliders');
    return response.data;
  },

  // Get single slider
  getSlider: async (id) => {
    const response = await api.get(`/sliders/${id}`);
    return response.data;
  }
};
