import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService, categoryService } from '../services';
import ProductCard from '../components/ProductCard';
import ShimmerProductCard from '../components/ShimmerProductCard';
import {
  FiGrid, FiList, FiX, FiFilter, FiSearch, FiChevronDown, FiChevronUp,
  FiStar, FiCheck, FiTag, FiPackage, FiDollarSign, FiTrendingUp,
  FiClock, FiBookmark, FiRefreshCw, FiDownload, FiUpload
} from 'react-icons/fi';
import api from '../services/api';

const Products = ({ defaultRentable = '', pageTitle = 'All Products' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [pagination, setPagination] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Advanced Filter States
  const [filters, setFilters] = useState({
    // Backend-compatible filters
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    price_min: searchParams.get('price_min') || '',
    price_max: searchParams.get('price_max') || '',
    is_rentable: searchParams.get('is_rentable') || defaultRentable,
    sort_by: searchParams.get('sort_by') || '',
    search: searchParams.get('search') || '',

    // Additional filters (these will be sent to backend if it supports them)
    min_rating: searchParams.get('min_rating') || '',
    stock_status: searchParams.get('stock_status') || '',
    condition: searchParams.get('condition') || '',
    on_sale: searchParams.get('on_sale') === 'true',
    featured: searchParams.get('featured') === 'true',
  });

  // UI States
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: false,
    stock: false,
    condition: false,
    attributes: false,
    special: false,
  });
  const [searchCategory, setSearchCategory] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filterPresets, setFilterPresets] = useState([]);
  const [savePresetName, setSavePresetName] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    loadFilterPresets();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  // Load saved filter presets from localStorage
  const loadFilterPresets = () => {
    const saved = localStorage.getItem('productFilterPresets');
    if (saved) {
      setFilterPresets(JSON.parse(saved));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await api.get('/brands');
      if (response.data.success) {
        setBrands(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams);
      // Set 12 products per page
      params.per_page = 12;
      const response = await productService.getProducts(params);

      if (response.success) {
        setProducts(response.data.data);
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Advanced Filter Update Functions
  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    syncFiltersToURL(newFilters);
  };

  const syncFiltersToURL = (filterObj) => {
    const newParams = new URLSearchParams();

    Object.keys(filterObj).forEach((key) => {
      const value = filterObj[key];
      if (Array.isArray(value) && value.length > 0) {
        newParams.set(key, value.join(','));
      } else if (typeof value === 'boolean' && value) {
        newParams.set(key, 'true');
      } else if (value && !Array.isArray(value)) {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  const applyPriceFilter = () => {
    const newFilters = { ...filters, price_min: priceRange[0], price_max: priceRange[1] };
    setFilters(newFilters);
    syncFiltersToURL(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      brand: '',
      price_min: '',
      price_max: '',
      is_rentable: defaultRentable,
      sort_by: '',
      search: '',
      min_rating: '',
      stock_status: '',
      condition: '',
      on_sale: false,
      featured: false,
    };
    setFilters(clearedFilters);
    setPriceRange([0, 100000]);
    setSearchParams(defaultRentable ? { is_rentable: defaultRentable } : {});
  };

  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some((key) => {
      const value = filters[key];
      if (key === 'is_rentable' && value === defaultRentable) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return value;
      return value !== '';
    });
  }, [filters, defaultRentable]);

  // Filter Preset Functions
  const saveFilterPreset = () => {
    if (!savePresetName.trim()) return;

    const newPreset = {
      id: Date.now(),
      name: savePresetName,
      filters: { ...filters },
      createdAt: new Date().toISOString(),
    };

    const updatedPresets = [...filterPresets, newPreset];
    setFilterPresets(updatedPresets);
    localStorage.setItem('productFilterPresets', JSON.stringify(updatedPresets));
    setSavePresetName('');
  };

  const loadFilterPreset = (preset) => {
    setFilters(preset.filters);
    syncFiltersToURL(preset.filters);
    if (preset.filters.price_min || preset.filters.price_max) {
      setPriceRange([preset.filters.price_min || 0, preset.filters.price_max || 100000]);
    }
  };

  const deleteFilterPreset = (presetId) => {
    const updatedPresets = filterPresets.filter(p => p.id !== presetId);
    setFilterPresets(updatedPresets);
    localStorage.setItem('productFilterPresets', JSON.stringify(updatedPresets));
  };

  const exportFilters = () => {
    const dataStr = JSON.stringify(filters, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product-filters.json';
    link.click();
  };

  const importFilters = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result);
        setFilters(imported);
        syncFiltersToURL(imported);
      } catch (error) {
        console.error('Failed to import filters:', error);
      }
    };
    reader.readAsText(file);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filtered lists for search within filters
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      // Filter by search term
      const matchesSearch = cat.name.toLowerCase().includes(searchCategory.toLowerCase());

      // If in Buy section (is_rentable = 0), only show categories with buyable products
      if (filters.is_rentable === '0' || defaultRentable === '0') {
        // Check if category has buyable products
        // You can add logic here to check if cat.has_buyable_products or cat.buyable_count > 0
        // For now, we'll show all categories but you can add backend support later
        return matchesSearch && (cat.has_buyable_products !== false);
      }

      // If in Rent section (is_rentable = 1), only show categories with rentable products
      if (filters.is_rentable === '1' || defaultRentable === '1') {
        return matchesSearch && (cat.has_rentable_products !== false);
      }

      // For "All Products", show all categories
      return matchesSearch;
    });
  }, [categories, searchCategory, filters.is_rentable, defaultRentable]);

  const filteredBrands = useMemo(() => {
    return brands.filter(brand =>
      brand.name.toLowerCase().includes(searchBrand.toLowerCase())
    );
  }, [brands, searchBrand]);

  // Define available options
  const conditions = [
    { value: 'new', label: 'Brand New', icon: '✨' },
    { value: 'like_new', label: 'Like New', icon: '🌟' },
    { value: 'used', label: 'Used', icon: '📦' },
    { value: 'refurbished', label: 'Refurbished', icon: '🔧' },
  ];
  const stockStatuses = [
    { value: 'in_stock', label: 'In Stock', icon: '✅', color: 'text-green-600' },
    { value: 'low_stock', label: 'Low Stock', icon: '⚠️', color: 'text-yellow-600' },
    { value: 'out_of_stock', label: 'Out of Stock', icon: '❌', color: 'text-red-600' },
  ];

  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Advanced Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-primary/10">
        <div className="flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-xl text-gray-900">Advanced Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v).length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
              title="Clear all filters"
            >
              <FiX className="w-4 h-4" /> Clear
            </button>
          )}
          <button
            onClick={() => setExpandedSections(prev => {
              const allExpanded = Object.values(prev).every(v => v);
              return Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: !allExpanded }), {});
            })}
            className="text-sm text-gray-500 hover:text-gray-700"
            title="Expand/Collapse all"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button
          onClick={exportFilters}
          className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-1"
          title="Export current filters"
        >
          <FiDownload className="w-3 h-3" /> Export
        </button>
        <label className="flex-1">
          <input
            type="file"
            accept=".json"
            onChange={importFilters}
            className="hidden"
          />
          <div className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer">
            <FiUpload className="w-3 h-3" /> Import
          </div>
        </label>
      </div>

      {/* Save Filter Preset */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-3 rounded-xl border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <FiBookmark className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-gray-900">Save Current Filters</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Preset name..."
            value={savePresetName}
            onChange={(e) => setSavePresetName(e.target.value)}
            className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          />
          <button
            onClick={saveFilterPreset}
            disabled={!savePresetName.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>

      {/* Saved Presets */}
      {filterPresets.length > 0 && (
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <FiBookmark className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-sm text-gray-900">Saved Presets</h4>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {filterPresets.map(preset => (
              <div key={preset.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg group">
                <button
                  onClick={() => loadFilterPreset(preset)}
                  className="flex-1 text-left text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => deleteFilterPreset(preset.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Filter Buttons */}
      <div className="pb-4 border-b border-gray-200">
        <h4 className="font-semibold text-sm mb-3 text-gray-900">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('on_sale', !filters.on_sale)}
            className={`text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              filters.on_sale
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiTag className="w-3 h-3" /> On Sale
          </button>
          <button
            onClick={() => updateFilter('featured', !filters.featured)}
            className={`text-xs px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              filters.featured
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiStar className="w-3 h-3" /> Featured
          </button>
        </div>
      </div>

      {/* Product Type (Buy/Rent) */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="font-semibold mb-4 text-gray-900">Product Type</h4>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="type"
              checked={filters.is_rentable === ''}
              onChange={() => updateFilter('is_rentable', '')}
              className="mr-3 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
              All Products
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="type"
              checked={filters.is_rentable === '0'}
              onChange={() => updateFilter('is_rentable', '0')}
              className="mr-3 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
              For Purchase
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="type"
              checked={filters.is_rentable === '1'}
              onChange={() => updateFilter('is_rentable', '1')}
              className="mr-3 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
              For Rent
            </span>
          </label>
        </div>
      </div>

      {/* Categories - Single Select with Search */}
      <div className="pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            Categories
            {filters.category && (
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">1</span>
            )}
          </h4>
          {expandedSections.category ? (
            <FiChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expandedSections.category && (
          <>
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === ''}
                  onChange={() => updateFilter('category', '')}
                  className="mr-3 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                  All Categories
                </span>
              </label>
              {filteredCategories.map((category) => (
                <label key={category.id} className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center flex-1">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category.slug}
                      onChange={() => updateFilter('category', category.slug)}
                      className="mr-3 w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </div>
                  {category.products_count > 0 && (
                    <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                      {category.products_count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Brands - Single Select with Search */}
      <div className="pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            Brands
            {filters.brand && (
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">1</span>
            )}
          </h4>
          {expandedSections.brand ? (
            <FiChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expandedSections.brand && (
          <>
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              <label className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === ''}
                  onChange={() => updateFilter('brand', '')}
                  className="mr-3 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                  All Brands
                </span>
              </label>
              {filteredBrands.map((brand) => (
                <label key={brand.id} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="brand"
                    checked={filters.brand === brand.slug}
                    onChange={() => updateFilter('brand', brand.slug)}
                    className="mr-3 w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Price Range - Enhanced */}
      <div className="pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            {/* <FiDollarSign className="w-4 h-4 text-primary" /> */}
            Price Range
          </h4>
          {expandedSections.price ? (
            <FiChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expandedSections.price && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-sm font-semibold text-primary mb-2">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1 accent-primary"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1 accent-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="input text-sm rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="input text-sm rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Apply Price Range
            </button>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="text-xs font-semibold text-gray-600 mb-2">Quick Select</h5>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '< ₹500', min: 0, max: 500 },
                  { label: '₹500-1K', min: 500, max: 1000 },
                  { label: '₹1K-5K', min: 1000, max: 5000 },
                  { label: '> ₹5K', min: 5000, max: 100000 },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      setPriceRange([range.min, range.max]);
                      setFilters({ ...filters, price_min: range.min, price_max: range.max });
                      syncFiltersToURL({ ...filters, price_min: range.min, price_max: range.max });
                    }}
                    className="text-xs font-medium text-gray-700 hover:text-white hover:bg-primary/80 bg-gray-100 transition-all py-2 px-2 rounded-lg"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Rating Filter */}
      <div className="pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <FiStar className="w-4 h-4 text-yellow-500" />
            Customer Rating
          </h4>
          {expandedSections.rating ? (
            <FiChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.min_rating === rating.toString()}
                  onChange={() => updateFilter('min_rating', rating.toString())}
                  className="mr-3 w-4 h-4 accent-primary cursor-pointer"
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
                  <span className="text-sm text-gray-700 font-medium">& Up</span>
                </div>
              </label>
            ))}
            {filters.min_rating && (
              <button
                onClick={() => updateFilter('min_rating', '')}
                className="text-xs text-red-500 hover:text-red-600 font-semibold mt-2"
              >
                Clear Rating Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('stock')}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <FiPackage className="w-4 h-4 text-primary" />
            Stock Status
          </h4>
          {expandedSections.stock ? (
            <FiChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expandedSections.stock && (
          <div className="space-y-2">
            {stockStatuses.map((status) => (
              <label key={status.value} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="stock_status"
                  checked={filters.stock_status === status.value}
                  onChange={() => updateFilter('stock_status', status.value)}
                  className="mr-3 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-lg mr-2">{status.icon}</span>
                <span className={`text-sm font-medium ${status.color}`}>
                  {status.label}
                </span>
              </label>
            ))}
            {filters.stock_status && (
              <button
                onClick={() => updateFilter('stock_status', '')}
                className="text-xs text-red-500 hover:text-red-600 font-semibold mt-2"
              >
                Clear Stock Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Condition */}
      <div className="pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('condition')}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <FiTag className="w-4 h-4 text-primary" />
            Condition
          </h4>
          {expandedSections.condition ? (
            <FiChevronUp className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          ) : (
            <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expandedSections.condition && (
          <div className="space-y-2">
            {conditions.map((cond) => (
              <label key={cond.value} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="condition"
                  checked={filters.condition === cond.value}
                  onChange={() => updateFilter('condition', cond.value)}
                  className="mr-3 w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-lg mr-2">{cond.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {cond.label}
                </span>
              </label>
            ))}
            {filters.condition && (
              <button
                onClick={() => updateFilter('condition', '')}
                className="text-xs text-red-500 hover:text-red-600 font-semibold mt-2"
              >
                Clear Condition Filter
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Page Header */}

      
      <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border-b border-gray-200">
        <div className="container-custom py-10">
          <h1 className="text-3xl lg:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {pageTitle || (filters.is_rentable === '1' ? 'Products For Rent' : filters.is_rentable === '0' ? 'Products For Sale' : 'All Products')}
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            {pagination ? (
              <span>
                <span className="text-primary font-bold">{pagination.total}</span> products available
              </span>
            ) : (
              'Discover our curated collection'
            )}
          </p>
          
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-white border-2 border-gray-200 hover:border-primary text-gray-900 font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <FiFilter className="w-5 h-5" />
              <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
              <div className="bg-white rounded-2xl shadow-md p-6 mt-4 border border-gray-100">
                <FilterSidebar />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters Tags - Enhanced */}
            {hasActiveFilters && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <FiFilter className="w-4 h-4 text-primary" />
                    Active Filters
                  </h4>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1"
                  >
                    <FiX className="w-3 h-3" /> Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Product Type */}
                  {filters.is_rentable && filters.is_rentable !== defaultRentable && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                      <FiPackage className="w-3 h-3" />
                      {filters.is_rentable === '1' ? 'For Rent' : 'For Sale'}
                      <button onClick={() => updateFilter('is_rentable', defaultRentable)} className="hover:bg-blue-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Category */}
                  {filters.category && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                      {categories.find(c => c.slug === filters.category)?.name}
                      <button onClick={() => updateFilter('category', '')} className="hover:bg-purple-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Brand */}
                  {filters.brand && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200">
                      {brands.find(b => b.slug === filters.brand)?.name}
                      <button onClick={() => updateFilter('brand', '')} className="hover:bg-indigo-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Price Range */}
                  {(filters.price_min || filters.price_max) && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                      <FiDollarSign className="w-3 h-3" />
                      ₹{filters.price_min || '0'} - ₹{filters.price_max || '∞'}
                      <button onClick={() => updateFilter('price_min', '') || updateFilter('price_max', '')} className="hover:bg-green-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Rating */}
                  {filters.min_rating && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 rounded-full text-xs font-semibold border border-yellow-200">
                      <FiStar className="w-3 h-3" />
                      {filters.min_rating}+ Stars
                      <button onClick={() => updateFilter('min_rating', '')} className="hover:bg-yellow-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Stock Status */}
                  {filters.stock_status && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-100 to-teal-50 text-teal-700 rounded-full text-xs font-semibold border border-teal-200">
                      {stockStatuses.find(s => s.value === filters.stock_status)?.label}
                      <button onClick={() => updateFilter('stock_status', '')} className="hover:bg-teal-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Condition */}
                  {filters.condition && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 rounded-full text-xs font-semibold border border-orange-200">
                      <FiTag className="w-3 h-3" />
                      {conditions.find(c => c.value === filters.condition)?.label}
                      <button onClick={() => updateFilter('condition', '')} className="hover:bg-orange-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Quick Filters */}
                  {filters.on_sale && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-200">
                      <FiTag className="w-3 h-3" />
                      On Sale
                      <button onClick={() => updateFilter('on_sale', false)} className="hover:bg-red-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.featured && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 rounded-full text-xs font-semibold border border-yellow-200">
                      <FiStar className="w-3 h-3" />
                      Featured
                      <button onClick={() => updateFilter('featured', false)} className="hover:bg-yellow-200 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-5 rounded-xl shadow-md border border-gray-100">
              <div className="text-gray-700 font-semibold text-lg">
                {pagination && (
                  <span>
                    <span className="text-primary">{pagination.total}</span> Products
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:bg-white hover:text-primary'
                    }`}
                    title="Grid View"
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:bg-white hover:text-primary'
                    }`}
                    title="List View"
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={filters.sort_by}
                  onChange={(e) => updateFilter('sort_by', e.target.value)}
                  className="input text-sm font-medium rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 transition-all px-4 py-2.5"
                >
                  <option value="">Sort By</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div
                className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                } gap-4`}
              >
                {[...Array(8)].map((_, index) => (
                  <ShimmerProductCard key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div
                className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                } gap-4`}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
                <div className="text-7xl mb-6">📦</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">No Products Found</h3>
                <p className="text-gray-600 mb-6 text-lg">Try adjusting your filters or search criteria</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="flex justify-center mt-10 gap-2 flex-wrap">
                {/* Previous Button */}
                <button
                  onClick={() => {
                    if (pagination.current_page > 1) {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set('page', pagination.current_page - 1);
                      setSearchParams(newParams);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={pagination.current_page === 1}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    pagination.current_page === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {[...Array(pagination.last_page)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.last_page ||
                    (pageNum >= pagination.current_page - 1 && pageNum <= pagination.current_page + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const newParams = new URLSearchParams(searchParams);
                          newParams.set('page', pageNum);
                          setSearchParams(newParams);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-4 py-2.5 min-w-[44px] rounded-lg font-semibold transition-all ${
                          pagination.current_page === pageNum
                            ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md transform scale-110'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === pagination.current_page - 2 ||
                    pageNum === pagination.current_page + 2
                  ) {
                    return (
                      <span key={i} className="px-2 py-2.5 text-gray-400 font-semibold">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() => {
                    if (pagination.current_page < pagination.last_page) {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set('page', pagination.current_page + 1);
                      setSearchParams(newParams);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={pagination.current_page === pagination.last_page}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    pagination.current_page === pagination.last_page
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
