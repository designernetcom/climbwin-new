/**
 * Get the full URL for an image path from the API
 * @param {string} imagePath - Relative image path from API (e.g., "uploads/media_xxx.png")
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.jpg';

  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // Get base URL from environment variable or fallback to production URL
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://climb.rentalgurufurniture.com/api/v1';

  // Return full URL with Laravel public path
  return `${baseUrl}/${cleanPath}`;
};

/**
 * Get image URL or return placeholder
 * @param {string} imagePath - Image path from API
 * @param {string} placeholder - Custom placeholder path (optional)
 * @returns {string} - Full image URL or placeholder
 */
export const getImageUrlOrPlaceholder = (imagePath, placeholder = '/placeholder.jpg') => {
  return imagePath ? getImageUrl(imagePath) : placeholder;
};
