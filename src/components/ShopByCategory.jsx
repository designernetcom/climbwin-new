import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryService } from "../services";
import { getImageUrl } from "../utils/imageHelper";

const categoryImages = {
  // Sport Equipment
  "sport-equipment": "/sport-equipment.jpg",
  "sports-equipment": "/sport-equipment.jpg",
  "sport-goods": "/sport-equipment.jpg",

  // Fitness Equipment
  "fitness-equipment": "/gym-equipment.jpeg",
  "gym-equipment": "/gym-equipment.jpeg",

  // Sportswear
  sportswear: "/sport-wear.jpeg",
  "sports-wear": "/sport-wear.jpeg",

  // Sports Shoes
  "sports-shoes": "/sports-shoes.png",

  // Open Gym
  "open-gym-equipment": "/open-gym.jpeg",
  "open-gym": "/open-gym.jpeg",

  // Sports Flooring
  "sports-floorings": "/sport-flooring.jpeg",
  "sports-flooring": "/sport-flooring.jpeg",

  // Playground
  "playground-equipment": "/playground-equipment.jpeg",

  // Adventure Equipment
  "adventure-equipment": "/adventure-equipment.jpeg",
  "adventure-sports": "/adventure-equipment.jpeg",
  "adventure-sports-equipment": "/adventure-equipment.jpeg",

  // Military Obstacle
  "military-obstacle": "/military-equipment.jpeg",
  "military-equipment": "/military-equipment.jpeg",
};

// Real site categories used when the API is temporarily unavailable or rate-limited.
const originalCategories = [
  { id: "sport-equipment", name: "Sport Equipment", slug: "sport-equipment" },
  { id: "fitness-equipment", name: "Fitness Equipment", slug: "fitness-equipment" },
  { id: "sportswear", name: "Sportswear", slug: "sportswear" },
  { id: "sports-shoes", name: "Sports Shoes", slug: "sports-shoes" },
  { id: "open-gym-equipment", name: "Open Gym Equipment", slug: "open-gym-equipment" },
  { id: "sports-floorings", name: "Sports Floorings", slug: "sports-floorings" },
  { id: "playground-equipment", name: "Playground Equipment", slug: "playground-equipment" },
  { id: "adventure-equipment", name: "Adventure Equipment", slug: "adventure-equipment" },
];

const getCategoryImage = (category) => {
  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-");

  const slug = normalize(category.slug);
  const name = normalize(category.name);

  // Local image based on API category slug or name
  const localImage = categoryImages[slug] || categoryImages[name];

  if (localImage) {
    return localImage;
  }

  // Original API image fallback
  const apiImage = category.icon_image || category.image;

  if (apiImage) {
    return getImageUrl(apiImage);
  }

  return null;
};

const getCategoryLabel = (category) => {
  return String(category.name || category.slug || "Category")
    .replace(/[-_]+/g, " ")
    .toUpperCase();
};

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      const responseCategories = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];
      const apiCategories = responseCategories.slice(0, 8);

      setCategories(apiCategories.length > 0 ? apiCategories : originalCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories(originalCategories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="h-10 w-44 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h4 className="text-3xl md:text-4xl font-bold text-[#071b3a]">
            Category
          </h4>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                {getCategoryImage(category) ? (
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
                    <span className="text-5xl font-bold text-white/70">
                      {category.name?.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                <div className="absolute inset-x-0 bottom-0 text-center">
                  <h3 className="px-2 pb-2 text-base font-bold leading-tight text-white drop-shadow-md md:text-lg">
                    {category.name}
                  </h3>
                  <div className="bg-[#720707] px-2 py-1.5">
                    <span className="block truncate text-[11px] font-bold tracking-wide text-red-200 md:text-xs">
                      {getCategoryLabel(category)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
