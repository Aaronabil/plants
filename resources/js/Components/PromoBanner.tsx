import React from "react";

const PromoBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg-promo.jpeg')", // ganti dengan background kamu
      }}
    >
      {/* Overlay warna lembut biar teks tetap jelas */}
      <div className="absolute inset-0 bg-white/30"></div>

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
          <button className="bg-green-800 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-green-700 transition">
            Shop the Sale
          </button>
        </div>

        {/* Gambar tanaman di sisi kanan */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src="/images/promo-plants.png"
            alt="Indoor Plants"
            className="rounded-2xl shadow-xl w-80 lg:w-[420px]"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
