import { useState, useEffect } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiDollarSign, FiStar } from 'react-icons/fi';
import { categoryService } from '../services';

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    brand: false,
    type: true,
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await categoryService.getCategories();
      setCategories(response.categories || []);

      // Extract unique brands from categories if available
      // In a real app, you'd have a separate brands endpoint
      const uniqueBrands = [];
      setBrands(uniqueBrands);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const priceRanges = [
    { label: 'Under ₹50', min: 0, max: 50 },
    { label: '₹50 - ₹100', min: 50, max: 100 },
    { label: '₹100 - ₹250', min: 100, max: 250 },
    { label: '₹250 - ₹500', min: 250, max: 500 },
    { label: 'Over ₹500', min: 500, max: 999999 },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const productTypes = [
    { value: 'rent', label: 'For Rent' },
    { value: 'buy', label: 'For Sale' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const handlePriceChange = (min, max) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleCategoryChange = (categoryId) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const handleTypeChange = (type) => {
    onFilterChange({ ...filters, type: filters.type === type ? null : type });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  const activeFiltersCount = () => {
    let count = 0;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.minRating) count++;
    if (filters.type) count++;
    return count;
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b pb-4 mb-4 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {expandedSections[section] ? (
          <FiChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections[section] && <div className="space-y-2">{children}</div>}
    </div>
  );

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4 flex gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline flex items-center gap-2 flex-1"
        >
          <FiFilter />
          Filters
          {activeFiltersCount() > 0 && (
            <span className="bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeFiltersCount()}
            </span>
          )}
        </button>
        <select
          value={filters.sort || 'newest'}
          onChange={handleSortChange}
          className="input flex-1"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Panel */}
      <div
        className={`bg-white rounded-lg p-6 ${
          showFilters ? 'block' : 'hidden lg:block'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiFilter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Filters</h2>
            {activeFiltersCount() > 0 && (
              <span className="bg-primary text-white rounded-full w-6 h-6 text-sm flex items-center justify-center">
                {activeFiltersCount()}
              </span>
            )}
          </div>
          {activeFiltersCount() > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              <FiX className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Sort - Desktop */}
        <div className="hidden lg:block mb-6">
          <label className="block text-sm font-semibold mb-2">Sort By</label>
          <select
            value={filters.sort || 'newest'}
            onChange={handleSortChange}
            className="input w-full"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Type */}
        <FilterSection title="Product Type" section="type">
          <div className="space-y-2">
            {productTypes.map(type => (
              <label key={type.value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type === type.value}
                  onChange={() => handleTypeChange(type.value)}
                  className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categories" section="category">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map(category => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                  onChange={() => handlePriceChange(range.min, range.max)}
                  className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="text-gray-700 flex items-center gap-1">
                  <FiDollarSign className="w-4 h-4" />
                  {range.label}
                </span>
              </label>
            ))}
          </div>

          {/* Custom Price Range */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-semibold mb-2">Custom Range</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
                className="input text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
                className="input text-sm"
              />
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating" section="rating">
          <div className="space-y-2">
            {ratings.map(rating => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 text-sm">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Apply Button - Mobile */}
        <div className="lg:hidden mt-6">
          <button
            onClick={() => setShowFilters(false)}
            className="btn btn-primary w-full"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
