import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useCart, useWishlist } from "../../store/hooks";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiPackage,
  FiSettings,
  FiLogOut,
  FiHome,
  FiShoppingBag,
  FiPhone,
  FiInfo,
  FiGrid,
} from "react-icons/fi";

// Category data structure - can be replaced with API call
// To add categories with subcategories, set hasSubcategories: true and add a subcategories array

export const PRODUCT_CATEGORIES = [
  {
    id: 1,
    name: "Sport Equipment",
    slug: "sport-equipment",
    description: "Sport Equipment",
    icon: FiGrid,
    color: "orange",
    hasSubcategories: true,
    subcategories: [
      {
        id: 11,
        name: "Sport Goods",
        slug: "sport-goods",
        link: "/products?category=sport-equipment&subcategory=sport-goods",
        description: "Sport Goods",
      },
      {
        id: 12,
        name: "Goalpost and Pole",
        slug: "goalpost-pole",
        link: "/products?category=sport-equipment&subcategory=goalpost-pole",
        description: "Goalpost and Pole",
      },
      {
        id: 13,
        name: "Athletic Equipment",
        slug: "athletic-equipment",
        link: "/products?category=sport-equipment&subcategory=athletic-equipment",
        description: "Athletic Equipment",
      },
      {
        id: 14,
        name: "Gymnastics Apparatus",
        slug: "gymnastics-apparatus",
        link: "/products?category=sport-equipment&subcategory=gymnastics-apparatus",
        description: "Gymnastics Apparatus",
      },
    ],
  },

  {
    id: 2,
    name: "Fitness Equipment",
    slug: "fitness-equipment",
    description: "Fitness Equipment",
    icon: FiGrid,
    color: "orange",
    hasSubcategories: true,
    subcategories: [
      {
        id: 21,
        name: "Commercial Gym",
        slug: "commercial-gym",
        link: "/products?category=fitness-equipment&subcategory=commercial-gym",
        description: "Commercial Gym",
      },
      {
        id: 22,
        name: "Home Gym",
        slug: "home-gym",
        link: "/products?category=fitness-equipment&subcategory=home-gym",
        description: "Home Gym",
      },
    ],
  },

  {
    id: 3,
    name: "Sportswear",
    slug: "sportswear",
    link: "/products?category=sportswear",
    description: "Sportswear",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },

  {
    id: 4,
    name: "Sports Shoes",
    slug: "sports-shoes",
    link: "/products?category=sports-shoes",
    description: "Sports Shoes",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },

  {
    id: 5,
    name: "Open Gym Equipment",
    slug: "open-gym-equipment",
    link: "/products?category=open-gym-equipment",
    description: "Open Gym Equipment",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },

  {
    id: 6,
    name: "Sports Floorings",
    slug: "sports-floorings",
    link: "/products?category=sports-floorings",
    description: "Sports Floorings",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },

  {
    id: 7,
    name: "Playground Equipment",
    slug: "playground-equipment",
    link: "/products?category=playground-equipment",
    description: "Playground Equipment",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },

  {
    id: 8,
    name: "Adventure Equipment",
    slug: "adventure-equipment",
    link: "/products?category=adventure-equipment",
    description: "Adventure Equipment",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },

  {
    id: 9,
    name: "Military Obstacle",
    slug: "military-obstacle",
    link: "/products?category=military-obstacle",
    description: "Military Obstacle",
    icon: FiPackage,
    color: "purple",
    hasSubcategories: false,
  },
];

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState({});

  const productsDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target)
      ) {
        setProductsDropdownOpen(false);
        setActiveSubcategory(null);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setProductsDropdownOpen(false);
        setActiveSubcategory(null);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  // Toggle mobile category
  const toggleMobileCategory = (categoryId) => {
    setMobileCategoryOpen((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b ${
        isScrolled ? "shadow-md border-gray-200" : "border-gray-200"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0f463e] to-[#1a5f54] text-white">
        <div className="container-custom py-2">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">📞 +91 9767552564</span>
              <span className="hidden lg:inline">📧 info@climbwin.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/flash-sale"
                className="hover:text-[#fbbf24] transition-colors font-medium"
              >
                🔥 Flash Sale
              </Link>
              <Link
                to="/how-it-works"
                className="hidden md:inline hover:text-[#fbbf24] transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom ">
        <div className="py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-2 md:gap-3">
              {/* Logo Image */}
              <div className="relative h-10 md:h-20 w-auto">
                <img
                  src="/logo.png"
                  alt="Climbwin Logo"
                  className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Logo Text */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  CLIMBWIN
                </span>
                <span className="text-[10px] text-gray-600 -mt-0.5">
                  Conquer New Heights
                </span>
              </div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-4"
          >
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f463e] focus:ring-1 focus:ring-[#0f463e] placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 rounded font-medium text-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900"
              >
                {isAuthenticated && user ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f463e] to-[#1a5f54] flex items-center justify-center text-white text-sm font-bold">
                    {getUserInitials()}
                  </div>
                ) : (
                  <FiUser className="w-5 h-5" />
                )}
                <span className="hidden lg:inline text-sm font-medium">
                  {isAuthenticated ? user?.name?.split(" ")[0] : "Sign In"}
                </span>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideDown border border-gray-100">
                    {isAuthenticated ? (
                      <>
                        <div className="bg-gradient-to-r from-[#0f463e] to-[#1a5f54] text-white p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold">
                              {getUserInitials()}
                            </div>
                            <div>
                              <p className="font-semibold">{user?.name}</p>
                              <p className="text-sm text-white/80">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FiGrid className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">Dashboard</span>
                          </Link>
                          <Link
                            to="/dashboard/profile"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FiSettings className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              Profile Settings
                            </span>
                          </Link>
                          <Link
                            to="/dashboard/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <FiPackage className="w-5 h-5 text-gray-500" />
                            <span className="text-black-700">My Orders</span>
                          </Link>
                          <div className="border-t border-gray-100 my-2" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 w-full"
                          >
                            <FiLogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-2">
                        <Link
                          to="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                        >
                          <span className="font-semibold">Login</span>
                          <p className="text-sm text-gray-500">
                            Access your account
                          </p>
                        </Link>
                        <div className="border-t border-gray-100 my-2" />
                        <Link
                          to="/register"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                        >
                          <span className="font-semibold">Register</span>
                          <p className="text-sm text-gray-500">
                            Create new account
                          </p>
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900 flex flex-col items-center"
            >
              <FiHeart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
              <span className="hidden lg:block text-xs mt-0.5">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900 flex flex-col items-center"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cart.item_count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#fbbf24] text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.item_count}
                </span>
              )}
              <span className="hidden lg:block text-xs mt-0.5">Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-gray-200 py-3">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]"
              >
                <FiHome className="w-4 h-4" />
                Home
              </Link>
            </li>

            {/* Products Mega Menu */}
            <li
              className="relative"
              ref={productsDropdownRef}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => {
                setProductsDropdownOpen(false);
                setActiveSubcategory(null);
              }}
            >
              <button
                className="flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]"
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              >
                <FiGrid className="w-4 h-4" />
                Products
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${productsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-2xl p-6 w-64 z-50 animate-slideDown border border-gray-100">
                  {PRODUCT_CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    const colorClasses = {
                      blue: "bg-blue-100 text-blue-600",
                      purple: "bg-purple-100 text-purple-600",
                      green: "bg-green-100 text-green-600",
                      orange: "bg-orange-100 text-orange-600",
                      red: "bg-red-100 text-red-600",
                      indigo: "bg-indigo-100 text-indigo-600",
                    };

                    if (category.hasSubcategories && category.subcategories) {
                      return (
                        <div
                          key={category.id}
                          className="relative"
                          onMouseEnter={() => setActiveSubcategory(category.id)}
                        >
                          <button className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0f463e]/10 hover:to-[#1a5f54]/10 transition-all group w-full mt-2 first:mt-0">
                            <div className="flex items-center gap-3">
                              {/* <div className={`w-10 h-10 ${colorClasses[category.color] || 'bg-gray-100 text-gray-600'} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <IconComponent className="w-5 h-5" />
                              </div> */}
                              <div className="text-left">
                                <p className="font-small font-semibold text-gray-900">
                                  {category.name}
                                </p>
                                {/* <p className="text-xs text-gray-500">{category.description}</p> */}
                              </div>
                            </div>
                            <FiChevronRight className="w-4 h-4 text-gray-400" />
                          </button>

                          {activeSubcategory === category.id && (
                            <div className="absolute left-full top-0 ml-2 bg-white rounded-2xl shadow-2xl p-4 w-56 z-50 animate-slideDown border border-gray-100">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.id}
                                  to={sub.link}
                                  className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0f463e]/10 hover:to-[#1a5f54]/10 transition-all mt-2 first:mt-0"
                                >
                                  <p className=" font-small text-gray-900">
                                    {sub.name}
                                  </p>
                                  {/* {sub.description && (
                                    <p className="text-xs text-gray-500 mt-0.5">{sub.description}</p>
                                  )} */}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={category.id}
                        to={category.link}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0f463e]/10 hover:to-[#1a5f54]/10 transition-all group mt-2 first:mt-0"
                      >
                        {/* <div className={`w-10 h-10 ${colorClasses[category.color] || 'bg-gray-100 text-gray-600'} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-5 h-5" />
                        </div> */}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {category.name}
                          </p>
                          {/* {category.description && (
                            <p className="text-xs text-gray-500">{category.description}</p>
                          )} */}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>

            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]"
              >
                <FiInfo className="w-4 h-4" />
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]"
              >
                <FiPhone className="w-4 h-4" />
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 md:hidden shadow-2xl animate-slideInRight overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>

              {/* User Info */}
              {isAuthenticated && user ? (
                <div className="bg-gradient-to-r from-[#0f463e] to-[#1a5f54] text-white p-4 rounded-2xl mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-white/80">{user?.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mb-6">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 px-4 bg-[#0f463e] text-white rounded-xl text-center font-medium hover:bg-[#1a5f54] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-xl text-center font-medium hover:bg-gray-300 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f463e]/30"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#0f463e] text-white rounded-lg hover:bg-[#1a5f54] transition-colors"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Nav */}
              <nav>
                <div className="space-y-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <FiHome className="w-5 h-5 text-[#0f463e]" />
                    <span className="font-medium">Home</span>
                  </Link>

                  <div className="pt-2 pb-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">
                      Products
                    </p>
                    {PRODUCT_CATEGORIES.map((category) => {
                      const IconComponent = category.icon;
                      const getHoverClass = (color) => {
                        const hoverClasses = {
                          blue: "hover:bg-blue-50",
                          purple: "hover:bg-purple-50",
                          green: "hover:bg-green-50",
                          orange: "hover:bg-orange-50",
                          red: "hover:bg-red-50",
                          indigo: "hover:bg-indigo-50",
                        };
                        return hoverClasses[color] || "hover:bg-gray-50";
                      };
                      const iconColorClasses = {
                        blue: "text-blue-600",
                        purple: "text-purple-600",
                        green: "text-green-600",
                        orange: "text-orange-600",
                        red: "text-red-600",
                        indigo: "text-indigo-600",
                      };

                      if (category.hasSubcategories && category.subcategories) {
                        return (
                          <div key={category.id}>
                            <button
                              onClick={() => toggleMobileCategory(category.id)}
                              className={`flex items-center justify-between gap-3 p-3 rounded-xl ${getHoverClass(category.color)} transition-all text-gray-700 w-full`}
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent
                                  className={`w-5 h-5 ${iconColorClasses[category.color] || "text-gray-600"}`}
                                />
                                <span className="font-medium">
                                  {category.name}
                                </span>
                              </div>
                              <FiChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  mobileCategoryOpen[category.id]
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            {mobileCategoryOpen[category.id] && (
                              <div className="ml-8 mt-1 space-y-1 animate-slideDown">
                                {category.subcategories.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    to={sub.link}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={category.id}
                          to={category.link}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-xl ${getHoverClass(category.color)} transition-colors text-gray-700`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${iconColorClasses[category.color] || "text-gray-600"}`}
                          />
                          <span className="font-medium">{category.name}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link
                      to="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <FiInfo className="w-5 h-5 text-[#0f463e]" />
                      <span className="font-medium">About</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <FiPhone className="w-5 h-5 text-[#0f463e]" />
                      <span className="font-medium">Contact</span>
                    </Link>
                  </div>

                  {isAuthenticated && (
                    <>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase px-3 mb-2">
                          Account
                        </p>
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                        >
                          <FiGrid className="w-5 h-5 text-[#0f463e]" />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link
                          to="/dashboard/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                        >
                          <FiPackage className="w-5 h-5 text-[#0f463e]" />
                          <span className="font-medium">My Orders</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600 w-full"
                        >
                          <FiLogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
