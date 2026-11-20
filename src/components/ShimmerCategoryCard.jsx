const ShimmerCategoryCard = () => {
  return (
    <div className="aspect-square overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 relative">
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect"></div>

      {/* Content Skeleton */}
      <div className="relative h-full flex flex-col items-center justify-center p-6">
        {/* Badge Skeleton */}
        <div className="absolute top-4 right-4 h-6 w-16 bg-white/40 rounded-full animate-shimmer"></div>

        {/* Icon Skeleton */}
        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/50 rounded-2xl animate-shimmer mb-4"></div>

        {/* Title Skeleton */}
        <div className="h-6 w-32 bg-white/60 rounded-lg animate-shimmer mb-2"></div>

        {/* Description Skeleton */}
        <div className="h-4 w-24 bg-white/40 rounded animate-shimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerCategoryCard;
