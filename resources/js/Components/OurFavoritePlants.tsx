import React from "react";
import { Link } from "@inertiajs/react";
import { Product } from '@/types';

interface FavoritePlantsProps {
  products: Product[];
}

export default function OurFavoritePlants({ products }: FavoritePlantsProps) {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-3">
        Our Favorite Plants
      </h2>
      <p className="text-gray-600 mb-10">
        Make your home feel fresh and beautiful with our best-loved plants
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 lg:px-24">
        {products.map((product) => (
          <div key={product.id}>
            <Link href="/">
              <img
                src={product.primary_image?.image_url || 'https://via.placeholder.com/300'}
                alt={product.product_name}
                className="w-full h-48 md:h-56 object-cover rounded-xl mb-4 transition-transform hover:scale-105"
              />
              <h3 className="text-green-900 font-semibold">{product.product_name}</h3>
              <p className="text-gray-600">
                Rp{Number(product.price).toLocaleString('id-ID')}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <Link href="/shop">
        <button className="mt-12 px-6 py-3 border border-green-700 text-green-700 rounded-full hover:bg-green-50 transition">
          Explore More
        </button>
      </Link>
    </section>
  );
};


