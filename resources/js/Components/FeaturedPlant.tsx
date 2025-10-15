import React from "react";

const FeaturedPlants: React.FC = () => {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/bg-featured.jpeg')",
      }}
    >
      {/* Overlay transparan putih */}
      <div className="absolute inset-0 bg-white/30"></div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 px-6 lg:px-20 py-12">
        {/* Kartu 1 */}
        <div className="flex flex-col lg:flex-row items-center bg-white/25 backdrop-blur-md rounded-2xl p-5 shadow-md w-full lg:w-1/2">
          <div className="flex-1">
            <span className="text-sm uppercase tracking-wider text-green-900/70">
              Collection
            </span>
            <h2 className="text-xl font-semibold text-green-900 mb-2">
              Low-Maintenance Greens
            </h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Elevate your interior with easy-care indoor plants. These beauties
              purify the air, add a calming vibe, and grow happily even in
              low-to-medium light — perfect for busy lifestyles.
            </p>
            <button className="bg-white text-green-800 font-semibold px-4 py-2 rounded-full shadow hover:bg-green-50 transition">
              Explore Now
            </button>
          </div>
          <img
            src="/images/hero/kaktuss.jpg"
            alt="Plant"
            className="w-32 lg:w-44 ml-0 lg:ml-6 mt-5 lg:mt-0 rounded-xl shadow-lg"
          />
        </div>

        {/* Kartu 2 */}
        <div className="flex flex-col lg:flex-row items-center bg-white/25 backdrop-blur-md rounded-2xl p-5 shadow-md w-full lg:w-1/2">
          <div className="flex-1">
            <span className="text-sm uppercase tracking-wider text-green-900/70">
              Collection
            </span>
            <h2 className="text-xl font-semibold text-green-900 mb-2">
              Garden-Ready Plants
            </h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              Bring life to your outdoor space with vibrant, sun-loving plants.
              Perfect for patios, balconies, and home gardens — built to thrive
              in natural light and fresh air.
            </p>
            <button className="bg-white text-green-800 font-semibold px-4 py-2 rounded-full shadow hover:bg-green-50 transition">
              Explore Now
            </button>
          </div>
          <img
            src="/images/hero/ftrd-monstera.png"
            alt="Plant"
            className="w-32 lg:w-44 ml-0 lg:ml-6 mt-5 lg:mt-0 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;

