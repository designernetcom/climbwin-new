import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FiClock, FiX } from 'react-icons/fi';

const RecentlyViewedPage = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  if (recentlyViewed.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <FiClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Recently Viewed Products</h2>
        <p className="text-gray-600 mb-6">
          Products you view will appear here for easy access
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FiClock className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">Recently Viewed</h1>
              </div>
              <p className="text-gray-600">
                You have viewed {recentlyViewed.length} product{recentlyViewed.length !== 1 ? 's' : ''} recently
              </p>
            </div>
            <button
              onClick={clearRecentlyViewed}
              className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <FiX />
              Clear History
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="mt-2 text-xs text-gray-500 text-center">
                Viewed {formatDate(product.viewedAt)}
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-3">About Recently Viewed</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              • We keep track of products you've viewed to help you find them again easily
            </p>
            <p>
              • Your history is stored locally in your browser and is not shared with anyone
            </p>
            <p>
              • We store up to 12 products in your recently viewed list
            </p>
            <p>
              • You can clear your history at any time using the "Clear History" button
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedPage;
