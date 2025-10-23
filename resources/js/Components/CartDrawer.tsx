"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import {
  NumberField,
  NumberFieldScrubArea,
} from "@/Components/ui/base-number-field";

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
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<() => void>(() => () => {});

  // Tambah dummy product
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

  // Fungsi konfirmasi (muncul dialog)
  const confirmDelete = (action: () => void) => {
    setDialogAction(() => action);
    setIsDialogOpen(true);
  };

  // Hapus 1 item
  const removeItem = (id: number) => {
    confirmDelete(() => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedItems((prev) => prev.filter((sid) => sid !== id));
      toast.success("Item deleted successfully!");
    });
  };

  // Hapus semua item yang dipilih
  const removeSelectedItems = () => {
    if (selectedItems.length === 0) {
      toast.error("No items selected!");
      return;
    }

    confirmDelete(() => {
      setCartItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      toast.success("Selected items have been successfully deleted.");
    });
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelectedItems(cartItems.map((item) => item.id));
    else setSelectedItems([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const allSelected =
    selectedItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <>
      {/* Dialog Konfirmasi */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be finished.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dialogAction();
                setIsDialogOpen(false);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Cart
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-3 border-b pb-4"
                    >
                      <input
                        type="checkbox"
                        className="mt-2 accent-green-600"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                      <img
                        src="./images/category/monstera.jpg"
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

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50">
                {cartItems.length > 0 && (
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="selectAll"
                        className="accent-green-600 w-4 h-4"
                        checked={allSelected}
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                      />
                      <label
                        htmlFor="selectAll"
                        className="text-sm text-gray-700"
                      >
                        Select All
                      </label>
                    </div>

                    <button
                      onClick={removeSelectedItems}
                      className="p-1 text-gray-400 hover:text-red-600 transition"
                      title="Hapus item yang dipilih"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex justify-between mb-3">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="font-semibold text-gray-900">
                    Rp{total.toLocaleString("id-ID")}
                  </span>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                  Checkout
                </Button>

                <Button
                  variant="outline"
                  onClick={addItem}
                  className="w-full mt-2 border-green-600 text-green-600 hover:bg-green-50 transition"
                >
                  Add Dummy Product
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
