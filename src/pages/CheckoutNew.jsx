import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/hooks';
import { orderService, userService, paymentService } from '../services';
import { getImageUrl } from '../utils/imageHelper';
import { FiMapPin, FiCreditCard, FiTruck, FiCheck, FiShield, FiLock, FiPackage } from 'react-icons/fi';
import Swal from 'sweetalert2';

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutNew = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Data
  const [addresses, setAddresses] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Selections
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      setLoading(true);

      const [checkoutRes, paymentRes] = await Promise.all([
        orderService.getCheckoutData(),
        paymentService.getPaymentMethods(),
      ]);

      console.log('Checkout Data:', checkoutRes);
      console.log('Payment Methods:', paymentRes);

      // Set addresses
      if (checkoutRes.success && checkoutRes.data) {
        const addrs = checkoutRes.data.addresses || [];
        setAddresses(addrs);

        // Auto-select default or first address
        const defaultAddr = addrs.find(a => a.is_default);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr.id);
        } else if (addrs.length > 0) {
          setSelectedAddress(addrs[0].id);
        }

        // Set shipping methods
        const shipping = checkoutRes.data.shipping_methods || [];
        setShippingMethods(shipping);

        // Auto-select first shipping method
        if (shipping.length > 0) {
          setSelectedShipping(shipping[0].id);
        }
      }

      // Set payment methods
      if (paymentRes.success && paymentRes.data) {
        setPaymentMethods(paymentRes.data);

        // Auto-select default or first payment method
        const defaultPay = paymentRes.data.find(p => p.is_default);
        if (defaultPay) {
          setSelectedPayment(defaultPay.id);
        } else if (paymentRes.data.length > 0) {
          setSelectedPayment(paymentRes.data[0].id);
        }
      }

    } catch (error) {
      console.error('Failed to fetch checkout data:', error);
      Swal.fire('Error', 'Failed to load checkout data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async (orderId) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      const response = await paymentService.createRazorpayOrder(orderId);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create Razorpay order');
      }

      const { razorpay_order_id, key_id, amount, currency, name, description, prefill } = response.data;

      const options = {
        key: key_id,
        amount: amount * 100,
        currency: currency,
        name: name,
        description: description,
        order_id: razorpay_order_id,
        prefill: prefill,
        theme: { color: '#3b82f6' },
        handler: async function (response) {
          try {
            const verifyResponse = await paymentService.confirmRazorpayPayment(
              orderId,
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            if (verifyResponse.success) {
              await clearCart();
              Swal.fire({
                title: 'Payment Successful!',
                text: 'Your order has been placed successfully',
                icon: 'success',
                confirmButtonText: 'View Orders',
              }).then(() => {
                navigate('/orders');
              });
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            Swal.fire('Error', 'Payment verification failed', 'error');
          }
        },
        modal: {
          ondismiss: function() {
            setSubmitting(false);
            Swal.fire('Cancelled', 'Payment was cancelled', 'info');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Razorpay payment error:', error);
      Swal.fire('Error', error.message || 'Failed to process Razorpay payment', 'error');
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!selectedAddress) {
      Swal.fire('Error', 'Please select a delivery address', 'error');
      return;
    }

    if (!selectedShipping) {
      Swal.fire('Error', 'Please select a shipping method', 'error');
      return;
    }

    if (!selectedPayment) {
      Swal.fire('Error', 'Please select a payment method', 'error');
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      Swal.fire('Error', 'Your cart is empty', 'error');
      return;
    }

    try {
      setSubmitting(true);

      const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);
      const paymentType = selectedMethod?.type || 'cod';

      // Create order with correct field names for Laravel
      const orderData = {
        shipping_address_id: selectedAddress,
        shipping_method_id: selectedShipping,
        payment_method: paymentType, // stripe, paypal, razorpay, or cod
      };

      console.log('Creating order with:', orderData);

      const response = await orderService.createOrder(orderData);

      console.log('Order created:', response);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create order');
      }

      const orderId = response.data.order.id;

      // Handle payment based on type
      switch (paymentType) {
        case 'razorpay':
          await handleRazorpayPayment(orderId);
          break;

        case 'stripe':
          Swal.fire({
            title: 'Redirecting...',
            text: 'Taking you to payment page',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
          });
          setTimeout(() => {
            navigate(`/payment/stripe/${orderId}`);
          }, 1500);
          break;

        case 'paypal':
          Swal.fire({
            title: 'Redirecting...',
            text: 'Taking you to PayPal',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
          });
          setTimeout(() => {
            navigate(`/payment/paypal/${orderId}`);
          }, 1500);
          break;

        case 'cod':
          await paymentService.confirmCodPayment(orderId);
          await clearCart();
          Swal.fire({
            title: 'Order Placed!',
            text: 'Your order has been placed successfully with Cash on Delivery',
            icon: 'success',
            confirmButtonText: 'View Orders',
          }).then(() => {
            navigate('/orders');
          });
          setSubmitting(false);
          break;

        default:
          await clearCart();
          Swal.fire({
            title: 'Order Placed!',
            text: 'Your order has been placed successfully',
            icon: 'success',
          }).then(() => {
            navigate('/orders');
          });
          setSubmitting(false);
          break;
      }

    } catch (error) {
      console.error('Failed to place order:', error);
      setSubmitting(false);

      const errorMessage = error.response?.data?.message
        || error.message
        || 'Failed to place order. Please try again.';

      Swal.fire({
        title: 'Order Failed',
        text: errorMessage,
        icon: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container-custom text-center">
          <FiPackage className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-8 rounded-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {[
              { num: 1, label: 'Address', icon: FiMapPin, active: true },
              { num: 2, label: 'Delivery', icon: FiTruck, active: selectedAddress },
              { num: 3, label: 'Payment', icon: FiCreditCard, active: selectedAddress && selectedShipping }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.active
                      ? 'bg-primary border-primary text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step.active ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                    step.active ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8 space-y-4">

            {/* 1. DELIVERY ADDRESS */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                  Delivery Address
                </h2>
                {addresses.length > 0 && (
                  <button
                    onClick={() => navigate('/dashboard/addresses')}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    + Add New
                  </button>
                )}
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <FiMapPin className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 mb-4">No delivery address found</p>
                  <button
                    onClick={() => navigate('/dashboard/addresses')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-lg transition-all"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddress === address.id
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          selectedAddress === address.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}>
                          {selectedAddress === address.id && (
                            <FiCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{address.name}</h3>
                            {address.is_default && (
                              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">DEFAULT</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{address.address}</p>
                          <p className="text-sm text-gray-700 mb-1">
                            {address.city}, {address.state} {address.zip || address.zip_code}
                          </p>
                          <p className="text-sm text-gray-600">Mobile: <span className="font-medium text-gray-900">{address.phone}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. SHIPPING METHOD */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                Delivery Method
              </h2>

              {shippingMethods.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No shipping methods available</p>
              ) : (
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedShipping(method.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedShipping === method.id
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedShipping === method.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {selectedShipping === method.id && (
                              <FiCheck className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <FiTruck className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.type || 'Standard Delivery'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {method.cost === 0 || method.cost === '0' ? (
                              <span className="text-green-600">FREE</span>
                            ) : (
                              `₹${method.cost}`
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. PAYMENT METHOD */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                Payment Method
              </h2>

              {paymentMethods.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No payment methods available</p>
              ) : (
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    // Payment type icons
                    let icon = <FiCreditCard className="w-6 h-6" />;
                    let iconBg = 'bg-blue-100 text-blue-600';
                    if (method.type === 'cod') {
                      icon = '💵';
                      iconBg = 'bg-green-100 text-green-600';
                    }
                    if (method.type === 'paypal') {
                      icon = '💰';
                      iconBg = 'bg-yellow-100 text-yellow-600';
                    }
                    if (method.type === 'razorpay') {
                      icon = '💎';
                      iconBg = 'bg-purple-100 text-purple-600';
                    }

                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? 'border-primary bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {selectedPayment === method.id && (
                              <FiCheck className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className={`w-10 h-10 rounded flex items-center justify-center ${iconBg}`}>
                            {typeof icon === 'string' ? <span className="text-2xl">{icon}</span> : icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

        </div>

          {/* Order Summary Sidebar - Right Side */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>

                {/* Cart Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.items?.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
                      <img
                        src={getImageUrl(item.product?.thumb_image)}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product?.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">Qty: {item.qty}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900 font-medium">₹{parseFloat(cart.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  {cart.tax && parseFloat(cart.tax) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span className="text-gray-900 font-medium">₹{parseFloat(cart.tax).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Order Total:</span>
                      <span className="text-2xl font-bold text-red-700">₹{parseFloat(cart.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <button
                  onClick={handlePlaceOrder}
                  disabled={submitting || !selectedAddress || !selectedShipping || !selectedPayment}
                  className={`w-full py-3.5 rounded-lg font-medium text-base transition-all ${
                    submitting || !selectedAddress || !selectedShipping || !selectedPayment
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-sm hover:shadow-md'
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>

                {/* Validation Messages */}
                {(!selectedAddress || !selectedShipping || !selectedPayment) && (
                  <div className="mt-3 text-xs text-red-600 space-y-1">
                    {!selectedAddress && <p>• Please select a delivery address</p>}
                    {!selectedShipping && <p>• Please select a delivery method</p>}
                    {!selectedPayment && <p>• Please select a payment method</p>}
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <FiShield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">100% Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiLock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Safe & Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPackage className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">Easy Returns & Refunds</span>
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

export default CheckoutNew;
