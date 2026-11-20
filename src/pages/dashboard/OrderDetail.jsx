import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../services';
import { getImageUrl } from '../../utils/imageHelper';
import {
  FiPackage,
  FiTruck,
  FiCheck,
  FiX,
  FiClock,
  FiMapPin,
  FiCreditCard,
  FiArrowLeft,
  FiPrinter,
  FiPhone,
  FiMail,
  FiShoppingBag,
  FiCalendar,
  FiShoppingCart,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrder(id);

      console.log('Order Details Response:', response);

      if (response.success && response.data) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      toast.error('Failed to load order details');
      navigate('/dashboard/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: 'Are you sure you want to cancel this order? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        await orderService.cancelOrder(id);
        toast.success('Order canceled successfully');
        fetchOrderDetails();
      } catch (error) {
        toast.error('Failed to cancel order');
      }
    }
  };

  const handlePrintInvoice = () => {
    window.print();
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
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        <Icon className="w-5 h-5" />
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    return status === 1 ? (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
        <FiCheck className="w-5 h-5" />
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
        <FiClock className="w-5 h-5" />
        Payment Pending
      </span>
    );
  };

  const getOrderTimeline = (status) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: FiShoppingBag },
      { key: 'processed_and_ready_to_ship', label: 'Processing', icon: FiPackage },
      { key: 'shipped', label: 'Shipped', icon: FiTruck },
      { key: 'delivered', label: 'Delivered', icon: FiCheck },
    ];

    const statusOrder = {
      pending: 0,
      processed_and_ready_to_ship: 1,
      shipped: 2,
      delivered: 3,
      canceled: -1,
    };

    const currentStep = statusOrder[status] !== undefined ? statusOrder[status] : 0;

    if (status === 'canceled') {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiX className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-lg font-semibold text-red-600">Order Canceled</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-1 bg-gray-200 hidden md:block">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.key} className="relative flex flex-col items-center">
                {/* Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center z-10 border-4 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-primary/30 scale-110' : ''}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Label */}
                <p
                  className={`mt-3 text-sm font-semibold text-center ${
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>

                {/* Mobile Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`md:hidden w-1 h-8 mx-auto mt-2 ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Order not found</h3>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/dashboard/orders')} className="btn btn-primary">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // Parse JSON data
  const shippingAddress = order.order_address ? JSON.parse(order.order_address) : null;
  const shippingMethod = order.shpping_method ? JSON.parse(order.shpping_method) : null;

  return (
    <div className="container-custom py-8">
      {/* Header - No Print */}
      <div className="no-print mb-6">
        <button
          onClick={() => navigate('/dashboard/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Orders
        </button>
      </div>

      {/* Order Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-3">Order #{order.invocie_id}</h1>
            <p className="text-gray-600 mb-2">
              Placed on{' '}
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <div className="flex flex-wrap gap-2">
              {getStatusBadge(order.order_status)}
              {getPaymentStatusBadge(order.payment_status)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-primary">
              {order.currency_icon}
              {order.amount}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {order.product_qty} {order.product_qty === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Action Buttons - No Print */}
        <div className="no-print flex flex-wrap gap-3 pt-4 border-t">
          <button
            onClick={handlePrintInvoice}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            <FiPrinter className="w-4 h-4" />
            Print Invoice
          </button>

          {order.order_status === 'pending' && (
            <button
              onClick={handleCancelOrder}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              <FiX className="w-4 h-4" />
              Cancel Order
            </button>
          )}

          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            <FiPhone className="w-4 h-4" />
            Contact Support
          </button>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-6">Order Progress</h2>
        {getOrderTimeline(order.order_status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Shipping Address */}
        {shippingAddress && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FiMapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold">Shipping Address</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">{shippingAddress.name}</p>
              {shippingAddress.email && (
                <p className="flex items-center gap-2 text-sm">
                  <FiMail className="w-4 h-4 text-gray-400" />
                  {shippingAddress.email}
                </p>
              )}
              {shippingAddress.phone && (
                <p className="flex items-center gap-2 text-sm">
                  <FiPhone className="w-4 h-4 text-gray-400" />
                  {shippingAddress.phone}
                </p>
              )}
              <p className="text-sm pt-2">{shippingAddress.address}</p>
              <p className="text-sm">
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip_code}
              </p>
              <p className="text-sm font-semibold">{shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">Payment Info</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold capitalize">{order.payment_method}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className={`font-semibold ${order.payment_status === 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                {order.payment_status === 1 ? 'Paid' : 'Pending'}
              </p>
            </div>
            {order.transaction_id && (
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-sm break-all">{order.transaction_id}</p>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Method */}
        {shippingMethod && (
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiTruck className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold">Shipping Method</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Courier</p>
                <p className="font-semibold">{shippingMethod.shipping_rule_name || 'Standard Shipping'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Shipping Cost</p>
                <p className="font-semibold">
                  {order.currency_icon}
                  {shippingMethod.shipping_fee || '0.00'}
                </p>
              </div>
              {shippingMethod.type && (
                <div>
                  <p className="text-sm text-gray-600">Shipping Type</p>
                  <p className="font-semibold capitalize">{shippingMethod.type}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Items - Conditional UI for Rent vs Buy */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.order_products && order.order_products.length > 0 ? (
            order.order_products.map((item, index) => {
              const isRental = item.purchase_type === 'rent' || item.rental_duration;

              return (
                <div
                  key={index}
                  className={`flex gap-4 p-5 rounded-xl border-2 hover:shadow-lg transition-all ${
                    isRental
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                  }`}
                >
                  {/* Product Image */}
                  {item.product?.thumb_image ? (
                    <img
                      src={getImageUrl(item.product.thumb_image)}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-xl border-2 border-white shadow-md flex items-center justify-center">
                      <FiPackage className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{item.product_name}</h3>
                      {isRental ? (
                        <span className="text-xs bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          RENTAL
                        </span>
                      ) : (
                        <span className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                          <FiShoppingCart className="w-3 h-3" />
                          PURCHASE
                        </span>
                      )}
                    </div>

                    {item.product?.slug && (
                      <button
                        onClick={() => navigate(`/products/${item.product.slug}`)}
                        className="text-sm text-primary hover:underline mb-3 font-semibold"
                      >
                        View Product →
                      </button>
                    )}

                    {/* Conditional Display: Rental Duration OR Quantity */}
                    {isRental ? (
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-green-300 rounded-lg p-3 shadow-sm inline-block">
                        <div className="flex items-center gap-2 mb-2">
                          <FiCalendar className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-bold text-green-800">Rental Duration:</span>
                        </div>
                        <p className="text-xl font-bold text-green-900 ml-6">
                          {item.rental_duration} {item.rental_duration === 1 ? 'Month' : 'Months'}
                        </p>
                        {item.rental_duration >= 3 && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <p className="text-sm text-green-700 font-bold flex items-center gap-1">
                              🎉 {item.rental_duration >= 24 ? '25%' : item.rental_duration >= 12 ? '20%' : item.rental_duration >= 6 ? '10%' : '5%'} Discount Applied
                            </p>
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <p className="text-sm text-gray-600">Monthly Rate: {order.currency_icon}{item.unit_price}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-300 rounded-lg p-3 shadow-sm inline-block">
                        <div className="flex items-center gap-2 mb-2">
                          <FiShoppingCart className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-bold text-blue-800">Quantity:</span>
                        </div>
                        <p className="text-xl font-bold text-blue-900 ml-6">
                          {item.qty} {item.qty === 1 ? 'Unit' : 'Units'}
                        </p>
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-sm text-gray-600">Unit Price: {order.currency_icon}{item.unit_price}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Total Price</p>
                    <p className={`text-2xl font-bold ${isRental ? 'text-green-700' : 'text-blue-700'}`}>
                      {order.currency_icon}
                      {(parseFloat(item.unit_price) * (isRental ? parseInt(item.rental_duration || 1) : parseInt(item.qty))).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isRental ? 'Total Rental Cost' : 'Purchase Total'}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center py-8">No items found</p>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({order.product_qty} items)</span>
            <span className="font-semibold">
              {order.currency_icon}
              {order.order_products
                ?.reduce((sum, item) => sum + parseFloat(item.unit_price) * parseInt(item.qty), 0)
                .toFixed(2)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-gray-700">
            <span>Shipping Fee</span>
            <span className="font-semibold">
              {order.currency_icon}
              {shippingMethod?.shipping_fee || '0.00'}
            </span>
          </div>

          {/* Coupon Discount */}
          {order.coupon && order.coupon > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Coupon Discount</span>
              <span className="font-semibold">
                -{order.currency_icon}
                {order.coupon}
              </span>
            </div>
          )}

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">
                {order.currency_icon}
                {order.amount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .card {
            box-shadow: none !important;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetail;
