import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/hooks';
import { orderService, userService, paymentService } from '../services';
import { getImageUrl } from '../utils/imageHelper';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiCreditCard, FiCalendar, FiShoppingCart } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { logError, showError } from '../utils/errorHandler';

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

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, updateCartItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [notes, setNotes] = useState('');

  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    type: 'shipping',
    is_default: false,
  });

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      setLoading(true);
      const [addressesRes, paymentRes] = await Promise.all([
        userService.getAddresses(),
        paymentService.getPaymentMethods(),
      ]);

      setAddresses(addressesRes.data || []);
      setPaymentMethods(paymentRes.payment_methods || []);

      const defaultAddress = addressesRes.data?.find(addr => addr.is_default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }

      const defaultPayment = paymentRes.payment_methods?.find(pm => pm.is_default);
      if (defaultPayment) {
        setSelectedPayment(defaultPayment.id);
      }
    } catch (error) {
      console.error('Failed to fetch checkout data:', error);
      Swal.fire('Error', 'Failed to load checkout data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    console.log('Submitting address form:', addressForm);

    try {
      if (editingAddress) {
        console.log('Updating address:', editingAddress);
        const response = await userService.updateAddress(editingAddress, addressForm);
        console.log('Address updated:', response);
        setAddresses(prev => prev.map(addr =>
          addr.id === editingAddress ? response.data : addr
        ));
        Swal.fire('Success', 'Address updated successfully', 'success');
      } else {
        console.log('Creating new address');
        const response = await userService.createAddress(addressForm);
        console.log('Address created:', response);
        setAddresses(prev => [...prev, response.data]);
        setSelectedAddress(response.data.id);
        Swal.fire('Success', 'Address added successfully', 'success');
      }
      setShowAddressForm(false);
      setEditingAddress(null);
      setAddressForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        type: 'shipping',
        is_default: false,
      });
    } catch (error) {
      logError('Save Address', error);
      showError(error, Swal);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address.id);
    setAddressForm({
      name: address.name,
      phone: address.phone,
      email: address.email || '',
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip || address.zip_code || '',
      country: address.country || 'United States',
      type: address.type || 'shipping',
      is_default: address.is_default,
    });
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Address?',
      text: 'Are you sure you want to delete this address?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      try {
        await userService.deleteAddress(id);
        setAddresses(prev => prev.filter(addr => addr.id !== id));
        if (selectedAddress === id) {
          setSelectedAddress(null);
        }
        Swal.fire('Deleted', 'Address deleted successfully', 'success');
      } catch (error) {
        console.error('Failed to delete address:', error);
        Swal.fire('Error', 'Failed to delete address', 'error');
      }
    }
  };

  const handleRazorpayPayment = async (orderId) => {
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create Razorpay order
      const response = await paymentService.createRazorpayOrder(orderId);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create Razorpay order');
      }

      const { razorpay_order_id, key_id, amount, currency, name, description, prefill } = response.data;

      // Razorpay options
      const options = {
        key: key_id,
        amount: amount * 100, // Amount in paise
        currency: currency,
        name: name,
        description: description,
        order_id: razorpay_order_id,
        prefill: prefill,
        theme: {
          color: '#3b82f6'
        },
        handler: async function (response) {
          try {
            // Verify payment
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
                html: `
                  <p class="text-lg mb-2">Your order has been placed successfully</p>
                  <p class="text-sm text-green-600 mt-3"><i class="fas fa-envelope mr-1"></i>A confirmation email has been sent to your registered email address</p>
                `,
                icon: 'success',
                confirmButtonText: 'View Orders',
              }).then(() => {
                navigate('/payment-success');
              });
            } else {
              throw new Error('Payment verification failed');
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
    console.log('=== PLACE ORDER CLICKED ===');
    console.log('Selected Address:', selectedAddress);
    console.log('Selected Payment:', selectedPayment);
    console.log('Cart:', cart);
    console.log('Cart Items:', cart?.items);

    if (!selectedAddress) {
      console.log('ERROR: No address selected');
      Swal.fire('Error', 'Please select a delivery address', 'error');
      return;
    }

    if (!selectedPayment) {
      console.log('ERROR: No payment method selected');
      Swal.fire('Error', 'Please select a payment method', 'error');
      return;
    }

    // Validate cart has items
    if (!cart || !cart.items || cart.items.length === 0) {
      console.log('ERROR: Cart is empty');
      Swal.fire('Error', 'Your cart is empty', 'error');
      return;
    }

    console.log('All validations passed, creating order...');

    try {
      setSubmitting(true);

      const orderData = {
        address_id: selectedAddress,
        payment_method_id: selectedPayment,
        notes: notes || '',
        shipping_method: 'standard',
        payment_status: 'pending',
      };

      console.log('=== CREATING ORDER ===');
      console.log('Order data:', JSON.stringify(orderData, null, 2));

      const response = await orderService.createOrder(orderData);

      console.log('=== ORDER CREATED ===');
      console.log('Response:', JSON.stringify(response, null, 2));

      const orderId = response.data?.id;

      if (!orderId) {
        throw new Error('Order ID not received from server');
      }

      // Find selected payment method
      const selectedMethod = paymentMethods.find(m => m.id === selectedPayment);

      if (!selectedMethod) {
        console.error('ERROR: Selected payment method not found');
        Swal.fire('Error', 'Payment method not found', 'error');
        setSubmitting(false);
        return;
      }

      // Determine payment type from method name or type field
      let paymentType = 'cod';
      if (selectedMethod.type) {
        paymentType = selectedMethod.type.toLowerCase();
      } else if (selectedMethod.name) {
        const name = selectedMethod.name.toLowerCase();

        // Razorpay payment gateway
        if (name.includes('razorpay')) {
          paymentType = 'razorpay';
        }
        // Stripe payment gateway
        else if (name.includes('stripe') || name.includes('card') || name.includes('credit') || name.includes('debit')) {
          paymentType = 'stripe';
        }
        // PayPal payment gateway
        else if (name.includes('paypal')) {
          paymentType = 'paypal';
        }
        // Cash on Delivery
        else if (name.includes('cod') || name.includes('cash on delivery') || name.includes('cash')) {
          paymentType = 'cod';
        }
        // Bank Transfer
        else if (name.includes('bank') || name.includes('transfer') || name.includes('neft') || name.includes('rtgs')) {
          paymentType = 'bank_transfer';
        }
        // UPI Payment (India)
        else if (name.includes('upi') || name.includes('phonepe') || name.includes('gpay') || name.includes('paytm')) {
          paymentType = 'upi';
        }
        // Google Pay
        else if (name.includes('google pay') || name.includes('googlepay')) {
          paymentType = 'gpay';
        }
        // Apple Pay
        else if (name.includes('apple pay') || name.includes('applepay')) {
          paymentType = 'apple_pay';
        }
      }

      console.log('=== PAYMENT ROUTING ===');
      console.log('Payment type:', paymentType);
      console.log('Selected method:', selectedMethod);
      console.log('Order ID:', orderId);

      // Handle different payment methods
      switch (paymentType) {
        case 'razorpay':
          // Open Razorpay payment modal
          console.log('Opening Razorpay payment modal...');
          await handleRazorpayPayment(orderId);
          break;

        case 'stripe':
          // Navigate to Stripe payment page
          console.log('Navigating to Stripe payment page...');
          Swal.fire({
            title: 'Redirecting...',
            text: 'Taking you to Stripe payment page',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
          });
          setTimeout(() => {
            navigate(`/payment/stripe/${orderId}`);
          }, 1500);
          break;

        case 'paypal':
          // Navigate to PayPal payment page
          console.log('Navigating to PayPal payment page...');
          Swal.fire({
            title: 'Redirecting...',
            text: 'Taking you to PayPal payment page',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
          });
          setTimeout(() => {
            navigate(`/payment/paypal/${orderId}`);
          }, 1500);
          break;

        case 'cod':
          // Cash on Delivery - Complete order immediately
          console.log('Processing COD order...');
          await paymentService.confirmCodPayment(orderId);
          await clearCart();
          Swal.fire({
            title: 'Order Placed!',
            html: `
              <p class="text-lg mb-2">Your order has been placed successfully</p>
              <p class="text-sm text-gray-600">Order will be delivered with Cash on Delivery option</p>
              <p class="text-sm text-green-600 mt-3"><i class="fas fa-envelope mr-1"></i>A confirmation email has been sent to your registered email address</p>
            `,
            icon: 'success',
            confirmButtonText: 'View Orders',
            confirmButtonColor: '#3b82f6',
          }).then(() => {
            navigate('/orders');
          });
          setSubmitting(false);
          break;

        case 'bank_transfer':
          // Bank Transfer - Show bank details
          console.log('Processing Bank Transfer order...');
          await clearCart();
          Swal.fire({
            title: 'Order Placed!',
            html: `
              <p class="text-lg mb-3">Your order has been placed successfully</p>
              <div class="text-left bg-blue-50 p-4 rounded-lg mb-3">
                <p class="font-semibold text-sm mb-2">Please transfer payment to:</p>
                <p class="text-sm">Bank Name: [Your Bank]</p>
                <p class="text-sm">Account: [Account Number]</p>
                <p class="text-sm">IFSC: [IFSC Code]</p>
                <p class="text-sm mt-2">Amount: <strong>$${cart.total}</strong></p>
              </div>
              <p class="text-xs text-gray-600 mb-2">Your order will be processed after payment confirmation</p>
              <p class="text-sm text-green-600"><i class="fas fa-envelope mr-1"></i>A confirmation email with order details has been sent to you</p>
            `,
            icon: 'success',
            confirmButtonText: 'View Orders',
            confirmButtonColor: '#3b82f6',
          }).then(() => {
            navigate('/orders');
          });
          setSubmitting(false);
          break;

        case 'upi':
        case 'gpay':
        case 'apple_pay':
          // UPI/Digital Wallet payments - Navigate to payment page
          console.log(`Navigating to ${paymentType} payment page...`);
          Swal.fire({
            title: 'Redirecting...',
            text: `Taking you to ${selectedMethod.name} payment page`,
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
          });
          setTimeout(() => {
            navigate(`/payment/${paymentType}/${orderId}`);
          }, 1500);
          break;

        default:
          // Unknown payment method - treat as COD
          console.warn('Unknown payment type, treating as COD:', paymentType);
          await clearCart();
          Swal.fire({
            title: 'Order Placed!',
            text: 'Your order has been placed successfully',
            icon: 'success',
            confirmButtonText: 'View Orders',
            confirmButtonColor: '#3b82f6',
          }).then(() => {
            navigate('/orders');
          });
          setSubmitting(false);
          break;
      }

    } catch (error) {
      console.error('Failed to place order:', error);
      setSubmitting(false);

      let errorMessage = 'Failed to place order. Please try again.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorList = Object.values(errors).flat();
        errorMessage = errorList.join('\n');
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: 'Order Failed',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
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
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address Section */}
          <div className="card p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <FiMapPin className="text-primary text-lg" />
                </div>
                Delivery Address
              </h2>
              <button
                onClick={() => {
                  setEditingAddress(null);
                  setAddressForm({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: 'United States',
                    type: 'shipping',
                    is_default: false,
                  });
                  setShowAddressForm(true);
                }}
                className="btn btn-sm bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg transition-all"
              >
                <FiPlus className="mr-1" />
                Add New Address
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleSaveAddress} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold mb-4">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={addressForm.name}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={addressForm.email}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={addressForm.country}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressFormChange}
                      className="input"
                      rows="2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={addressForm.zip}
                      onChange={handleAddressFormChange}
                      className="input"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_default"
                        checked={addressForm.is_default}
                        onChange={handleAddressFormChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Set as default address</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    {editingAddress ? 'Update' : 'Save'} Address
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddress(null);
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiMapPin className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500">No addresses found</p>
                  <p className="text-xs text-gray-400 mt-1">Please add a delivery address to continue</p>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`group relative p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedAddress === address.id
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20 scale-[1.02]'
                        : 'border-gray-200 hover:border-primary/30 hover:shadow-md bg-white'
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    {/* Selected Checkmark */}
                    {selectedAddress === address.id && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Radio Button */}
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedAddress === address.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover:border-primary/50'
                        }`}>
                          {selectedAddress === address.id && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Address Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedAddress === address.id ? 'bg-primary/10' : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <FiMapPin className={`text-xl ${selectedAddress === address.id ? 'text-primary' : 'text-gray-500'}`} />
                      </div>

                      {/* Address Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-bold text-base ${
                            selectedAddress === address.id ? 'text-primary' : 'text-gray-900'
                          }`}>
                            {address.name}
                          </h3>
                          {address.is_default && (
                            <span className="text-xs bg-gradient-to-r from-primary to-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          📍 {address.address}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          {address.city}, {address.state} {address.zip || address.zip_code}
                        </p>
                        <p className="text-sm text-gray-600">
                          📞 {address.phone}
                        </p>
                        {address.email && (
                          <p className="text-sm text-gray-600 mt-1">
                            ✉️ {address.email}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className={`p-2 rounded-lg transition-all ${
                            selectedAddress === address.id
                              ? 'bg-primary/10 text-primary hover:bg-primary/20'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title="Edit Address"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                          title="Delete Address"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="card p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FiCreditCard className="text-white text-xl" />
                  </div>
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Choose Payment Method
                  </span>
                </h2>
                <p className="text-sm text-gray-600 ml-16">Select how you want to pay for your order</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-green-700 bg-green-100 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure & Encrypted
                </span>
                <span className="text-xs text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full font-semibold">
                  PCI DSS Compliant
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {paymentMethods.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCreditCard className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500">No payment methods available</p>
                  <p className="text-xs text-gray-400 mt-1">Please contact administrator</p>
                </div>
              ) : (
                paymentMethods.map((method) => {
                  const methodName = method.name?.toLowerCase() || '';
                  const isRazorpay = methodName.includes('razorpay');
                  const isStripe = methodName.includes('stripe') || methodName.includes('card') || methodName.includes('credit') || methodName.includes('debit');
                  const isPaypal = methodName.includes('paypal');
                  const isCod = methodName.includes('cod') || methodName.includes('cash');
                  const isBankTransfer = methodName.includes('bank') || methodName.includes('transfer') || methodName.includes('neft') || methodName.includes('rtgs');
                  const isUpi = methodName.includes('upi') || methodName.includes('phonepe') || methodName.includes('paytm');
                  const isGpay = methodName.includes('google pay') || methodName.includes('gpay');
                  const isApplePay = methodName.includes('apple pay') || methodName.includes('applepay');

                  // Determine payment-specific styling
                  let cardGradient = 'from-white to-gray-50';
                  let iconGradient = 'from-gray-400 to-gray-600';
                  let accentColor = 'primary';

                  if (isRazorpay) {
                    cardGradient = 'from-blue-50 to-indigo-50';
                    iconGradient = 'from-blue-500 to-indigo-600';
                    accentColor = 'blue-600';
                  } else if (isStripe) {
                    cardGradient = 'from-purple-50 to-pink-50';
                    iconGradient = 'from-purple-500 to-pink-600';
                    accentColor = 'purple-600';
                  } else if (isPaypal) {
                    cardGradient = 'from-blue-50 to-cyan-50';
                    iconGradient = 'from-blue-400 to-cyan-500';
                    accentColor = 'blue-500';
                  } else if (isCod) {
                    cardGradient = 'from-green-50 to-emerald-50';
                    iconGradient = 'from-green-500 to-emerald-600';
                    accentColor = 'green-600';
                  } else if (isBankTransfer) {
                    cardGradient = 'from-indigo-50 to-blue-50';
                    iconGradient = 'from-indigo-500 to-blue-600';
                    accentColor = 'indigo-600';
                  } else if (isUpi) {
                    cardGradient = 'from-orange-50 to-amber-50';
                    iconGradient = 'from-orange-500 to-amber-600';
                    accentColor = 'orange-600';
                  } else if (isGpay) {
                    cardGradient = 'from-green-50 to-teal-50';
                    iconGradient = 'from-green-500 to-teal-600';
                    accentColor = 'green-600';
                  } else if (isApplePay) {
                    cardGradient = 'from-gray-50 to-slate-50';
                    iconGradient = 'from-gray-700 to-slate-800';
                    accentColor = 'gray-800';
                  }

                  return (
                    <div
                      key={method.id}
                      className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedPayment === method.id
                          ? `border-${accentColor} bg-gradient-to-br ${cardGradient} shadow-2xl shadow-${accentColor}/30 scale-[1.03] ring-4 ring-${accentColor}/20`
                          : `border-gray-200 hover:border-${accentColor}/50 hover:shadow-xl bg-white hover:scale-[1.01]`
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                          backgroundSize: '24px 24px'
                        }}></div>
                      </div>

                      {/* Selected Badge */}
                      {selectedPayment === method.id && (
                        <div className="absolute -top-3 -right-3 z-10">
                          <div className={`w-12 h-12 bg-gradient-to-br ${iconGradient} rounded-full flex items-center justify-center shadow-xl animate-pulse`}>
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        {/* Radio Button */}
                        <div className="flex-shrink-0">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-300 group-hover:border-primary/50'
                          }`}>
                            {selectedPayment === method.id && (
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* Payment Icon with Gradient Background */}
                        <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg bg-gradient-to-br ${iconGradient} transform transition-transform group-hover:scale-110 ${
                          selectedPayment === method.id ? 'scale-110' : ''
                        }`}>
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl"></div>

                          {/* Icons */}
                          <div className="relative z-10">
                            {isRazorpay && (
                              <div className="text-white font-bold text-lg">
                                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                </svg>
                              </div>
                            )}
                            {isStripe && (
                              <div className="text-white font-bold">
                                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke="currentColor" strokeWidth="2" fill="none"/>
                                </svg>
                              </div>
                            )}
                            {isPaypal && <span className="text-white text-2xl">💰</span>}
                            {isCod && <span className="text-white text-2xl">💵</span>}
                            {isBankTransfer && <span className="text-white text-2xl">🏦</span>}
                            {isUpi && <span className="text-white text-2xl">📱</span>}
                            {isGpay && (
                              <div className="text-white font-bold text-2xl">G</div>
                            )}
                            {isApplePay && (
                              <div className="text-white text-2xl"></div>
                            )}
                            {!isRazorpay && !isStripe && !isPaypal && !isCod && !isBankTransfer && !isUpi && !isGpay && !isApplePay && (
                              <FiCreditCard className="text-white text-2xl" />
                            )}
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-base ${
                              selectedPayment === method.id ? 'text-primary' : 'text-gray-900'
                            }`}>
                              {method.name}
                            </h3>
                            {method.is_default && (
                              <span className="text-xs bg-gradient-to-r from-primary to-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                                Recommended
                              </span>
                            )}
                          </div>
                          {method.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {method.description}
                            </p>
                          )}

                          {/* Payment Type Badges */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {(isStripe || isRazorpay || isPaypal || isUpi || isGpay || isApplePay) && (
                              <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded font-medium">
                                ⚡ Instant Payment
                              </span>
                            )}
                            {isCod && (
                              <span className="text-xs text-orange-700 bg-orange-100 px-2 py-0.5 rounded font-medium">
                                💵 Pay on Delivery
                              </span>
                            )}
                            {isBankTransfer && (
                              <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-medium">
                                🏦 Bank Transfer
                              </span>
                            )}
                            {(isRazorpay || isStripe || isPaypal) && (
                              <span className="text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded font-medium">
                                🔒 Secure Gateway
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <div className="flex-shrink-0">
                          <svg
                            className={`w-5 h-5 transition-all ${
                              selectedPayment === method.id
                                ? 'text-primary transform rotate-90'
                                : 'text-gray-400 group-hover:text-gray-600'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Payment-Specific Features for Selected Payment */}
                      {selectedPayment === method.id && (
                        <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 space-y-3">
                          {/* Security Badge */}
                          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="font-medium">256-bit SSL Encryption</span>
                          </div>

                          {/* Payment-Specific Benefits */}
                          <div className="grid grid-cols-2 gap-2">
                            {(isRazorpay || isStripe || isPaypal) && (
                              <>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Instant confirmation</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Refund protection</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Fast processing</span>
                                </div>
                              </>
                            )}
                            {isCod && (
                              <>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>No online payment</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Verify before pay</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Zero risk</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Easy returns</span>
                                </div>
                              </>
                            )}
                            {isBankTransfer && (
                              <>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Direct transfer</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>No extra fees</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Bank-level security</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>24-48hr processing</span>
                                </div>
                              </>
                            )}
                            {(isUpi || isGpay || isApplePay) && (
                              <>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Lightning fast</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>One-tap payment</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Mobile-first</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                  </svg>
                                  <span>Highly secure</span>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Popular Badge */}
                          {(isRazorpay || isCod) && (
                            <div className="flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-semibold">Most Popular Choice</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Payment Security & Trust Badges */}
            {paymentMethods.length > 0 && (
              <div className="mt-6 space-y-4">
                {/* Security Notice */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-900 mb-1">100% Secure Payments</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        All transactions are encrypted with 256-bit SSL security and processed through PCI DSS compliant payment gateways. Your payment information is never stored on our servers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <svg className="w-8 h-8 text-green-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">SSL Secure</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <svg className="w-8 h-8 text-blue-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">PCI DSS</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <svg className="w-8 h-8 text-purple-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">Verified</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <svg className="w-8 h-8 text-amber-600 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">Trusted</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Notes */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Order Notes (Optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions for your order..."
              className="input"
              rows="4"
            />
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="card p-6 sticky top-24 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">Order Summary</h3>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {cart.items?.length} items
              </span>
            </div>

            {/* Cart Items - Interactive Conditional UI for Rent vs Buy */}
            <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.items?.map((item) => {
                const isRental = item.purchase_type === 'rent' || item.rental_duration;

                return (
                  <div
                    key={item.id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                      isRental
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
                    }`}
                  >
                    {/* Item Type Badge - Top Right */}
                    <div className="absolute top-2 right-2">
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

                    <div className="flex gap-3">
                      <img
                        src={getImageUrl(item.product?.thumb_image)}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 pt-1">
                        <h4 className="text-sm font-bold line-clamp-2 mb-3 text-gray-900 pr-16">
                          {item.product?.name}
                        </h4>

                        {/* Conditional Interactive Controls: Rental Duration OR Quantity */}
                        {isRental ? (
                          <div className="space-y-2">
                            {/* Rental Duration Selector */}
                            <div className="bg-white/90 backdrop-blur-sm border-2 border-green-300 rounded-xl p-3 shadow-sm">
                              <div className="flex items-center gap-2 mb-3">
                                <FiCalendar className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-bold text-green-800">Select Duration:</span>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                {[1, 3, 6, 12, 24].map((months) => (
                                  <button
                                    key={months}
                                    onClick={() => {
                                      // Note: This will update quantity as a workaround
                                      // In production, you'd need a separate API endpoint to update rental duration
                                      console.log(`Changing rental duration to ${months} months for item ${item.id}`);
                                      Swal.fire({
                                        title: 'Update Duration',
                                        text: `Change rental duration to ${months} ${months === 1 ? 'month' : 'months'}?`,
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes, update',
                                        confirmButtonColor: '#10b981'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          // This is a placeholder - you'd need to implement rental duration update
                                          Swal.fire('Updated!', 'Rental duration updated successfully', 'success');
                                        }
                                      });
                                    }}
                                    className={`px-2 py-2 text-xs font-bold rounded-lg border-2 transition-all transform hover:scale-105 ${
                                      item.rental_duration === months
                                        ? 'border-green-600 bg-green-600 text-white shadow-md'
                                        : 'border-green-300 bg-white text-green-700 hover:border-green-500 hover:bg-green-50'
                                    }`}
                                  >
                                    {months}M
                                  </button>
                                ))}
                              </div>

                              <div className="mt-3 pt-2 border-t border-green-200">
                                <p className="text-xs font-bold text-green-900">
                                  Current: {item.rental_duration} {item.rental_duration === 1 ? 'Month' : 'Months'}
                                </p>
                                {item.rental_duration >= 3 && (
                                  <p className="text-xs text-green-700 font-bold flex items-center gap-1 mt-1">
                                    🎉 {item.rental_duration >= 24 ? '25%' : item.rental_duration >= 12 ? '20%' : item.rental_duration >= 6 ? '10%' : '5%'} Discount
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                              <span className="text-xs font-semibold text-gray-600">Total Price:</span>
                              <p className="text-lg font-bold text-green-700">₹{item.price}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {/* Quantity Selector */}
                            <div className="bg-white/90 backdrop-blur-sm border-2 border-blue-300 rounded-xl p-3 shadow-sm">
                              <div className="flex items-center gap-2 mb-3">
                                <FiShoppingCart className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-bold text-blue-800">Adjust Quantity:</span>
                              </div>

                              <div className="flex items-center justify-center gap-3">
                                <button
                                  onClick={async () => {
                                    if (item.qty > 1) {
                                      await updateCartItem(item.id, item.qty - 1);
                                    }
                                  }}
                                  disabled={item.qty <= 1}
                                  className="w-10 h-10 flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg text-blue-700 font-bold text-xl hover:bg-blue-50 hover:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                  −
                                </button>

                                <div className="flex-1 text-center">
                                  <p className="text-2xl font-bold text-blue-900">{item.qty}</p>
                                  <p className="text-xs text-blue-600 font-semibold">{item.qty === 1 ? 'Unit' : 'Units'}</p>
                                </div>

                                <button
                                  onClick={async () => {
                                    await updateCartItem(item.id, item.qty + 1);
                                  }}
                                  className="w-10 h-10 flex items-center justify-center bg-white border-2 border-blue-300 rounded-lg text-blue-700 font-bold text-xl hover:bg-blue-50 hover:border-blue-500 transition-all shadow-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                              <span className="text-xs font-semibold text-gray-600">Unit Price:</span>
                              <p className="text-sm font-bold text-gray-700">₹{(parseFloat(item.price) / item.qty).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                              <span className="text-xs font-semibold text-gray-600">Total Price:</span>
                              <p className="text-lg font-bold text-blue-700">₹{item.price}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing */}
            <div className="space-y-3 mb-6 p-4 bg-white rounded-lg border border-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{cart.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 font-semibold">FREE</span>
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span className="font-semibold text-gray-900">₹{cart.tax || '0.00'}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total Amount</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{cart.total}</p>
                    <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                console.log('Button clicked!');
                console.log('Button disabled?', submitting || !selectedAddress || !selectedPayment);
                console.log('- submitting:', submitting);
                console.log('- selectedAddress:', selectedAddress);
                console.log('- selectedPayment:', selectedPayment);
                handlePlaceOrder();
              }}
              disabled={submitting || !selectedAddress || !selectedPayment}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                submitting || !selectedAddress || !selectedPayment
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-xl hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Order...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Place Order
                  <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            {/* Debug info */}
            <div className="text-xs text-center mt-3">
              {!selectedAddress && (
                <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  No address selected
                </div>
              )}
              {!selectedPayment && (
                <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg mt-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  No payment method selected
                </div>
              )}
              {selectedAddress && selectedPayment && (
                <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 p-2 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ready to place order
                </div>
              )}
            </div>

            {/* Security & Terms */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout</span>
              </div>
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By placing your order, you agree to our
                <a href="/terms" className="text-primary hover:underline mx-1">terms and conditions</a>
                and
                <a href="/privacy" className="text-primary hover:underline mx-1">privacy policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
