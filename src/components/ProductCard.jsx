import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiEye, FiCheckCircle, FiTruck, FiStar, FiTag } from 'react-icons/fi';
import { useAuth, useCart, useWishlist } from '../store/hooks';
import { toast } from 'react-toastify';
import { getImageUrl } from '../utils/imageHelper';

const ProductCard = ({ product }) => {
  const { addToCart, isProductInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const inWishlist = isInWishlist(product.id);
  const purchaseType = product.is_rentable ? 'rent' : 'buy';
  const productInCart = isProductInCart(product.id, purchaseType);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    // Check if product is already in cart
    if (productInCart) {
      toast.info('Already added to cart');
      return;
    }

    await addToCart({
      product_id: product.id,
      qty: 1,
      purchase_type: product.is_rentable ? 'rent' : 'buy',
      rental_duration: product.is_rentable ? 1 : null,
    });
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    await toggleWishlist(product.id);
  };

  const getPrice = () => {
    if (product.offer_price && product.offer_price > 0) {
      return (
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ₹{product.offer_price}
          </span>
          <span className="text-base text-gray-400 line-through font-medium">₹{product.price}</span>
        </div>
      );
    }
    return (
      <span className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        ₹{product.price}
      </span>
    );
  };

  const getDiscount = () => {
    if (product.offer_price && product.offer_price > 0) {
      const discount = Math.round(((product.price - product.offer_price) / product.price) * 100);
      return discount;
    }
    return 0;
  };

  const discount = getDiscount();

  const secondaryImage = product.product_image_galleries?.[0]?.image || product.thumb_image;

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 ">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={getImageUrl(product.thumb_image)}
            alt={product.name}
            className="w-full h-full object-cover   transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* Secondary Image on Hover */}
          <img
            src={getImageUrl(secondaryImage)}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded shadow-md flex items-center gap-1">
              <FiTag className="w-3 h-3" />
              {discount}% OFF
            </span>
          )}
          {product.product_type && (
            <span className="px-2 py-1 bg-gray-800/90 backdrop-blur-sm text-white text-xs font-medium rounded shadow-md">
              {product.product_type.replace('_', ' ')}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-10">
          <button
            onClick={handleWishlistToggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-200 ${
              inWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-red-50'
            }`}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center shadow-lg transition-all duration-200"
            title="Quick view"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Brand/Category */}
        <div className="text-xs text-gray-500 mb-1 truncate">
          {product.brand?.name || product.category?.name}
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${product.slug}`}
          className="block text-sm font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight h-10"
        >
          {product.name}
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-700 text-white text-xs font-semibold">
            <span>{product.reviews_avg_rating ? product.reviews_avg_rating.toFixed(1) : '4.0'}</span>
            <FiStar className="w-3 h-3 fill-current" />
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews_count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mb-2">
          {product.offer_price && product.offer_price > 0 ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.offer_price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-green-600">
                {discount}% off
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Delivery Info - Amazon Style */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
          <FiTruck className="w-3.5 h-3.5 text-green-600" />
          <span className="font-medium">Free Delivery</span>
        </div>

        {/* Availability Tag */}
        <div className="mb-3">
          {product.is_rentable ? (
            <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded border border-emerald-200">
              Available for Rent
            </span>
          ) : (
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded border border-blue-200">
              Buy Now
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-sm ${
            productInCart
              ? 'bg-orange-500 text-white cursor-default'
              : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-sm hover:shadow-md'
          }`}
        >
          {productInCart ? (
            <>
              <FiCheckCircle className="w-4 h-4" />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <FiShoppingCart className="w-4 h-4" />
              <span>{product.is_rentable ? 'Rent Now' : 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
