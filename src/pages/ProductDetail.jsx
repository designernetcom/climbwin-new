import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { productService, reviewService } from '../services';
import { useAuth, useCart, useWishlist } from '../store/hooks';
import {
  FiShoppingCart, FiHeart, FiShare2, FiTruck,
  FiShield, FiRefreshCw, FiStar, FiChevronRight, FiCreditCard,
  FiEye, FiTrendingUp, FiZap, FiAward, FiPackage, FiGift,
  FiCheckCircle, FiAlertCircle, FiClock, FiUsers, FiBarChart2,
  FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiCopy,
  FiMaximize2, FiRotateCw, FiVideo, FiBox, FiChevronLeft
} from 'react-icons/fi';
import { getImageUrl } from '../utils/imageHelper';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import ShimmerProductDetail from '../components/ShimmerProductDetail';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Advanced Features State
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [viewCount, setViewCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [priceHistory, setPriceHistory] = useState([]);
  const [show360View, setShow360View] = useState(false);

  const { cart, addToCart, isProductInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [productInCart, setProductInCart] = useState(false);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  // Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // View Count Simulation
  useEffect(() => {
    if (product) {
      const baseViews = Math.floor(Math.random() * 1000) + 500;
      setViewCount(baseViews);

      const viewInterval = setInterval(() => {
        setViewCount(prev => prev + Math.floor(Math.random() * 3));
      }, 30000);

      return () => clearInterval(viewInterval);
    }
  }, [product]);

  // Recent Purchases Simulation
  useEffect(() => {
    if (product) {
      const names = ['John D.', 'Sarah M.', 'Mike R.', 'Emily K.', 'David L.', 'Anna P.'];
      const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];

      const generatePurchase = () => {
        const name = names[Math.floor(Math.random() * names.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const minutes = Math.floor(Math.random() * 60) + 1;
        return { name, location, minutes, id: Date.now() };
      };

      setRecentPurchases([generatePurchase(), generatePurchase()]);

      const purchaseInterval = setInterval(() => {
        setRecentPurchases(prev => {
          const newPurchase = generatePurchase();
          return [newPurchase, ...prev.slice(0, 2)];
        });
      }, 45000);

      return () => clearInterval(purchaseInterval);
    }
  }, [product]);

  // Price History Generation
  useEffect(() => {
    if (product) {
      const history = [];
      const currentPrice = product.offer_price || product.price;
      for (let i = 6; i >= 0; i--) {
        const variance = Math.random() * 0.2 - 0.1;
        history.push({
          date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
          price: currentPrice * (1 + variance)
        });
      }
      setPriceHistory(history);
    }
  }, [product]);

  // Check if product is in cart
  useEffect(() => {
    if (product && product.id) {
      const purchaseType = product.is_rentable ? 'rent' : 'buy';
      const inCart = isProductInCart(product.id, purchaseType);
      setProductInCart(inCart);
    }
  }, [product, cart, isProductInCart]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductBySlug(slug);
      if (response.success) {
        setProduct(response.data);
        setSelectedImage(response.data.thumb_image);

        // Fetch reviews and related products
        if (response.data.id) {
          fetchReviews(response.data.id);
          // Pass the product data directly to fetchRelatedProducts
          fetchRelatedProducts(response.data.id, response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await reviewService.getProductReviews(productId);
      if (response.success) {
        setReviews(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchRelatedProducts = async (productId, productData) => {
    try {
      // Check if product has a category
      if (!productData || !productData.category) {
        console.log('Product or category not available');
        return;
      }

      // Fetch products from the same category
      const response = await productService.getProducts({
        category: productData.category.slug,
        per_page: 12, // Fetch more to ensure we have enough after filtering
      });

      if (response.success) {
        const allProducts = response.data.data || response.data || [];

        // Filter out the current product and limit to 8 items
        const filtered = allProducts
          .filter(p => p.id !== productId) // Exclude current product
          .slice(0, 8); // Limit to 8 related products

        setRelatedProducts(filtered);
        console.log(`Found ${filtered.length} related products in category: ${productData.category.name}`);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
      // Fallback to API's related products endpoint
      try {
        const fallbackResponse = await productService.getRelatedProducts(productId);
        if (fallbackResponse.success) {
          const products = fallbackResponse.data.data || [];
          // Still filter out current product from fallback
          setRelatedProducts(products.filter(p => p.id !== productId));
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    // Prevent duplicate additions
    if (productInCart) {
      toast.info('Already added to cart');
      return;
    }

    const result = await addToCart({
      product_id: product.id,
      qty,
      purchase_type: product.is_rentable ? 'rent' : 'buy',
      rental_duration: product.is_rentable ? rentalDuration : null,
    });

    // Update button state if successfully added
    if (result && result.success) {
      setProductInCart(true);
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    await toggleWishlist(product.id);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    try {
      const response = await reviewService.createReview({
        product_id: product.id,
        rating: reviewForm.rating,
        review: reviewForm.review,
      });

      if (response.success) {
        toast.success('Review submitted successfully!');
        setReviewForm({ rating: 5, review: '' });
        setShowReviewForm(false);
        fetchReviews(product.id);
      }
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  const calculateRentalPrice = () => {
    if (!product.is_rentable) return product.offer_price || product.price;

    const monthlyPrice = product.offer_price || product.price;
    const totalPrice = monthlyPrice * rentalDuration;

    // Apply discounts based on duration
    let discount = 0;
    if (rentalDuration >= 24) discount = 0.25;
    else if (rentalDuration >= 12) discount = 0.20;
    else if (rentalDuration >= 6) discount = 0.10;
    else if (rentalDuration >= 3) discount = 0.05;

    return (totalPrice * (1 - discount)).toFixed(2);
  };

  const getDiscountPercent = () => {
    if (!product.offer_price || product.offer_price <= 0) return 0;
    return Math.round(((product.price - product.offer_price) / product.price) * 100);
  };

  // Advanced Feature Handlers
  const handleImageZoom = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name}`;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${text}&body=${url}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return <ShimmerProductDetail />;
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercent();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <FiChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-primary">Products</Link>
            <FiChevronRight className="w-4 h-4" />
            {product.category && (
              <>
                <Link to={`/products?category=${product.category.slug}`} className="hover:text-primary">
                  {product.category.name}
                </Link>
                <FiChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Image Gallery - Left Section */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image with Advanced Features */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square group">
              <div
                className="relative w-full h-full cursor-zoom-in"
                onMouseMove={handleImageZoom}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={getImageUrl(selectedImage)}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : {}
                  }
                />

                {/* Advanced Zoom Overlay */}
                {isZoomed && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
                    <FiMaximize2 className="w-3 h-3" />
                    Zoomed In
                  </div>
                )}
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1 animate-pulse">
                    <FiZap className="w-4 h-4" />
                    -{discount}% OFF
                  </div>
                )}
                {product.qty > 0 && product.qty < 10 && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-1">
                    <FiAlertCircle className="w-4 h-4" />
                    Only {product.qty} Left
                  </div>
                )}
              </div>

              {/* Type Badge */}
              {product.is_rentable ? (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  For Rent
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  For Sale
                </div>
              )}

              {/* Advanced Action Buttons */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
                  title="360° View"
                  onClick={() => setShow360View(!show360View)}
                >
                  <FiRotateCw className="w-5 h-5" />
                </button>
                <button
                  className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
                  title="AR Preview"
                >
                  <FiBox className="w-5 h-5" />
                </button>
                <button
                  className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
                  title="Video Demo"
                >
                  <FiVideo className="w-5 h-5" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <FiCheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-gray-800">Verified</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <FiAward className="w-3 h-3 text-blue-600" />
                  <span className="text-gray-800">Premium</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.product_image_galleries && product.product_image_galleries.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                <div
                  onClick={() => setSelectedImage(product.thumb_image)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === product.thumb_image ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={getImageUrl(product.thumb_image)}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                {product.product_image_galleries.map((gallery, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(gallery.image)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === gallery.image ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={getImageUrl(gallery.image)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Main Info - Middle Section */}
          <div className="lg:col-span-4 space-y-4">
            {/* Live Analytics Bar */}
            <div className="flex flex-wrap items-center gap-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
              {/* <div className="flex items-center gap-2 text-sm">
                <FiEye className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-gray-800">
                  <span className="text-indigo-600">{viewCount.toLocaleString()}</span> viewing now
                </span>
              </div> */}
              <div className="flex items-center gap-2 text-sm">
                <FiTrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-600">Trending</span>
              </div>
              {/* <div className="flex items-center gap-2 text-sm">
                <FiUsers className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-gray-800">
                  <span className="text-purple-600">{Math.floor(Math.random() * 50) + 20}</span> sold today
                </span>
              </div> */}
            </div>

            {/* Brand */}
            {product.brand && (
              <Link
                to={`/products?brand=${product.brand.slug}`}
                className="text-sm text-primary hover:underline font-medium"
              >
                Visit the {product.brand.name} Store
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl font-medium text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="text-sm font-medium text-gray-900">
                  {product.reviews_avg_rating ? product.reviews_avg_rating.toFixed(1) : '4.0'}
                </span>
                <FiStar className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm text-gray-600">
                {product.reviews_count || 0} ratings
              </span>
            </div>

            {/* Category */}
            {product.category && (
              <div className="text-sm">
                <span className="text-gray-600">Category: </span>
                <Link
                  to={`/products?category=${product.category.slug}`}
                  className="text-primary hover:underline"
                >
                  {product.category.name}
                </Link>
              </div>
            )}

            {/* Description - Key Features */}
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About this item</h2>
              <div className="prose max-w-none text-sm text-gray-700 space-y-2">
                <p>{product.short_description}</p>
              </div>
            </div>
          </div>

          {/* Sticky Buy Box - Right Section (Amazon Style) */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-4 space-y-4">
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                {/* Price */}
                <div className="mb-4 pb-4 border-b">
                  {product.is_rentable ? (
                    <>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-medium text-red-700">₹{calculateRentalPrice()}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        for {rentalDuration} month{rentalDuration > 1 ? 's' : ''}
                      </div>
                      {product.offer_price > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          Monthly: <span className="line-through">₹{product.price}</span>{' '}
                          <span className="text-red-600 font-semibold">₹{product.offer_price}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {product.offer_price > 0 ? (
                        <>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-medium text-red-700">₹{product.offer_price.toLocaleString()}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            M.R.P.: <span className="line-through">₹{product.price.toLocaleString()}</span>
                          </div>
                          <div className="text-sm text-red-600 font-medium">
                            Save ₹{(product.price - product.offer_price).toLocaleString()} ({discount}%)
                          </div>
                        </>
                      ) : (
                        <div className="text-3xl font-medium text-red-700">₹{product.price.toLocaleString()}</div>
                      )}
                    </>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="space-y-3 mb-4 pb-4 border-b text-sm">
                  <div className="flex items-start gap-2">
                    <FiTruck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-primary">FREE delivery</div>
                      <div className="text-gray-600">
                        {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Or fastest delivery{' '}
                    <span className="font-semibold">Tomorrow</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  {product.qty > 0 ? (
                    <>
                      <div className="text-lg font-medium text-green-700 mb-1">In Stock</div>
                      {product.qty < 10 && (
                        <div className="text-sm text-red-600 font-medium">
                          Only {product.qty} left in stock - order soon.
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-lg font-medium text-red-600">Currently unavailable</div>
                  )}
                </div>

                {/* Rental Duration or Quantity */}
                {product.is_rentable ? (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-900 mb-2 block">Rental Duration:</label>
                    <select
                      value={rentalDuration}
                      onChange={(e) => setRentalDuration(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value={1}>1 Month</option>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months</option>
                      <option value={24}>24 Months</option>
                    </select>
                    {rentalDuration >= 3 && (
                      <div className="mt-2 text-xs text-green-700 font-medium">
                        Special Discount: {rentalDuration >= 24 ? '25%' : rentalDuration >= 12 ? '20%' : rentalDuration >= 6 ? '10%' : '5%'} OFF applied!
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-900 mb-2 block">Quantity:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(parseInt(e.target.value))}
                      disabled={product.qty === 0}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                    >
                      {[...Array(Math.min(product.qty, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Qty: {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.qty === 0 || productInCart}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all mb-2 ${
                    productInCart
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed'
                  }`}
                >
                  {productInCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiCheckCircle className="w-5 h-5" />
                      Added to Cart
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FiShoppingCart className="w-5 h-5" />
                      {product.is_rentable ? 'Rent Now' : 'Add to Cart'}
                    </span>
                  )}
                </button>

                {/* Wishlist & Share */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={handleWishlistToggle}
                    className={`flex-1 py-2 px-4 rounded-lg border font-medium text-sm transition-all ${
                      inWishlist
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                      {inWishlist ? 'Saved' : 'Save'}
                    </span>
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium text-sm"
                    >
                      <FiShare2 className="w-4 h-4" />
                    </button>
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50 min-w-[200px]">
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 text-left text-sm"
                        >
                          <FiTwitter className="w-4 h-4" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 text-left text-sm"
                        >
                          <FiFacebook className="w-4 h-4" />
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 text-left text-sm"
                        >
                          <FiCopy className="w-4 h-4" />
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiShield className="w-4 h-4 text-green-600" />
                    <span>Secure transaction</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiRefreshCw className="w-4 h-4 text-blue-600" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    <span>Verified seller</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'description'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'specifications'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'reviews'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.long_description || product.short_description }} />
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.category && (
                    <div className="flex border-b pb-2">
                      <span className="font-semibold w-40">Category:</span>
                      <span className="text-gray-700">{product.category.name}</span>
                    </div>
                  )}
                  {product.brand && (
                    <div className="flex border-b pb-2">
                      <span className="font-semibold w-40">Brand:</span>
                      <span className="text-gray-700">{product.brand.name}</span>
                    </div>
                  )}
                  <div className="flex border-b pb-2">
                    <span className="font-semibold w-40">SKU:</span>
                    <span className="text-gray-700">{product.sku || 'N/A'}</span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="font-semibold w-40">Type:</span>
                    <span className="text-gray-700">{product.is_rentable ? 'Rental' : 'Sale'}</span>
                  </div>
                  {product.product_type && (
                    <div className="flex border-b pb-2">
                      <span className="font-semibold w-40">Product Type:</span>
                      <span className="text-gray-700">{product.product_type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  )}
                  <div className="flex border-b pb-2">
                    <span className="font-semibold w-40">Availability:</span>
                    <span className="text-gray-700">{product.qty > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {product.reviews_avg_rating ? product.reviews_avg_rating.toFixed(1) : '0.0'}
                      </div>
                      <div className="flex text-yellow-400 mb-1 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.reviews_avg_rating || 0) ? 'fill-current' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{product.reviews_count || 0} reviews</p>
                    </div>
                  </div>
                </div>

                {/* Add Review Button */}
                {isAuthenticated && !showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn btn-primary"
                  >
                    Write a Review
                  </button>
                )}

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-bold text-lg">Write Your Review</h3>
                    <div>
                      <label className="block font-semibold mb-2">Rating:</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="focus:outline-none"
                          >
                            <FiStar
                              className={`w-8 h-8 ${
                                star <= reviewForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Your Review:</label>
                      <textarea
                        value={reviewForm.review}
                        onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                        className="w-full border rounded-lg px-4 py-2 min-h-[120px]"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.review}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Slider - Same Category */}
        {relatedProducts.length > 0 ? (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <FiPackage className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Similar Products You May Like</h2>
                  <p className="text-sm text-gray-600">
                    {product.category && (
                      <>More great items from <span className="font-semibold text-purple-600">{product.category.name}</span></>
                    )}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                <FiZap className="w-3 h-3" />
                {relatedProducts.length} {relatedProducts.length === 1 ? 'Product' : 'Products'}
              </div>
            </div>

            {/* Swiper Slider */}
            <div className="relative related-products-slider">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  prevEl: '.related-prev',
                  nextEl: '.related-next',
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="pb-12"
              >
                {relatedProducts.map((relatedProduct) => (
                  <SwiperSlide key={relatedProduct.id}>
                    <ProductCard product={relatedProduct} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="related-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110">
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button className="related-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-110">
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : product && product.category ? (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Similar Products Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find other products in the <span className="font-semibold">{product.category.name}</span> category at the moment.
            </p>
            <Link to="/products" className="btn btn-primary inline-flex items-center gap-2">
              <FiPackage className="w-4 h-4" />
              Browse All Products
            </Link>
          </div>
        ) : null}
      </div>

      {/* Floating Social Proof Notification */}
      {/* {recentPurchases.length > 0 && recentPurchases[0] && (
        <div className="fixed bottom-24 left-4 z-40 animate-slide-in-left">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-green-200 p-4 max-w-sm flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <FiCheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{recentPurchases[0].name}</p>
              <p className="text-xs text-gray-600">from {recentPurchases[0].location}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">
                Purchased {recentPurchases[0].minutes} minutes ago
              </p>
            </div>
            <FiGift className="w-6 h-6 text-green-600" />
          </div>
        </div>
      )} */}

      {/* Floating Checkout Button - Shows on mobile/tablet when cart has items */}
      {cart && cart.item_count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-50 lg:hidden">
          <div className="container-custom">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center justify-center gap-2 text-lg px-6 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              <FiCreditCard className="w-5 h-5" />
              <span className="font-bold">
                Checkout ({cart.item_count}) - ₹{parseFloat(cart.total || 0).toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
