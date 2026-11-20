import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const AdvBannerSlider = () => {
  // Static banner data - replace with your actual images
  const banners = [
    {
      id: 1,
      image: '/banners/newbrand_banner_unlmtd_desktop_1.avif',
      alt: 'Advertisement Banner 1',
      link: '/products',
    },
    {
      id: 2,
      image: '/banners/newbrand2_banner_rent_desktop.avif',
      alt: 'Advertisement Banner 2',
      link: '/products/rent',
    },
    {
      id: 3,
      image: '/banners/newbrand2_banner_buy_desktop.webp',
      alt: 'Advertisement Banner 3',
      link: '/products',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-gray-50 py-2">
      <div className="container-custom">
        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={2}
            slidesPerGroup={1}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              nextEl: '.adv-swiper-button-next',
              prevEl: '.adv-swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id} className="!w-full">
                <a
                  href={banner.link}
                  className="block relative w-full overflow-hidden rounded-lg"
                  style={{ paddingBottom: '20%' }}
                >
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="absolute inset-0 w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.target.src = 'https://via.placeholder.com/1920x600/667eea/ffffff?text=Advertisement+Banner';
                    }}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="adv-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <FiChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button className="adv-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <FiChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Slide Counter */}
          <div className="absolute bottom-6 right-6 z-10 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {activeIndex + 1} / {banners.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvBannerSlider;
