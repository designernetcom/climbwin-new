import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FiPercent, FiGift, FiTruck, FiZap, FiTag, FiStar } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const OfferBannerSlider = () => {
  const [loading] = useState(false);

  // Modern offer banners data
  const offers = [
    {
      id: 1,
      icon: FiPercent,
      title: 'Mega Sale',
      subtitle: 'Up to 60% Off',
      description: 'On furniture, electronics & more',
      bgGradient: 'from-blue-950 via-blue-900 to-blue-900',
      accentColor: 'bg-lime-600',
      link: '/products?sale=true',
      badge: 'Limited Time',
      cta: 'Shop Now',
    },
   
    
    {
      id: 2,
      icon: FiZap,
      title: 'Flash Sale',
      subtitle: '24 Hours Only',
      description: 'Exclusive deals on trending products',
      bgGradient: 'from-blue-950 via-blue-900 to-blue-900',
      accentColor: 'bg-lime-600',
      link: '/flash-sales',
      badge: 'Trending',
      cta: 'View Deals',
    },
    {
      id: 3,
      icon: FiTag,
      title: 'Rental Offers',
      subtitle: 'Save Up to 30%',
      description: 'On long-term rentals (12+ months)',
      bgGradient: 'from-blue-950 via-blue-900 to-blue-900',
      accentColor: 'bg-lime-600',
      link: '/products?is_rentable=1',
      badge: 'Popular',
      cta: 'Rent Now',
    },
    {
      id: 4,
      icon: FiStar,
      title: 'New Arrivals',
      subtitle: 'Fresh Collections',
      description: 'Latest products just for you',
      bgGradient: 'from-blue-950 via-blue-900 to-blue-900',
      accentColor: 'bg-lime-600',
      link: '/products?product_type=new_arrival',
      badge: 'Just In',
      cta: 'Explore',
    },
  ];

  if (loading) {
    return (
      <div className="py-4 sm:py-6 md:py-8">
        <div className="container-custom">
          <div className="h-32 sm:h-40 md:h-48 bg-gray-200 rounded-2xl animate-shimmer"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={false}
          loop={true}
          className="offer-banner-slider"
        >
          {offers.map((offer) => {
            const IconComponent = offer.icon;
            return (
              <SwiperSlide key={offer.id}>
                <Link to={offer.link} className="block group">
                  <div
                    className={`relative h-32 sm:h-40 md:h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-gradient-to-br ${offer.bgGradient}`}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between text-white">
                      {/* Badge */}
                      <div className="flex items-start justify-between">
                        <span
                          className={`${offer.accentColor} text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                        >
                          {offer.badge}
                        </span>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-2.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold leading-tight">
                          {offer.title}
                        </h3>
                        <p className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
                          {offer.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-white/90 leading-snug">
                          {offer.description}
                        </p>
                      </div>

                      {/* CTA */}
                      {/* <div className="flex items-center justify-between mt-2">
                        <span className="text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                          {offer.cta} →
                        </span>
                      </div> */}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default OfferBannerSlider;
