import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { sliderService } from '../services/sliderService';
import { getImageUrl } from '../utils/imageHelper';
import ShimmerSlider from './ShimmerSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await sliderService.getSliders();
      if (response.success) {
        setSliders(response.data);
      }
    } catch (error) {
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ShimmerSlider />;
  }

  if (sliders.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-4 sm:mb-6 md:mb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          enabled: true,
          hideOnClick: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="rounded-none sm:rounded-lg overflow-hidden hero-slider"
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-gradient-to-r from-blue-600 to-purple-600">
              <img
                src={getImageUrl(slider.banner)}
                alt={slider.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl text-white">
                    {/* {slider.type && (
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1 sm:mb-2 uppercase tracking-wide">
                        {slider.type}
                      </p>
                    )}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                      {slider.title}
                    </h2> */}
                    {/* {slider.starting_price && (
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 md:mb-6">
                        Starting at <span className="font-bold">${slider.starting_price}</span>
                      </p>
                    )} */}
                    {/* {slider.btn_url && (
                      <a
                        href={slider.btn_url}
                        className="inline-block bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
                      >
                        Shop Now
                      </a>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
