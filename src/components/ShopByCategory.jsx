import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryService } from "../services";
import { getImageUrl } from "../utils/imageHelper";
import { FiArrowRight } from "react-icons/fi";

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

  // Sports Shoes - add this image to public folder
  "sports-shoes": "/sports-shoes.jpg",

  // Open Gym
  "open-gym-equipment": "/open-gym.jpeg",
  "open-gym": "/open-gym.jpeg",

  // Sports Flooring
  "sports-floorings": "/sport-flooring.jpeg",
  "sports-flooring": "/sport-flooring.jpeg",

  // Playground
  "playground-equipment": "/playground-equipment.jpg",

  // Adventure Equipment
  "adventure-equipment": "/adventure-equipment.jpeg",
  "adventure-sports": "/adventure-equipment.jpeg",
  "adventure-sports-equipment": "/adventure-equipment.jpeg",

  // Military Obstacle
  "military-obstacle": "/military-equipment.jpeg",
  "military-equipment": "/military-equipment.jpeg",
};

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

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default categories with simple icons
  const defaultCategories = [
    {
      id: 1,
      name: "Furniture",
      slug: "furniture",
      icon: "",
      color: "bg-blue-50",
      hoverColor: "group-hover:bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      icon: "",
      color: "bg-purple-50",
      hoverColor: "group-hover:bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      id: 3,
      name: "Appliances",
      slug: "appliances",
      icon: "",
      color: "bg-blue-50",
      hoverColor: "group-hover:bg-blue-100",
      textColor: "text-green-600",
    },

    {
      id: 5,
      name: "Fashion",
      slug: "fashion",
      icon: "",
      color: "bg-pink-50",
      hoverColor: "group-hover:bg-pink-100",
      textColor: "text-pink-600",
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response.success && response.data.length > 0) {
        const mergedCategories = response.data
          .slice(0, 8)
          .map((cat, index) => ({
            ...cat,
            ...defaultCategories[index % defaultCategories.length],
            name: cat.name,
            slug: cat.slug,
            id: cat.id,
          }));
        setCategories(mergedCategories);
      } else {
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories(defaultCategories);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-3"></div>
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-xl animate-pulse"
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
          <h4 className="text-xl md:text-xl font-bold text-gray-900 mb-3">
            Category
          </h4>
          <p className="text-gray-600 text-lg">
            Explore our wide range of products
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group"
            >
              <div
                className={`${category.color} ${category.hoverColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-gray-100`}
              >
                {/* Icon/Image */}
                <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon_image || category.image ? (
                    <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden bg-white shadow-sm">
                      <img
                        src={getImageUrl(category.icon_image || category.image)}
                    