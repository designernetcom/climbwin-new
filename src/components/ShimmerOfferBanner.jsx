const ShimmerOfferBanner = () => {
  return (
    <div className="py-4 sm:py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative h-32 sm:h-40 md:h-48 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200"
            >
              {/* Animated shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect"></div>

              {/* Content Skeleton */}
              <div className="relative h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between">
                {/* Badge & Icon */}
                <div className="flex items-start justify-between">
                  <div className="h-6 w-20 bg-white/40 rounded-full animate-shimmer"></div>
                  <div className="h-10 w-10 bg-white/40 rounded-full animate-shimmer"></div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-white/50 rounded animate-shimmer"></div>
                  <div className="h-7 w-full bg-white/60 rounded animate-shimmer"></div>
                  <div className="h-3 w-3/4 bg-white/40 rounded animate-shimmer"></div>
                </div>

                {/* CTA */}
                <div className="h-7 w-24 bg-white/40 rounded-full animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots skeleton */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-2 ${i === 0 ? 'w-6' : 'w-2'} bg-gray-300 rounded-full animate-shimmer`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerOfferBanner;
