import api from './api';

export const blogService = {
  // Get all blogs
  getBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  // Get single blog
  getBlog: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Get blog by slug
  getBlogBySlug: async (slug) => {
    const response = await api.get(`/blogs/slug/${slug}`);
    return response.data;
  },

  // Get blog categories
  getCategories: async () => {
    const response = await api.get('/blog-categories');
    return response.data;
  },

  // Get blog comments
  getComments: async (blogId) => {
    const response = await api.get(`/blogs/${blogId}/comments`);
    return response.data;
  },

  // Create comment (protected)
  createComment: async (blogId, comment) => {
    const response = await api.post(`/blogs/${blogId}/comments`, { comment });
    return response.data;
  },

  // Update comment (protected)
  updateComment: async (commentId, comment) => {
    const response = await api.put(`/blog-comments/${commentId}`, { comment });
    return response.data;
  },

  // Delete comment (protected)
  deleteComment: async (commentId) => {
    const response = await api.delete(`/blog-comments/${commentId}`);
    return response.data;
  }
};
