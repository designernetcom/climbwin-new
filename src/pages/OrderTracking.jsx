import { useState } from 'react';
import { orderService } from '../services';
import {
  FiPackage, FiCheckCircle, FiTruck, FiMapPin,
  FiClock, FiSearch, FiAlertCircle
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const OrderTracking = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!invoiceId.trim()) {
      Swal.fire('Error', 'Please enter an invoice ID', 'error');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await orderService.trackOrder(invoiceId);
      setOrder(response.order);
    } catch (error) {
      console.error('Failed to track order:', error);
      setError(error.response?.data?.message || 'Order not found');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: FiCheckCircle },
      { key: 'processing', label: 'Processing', icon: FiPackage },
      { key: 'shipped', label: 'Shipped', icon: FiTruck },
      { key: 'delivered', label: 'Delivered', icon: FiMapPin },
    ];

    if (!order) return steps;

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered', 'completed'];
    const currentIndex = statusOrder.indexOf(order.status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: statusOrder[index] === order.status,
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      processing: 'blue',
      shipped: 'purple',
      delivered: 'green',
      completed: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'gray';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your order invoice ID to track your shipment and get real-time updates
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="card p-6">
            <label htmlFor="invoiceId" className="block text-sm font-semibold mb-2">
              Invoice ID
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="invoiceId"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                placeholder="e.g., INV-2024-001234"
                className="input flex-1"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="spinner w-5 h-5 border-2" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <FiSearch className="w-5 h-5" />
                    Track Order
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Order Not Found</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Info Card */}
            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Order #{order.invoice_id}</h2>
                  <p className="text-gray-600">Placed on {formatDate(order.created_at)}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold bg-${getStatusColor(order.status)}-100 text-${getStatusColor(order.status)}-800`}
                >
                  {order.status?.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                  <p className="font-semibold">{order.address?.name}</p>
                  <p className="text-sm text-gray-700">
                    {order.address?.address}, {order.address?.city}
                  </p>
                  <p className="text-sm text-gray-700">
                    {order.address?.state} {order.address?.zip_code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold">{order.payment_method?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-700">
                    Payment {order.payment_status === 'paid' ? 'Completed' : 'Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Total</p>
                  <p className="text-2xl font-bold text-primary">${order.total}</p>
                  <p className="text-sm text-gray-700">{order.items?.length || 0} item(s)</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            {order.status !== 'cancelled' && (
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-6">Shipment Progress</h3>

                {/* Desktop Timeline */}
                <div className="hidden md:block">
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-8 left-0 w-full h-1 bg-gray-200" />
                    <div
                      className="absolute top-8 left-0 h-1 bg-primary transition-all duration-500"
                      style={{
                        width: `${(getStatusSteps().filter(s => s.completed).length - 1) * 33.33}%`
                      }}
                    />

                    {/* Steps */}
                    <div className="relative flex justify-between">
                      {getStatusSteps().map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition ${
                                step.completed
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-200 text-gray-400'
                              } ${step.active ? 'ring-4 ring-primary/30' : ''}`}
                            >
                              <Icon className="w-7 h-7" />
                            </div>
                            <p
                              className={`text-sm font-semibold text-center ${
                                step.completed ? 'text-gray-900' : 'text-gray-400'
                              }`}
                            >
                              {step.label}
                            </p>
                            {step.active && (
                              <p className="text-xs text-primary mt-1">Current Status</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden space-y-4">
                  {getStatusSteps().map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.completed
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 text-gray-400'
                          } ${step.active ? 'ring-4 ring-primary/30' : ''}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 pt-2">
                          <p
                            className={`font-semibold ${
                              step.completed ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </p>
                          {step.active && (
                            <p className="text-xs text-primary mt-1">Current Status</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimated Delivery */}
                {order.estimated_delivery && (
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">Estimated Delivery</p>
                      <p className="text-sm text-blue-700 mt-1">
                        {formatDate(order.estimated_delivery)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cancelled Order */}
            {order.status === 'cancelled' && (
              <div className="card p-6 bg-red-50 border border-red-200">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-900 text-lg mb-2">Order Cancelled</h3>
                    <p className="text-red-700">
                      This order has been cancelled. If you have any questions, please contact
                      customer support.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <img
                      src={item.product?.thumb_image || '/placeholder.jpg'}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product?.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.qty}</p>
                      <p className="font-semibold text-primary mt-1">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
