import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentService, orderService } from '../../services';
import { useCart } from '../../store/hooks';
import Swal from 'sweetalert2';
import { FiArrowLeft, FiShield, FiCreditCard } from 'react-icons/fi';

const StripePayment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrder(orderId);

      if (response.success && response.data) {
        setOrder(response.data);

        // Check if already paid
        if (response.data.payment_status === 1) {
          Swal.fire({
            title: 'Already Paid',
            text: 'This order has already been paid',
            icon: 'info',
          }).then(() => {
            navigate('/orders');
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
      setError('Failed to load order details');
      Swal.fire('Error', 'Failed to load order details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate card details
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardName) {
      Swal.fire('Error', 'Please fill in all card details', 'error');
      return;
    }

    const cardNumberClean = cardDetails.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
      Swal.fire('Error', 'Invalid card number', 'error');
      return;
    }

    if (cardDetails.expiryDate.length !== 5) {
      Swal.fire('Error', 'Invalid expiry date', 'error');
      return;
    }

    if (cardDetails.cvv.length < 3) {
      Swal.fire('Error', 'Invalid CVV', 'error');
      return;
    }

    try {
      setProcessing(true);
      console.log('Creating Stripe payment intent for order:', orderId);

      // Create payment intent
      const intentResponse = await paymentService.createStripeIntent(orderId);
      console.log('Stripe intent response:', intentResponse);

      if (!intentResponse.success) {
        // Show validation errors if present
        if (intentResponse.errors) {
          const errorMessages = Object.values(intentResponse.errors).flat().join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(intentResponse.message || 'Failed to create payment intent');
      }

      if (!intentResponse.data || !intentResponse.data.payment_intent_id) {
        throw new Error('Invalid payment intent response');
      }

      const paymentIntentId = intentResponse.data.payment_intent_id;
      console.log('Payment intent created successfully:', paymentIntentId);

      // In production, you would use Stripe.js here to tokenize the card
      // For now, we'll simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Confirming payment with intent ID:', paymentIntentId);

      // Confirm payment
      const confirmResponse = await paymentService.confirmStripePayment(
        orderId,
        paymentIntentId
      );
      console.log('Confirm payment response:', confirmResponse);

      if (confirmResponse.success) {
        // Clear cart
        await clearCart();

        // Show success message
        Swal.fire({
          title: 'Payment Successful!',
          text: 'Your payment has been processed successfully',
          icon: 'success',
          confirmButtonText: 'View Orders',
        }).then(() => {
          navigate('/orders');
        });
      } else {
        throw new Error(confirmResponse.message || 'Payment verification failed');
      }

    } catch (error) {
      console.error('Payment failed:', error);
      const errorMessage = error.response?.data?.message
        || error.response?.data?.errors
        || error.message
        || 'Payment processing failed';

      Swal.fire({
        title: 'Payment Failed',
        text: errorMessage,
        icon: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
          <button
            onClick={() => navigate('/orders')}
            className="btn btn-primary"
          >
            Go to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container-custom">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <FiArrowLeft />
          Back to Orders
        </button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiCreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Card Payment</h1>
            <p className="text-gray-600">Secure payment powered by Stripe</p>
          </div>

          {/* Order Summary Card */}
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 pb-4 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order ID</span>
                <span className="font-semibold">#{order.invocie_id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items</span>
                <span className="font-semibold">{order.product_qty} {order.product_qty === 1 ? 'item' : 'items'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{order.currency_icon}{order.sub_total}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-3xl font-bold text-primary">
                {order.currency_icon}{order.amount}
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="card p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <FiShield className="text-green-600 w-5 h-5" />
              <p className="text-sm text-gray-600">
                Your payment information is secure and encrypted
              </p>
            </div>

            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    className="input pl-10"
                    maxLength="19"
                    disabled={processing}
                  />
                  <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    className="input"
                    maxLength="5"
                    disabled={processing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    className="input"
                    maxLength="4"
                    disabled={processing}
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardChange}
                  placeholder="John Doe"
                  className="input"
                  disabled={processing}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ${order.currency_icon}${order.amount}`
                )}
              </button>
            </div>
          </form>

          {/* Security Badges */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">Secure</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">Encrypted</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-purple-600 font-bold text-xs">PCI</span>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">Compliant</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">Verified</p>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> We never store your card details. All payments are processed securely through Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
