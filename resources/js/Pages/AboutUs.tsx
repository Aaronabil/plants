import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  return (
    <GuestLayout>
      <Head title="About Us" />
      <div className="min-h-screen bg-[#f9f8f3] text-gray-800">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6"
          >
            About Us

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed"
          >
            We believe that every home deserves a natural touch. Plants are here to bring beauty and tranquility through our carefully nurtured collection of ornamental plants.
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
              Refreshing Your Living Space
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We present indoor plants that can boost your mood, improve air quality, and enhance comfort in your home.

            </p>
            <a
              href="/shop"
              className="inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
            >
              View Collection
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
              Direct Collection From Farmers
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-right">
              All our plants are sourced directly from selected local farmers. This way, every plant you purchase comes with the best quality.
            </p>
            <div className="flex justify-end">
              <a
                href="/shop"
                className="inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
              >
                Buy Now
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
              Visit Our Store
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Come directly and experience choosing the best plants. We are in Bandung, ready to welcome you every working day.
            </p>
            <div className="text-sm text-gray-700">
              <p>📍 Jl. Cendana No. 23, Bandung</p>
              <p>📞 (021) 9876-5432</p>
              <p>Monday - Friday, 09.00 - 17.00</p>
            </div>
          </motion.div>
        </section>
      </div>
    </GuestLayout>
  );
};

export default AboutUs;
