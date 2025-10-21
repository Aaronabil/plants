import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import { NumberField, NumberFieldScrubArea } from '@/Components/ui/base-number-field';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
      category: string;
      img: string;
    }[]
  >([]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "Monstera Deliciosa",
      price: 120000,
      quantity: 1,
      category: "Succulent",
      img: "./images/category/aglaonema.jpg",
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 border-b pb-4"
                  >
                    <img
                      src= "./images/category/monstera.jpg"
                      alt={item.name}
                      className="w-24 h-20 rounded-xl object-cover mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-600 tracking-wide">
                        {item.category}
                      </p>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>
                      <NumberField
                        className="mx-auto mt-1"
                        defaultValue={item.quantity}
                        min={0}
                        max={100}
                      >
                        <NumberFieldScrubArea>Amount</NumberFieldScrubArea>
                      </NumberField>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-10">
                  Your cart is empty.
                </p>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between mb-3">
                <span className="font-medium text-gray-700">Total</span>
                <span className="font-semibold text-gray-900">
                  Rp{total.toLocaleString("id-ID")}
                </span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                Checkout
              </button>

              <button
                onClick={addItem}
                className="w-full mt-2 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition"
              >
                Add Dummy Product
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
