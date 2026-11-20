import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import ProductCard from './ProductCard';
import { FiClock, FiX } from 'react-icons/fi';

const RecentlyViewed = ({ limit = 4, showClearButton = false }) => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  const displayProducts = limit ? recentlyViewed.slice(0, limit) : recentlyViewed;

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FiClock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
        </div>
        {showClearButton && recentlyViewed.length > 0 && (
          <button
            onClick={clearRecentlyViewed}
            className="btn btn-sm btn-outline text-red-600 border-red-600 hover:bg-red-50 flex items-center gap-1"
          >
            <FiX className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {limit && recentlyViewed.length > limit && (
        <div className="text-center mt-6">
          <a
            href="/recently-viewed"
            className="text-primary hover:underline font-medium"
          >
            View all {recentlyViewed.length} recently viewed products →
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
