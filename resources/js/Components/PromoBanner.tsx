import React from "react";
import { Link } from "@inertiajs/react";

const PromoBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/bg-promoo.jpg')",
      }}
    >
      <div className="absolute inset-0"></div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-8 lg:px-24 py-16">
        {/* Teks promo */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-semibold text-green-900 mb-3">
            Spring into Green –
          </h2>
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            <span className="bg-white text-green-800 px-3 py-1 rounded-lg shadow-md mr-2">
              25% OFF
            </span>
            All Indoor Plants!
          </h3>
          <p className="text-gray-700 mb-6 text-sm lg:text-base leading-relaxed">
            Bring life to your home with vibrant, easy-care greens — now on sale
            for a limited time!
          </p>
          <Link href="/shop">
            <button className="bg-green-800 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-green-700 transition">
              Shop the Sale
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PromoBanner;
