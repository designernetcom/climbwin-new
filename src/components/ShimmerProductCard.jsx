const ShimmerProductCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] bg-gray-200 animate-shimmer">
        {/* Badges Skeleton */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="h-7 w-20 bg-gray-300 rounded-full animate-shimmer"></div>
        </div>

        {/* Availability Tag Skeleton */}
        <div className="absolute bottom-3 right-3">
          <div className="h-7 w-32 bg-gray-300 rounded-full animate-shimmer"></div>
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="p-5">
        {/* Category Skeleton */}
        <div className="h-3 w-24 bg-gray-200 rounded animate-shimmer mb-2"></div>

        {/* Product Name Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 w-full bg-gray-300 rounded animate-shimmer"></div>
          <div className="h-5 w-3/4 bg-gray-300 rounded animate-shimmer"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
            ))}
          </div>
          <div className="h-4 w-12 bg-gray-200 rounded animate-shimmer"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mb-4">
          <div className="h-8 w-28 bg-gray-300 rounded animate-shimmer"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 w-full bg-gray-300 rounded-xl animate-shimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerProductCard;
