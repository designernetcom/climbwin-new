const ShimmerProductDetail = () => {
  return (
    <div className="bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-32 bg-gray-300 rounded animate-shimmer"></div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square">
              <div className="w-full h-full bg-gray-200 animate-shimmer"></div>
              {/* Badges Skeleton */}
              <div className="absolute top-4 left-4 h-10 w-24 bg-gray-300 rounded-full animate-shimmer"></div>
              <div className="absolute top-4 right-4 h-10 w-28 bg-gray-300 rounded-full animate-shimmer"></div>
            </div>

            {/* Thumbnail Gallery Skeleton */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-shimmer"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Brand Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer"></div>
              {/* Title Skeleton */}
              <div className="h-10 w-full bg-gray-300 rounded animate-shimmer"></div>
              <div className="h-10 w-3/4 bg-gray-300 rounded animate-shimmer"></div>
              {/* Category Skeleton */}
              <div className="h-4 w-40 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 w-5 bg-gray-200 rounded animate-shimmer"></div>
                ))}
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Price Skeleton */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-40 bg-gray-300 rounded animate-shimmer"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-shimmer"></div>
              </div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Stock Status Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Short Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-shimmer"></div>
            </div>

            {/* Rental Duration Skeleton */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="h-5 w-40 bg-gray-300 rounded animate-shimmer"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-10 bg-gray-200 rounded-lg animate-shimmer"></div>
                ))}
              </div>
            </div>

            {/* Quantity Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-5 w-20 bg-gray-200 rounded animate-shimmer"></div>
              <div className="h-12 w-36 bg-gray-200 rounded-lg animate-shimmer"></div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 h-14 bg-gray-300 rounded-lg animate-shimmer"></div>
              <div className="h-14 w-14 bg-gray-200 rounded-lg animate-shimmer"></div>
              <div className="h-14 w-14 bg-gray-200 rounded-lg animate-shimmer"></div>
            </div>

            {/* Features Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-shimmer"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded animate-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          {/* Tab Headers Skeleton */}
          <div className="border-b">
            <div className="flex">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex-1 h-14 bg-gray-100 border-r last:border-r-0 animate-shimmer"></div>
              ))}
            </div>
          </div>

          {/* Tab Content Skeleton */}
          <div className="p-6 space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-shimmer"></div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div>
          <div className="h-8 w-48 bg-gray-300 rounded animate-shimmer mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                {/* Image Skeleton */}
                <div className="aspect-[4/3] bg-gray-200 animate-shimmer"></div>
                {/* Content Skeleton */}
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-shimmer"></div>
                  <div className="h-5 w-full bg-gray-300 rounded animate-shimmer"></div>
                  <div className="h-5 w-3/4 bg-gray-300 rounded animate-shimmer"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-200 rounded animate-shimmer"></div>
                    ))}
                  </div>
                  <div className="h-8 w-28 bg-gray-300 rounded animate-shimmer"></div>
                  <div className="h-12 w-full bg-gray-300 rounded-xl animate-shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerProductDetail;
