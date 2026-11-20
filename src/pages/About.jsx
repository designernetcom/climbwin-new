import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiShield,
  FiHeart,
  FiZap,
  FiCheckCircle,
  FiStar,
  FiTruck,
  FiHeadphones
} from 'react-icons/fi';
import { settingService, productService } from '../services';

const About = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: '5,000+',
    products: '100+',
    orders: '1,000+',
    years: '5+'
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const [aboutData, productsData] = await Promise.all([
        settingService.getAbout(),
        productService.getProducts({ per_page: 1 })
      ]);

      if (aboutData.success && aboutData.data) {
        setAboutContent(aboutData.data.content || '');
      }

      // Update stats with real product count if available
      if (productsData.success && productsData.data.meta) {
        setStats(prev => ({
          ...prev,
          products: `${productsData.data.meta.total.toLocaleString()}+`
        }));
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FiShield,
      title: 'Trust & Security',
      description: 'Industry-standard encryption and secure payment processing to protect your data.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiHeart,
      title: 'Customer First',
      description: '24/7 dedicated support team ready to assist you with any questions or concerns.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: FiZap,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your products delivered on time, every time.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FiAward,
      title: 'Quality Assurance',
      description: 'Every product is carefully vetted to ensure the highest quality standards.',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  const benefits = [
    { icon: FiCheckCircle, text: 'Verified sellers and authentic products' },
    { icon: FiStar, text: 'Competitive pricing with exclusive deals' },
    { icon: FiTruck, text: 'Free shipping on orders above ₹499' },
    { icon: FiHeadphones, text: 'Dedicated customer support team' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden gradient-bg text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-3xl  mb-6 animate-fade-in">
              About 
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white relative -mt-16 z-20">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: FiUsers, label: 'Active Users', value: stats.users, color: 'blue' },
                { icon: FiShoppingBag, label: 'Products', value: stats.products, color: 'purple' },
                { icon: FiTrendingUp, label: 'Orders Completed', value: stats.orders, color: 'green' },
                { icon: FiAward, label: 'Years in Business', value: stats.years, color: 'orange' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-2xl mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* About Content Section */}
      {loading ? (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-8"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : aboutContent ? (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: aboutContent }}
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Features Section with Modern Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl  text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with our core values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Promise to You
              </h2>
              <p className="text-xl text-gray-600">
                Experience the benefits of shopping with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <FiZap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To empower individuals and businesses by providing a trusted, innovative marketplace
                    that connects buyers and sellers seamlessly, making commerce accessible to everyone.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We strive to create economic opportunities for vendors of all sizes while delivering
                    exceptional value and service to our customers.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <FiTrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To become the world's most trusted and innovative marketplace, where everyone can
                    discover, buy, and sell products with confidence and ease.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We envision a future where commerce is borderless, sustainable, and inclusive,
                    creating positive impact for communities worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
