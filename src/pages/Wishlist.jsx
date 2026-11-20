import { useState } from 'react';
import { useAuth, useCart, useWishlist } from '../store/hooks';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiShoppingCart, FiTrash2, FiShare2, FiGrid, FiList } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlist, loading, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMoveAllToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (wishlist.length === 0) return;

    setIsProcessing(true);
    try {
      let successCount = 0;
      let failCount = 0;

      for (const item of wishlist) {
        try {
          await addToCart({
            product_id: item.product.id,
            qty: 1,
            purchase_type: item.product.is_rentable ? 'rent' : 'buy',
            rental_duration: item.product.is_rentable ? 1 : null,
          });
          successCount++;
        } catch (error) {
          console.error('Error adding to cart:', error);
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} item(s) moved to cart!`);
      }
      if (failCount > 0) {
        toast.warning(`${failCount} item(s) could not be added`);
      }
    } catch (error) {
      console.error('Move to cart error:', error);
      toast.error('Failed to move items to cart');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage wishlist');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await clearWishlist();
      setShowClearConfirm(false);

      if (result && result.success) {
        toast.success('Wishlist cleared successfully');
      }
    } catch (error) {
      console.error('Clear wishlist error:', error);
      toast.error(error.response?.data?.message || 'Failed to clear wishlist');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My Wishlist',
          text: 'Check out my wishlist!',
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Wishlist link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <FiHeart className="text-accent" /> My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlist.length > 0
                  ? `${wishlist.length} item${wishlist.length > 1 ? 's' : ''} in your wishlist`
                  : 'Your wishlist is empty'}
              </p>
            </div>

            {wishlist.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleShare}
                  disabled={isProcessing}
                  className="btn btn-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiShare2 /> Share Wishlist
                </button>
                <button
                  onClick={handleMoveAllToCart}
                  disabled={isProcessing}
                  className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner-small"></div> Processing...
                    </>
                  ) : (
                    <>
                      <FiShoppingCart /> Move All to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  disabled={isProcessing}
                  className="btn bg-red-500 text-white hover:bg-red-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrash2 /> Clear Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {wishlist.length > 0 ? (
          <>
            {/* View Mode Toggle */}
            <div className="flex justify-end mb-6">
              <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title="Grid View"
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title="List View"
                >
                  <FiList />
                </button>
              </div>
            </div>

            {/* Wishlist Grid */}
            <div
              className={`grid ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1'
              } gap-6`}
            >
              {wishlist.map((item) => (
                <ProductCard key={item.id} product={item.product} />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600">
                Total: <span className="font-bold text-xl text-primary">{wishlist.length}</span> items
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn btn-outline">
                  Continue Shopping
                </Link>
                <button
                  onClick={handleMoveAllToCart}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FiShoppingCart /> Move All to Cart
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-8xl mb-6">❤️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Save your favorite items to your wishlist and come back to them anytime!
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/products" className="btn btn-primary flex items-center gap-2">
                <FiShoppingCart /> Browse Products
              </Link>
              <Link to="/products/rent" className="btn btn-outline">
                Explore Rentals
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
              <div className="text-center p-6">
                <div className="text-4xl mb-3">💝</div>
                <h3 className="font-semibold mb-2">Save Favorites</h3>
                <p className="text-sm text-gray-600">
                  Keep track of products you love by adding them to your wishlist
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-3">🔔</div>
                <h3 className="font-semibold mb-2">Price Alerts</h3>
                <p className="text-sm text-gray-600">
                  Get notified when items in your wishlist go on sale
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="font-semibold mb-2">Share & Gift</h3>
                <p className="text-sm text-gray-600">
                  Share your wishlist with friends and family for special occasions
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2">Clear Wishlist?</h3>
              <p className="text-gray-600">
                Are you sure you want to remove all {wishlist.length} item{wishlist.length > 1 ? 's' : ''} from
                your wishlist? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                disabled={isProcessing}
                className="flex-1 btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleClearWishlist}
                disabled={isProcessing}
                className="flex-1 btn bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Clearing...' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
