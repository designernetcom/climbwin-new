import { Link } from 'react-router-dom';
import { FiCheckCircle, FiMail } from 'react-icons/fi';

const PaymentSuccess = () => (
  <div className="container-custom py-16 text-center">
    <div className="max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <FiCheckCircle className="text-green-500 w-20 h-20" />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Payment Successful!</h1>
      <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <FiMail className="w-5 h-5" />
          <p className="text-sm font-medium">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>

      <Link to="/dashboard/orders" className="btn btn-primary">View Orders</Link>
    </div>
  </div>
);

export default PaymentSuccess;
