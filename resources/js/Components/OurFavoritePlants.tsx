import React, { useState } from "react";
import { router } from "@inertiajs/react";

const OurFavoritePlants: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const plants = [
    { name: "Philodendron", price: "$25.00", image: "/images/plant1.png" },
    { name: "Peace Lily", price: "$22.00", image: "/images/plant2.png" },
    { name: "Caladium", price: "$30.00", image: "/images/plant3.png" },
    { name: "ZZ Plant", price: "$20.00", image: "/images/plant4.png" },
  ];

  const handleAddToCart = (plant: any) => {
    setCartItems([...cartItems, plant]);
    setIsCartOpen(true);
  };

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-3">
        Our Favorite Plants
      </h2>
      <p className="text-gray-600 mb-10">
        Make your home feel fresh and beautiful with our best-loved plants
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 lg:px-24">
        {plants.map((plant, index) => (
          <div key={index}>
            <img
              src="/images/product/aloe.jpeg"
              alt={plant.name}
              className="w-full h-48 md:h-56 object-cover rounded-xl mb-4"
            />
            <h3 className="text-green-900 font-semibold">{plant.name}</h3>
            <p className="text-gray-600">{plant.price}</p>
            {index === 0 && (
              <button
                onClick={() => handleAddToCart(plant)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="mt-12 px-6 py-3 border border-green-700 text-green-700 rounded-full hover:bg-green-50 transition">
        Explore More
      </button>
    </section>
  );
};

export default OurFavoritePlants;
