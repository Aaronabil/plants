import React from "react";
import { Link } from "@inertiajs/react";
import { Product } from '@/types';
import ProductCard from '@/Components/ProductCard';

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
          <ProductCard
            key={product.id}
            product={product}
            categoryName={product.category?.category_name || 'Featured'}
          />
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


