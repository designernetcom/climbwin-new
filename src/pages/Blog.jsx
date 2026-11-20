import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { FiSearch, FiCalendar, FiUser } from 'react-icons/fi';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const page = searchParams.get('page') || 1;
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    setSelectedCategory(category);
    setSearchTerm(search);

    fetchBlogs({ page, category, search });
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await blogService.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlogs = async (params = {}) => {
    try {
      setLoading(true);
      const response = await blogService.getBlogs({
        per_page: 12,
        ...params
      });

      if (response.success) {
        setBlogs(response.data.data);
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total
        });
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleCategoryFilter = (categorySlug) => {
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">
          Stay updated with the latest news, tips, and insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Search */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Search</h3>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiSearch />
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryFilter('')}
                className={`block w-full text-left px-3 py-2 rounded ${
                  !selectedCategory
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category.slug
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUser size={14} />
                          {blog.user?.name || 'Admin'}
                        </span>
                      </div>
                      {blog.category && (
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-3">
                          {blog.category.name}
                        </span>
                      )}
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {blog.description?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {[...Array(pagination.last_page)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        pagination.current_page === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
