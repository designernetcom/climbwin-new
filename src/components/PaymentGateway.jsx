import { useState, useEffect } from 'react';
import { FiCreditCard, FiDollarSign, FiCheck } from 'react-icons/fi';
import { paymentService } from '../services';
import Swal from 'sweetalert2';

const PaymentGateway = ({ orderId, amount, onSuccess, onCancel }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Stripe specific states
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await paymentService.getPaymentMethods();
      setPaymentMethods(response.payment_methods || []);
      const defaultMethod = response.payment_methods?.find(m => m.is_default);
      if (defaultMethod) {
        setSelectedMethod(defaultMethod);
      }
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
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

  const handleStripePayment = async () => {
    try {
      setProcessing(true);

      // Validate card details
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardName) {
        Swal.fire('Error', 'Please fill in all card details', 'error');
        return;
      }

      // Create payment intent
      const intentResponse = await paymentService.createStripeIntent(orderId);

      // In production, you would use Stripe.js here
      // For now, we'll simulate the payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Confirm payment
      await paymentService.confirmStripePayment(orderId, intentResponse.payment_intent_id);

      Swal.fire({
        title: 'Payment Successful!',
        text: 'Your payment has been processed successfully',
        icon: 'success',
        confirmButtonText: 'Continue'
      }).then(() => {
        onSuccess();
      });
    } catch (error) {
      console.error('Payment failed:', error);
      Swal.fire('Payment Failed', error.response?.data?.message || 'Payment processing failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayPalPayment = async () => {
    try {
      setProcessing(true);

      // Create PayPal order
      const paypalResponse = await paymentService.createPaypalOrder(orderId);

      // In production, redirect to PayPal or open PayPal modal
      // For now, we'll simulate the payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Confirm payment
      await paymentService.confirmPaypalPayment(orderId, paypalResponse.paypal_order_id);

      Swal.fire({
        title: 'Payment Successful!',
        text: 'Your PayPal payment has been processed successfully',
        icon: 'success',
        confirmButtonText: 'Continue'
      }).then(() => {
        onSuccess();
      });
    } catch (error) {
      console.error('Payment failed:', error);
      Swal.fire('Payment Failed', error.response?.data?.message || 'PayPal payment failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleCODPayment = async () => {
    try {
      setProcessing(true);

      const result = await Swal.fire({
        title: 'Cash on Delivery',
        text: 'You will pay when the order is delivered. Confirm?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirm Order',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) {
        setProcessing(false);
        return;
      }

      await paymentService.confirmCodPayment(orderId);

      Swal.fire({
        title: 'Order Confirmed!',
        text: 'Your order has been placed. Pay when you receive it.',
        icon: 'success',
        confirmButtonText: 'Continue'
      }).then(() => {
        onSuccess();
      });
    } catch (error) {
      console.error('Order failed:', error);
      Swal.fire('Order Failed', error.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      Swal.fire('Error', 'Please select a payment method', 'error');
      return;
    }

    const methodName = selectedMethod.name?.toLowerCase();

    if (methodName.includes('stripe') || methodName.includes('card') || methodName.includes('credit')) {
      handleStripePayment();
    } else if (methodName.includes('paypal')) {
      handlePayPalPayment();
    } else if (methodName.includes('cod') || methodName.includes('cash')) {
      handleCODPayment();
    } else {
      Swal.fire('Error', 'Unsupported payment method', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  const isStripeMethod = selectedMethod?.name?.toLowerCase().includes('stripe') ||
                         selectedMethod?.name?.toLowerCase().includes('card') ||
                         selectedMethod?.name?.toLowerCase().includes('credit');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
        <p className="text-3xl font-bold">₹{amount}</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg">Select Payment Method</h3>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedMethod?.id === method.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {method.name?.toLowerCase().includes('stripe') || method.name?.toLowerCase().includes('card') ? (
                  <FiCreditCard className="w-6 h-6 text-primary" />
                ) : method.name?.toLowerCase().includes('paypal') ? (
                  <div className="w-6 h-6 text-primary font-bold">PP</div>
                ) : (
                  <FiDollarSign className="w-6 h-6 text-primary" />
                )}
                <div>
                  <p className="font-semibold">{method.name}</p>
                  {method.description && (
                    <p className="text-sm text-gray-600">{method.description}</p>
                  )}
                </div>
              </div>
              {selectedMethod?.id === method.id && (
                <FiCheck className="w-6 h-6 text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stripe Card Form */}
      {isStripeMethod && (
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="font-bold text-lg mb-4">Card Details</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              placeholder="1234 5678 9012 3456"
              className="input"
              maxLength="19"
            />
          </div>
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
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleCardChange}
              placeholder="John Doe"
              className="input"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handlePayment}
          disabled={processing || !selectedMethod}
          className="btn btn-primary flex-1 disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay $${amount}`}
        </button>
        <button
          onClick={onCancel}
          disabled={processing}
          className="btn btn-outline"
        >
          Cancel
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Secure Payment:</span> Your payment information is encrypted and secure.
          We never store your card details.
        </p>
      </div>
    </div>
  );
};

export default PaymentGateway;
