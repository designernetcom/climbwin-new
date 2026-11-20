import { Link } from 'react-router-dom';
import { useComparison } from '../contexts/ComparisonContext';
import { useAuth, useCart } from '../store/hooks';
import { FiX, FiShoppingCart, FiCheck, FiMinus, FiStar } from 'react-icons/fi';
import { getImageUrl } from '../utils/imageHelper';
import { toast } from 'react-toastify';

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useComparison();
  const { addToCart, isProductInCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    // Check if product is already in cart
    const purchaseType = product.is_rentable ? 'rent' : 'buy';
    if (isProductInCart(product.id, purchaseType)) {
      toast.info('Already added to cart');
      return;
    }

    await addToCart({
      product_id: product.id,
      qty: 1,
      purchase_type: purchaseType,
      rental_duration: product.is_rentable ? 1 : null,
    });
  };

  if (compareList.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">No products to compare</h2>
        <p className="text-gray-600 mb-6">
          Add products to your comparison list to see them here
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const features = [
    { key: 'price', label: 'Price', render: (product) => {
      const price = product.offer_price > 0 ? product.offer_price : product.price;
      return <span className="text-xl font-bold text-primary">${price}</span>;
    }},
    { key: 'type', label: 'Type', render: (product) => {
      return product.is_rentable ? (
        <span className="badge bg-green-100 text-green-800">For Rent</span>
      ) : (
        <span className="badge bg-blue-100 text-blue-800">For Sale</span>
      );
    }},
    { key: 'rating', label: 'Rating', render: (product) => {
      const rating = product.reviews_avg_rating || 0;
      return (
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating.toFixed(1)} ({product.reviews_count || 0})
          </span>
        </div>
      );
    }},
    { key: 'brand', label: 'Brand', render: (product) => {
      return product.brand?.name || 'N/A';
    }},
    { key: 'category', label: 'Category', render: (product) => {
      return product.category?.name || 'N/A';
    }},
    { key: 'stock', label: 'Availability', render: (product) => {
      return product.qty > 0 ? (
        <span className="flex items-center gap-1 text-green-600">
          <FiCheck className="w-4 h-4" />
          In Stock ({product.qty})
        </span>
      ) : (
        <span className="flex items-center gap-1 text-red-600">
          <FiMinus className="w-4 h-4" />
          Out of Stock
        </span>
      );
    }},
    { key: 'sku', label: 'SKU', render: (product) => {
      return product.sku || 'N/A';
    }},
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Comparison</h1>
            <p className="text-gray-600">
              Compare {compareList.length} product{compareList.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear All
          </button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {/* Product Images & Names */}
                <tr className="border-b">
                  <td className="p-6 font-semibold bg-gray-50 sticky left-0 z-10 min-w-[150px]">
                    Product
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} className="p-6 text-center min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                        >
                          <FiX />
                        </button>
                        <Link to={`/products/${product.slug}`}>
                          <img
                            src={getImageUrl(product.thumb_image)}
                            alt={product.name}
                            className="w-full aspect-square object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-semibold text-lg hover:text-primary line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Features Comparison */}
                {features.map((feature, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="p-6 font-semibold sticky left-0 z-10 bg-inherit">
                      {feature.label}
                    </td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-6 text-center">
                        {feature.render(product)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Description */}
                <tr className="border-b">
                  <td className="p-6 font-semibold bg-gray-50 sticky left-0 z-10">
                    Description
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} className="p-6 text-sm text-gray-700">
                      <p className="line-clamp-4">{product.short_description}</p>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-6 font-semibold bg-gray-50 sticky left-0 z-10">
                    Actions
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} className="p-6">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.qty === 0}
                          className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <FiShoppingCart />
                          Add to Cart
                        </button>
                        <Link
                          to={`/products/${product.slug}`}
                          className="btn btn-outline w-full text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">Comparison Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You can compare up to 4 products at a time</li>
            <li>• Compare products side-by-side to make better purchasing decisions</li>
            <li>• Click "View Details" to see full product specifications</li>
            <li>• Your comparison list is saved locally in your browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Compare;
