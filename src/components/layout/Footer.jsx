import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin, FiShield, FiTruck, FiCreditCard, FiHeadphones } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Top Section - Trust Badges */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FiTruck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Free Delivery</h4>
                <p className="text-xs text-gray-400">On all orders</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <FiShield className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Secure Payment</h4>
                <p className="text-xs text-gray-400">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FiCreditCard className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Easy Returns</h4>
                <p className="text-xs text-gray-400">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <FiHeadphones className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-400">Dedicated help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
 
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary text-white placeholder-gray-500"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                 Office Number 206, Sai Dham, Adarsh Nagar, Wagholi Road, Lohegaon, Pune 411047
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919767552564" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  +91 9767552564
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:support@rentalguru.com" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  info@climbwin.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm">We Accept</h4>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400">Visa</div>
            <div className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400">Mastercard</div>
            <div className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400">PayPal</div>
            <div className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400">Razorpay</div>
            <div className="px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400">Cash on Delivery</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            &copy; 2026 CLIMB WIN. All Rights Reserved.
          </p>
          <p>
            Design and Developed By{' '}
            <a
              href="https://netcom-india.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Netcom Business Solutions Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
