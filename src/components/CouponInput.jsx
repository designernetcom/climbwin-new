import { useState } from 'react';
import { couponService } from '../services/couponService';
import { FiTag } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CouponInput = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      setLoading(true);
      const response = await couponService.validateCoupon(couponCode);

      if (response.success) {
        setAppliedCoupon(response.data);
        onApplyCoupon(response.data);
        toast.success('Coupon applied successfully!');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid coupon code';
      toast.error(message);
      setAppliedCoupon(null);
      onApplyCoupon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    onApplyCoupon(null);
    toast.info('Coupon removed');
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <FiTag className="text-blue-600" />
        <h3 className="font-semibold">Have a Coupon Code?</h3>
      </div>

      {appliedCoupon ? (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-700">
                  {appliedCoupon.code}
                </p>
                <p className="text-sm text-green-600">
                  {appliedCoupon.discount_type === 'percent'
                    ? `${appliedCoupon.discount}% discount`
                    : `$${appliedCoupon.discount} discount`}
                </p>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponInput;
