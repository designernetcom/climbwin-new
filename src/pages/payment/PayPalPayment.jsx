import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentService, orderService } from '../../services';
import { useCart } from '../../store/hooks';
import Swal from 'sweetalert2';
import { FiArrowLeft, FiShield } from 'react-icons/fi';

const PayPalPayment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const paypalContainerRef = useRef(null);
  const paypalButtonsRendered = useRef(false);

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
          return;
        }

        // Load PayPal SDK
        loadPayPalSDK();
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
      setError('Failed to load order details');
      Swal.fire('Error', 'Failed to load order details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadPayPalSDK = async () => {
    // Check if PayPal SDK is already loaded
    if (window.paypal) {
      console.log('PayPal SDK already loaded');
      renderPayPalButtons();
      return;
    }

    try {
      console.log('Fetching PayPal configuration...');
      const response = await paymentService.getPaymentMethods();
      console.log('Payment methods response:', response);

      const paypalMethod = response.data?.find(m => m.type === 'paypal');
      console.log('PayPal method:', paypalMethod);

      if (!paypalMethod) {
        throw new Error('PayPal payment method not found or not enabled');
      }

      const clientId = paypalMethod.client_id;
      if (!clientId) {
        throw new Error('PayPal client ID not configured');
      }

      console.log('Loading PayPal SDK with client ID:', clientId.substring(0, 20) + '...');

      // Load PayPal SDK
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        renderPayPalButtons();
      };
      script.onerror = () => {
        console.error('Failed to load PayPal SDK script');
        setError('Failed to load PayPal SDK');
        Swal.fire('Error', 'Failed to load PayPal. Please refresh the page and try again.', 'error');
      };
      document.body.appendChild(script);

    } catch (error) {
      console.error('PayPal initialization error:', error);
      setError(error.message || 'Failed to initialize PayPal');
      Swal.fire('Error', error.message || 'Failed to initialize PayPal payment', 'error');
    }
  };

  const renderPayPalButtons = () => {
    // Prevent rendering buttons multiple times
    if (paypalButtonsRendered.current || !window.paypal || !paypalContainerRef.current) {
      return;
    }

    paypalButtonsRendered.current = true;

    window.paypal.Buttons({
      // Create order on PayPal
      createOrder: async (data, actions) => {
        try {
          setProcessing(true);
          console.log('Creating PayPal order for order ID:', orderId);

          // Call backend to create PayPal order
          const response = await paymentService.createPaypalOrder(orderId);
          console.log('Create PayPal order response:', response);

          if (response.success && response.data && response.data.paypal_order_id) {
            console.log('PayPal order created:', response.data.paypal_order_id);
            return response.data.paypal_order_id;
          } else {
            throw new Error(response.message || 'Failed to create PayPal order');
          }
        } catch (error) {
          console.error('Create order error:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Failed to create PayPal order';
          Swal.fire('Error', errorMessage, 'error');
          setProcessing(false);
          throw error;
        }
      },

      // Approve payment
      onApprove: async (data, actions) => {
        try {
          setProcessing(true);
          console.log('Payment approved, capturing payment...', data);

          // Call backend to capture payment
          const response = await paymentService.confirmPaypalPayment(
            orderId,
            data.orderID
          );
          console.log('Confirm payment response:', response);

          if (response.success) {
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
            throw new Error(response.message || 'Payment verification failed');
          }
        } catch (error) {
          console.error('Approval error:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Payment verification failed';
          Swal.fire('Error', errorMessage, 'error');
          setProcessing(false);
        }
      },

      // Handle errors
      onError: (error) => {
        console.error('PayPal error:', error);
        Swal.fire('Error', 'PayPal payment failed. Please try again.', 'error');
        setProcessing(false);
      },

      // Handle cancellation
      onCancel: (data) => {
        console.log('Payment cancelled:', data);
        Swal.fire({
          title: 'Payment Cancelled',
          text: 'You cancelled the payment. You can try again.',
          icon: 'info',
        });
        setProcessing(false);
      },

      // Style options
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
        height: 45,
      },
    }).render(paypalContainerRef.current);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 01-.795.68H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z"/>
                <path d="M2.379 12.646a.826.826 0 01-.815-.953l.747-4.74a.997.997 0 01.983-.839h6.536c.94 0 1.778.205 2.432.565.14.077.271.161.394.25l.05.037c.383.296.683.65.902 1.052.024.044.047.088.068.133.113.233.196.482.253.747.028.131.05.266.064.404l.012.133c.015.243.015.497-.002.767v.06a5.19 5.19 0 01-.17 1.129l-.043.155a6.286 6.286 0 01-.294.87 5.203 5.203 0 01-.458.867c-.05.076-.1.15-.153.223-.396.548-.904.998-1.495 1.326-.154.086-.313.163-.477.231a6.619 6.619 0 01-1.02.29c-.181.037-.366.066-.553.087a8.037 8.037 0 01-.755.035H8.787a.983.983 0 00-.97.83l-.013.065-.717 4.543a.508.508 0 01-.502.43H3.853a.483.483 0 01-.477-.558l1.003-6.363z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">PayPal Payment</h1>
            <p className="text-gray-600">Secure payment powered by PayPal</p>
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

          {/* PayPal Buttons Container */}
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiShield className="text-green-600 w-5 h-5" />
              <p className="text-sm text-gray-600">
                Your payment information is secure and encrypted
              </p>
            </div>

            {processing ? (
              <div className="py-8 text-center">
                <div className="spinner mb-4"></div>
                <p className="text-gray-600">Processing payment...</p>
                <p className="text-sm text-gray-500 mt-2">Please wait, do not close this page</p>
              </div>
            ) : (
              <div ref={paypalContainerRef} className="min-h-[100px]"></div>
            )}
          </div>

          {/* Security Badges */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">Secure Payment</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">SSL Encrypted</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700 text-center">Verified</p>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You will be redirected to PayPal to complete your payment securely.
              After successful payment, you will be automatically returned to our site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;
