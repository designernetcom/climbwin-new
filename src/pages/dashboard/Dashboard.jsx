import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService, reviewService } from '../../services';
import { useAuth, useWishlist } from '../../store/hooks';
import {
  FiShoppingBag, FiHeart, FiStar, FiTrendingUp,
  FiClock, FiCheckCircle, FiXCircle, FiPackage, FiDollarSign,
  FiSearch, FiMapPin, FiTruck, FiAlertCircle
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalSpent: 0,
    wishlistCount: 0,
    reviewsCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Order Tracking States
  const [trackingInvoiceId, setTrackingInvoiceId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Update wishlist count when wishlist changes
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      wishlistCount: wishlist.length,
    }));
  }, [wishlist]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [ordersResponse, reviewsResponse] = await Promise.all([
        orderService.getOrders(),
        reviewService.getUserReviews(),
      ]);

      console.log('Orders Response:', ordersResponse);
      console.log('Reviews Response:', reviewsResponse);

      // Handle pagination response structure
      const orders = Array.isArray(ordersResponse.data?.data)
        ? ordersResponse.data.data
        : Array.isArray(ordersResponse.data)
        ? ordersResponse.data
        : [];

      const reviews = Array.isArray(reviewsResponse.data)
        ? reviewsResponse.data
        : [];

      console.log('Parsed Orders:', orders);
      console.log('Parsed Reviews:', reviews);

      // Calculate statistics - using order_status field (as per API)
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(o => o.order_status === 'pending' || o.order_status === 'processed_and_ready_to_ship').length;
      const completedOrders = orders.filter(o => o.order_status === 'completed' || o.order_status === 'delivered').length;
      const cancelledOrders = orders.filter(o => o.order_status === 'canceled').length;

      // Use 'amount' field for total (as per API)
      const totalSpent = orders
        .filter(o => o.order_status !== 'canceled')
        .reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalSpent: totalSpent.toFixed(2),
        wishlistCount: wishlist.length,
        reviewsCount: reviews.length,
      });

      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processed_and_ready_to_ship: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: FiClock,
      processed_and_ready_to_ship: FiPackage,
      shipped: FiTrendingUp,
      delivered: FiCheckCircle,
      completed: FiCheckCircle,
      canceled: FiXCircle,
      cancelled: FiXCircle,
    };
    const Icon = icons[status] || FiClock;
    return <Icon className="w-4 h-4" />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      processed_and_ready_to_ship: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      completed: 'Completed',
      canceled: 'Canceled',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackingInvoiceId.trim()) {
      Swal.fire('Error', 'Please enter an invoice ID', 'error');
      return;
    }

    try {
      setTrackingLoading(true);
      setTrackingError(null);
      const response = await orderService.trackOrder(trackingInvoiceId);
      console.log('Track Order Response:', response);
      // Handle different response structures
      const orderData = response.order || response.data;
      setTrackedOrder(orderData);
    } catch (error) {
      console.error('Failed to track order:', error);
      setTrackingError(error.response?.data?.message || 'Order not found');
      setTrackedOrder(null);
      Swal.fire('Error', error.response?.data?.message || 'Order not found', 'error');
    } finally {
      setTrackingLoading(false);
    }
  };

  const clearTracking = () => {
    setTrackingInvoiceId('');
    setTrackedOrder(null);
    setTrackingError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders */}
        <div className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FiShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm text-gray-500">Total Orders</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          <Link to="/dashboard/orders" className="text-sm text-primary hover:underline mt-2 inline-block">
            View all orders →
          </Link>
        </div>

        {/* Pending Orders */}
        <div className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FiClock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
          <p className="text-sm text-gray-600 mt-2">In processing</p>
        </div>

        {/* Completed Orders */}
        <div className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
          <p className="text-sm text-gray-600 mt-2">Successfully delivered</p>
        </div>

        {/* Total Spent */}
        <div className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total Spent</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹{stats.totalSpent}</p>
          <p className="text-sm text-gray-600 mt-2">All time</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="bg-accent/10 p-3 rounded-lg">
              <FiHeart className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.wishlistCount}</p>
              <p className="text-sm text-gray-600">Wishlist Items</p>
              <Link to="/wishlist" className="text-xs text-accent hover:underline">
                View wishlist →
              </Link>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FiStar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.reviewsCount}</p>
              <p className="text-sm text-gray-600">Your Reviews</p>
              <Link to="/dashboard/orders" className="text-xs text-yellow-600 hover:underline">
                Write a review →
              </Link>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <FiXCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.cancelledOrders}</p>
              <p className="text-sm text-gray-600">Cancelled Orders</p>
              <p className="text-xs text-gray-500">All time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Tracking Section */}
      <div className="card p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FiSearch className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Track Your Order</h2>
            <p className="text-sm text-gray-600">Enter invoice ID to track shipment</p>
          </div>
        </div>

        {/* Tracking Form */}
        <form onSubmit={handleTrackOrder} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={trackingInvoiceId}
              onChange={(e) => setTrackingInvoiceId(e.target.value)}
              placeholder="e.g., INV-2024-001234"
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={trackingLoading}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {trackingLoading ? (
                <>
                  <div className="spinner w-5 h-5 border-2" />
                  Tracking...
                </>
              ) : (
                <>
                  <FiSearch className="w-5 h-5" />
                  Track
                </>
              )}
            </button>
            {trackedOrder && (
              <button
                type="button"
                onClick={clearTracking}
                className="btn bg-gray-500 text-white hover:bg-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Tracked Order Details */}
        {trackedOrder && (
          <div className="border-t pt-6">
            <div className="bg-gradient-to-r from-primary/10 to-purple-100 rounded-lg p-6 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    Order #{trackedOrder.invocie_id || trackedOrder.invoice_id}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(trackedOrder.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(trackedOrder.order_status || trackedOrder.status)}`}>
                  {getStatusIcon(trackedOrder.order_status || trackedOrder.status)}
                  <span className="ml-2">{getStatusLabel(trackedOrder.order_status || trackedOrder.status)}</span>
                </span>
              </div>
            </div>

            {/* Order Timeline */}
            {(trackedOrder.order_status || trackedOrder.status) !== 'canceled' &&
             (trackedOrder.order_status || trackedOrder.status) !== 'cancelled' && (
              <div className="mb-6">
                <h4 className="font-semibold mb-4">Shipment Progress</h4>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-8 left-0 w-full h-1 bg-gray-200 hidden md:block" />

                  {/* Steps */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: 'pending', label: 'Placed', icon: FiCheckCircle },
                      { key: 'processing', label: 'Processing', icon: FiPackage },
                      { key: 'shipped', label: 'Shipped', icon: FiTruck },
                      { key: 'delivered', label: 'Delivered', icon: FiMapPin }
                    ].map((step, index) => {
                      const Icon = step.icon;
                      const statusOrder = ['pending', 'processed_and_ready_to_ship', 'shipped', 'delivered', 'completed'];
                      const orderStatus = trackedOrder.order_status || trackedOrder.status;
                      const currentIndex = statusOrder.indexOf(orderStatus);
                      const isCompleted = index <= currentIndex;
                      const isActive = statusOrder[index] === orderStatus;

                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition ${
                              isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                            } ${isActive ? 'ring-4 ring-primary/30 scale-110' : ''}`}
                          >
                            <Icon className="w-7 h-7" />
                          </div>
                          <p className={`text-xs font-semibold text-center ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          {isActive && <p className="text-xs text-primary mt-1">Current</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Order Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  Delivery Address
                </p>
                <p className="font-semibold">{trackedOrder.address?.name || 'N/A'}</p>
                <p className="text-sm text-gray-700">
                  {trackedOrder.address?.city}, {trackedOrder.address?.state}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FiPackage className="w-4 h-4" />
                  Payment Method
                </p>
                <p className="font-semibold capitalize">{trackedOrder.payment_method?.name || 'N/A'}</p>
                <p className="text-sm text-gray-700">
                  {trackedOrder.payment_status === 'paid' ? 'Paid' : 'Pending'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FiDollarSign className="w-4 h-4" />
                  Order Total
                </p>
                <p className="text-2xl font-bold text-primary">
                  {trackedOrder.currency_icon || '₹'}{trackedOrder.amount || trackedOrder.total}
                </p>
                <p className="text-sm text-gray-700">
                  {trackedOrder.product_qty || trackedOrder.items?.length || 0} item(s)
                </p>
              </div>
            </div>

            {/* View Full Details Button */}
            <div className="mt-4 text-center">
              <Link
                to={`/dashboard/orders/${trackedOrder.id}`}
                className="btn btn-primary"
              >
                View Full Order Details
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-primary hover:underline">
            View All
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      #{order.invocie_id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                      {order.currency_icon || '₹'}{order.amount}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.order_status)}`}>
                        {getStatusIcon(order.order_status)}
                        {getStatusLabel(order.order_status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        to={`/dashboard/orders/${order.id}`}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Link to="/products" className="card p-4 text-center hover:shadow-lg transition">
          <FiShoppingBag className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="font-semibold">Shop Products</p>
        </Link>
        <Link to="/dashboard/orders" className="card p-4 text-center hover:shadow-lg transition">
          <FiPackage className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="font-semibold">Track Orders</p>
        </Link>
        <Link to="/dashboard/profile" className="card p-4 text-center hover:shadow-lg transition">
          <FiCheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="font-semibold">Update Profile</p>
        </Link>
        <Link to="/wishlist" className="card p-4 text-center hover:shadow-lg transition">
          <FiHeart className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="font-semibold">View Wishlist</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
