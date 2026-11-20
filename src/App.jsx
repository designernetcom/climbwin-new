import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AppInitializer from './components/AppInitializer';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const RentProducts = lazy(() => import('./pages/RentProducts'));
const BuyProducts = lazy(() => import('./pages/BuyProducts'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const CheckoutNew = lazy(() => import('./pages/CheckoutNew'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Orders = lazy(() => import('./pages/dashboard/Orders'));
const OrderDetail = lazy(() => import('./pages/dashboard/OrderDetail'));
const Addresses = lazy(() => import('./pages/dashboard/Addresses'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PayPalPayment = lazy(() => import('./pages/payment/PayPalPayment'));
const StripePayment = lazy(() => import('./pages/payment/StripePayment'));
const VendorProducts = lazy(() => import('./pages/VendorProducts'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const FlashSale = lazy(() => import('./pages/FlashSale'));
const Terms = lazy(() => import('./pages/Terms'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Transactions = lazy(() => import('./pages/dashboard/Transactions'));
const ApiTest = lazy(() => import('./pages/ApiTest'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AppInitializer>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/rent" element={<RentProducts />} />
          <Route path="products/buy" element={<BuyProducts />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="vendors/:id/products" element={<VendorProducts />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="flash-sale" element={<FlashSale />} />
          <Route path="terms" element={<Terms />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="api-test" element={<ApiTest />} />

          {/* Protected routes */}
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment/paypal/:orderId"
            element={
              <ProtectedRoute>
                <PayPalPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment/stripe/:orderId"
            element={
              <ProtectedRoute>
                <StripePayment />
              </ProtectedRoute>
            }
          />

          {/* Dashboard routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/addresses"
            element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      </Suspense>
    </AppInitializer>
  );
}

export default App;
