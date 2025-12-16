import React from "react";
import { Link } from "@inertiajs/react";

const FeaturedPlants: React.FC = () => {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/bg-featured.jpeg')",
      }}
    >
      {/* Overlay transparan putih */}
      <div className="absolute inset-0 bg-white/20 lg:bg-black/20 bg-black/20"></div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 px-6 lg:px-20 py-12">
        {/* Kartu 1 */}
        <div className="flex flex-col lg:flex-row items-center bg-green-900/40 backdrop-blur-md rounded-2xl p-5 text-white shadow-md w-full lg:w-1/2"> 
          <div className="flex-1">
            <span className="text-lg font-semibold text-green-200 uppercase tracking-wide"> 
              Collection
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              Low-Maintenance Greens
            </h2>
            <p className="text-green-100 mt-4">
              Elevate your interior with easy-care indoor plants. These beauties
              purify the air, add a calming vibe, and grow happily even in
              low-to-medium light — perfect for busy lifestyles.
            </p>
            <Link href={route('category.show', {
              parent_slug: 'indoor',
              child_slug: 'cactus'
            })}>
              <button className="mt-6 bg-white text-green-800 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-green-100 transition">
                Explore Now
              </button>
            </Link>
          </div>
          <img
            src="/images/hero/kaktuss.jpg"
            alt="Plant"
            className="w-32 lg:w-44 ml-0 lg:ml-6 mt-5 lg:mt-0 rounded-xl shadow-lg"
          />
        </div>

        {/* Kartu 2 */}
        <div className="flex flex-col lg:flex-row items-center bg-green-900/40 backdrop-blur-md rounded-2xl p-8 text-white shadow-md w-full lg:w-1/2">
          <div className="flex-1">
            <span className="text-lg font-semibold text-green-200 uppercase tracking-wide">
              Collection
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              Garden-Ready Plants
            </h2>
            <p className="text-green-100 mt-4">
              Bring life to your outdoor space with vibrant, sun-loving plants.
              Perfect for patios, balconies, and home gardens — built to thrive
              in natural light and fresh air.
            </p>
            <Link href={route('category.show', {
              parent_slug: 'indoor',
              child_slug: 'monstera'
            })}>
              <button className="mt-6 bg-white text-green-800 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-green-100 transition">
                Explore Now
              </button>
            </Link>
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

