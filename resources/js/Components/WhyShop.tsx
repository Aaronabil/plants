import React from "react";
import { Truck, RefreshCw, Headphones, Lock } from "lucide-react";

const WhyShopSection: React.FC = () => {
    return (
        <section className="relative py-20 bg-white flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-green-900 mb-3">
                Why Shop with Yestera?
            </h2>
            <p className="text-gray-600 max-w-2xl mb-12">
                From your screen to your space — we’re here to make plant shopping smooth and stress-free.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl px-8">
                {/* Left side */}
                <div className="flex flex-col gap-12 text-left">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Truck className="text-green-700 w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-green-900">Free and Fast Delivery</h3>
                            <p className="text-gray-600 text-sm">
                                Plants delivered fresh to your door — free on orders over $50.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <RefreshCw className="text-green-700 w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-green-900">Hassle-Free Returns</h3>
                            <p className="text-gray-600 text-sm">
                                Changed your mind? Return it within 14 days, no stress.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Middle image */}
                <div className="flex-shrink-0">
                    <img
                        src="/images/hero/hero-plnts.png"
                        alt="Plant"
                        className="w-64 lg:w-80 mx-auto drop-shadow-lg"
                    />
                </div>

                {/* Right side */}
                <div className="flex flex-col gap-12 text-left">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Headphones className="text-green-700 w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-green-900">Customer Support</h3>
                            <p className="text-gray-600 text-sm">
                                We’re never here whenever you need us — day or night.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Lock className="text-green-700 w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-green-900">Secure Payments</h3>
                            <p className="text-gray-600 text-sm">
                                Pay safely with our encrypted checkout.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyShopSection;
