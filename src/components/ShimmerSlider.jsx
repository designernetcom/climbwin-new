const ShimmerSlider = () => {
  return (
    <div className="w-full mb-4 sm:mb-6 md:mb-8">
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-gray-200 rounded-none sm:rounded-lg overflow-hidden">
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-effect"></div>

        {/* Content Skeleton */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300/50 to-gray-200/50 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
              {/* Type/Badge Skeleton */}
              <div className="h-4 sm:h-5 md:h-6 w-24 sm:w-32 bg-white/30 rounded animate-shimmer"></div>

              {/* Title Skeleton */}
              <div className="space-y-2 sm:space-y-3">
                <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-full bg-white/40 rounded animate-shimmer"></div>
                <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 bg-white/40 rounded animate-shimmer"></div>
              </div>

              {/* Price Skeleton */}
              <div className="h-6 sm:h-7 md:h-8 lg:h-9 w-48 sm:w-56 md:w-64 bg-white/30 rounded animate-shimmer"></div>

              {/* Button Skeleton */}
              <div className="h-10 sm:h-11 md:h-12 w-32 sm:w-40 md:w-48 bg-white/50 rounded-lg animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Navigation Dots Skeleton */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`h-2 ${i === 0 ? 'w-6' : 'w-2'} bg-white/50 rounded-full animate-shimmer`}
            ></div>
          ))}
        </div>

        {/* Navigation Arrows Skeleton - Desktop only */}
        <div className="hidden md:block">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 rounded-full animate-shimmer"></div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 rounded-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerSlider;
