import React from "react";
import { Head, usePage } from "@inertiajs/react";
import Header from "@/Pages/Layouts/Header";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  const { props } = usePage();
  const auth = (props as any).auth;

  return (
    <>
      <Head title="About Us" />
      <Header auth={auth} />

      <div className="min-h-screen bg-[#f9f8f3] text-gray-800">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6"
          >
            Tentang Kami
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed"
          >
            Kami percaya bahwa setiap rumah berhak memiliki sentuhan alami. Plants
            hadir untuk membawa keindahan dan ketenangan lewat koleksi tanaman
            hias yang kami rawat dengan sepenuh hati.
          </motion.p>
        </section>

        {/* Section 1 */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/about-1.jpeg"
              alt="Indoor plants"
              className="rounded-2xl shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-3">
              Menyegarkan Ruang Hidup Anda
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Kami menghadirkan tanaman indoor yang mampu meningkatkan suasana hati,
              kualitas udara, dan kenyamanan di dalam rumah Anda. 
            </p>
            <a
              href="/shop"
              className="inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
            >
              Lihat Koleksi
            </a>
          </motion.div>
        </section>

        {/* Section 2 */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-3 text-right">
                Koleksi Langsung Dari Petani
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed text-right">
                Semua tanaman kami didapat langsung dari petani lokal pilihan.
                Dengan begitu, setiap tanaman yang Anda beli datang dengan kualitas terbaik.
              </p>
              <div className="flex justify-end">
                <a
                  href="/shop"
                  className="inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                >
                  Belanja Sekarang
                </a>
              </div>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <img
              src="/images/about-2.jpeg"
              alt="Outdoor plants"
              className="rounded-2xl shadow-md"
            />
          </motion.div>
        </section>

        {/* Section 3: Lokasi */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/about-3.jpeg"
              alt="Our store"
              className="rounded-2xl shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-3">
              Kunjungi Toko Kami
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Datang langsung dan rasakan pengalaman memilih tanaman terbaik.
              Kami ada di Bandung, siap menyambut Anda setiap hari kerja.
            </p>
            <div className="text-sm text-gray-700">
              <p>📍 Jl. Cendana No. 23, Bandung</p>
              <p>📞 (021) 9876-5432</p>
              <p>Senin - Jumat, 09.00 - 17.00</p>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
