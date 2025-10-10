import React from "react";

const OurFavoritePlants: React.FC = () => {
  const plants = [
    { name: "Philodendron", price: "$25.00", image: "/images/plant1.png" },
    { name: "Peace Lily", price: "$22.00", image: "/images/plant2.png" },
    { name: "Caladium", price: "$30.00", image: "/images/plant3.png" },
    { name: "ZZ Plant", price: "$20.00", image: "/images/plant4.png" },
    // { name: "Ficus Lyrata", price: "$35.00", image: "/images/plant5.png" },
    // { name: "Anthurium", price: "$28.00", image: "/images/plant6.png" },
    // { name: "Pothos", price: "$18.00", image: "/images/plant7.png" },
    // { name: "Rubber Plant", price: "$26.00", image: "/images/plant8.png" },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-3">
        Our Favorite Plants
      </h2>
      <p className="text-gray-600 mb-10">
        Make your home feel fresh and beautiful with our best-loved plants
      </p>

      {/* Filter / Category Bar
      <div className="flex justify-center gap-4 mb-12 text-sm font-medium">
        <button className="text-green-800 border-b-2 border-green-800 pb-1">
          All Plants
        </button>
        <button className="text-gray-500 hover:text-green-800 transition">
          Easy Care
        </button>
        <button className="text-gray-500 hover:text-green-800 transition">
          New Arrivals
        </button>
        <button className="text-gray-500 hover:text-green-800 transition">
          Best Seller
        </button>
      </div> */}

      {/* Grid tanaman */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 lg:px-24">
        {plants.map((plant, index) => (
          <div
            key={index}
            // className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center"
          >
            <img
              src= "/images/product/aloe.jpeg"
              alt={plant.name}
              className="w-full h-48 md:h-56 object-cover rounded-xl mb-4"
            />
            <h3 className="text-green-900 font-semibold">{plant.name}</h3>
            <p className="text-gray-600">{plant.price}</p>
            {index === 0 && (
              <button className="mt-3 bg-green-700 text-white text-sm px-4 py-2 rounded-full hover:bg-green-800 transition">
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
