import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 12;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecentlyViewed(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
    }
  };

  const addToRecentlyViewed = (product) => {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

      // Remove if already exists
      const filtered = current.filter(item => item.id !== product.id);

      // Add to beginning
      const updated = [
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          thumb_image: product.thumb_image,
          price: product.price,
          offer_price: product.offer_price,
          is_rentable: product.is_rentable,
          reviews_avg_rating: product.reviews_avg_rating,
          reviews_count: product.reviews_count,
          qty: product.qty,
          viewedAt: new Date().toISOString(),
        },
        ...filtered
      ].slice(0, MAX_ITEMS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecentlyViewed(updated);
    } catch (error) {
      console.error('Failed to add to recently viewed:', error);
    }
  };

  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    } catch (error) {
      console.error('Failed to clear recently viewed:', error);
    }
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
};
