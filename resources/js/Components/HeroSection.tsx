import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { ArrowDownRight } from "lucide-react";

const HeroSection: React.FC = () => {
    return (
        <section
            className="relative flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24 py-16 min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: "url('/images/hero/bg-hero.jpg')" }}
        >
            {/* Overlay supaya teks tetap jelas */}
            <div className="absolute inset-0 bg-white/20 lg:bg-black/20 bg-black/20"></div>

            {/* Text Section */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl z-10"
        >
            <p className="text-neutral-100 font-semibold mb-2">Bring nature closer to your home</p>
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-100 leading-tight">
                Style Your Space <br />
                With <span className="text-neutral-100">Lush, Living Greens</span>
            </h1>
            <p className="text-neutral-100 mt-6">
                Discover curated indoor and outdoor plants that refresh your home and bring calm to your everyday life.
            </p>

                <div className="flex flex-wrap gap-4 mt-8">
                    <Link href="/shop">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-medium shadow-md transition">
                            Shop Now
                        </button>
                    </Link>

                    {/* <button className="flex items-center gap-2 text-green-800 font-medium hover:underline">
                    <ArrowDownRight className="w-5 h-5" /> See how GreenLeaf grows
                </button> */}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-12 text-center">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl py-6 shadow-sm">
                        <h3 className="text-2xl font-semibold text-green-700">1,900+</h3>
                        <p className="text-gray-600 text-sm">Plant Lovers</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl py-6 shadow-sm">
                        <h3 className="text-2xl font-semibold text-green-700">100+</h3>
                        <p className="text-gray-600 text-sm">Green Collections</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl py-6 shadow-sm">
                        <h3 className="text-2xl font-semibold text-green-700">4.9★</h3>
                        <p className="text-gray-600 text-sm">Customer Reviews</p>
                    </div>
                </div>

            </motion.div>

            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative mt-12 lg:mt-0 z-10"
            >
                {/* <img
                    src="/images/hanging.jpg"
                    alt="Indoor plants"
                    className="w-full max-w-lg rounded-2xl shadow-lg object-cover"
                /> */}

                {/* Floating plants
                <div className="absolute top-0 left-6 animate-bounce">
                    <img src="/images/download-removebg-preview.png" alt="Hanging plant" className="w-64 lg:w-72" />
                </div>
                <div className="absolute top-10 right-6 animate-bounce delay-150">
                    <img src="/images/hanging-plant2.png" alt="Hanging plant" className="w-56 lg:w-64" />
                </div> */}

            </motion.div>
        </section>
    );
};

export default HeroSection;
