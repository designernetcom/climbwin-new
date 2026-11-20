import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services';
import { getImageUrl } from '../../utils/imageHelper';
import { FiPackage, FiTruck, FiCheck, FiX, FiClock, FiEye, FiCalendar, FiShoppingCart } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, delivered, canceled

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();

      console.log('Orders Response:', response);

      if (response.success && response.data) {
        // Handle pagination
        const ordersData = response.data.data || response.data;
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      Swal.fire('Error', 'Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: 'Pending',
        icon: FiClock,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-300',
      },
      processed_and_ready_to_ship: {
        label: 'Ready to Ship',
        icon: FiPackage,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-300',
      },
      shipped: {
        label: 'Shipped',
        icon: FiTruck,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-300',
      },
      delivered: {
        label: 'Delivered',
        icon: FiCheck,
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-300',
      },
      canceled: {
        label: 'Canceled',
        icon: FiX,
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    return status === 1 ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
        <FiCheck className="w-3 h-3" />
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
        <FiClock className="w-3 h-3" />
        Pending
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.order_status === filter;
  });

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-primary'
          }`}
        >
          All Orders ({orders.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'pending'
              ? 'bg-yellow-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-yellow-500'
          }`}
        >
          Pending ({orders.filter(o => o.order_status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('shipped')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'shipped'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-500'
          }`}
        >
          Shipped ({orders.filter(o => o.order_status === 'shipped').length})
        </button>
        <button
          onClick={() => setFilter('delivered')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'delivered'
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-green-500'
          }`}
        >
          Delivered ({orders.filter(o => o.order_status === 'delivered').length})
        </button>
        <button
          onClick={() => setFilter('canceled')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'canceled'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-red-500'
          }`}
        >
          Canceled ({orders.filter(o => o.order_status === 'canceled').length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all'
              ? "You haven't placed any orders yet"
              : `No ${filter} orders found`
            }
          </p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">Order #{order.invocie_id}</h3>
                    {getStatusBadge(order.order_status)}
                    {getPaymentStatusBadge(order.payment_status)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Payment: <span className="font-semibold capitalize">{order.payment_method}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    {order.currency_icon}{order.amount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.product_qty} {order.product_qty === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              {/* Order Products - Conditional UI for Rent vs Buy */}
              {order.order_products && order.order_products.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Order Items:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.order_products.slice(0, 3).map((item, index) => {
                      const isRental = item.purchase_type === 'rent' || item.rental_duration;

                      return (
                        <div
                          key={index}
                          className={`flex gap-3 p-3 rounded-lg border-2 ${
                            isRental
                              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                          }`}
                        >
                          {item.product?.thumb_image ? (
                            <img
                              src={getImageUrl(item.product.thumb_image)}
                              alt={item.product_name}
                              className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg border-2 border-white shadow-sm flex items-center justify-center">
                              <FiPackage className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold line-clamp-2 mb-2">
                              {item.product_name}
                            </h5>

                            {/* Conditional Display: Rental Duration OR Quantity */}
                            {isRental ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <FiCalendar className="w-3 h-3 text-green-600" />
                                  <span className="text-xs font-bold text-green-800">
                                    {item.rental_duration} {item.rental_duration === 1 ? 'Month' : 'Months'}
                                  </span>
                                </div>
                                <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                                  Rental
                                </span>
                                {item.rental_duration >= 3 && (
                                  <p className="text-xs text-green-700 font-bold">
                                    🎉 {item.rental_duration >= 24 ? '25%' : item.rental_duration >= 12 ? '20%' : item.rental_duration >= 6 ? '10%' : '5%'} OFF
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <FiShoppingCart className="w-3 h-3 text-blue-600" />
                                  <span className="text-xs font-bold text-blue-800">
                                    Qty: {item.qty}
                                  </span>
                                </div>
                                <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                                  Purchase
                                </span>
                              </div>
                            )}

                            <p className="text-sm font-bold text-primary mt-1">
                              {order.currency_icon}{item.unit_price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {order.order_products.length > 3 && (
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-600 border-2 border-gray-200">
                        <p className="text-sm font-semibold">
                          +{order.order_products.length - 3} more {order.order_products.length - 3 === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <button
                  onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                >
                  <FiEye className="w-4 h-4" />
                  View Details
                </button>

                {order.order_status === 'pending' && (
                  <button
                    onClick={async () => {
                      const result = await Swal.fire({
                        title: 'Cancel Order?',
                        text: 'Are you sure you want to cancel this order?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#ef4444',
                        confirmButtonText: 'Yes, cancel it',
                      });

                      if (result.isConfirmed) {
                        try {
                          await orderService.cancelOrder(order.id);
                          Swal.fire('Canceled!', 'Order has been canceled', 'success');
                          fetchOrders();
                        } catch (error) {
                          Swal.fire('Error', 'Failed to cancel order', 'error');
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel Order
                  </button>
                )}

                {order.order_status === 'delivered' && (
                  <button
                    onClick={() => navigate(`/products/${order.order_products[0]?.product?.slug}/review`)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                  >
                    ⭐ Leave Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
