import React, { useState } from "react";
import { NumberField, NumberFieldScrubArea } from "@/Components/ui/base-number-field";

const DetailProduct: React.FC = () => {
const [quantity, setQuantity] = useState(1);
const [activeTab, setActiveTab] = useState("description");

  const product = {
    id: 1,
    name: "Monstera Deliciosa",
    price: 120000,
    oldPrice: 150000,
    category: "Succulent",
    description:
      "Monstera Deliciosa adalah tanaman hias populer dengan daun besar berbentuk unik yang memberikan kesan tropis pada ruangan.",
    image: "/images/product/monstera.jpg",
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-6 lg:px-12 grid md:grid-cols-2 gap-10 items-start">
      {/* Left - Image */}
      <div className="aspect-squarer rounded-lg bg-card shadow-sm overflow-hidden">
        <img
          src="/images/product/monstera_deliciosa.png"
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
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

        {/* Product Options */}
        <div className="space-y-4 mt-6">
          {/* Plant Size */}
          <div>
            <p className="text-gray-700 font-medium text-sm mb-2">Plant Size</p>
            <div className="flex gap-3">
              <button className="px-3 py-1.5 rounded-full border border-yellow-400 bg-yellow-400 text-black font-medium text-sm cursor-default">
                Medium
              </button>
            </div>
          </div>

          {/* Pot Material */}
          <div>
            <p className="text-gray-700 font-medium text-sm mb-2">Pot Material</p>
            <div className="flex gap-3">
              <button className="px-3 py-1.5 rounded-full border border-yellow-400 bg-yellow-400 text-black font-medium text-sm cursor-default">
                Ceramic
              </button>
            </div>
          </div>

          {/* Pot Color */}
          <div>
            <p className="text-gray-700 font-medium text-sm mb-2">
              Pot Color: <span className="text-gray-500 text-sm">White</span>
            </p>
            <div className="flex gap-3">
              <button
                className="w-5 h-5 rounded-full border border-gray-300 bg-white cursor-default shadow-sm"
                aria-label="White"
              ></button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <NumberField
            className="w-120"
            defaultValue={quantity}
            min={1}
            max={100}
          >
            <NumberFieldScrubArea />
          </NumberField>

          <button className="flex-1 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition">
            Add to Cart
          </button>

          <button className="flex-1 border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 transition">
            Buy Now
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="md:col-span-2 mt-12 text-gray-700 leading-relaxed space-y-8">
        {/* Description */}
        <div>
          <h1 className="text-2xl font-semibold text-green-700 mb-3 text-center ">
            Description
          </h1>
          <hr className="mb-2"/>
          <p>
            Monstera Deliciosa dikenal sebagai “Swiss Cheese Plant” karena bentuk daunnya yang unik dan berlubang alami.
            Tanaman ini menjadi favorit bagi pecinta tanaman hias karena tampilannya yang elegan, mudah dirawat, dan mampu
            memberikan nuansa alami yang menenangkan di dalam ruangan. Daun besar berwarna hijau tua yang mengkilap mampu
            mempercantik sudut rumah, ruang tamu, maupun area kerja.
          </p>
          <p className="mt-4">
            Selain keindahannya, Monstera juga membantu menyaring udara, membuat ruangan terasa lebih segar dan sehat.
            Tanaman ini cocok ditempatkan di area dengan cahaya tidak langsung dan disiram secukupnya. Ditanam dalam pot
            keramik berwarna putih, Monstera Deliciosa akan menjadi perpaduan sempurna antara keindahan alami dan gaya
            interior modern minimalis.
          </p>

          <ul className="mt-6 space-y-2">
            {[
              "100% Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              "Ut at nunc vel nisi gravida dictum.",
              "Donec non velit sed risus tincidunt suscipit.",
              "Cras laoreet lacus in dui posuere fringilla.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-600 mt-1.5">🟢</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Review Section */}
        <div>
          <h1 className="text-2xl font-semibold text-green-700 mb-3 text-center ">
            Review
          </h1>
          <hr className="mb-2"/>
          <p>Belum ada review untuk produk ini.</p>
        </div>
      </div>

    </section>
  );
};

export default DetailProduct;
