import { useCart } from '../store/hooks';
import { Link } from 'react-router-dom';
import { FiTrash2, FiCalendar, FiShoppingCart, FiTag, FiTruck, FiShield, FiHeart, FiPackage } from 'react-icons/fi';
import { getImageUrl } from '../utils/imageHelper';

const Cart = () => {
  const { cart, updateCartItem, removeCartItem, loading } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="mb-6">
              <FiShoppingCart className="w-24 h-24 mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
            <Link
              to="/products"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-8 rounded-lg transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate savings
  const calculateSavings = () => {
    let savings = 0;
    cart.items.forEach(item => {
      if (item.product?.price && item.product?.offer_price) {
        savings += (item.product.price - item.product.offer_price) * item.qty;
      }
    });
    return savings.toFixed(2);
  };

  const totalSavings = calculateSavings();

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Shopping Cart</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiPackage className="w-4 h-4" />
            <span>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cart Items - Left Section */}
          <div className="lg:col-span-8">
            {/* Delivery Banner */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex items-center gap-3">
              <FiTruck className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">FREE Delivery on this order</p>
                <p className="text-sm text-gray-600">Your order qualifies for FREE delivery</p>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
              {cart.items.map((item) => {
                const isRental = item.purchase_type === 'rent' || item.rental_duration;
                const itemSavings = item.product?.price && item.product?.offer_price
                  ? ((item.product.price - item.product.offer_price) * item.qty).toFixed(2)
                  : 0;

                return (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link to={`/products/${item.product?.slug}`} className="flex-shrink-0">
                        <img
                          src={getImageUrl(item.product?.thumb_image)}
                          alt={item.product?.name}
                          className="w-32 h-32 object-cover rounded border border-gray-200"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        {/* Product Name */}
                        <Link
                          to={`/products/${item.product?.slug}`}
                          className="text-base font-medium text-gray-900 hover:text-primary line-clamp-2 mb-1"
                        >
                          {item.product?.name}
                        </Link>

                        {/* Type Badge */}
                        {isRental ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium mb-2">
                            <FiCalendar className="w-3 h-3" />
                            Rental
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium mb-2">
                            <FiShoppingCart className="w-3 h-3" />
                            Purchase
                          </span>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-green-700 font-medium">In Stock</span>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <span className="text-2xl font-medium text-red-700">₹{item.price}</span>
                          {itemSavings > 0 && (
                            <div className="text-sm text-gray-600 mt-1">
                              You save: <span className="text-green-600 font-medium">₹{itemSavings}</span>
                            </div>
                          )}
                        </div>

                        {/* Quantity/Duration Controls */}
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          {isRental ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-700">Duration:</span>
                              <span className="text-sm font-medium text-gray-900">
                                {item.rental_duration} {item.rental_duration === 1 ? 'Month' : 'Months'}
                              </span>
                              {item.rental_duration >= 3 && (
                                <span className="text-xs text-green-600 font-medium">
                                  ({item.rental_duration >= 24 ? '25%' : item.rental_duration >= 12 ? '20%' : item.rental_duration >= 6 ? '10%' : '5%'} off)
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-700">Qty:</span>
                              <select
                                value={item.qty}
                                onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                                className="px-3 py-1.5 border border-gray-300 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 text-sm">
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-1"
                          >
                            <FiTrash2 className="w-4 h-4" />
                            Delete
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-gray-700 hover:text-primary font-medium flex items-center gap-1">
                            <FiHeart className="w-4 h-4" />
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

          {/* Cart Summary - Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-4">
              {/* Main Summary Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                {/* Subtotal Header */}
                <div className="mb-4 pb-4 border-b">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg text-gray-700">Subtotal ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}):</span>
                  </div>
                  <div className="text-3xl font-medium text-gray-900">₹{parseFloat(cart.subtotal || 0).toFixed(2)}</div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all text-center block mb-3"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/products"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all text-center block text-sm"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Savings Highlight */}
              {totalSavings > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <FiTag className="w-5 h-5" />
                    <span className="font-semibold">Your Savings</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">₹{totalSavings}</div>
                  <p className="text-sm text-green-700 mt-1">You're saving on this order!</p>
                </div>
              )}

              {/* Order Details Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900 font-medium">₹{parseFloat(cart.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings:</span>
                      <span className="font-medium">-₹{totalSavings}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-semibold text-base">
                    <span className="text-gray-900">Order Total:</span>
                    <span className="text-red-700">₹{parseFloat(cart.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <FiShield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiTruck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Free delivery on all orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPackage className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">Easy returns within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
