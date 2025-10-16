import React, { useState } from "react";

const DetailCart: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Monstera Deliciosa",
    price: 120000,
    oldPrice: 150000,
    category: "Succulent",
    description:
      "Monstera Deliciosa adalah tanaman hias populer dengan daun besar berbentuk unik yang memberikan kesan tropis pada ruangan.",
    image: "./images/product/monstera.jpg",
  };

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <section className="max-w-6xl mx-auto py-16 px-6 lg:px-12 grid md:grid-cols-2 gap-10 items-start">
      {/* Left - Image */}
      <div className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Right - Info */}
      <div>
        <p className="text-green-700 font-medium text-sm mb-2">
          {product.category}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <p className="text-2xl font-semibold text-green-700">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-gray-400 line-through text-lg">
            Rp{product.oldPrice.toLocaleString("id-ID")}
          </p>
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Quantity selector */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={decrease}
            className="px-3 py-1 border rounded-lg text-lg font-bold hover:bg-gray-100"
          >
            −
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={increase}
            className="px-3 py-1 border rounded-lg text-lg font-bold hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition">
            Add to Cart
          </button>
          <button className="flex-1 border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 transition">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailCart;
