import React, { useState, useEffect, useCallback } from 'react';
import {
  Truck,
  Box,
  Banknote,
  WalletCards,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { User, CartItem } from "@/types";
import { Head, useForm } from "@inertiajs/react"
import axios from 'axios';
import { toast } from 'sonner'
import { Textarea } from "@/Components/ui/textarea";
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react';

declare global {
  interface Window {
    snap: any;
  }
}

interface Destination {
  id: number;
  label: string;
  province_name: string;
  city_name: string;
  district_name: string;
  subdistrict_name: string;
  zip_code: string;
}

interface ShippingResult {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
}

interface ApiResponse<T> {
  meta: {
    message: string;
    code: number;
    status: string;
  };
  data: T;
}

interface CheckoutProps {
  user: User;
  cartItems: CartItem[];
  midtrans_client_key: string;
  midtrans_snap_url: string;
}

export default function Checkout({ user, cartItems, midtrans_client_key, midtrans_snap_url }: CheckoutProps) {
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedShipping, setSelectedShipping] = useState<ShippingResult | null>(null);

  const fadeAnimation = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3 }
  };

  const [destSearch, setDestSearch] = useState('');
  const [originResults, setOriginResults] = useState<Destination[]>([]);
  const [destResults, setDestResults] = useState<Destination[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<Destination | null>(null);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = selectedShipping?.cost || 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const { data, setData, post, processing, errors } = useForm({
    fullName: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address_detail: "",
    zip: "",
    agree: false,
    shipping_type: shippingMethod.toUpperCase(),
    shipping_fee: shipping,
    shipping_address: "",
    total_amount: total,
    cart_items: cartItems.map(item => item.id),
  });

  useEffect(() => {
    // Load Midtrans Snap script
    const scriptId = 'midtrans-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = midtrans_snap_url;
      script.setAttribute('data-client-key', midtrans_client_key);
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      // Optional: Remove script on unmount if needed, but usually better to keep it for caching
      // document.body.removeChild(script); 
    };
  }, [midtrans_snap_url, midtrans_client_key]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.fullName || !data.email || !data.phone) {
      toast.error('Please fill in your full name, email, and phone number.');
      return;
    }

    if (shippingMethod === 'delivery') {
      if (!selectedDest) {
        toast.error('Please select a destination address.');
        return;
      }
      if (!data.address_detail) {
        toast.error('Please provide the complete address details.');
        return;
      }
      if (!selectedShipping) {
        toast.error('Please select a shipping option.');
        return;
      }
    }

    if (!data.agree) {
      toast.error('You must agree to the Terms and Conditions.');
      return;
    }

    try {
      const response = await axios.post('/orders', {
        ...data,
        payment_method: paymentMethod,
      });

      if (response.data.status === 'success') {
        if (paymentMethod === 'bank' && response.data.snap_token) {
          window.snap.pay(response.data.snap_token, {
            onSuccess: function (result: any) {
              toast.success('Payment successful!');
              router.visit('/'); // Redirect to home or orders page
            },
            onPending: function (result: any) {
              toast.info('Waiting for payment...');
              router.visit('/');
            },
            onError: function (result: any) {
              toast.error('Payment failed!');
            },
            onClose: function () {
              toast.warning('You closed the popup without finishing the payment');
            }
          });
        } else {
          // COD or other methods
          toast.success('Order placed successfully! Please pay on delivery.');
          router.visit('/');
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to place order.');
      console.error('Order failed:', err);
    }
  };

  useEffect(() => {
    const newTotal = subtotal + (selectedShipping?.cost || 0) - discount;
    setData(prevData => ({
      ...prevData,
      shipping_type: shippingMethod.toUpperCase(),
      shipping_fee: selectedShipping?.cost || 0,
      total_amount: newTotal,
      shipping_address: shippingMethod === 'delivery' && selectedDest
        ? `${data.address_detail}, ${selectedDest.subdistrict_name}, ${selectedDest.district_name}, ${selectedDest.city_name}, ${selectedDest.province_name} ${selectedDest.zip_code}`
        : 'Pickup at store'
    }));
  }, [shippingMethod, selectedShipping, subtotal, discount, selectedDest, data.address_detail]);

  // const [weight, setWeight] = useState('1000');
  const totalWeight = cartItems.reduce((total, item) => {
    return total + (item.product.weight_in_kilograms * 1000 * item.quantity);
  }, 0);
  const [courier, setCourier] = useState('jne:sicepat:jnt');

  const staticOrigin: Destination = {
    id: 6175,
    label: "Tangerang",
    province_name: "Banten",
    city_name: "Tangerang",
    district_name: "Curug",
    subdistrict_name: "Curug Kulon",
    zip_code: "15810"
  };
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState<ShippingResult[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (destSearch.length < 2 || (selectedDest && destSearch === selectedDest.label)) {
      setDestResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchDestinationAddress(destSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [destSearch, selectedDest]);

  const searchDestinationAddress = async (query: string) => {
    try {
      setSearching(true);
      const response = await axios.get<ApiResponse<Destination[]>>('/rajaongkir/search/destinations', {
        params: {
          search: query,
          limit: 50
        }
      });

      if (response.data.meta.status === 'success') {
        setDestResults(response.data.data || []);
        setShowDestDropdown(true);
      }
    } catch (err) {
      console.error('Search destination failed:', err);
      setDestResults([]);
    } finally {
      setSearching(false);
    }
  };

  const calculateShipping = useCallback(async () => {
    if (!selectedDest) {
      setError('Please select destination');
      return;
    }

    try {
      setCalculating(true);
      setError('');
      const response = await axios.post<ApiResponse<ShippingResult[]>>('/rajaongkir/search/calculate-cost', {
        origin: staticOrigin.id,
        destination: selectedDest.id,
        weight: Math.ceil(totalWeight), // Round up to ensure sufficient shipping cost
        courier: courier,
        price: 'lowest'
      });

      if (response.data.meta.status === 'success') {
        setResults(response.data.data);
      } else {
        setError(response.data.meta.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.meta?.message || 'Failed to calculate shipping cost');
    } finally {
      setCalculating(false);
    }
  }, [selectedDest, totalWeight, courier]); // Update dependencies

  // Update useEffect trigger
  useEffect(() => {
    if (selectedDest) {
      calculateShipping();
    }
  }, [selectedDest, totalWeight]); // Update dependencies

  // Modify handleSelectDest
  const handleSelectDest = (destination: Destination) => {
    setSelectedDest(destination);
    setDestSearch(destination.label);
    setShowDestDropdown(false);
    setDestResults([]);
    // Calculation will be triggered by useEffect
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ?
        <span key={index} className="bg-yellow-200 font-semibold">{part}</span> : part
    );
  };

  return (
    <>
      <Head title="Checkout" />
      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden">

          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 p-8 border-r">
            <h2 className="text-2xl font-semibold mb-3">Checkout</h2>
            <div className="p-3 bg-green-50 border border-green-200 rounded-md mb-3">
              <div>
                <p className="text-sm font-medium text-green-900">Store Location:</p>
                <p className="text-sm text-green-700">{staticOrigin.label}</p>
                <p className="text-xs text-green-600 mt-1">
                  {staticOrigin.subdistrict_name}, {staticOrigin.district_name}, {staticOrigin.city_name}, {staticOrigin.province_name} {staticOrigin.zip_code && ` - ${staticOrigin.zip_code}`}
                </p>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Shipping Type</h3>
              <RadioGroup
                defaultValue={shippingMethod}
                onValueChange={(value) => setShippingMethod(value)}
                className="flex gap-4"
              >
                <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition w-64 justify-start">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <span className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span>Delivery</span>
                  </span>
                </label>

                <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition w-64 justify-start">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <span className="flex items-center gap-2">
                    <Box className="w-5 h-5" />
                    <span>Pick Up</span>
                  </span>
                </label>
              </RadioGroup>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block font-medium">Full name</label>
                <Input value={data.fullName} onChange={(e) => setData('fullName', e.target.value)} placeholder="Type your name" required />
              </div>

              <div>
                <label className="block font-medium">Email address</label>
                <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Type your email" required />
              </div>

              <div>
                <label className="block font-medium">Phone number</label>
                <Input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="Type your phone number" required />
              </div>

              <AnimatePresence>
                {shippingMethod === 'delivery' && (
                  <motion.div
                    {...fadeAnimation}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="border-b pb-6">
                      <label className="block font-medium">Destination Address</label>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Search Destination
                        </label>
                        <Input
                          type="text"
                          value={destSearch}
                          onChange={(e) => {
                            setDestSearch(e.target.value);
                            setSelectedDest(null);
                          }}
                          onFocus={() => destResults.length > 0 && setShowDestDropdown(true)}
                          placeholder="Type city, district, or postal code..."
                        />

                        {showDestDropdown && destResults.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {destResults.map((dest) => (
                              <div
                                key={dest.id}
                                onClick={() => handleSelectDest(dest)}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              >
                                <div className="font-medium text-gray-900">
                                  {highlightText(dest.label, destSearch)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {dest.subdistrict_name && `${dest.subdistrict_name}, `}
                                  {dest.district_name}, {dest.city_name}, {dest.province_name}
                                  {dest.zip_code && ` - ${dest.zip_code}`}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {selectedDest && (
                          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-green-900">Selected:</p>
                                <p className="text-sm text-green-700">{selectedDest.label}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedDest(null);
                                  setDestSearch('');
                                  setResults([]);
                                  setSelectedShipping(null);
                                }}
                                className="text-green-600 hover:text-green-800"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium">Complete Address</label>
                      <Textarea
                        value={data.address_detail}
                        onChange={(e) => setData('address_detail', e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Package Details */}
              <div>
                <div>
                  <label className="block font-medium">Package Weight</label>
                  <div className="mt-1 p-3 bg-gray-50 border rounded-md">
                    <p className="text-sm text-gray-700">
                      Total Weight: {(totalWeight / 1000).toFixed(2)} kg ({Math.ceil(totalWeight)} g)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Calculated from your cart items
                    </p>
                  </div>
                </div>

                <div>
                  <input
                    type="hidden"
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="jne:sicepat:jnt"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {calculating && (
                <div className="w-full text-center py-3 text-gray-500">
                  Calculating shipping costs...
                </div>
              )}

              <AnimatePresence>
                {shippingMethod === 'delivery' && (
                  <motion.div
                    {...fadeAnimation}
                    className="space-y-4 overflow-hidden"
                  >
                    {results.length > 0 && (
                      <div className="mt-3 bg-white rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Options</h2>
                        <div className="space-y-3">
                          {results.map((result, index) => (
                            <div
                              key={index}
                              onClick={() => setSelectedShipping(result)}
                              className={`border rounded-lg p-4 transition cursor-pointer ${selectedShipping?.service === result.service && selectedShipping.name === result.name ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-600'}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-900">{result.name}</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                      {result.service}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                                  {result.etd && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Estimated: {result.etd}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right ml-4">
                                  <p className="text-xl font-bold text-gray-900">
                                    {formatCurrency(result.cost)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input type="checkbox" checked={data.agree} onChange={e => setData('agree', e.target.checked)} />
                  I have read and agree to the Terms and Conditions.
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 p-8 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Review your cart</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images.find(img => img.is_primary)?.image_url} alt={item.product.product_name} className="w-12 h-12 object-cover rounded-md" />
                    <div>
                      <p className="font-medium">{item.product.product_name}</p>
                      <p className="text-sm text-gray-500">{item.quantity}x</p>
                    </div>
                  </div>
                  <p>Rp{(item.product.price * item.quantity).toLocaleString('id-ID')}</p>
                </div>
              ))}

              <div className="flex justify-between text-sm text-gray-500 pt-3">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>Rp{shipping.toLocaleString('id-ID')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-red-500">
                  <span>Discount</span>
                  <span>-Rp{discount.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total</span>
                <span>Rp{total.toLocaleString('id-ID')}</span>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="flex flex-col gap-3"
                >
                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition w-full justify-start">
                    <RadioGroupItem value="cod" id="cod" />
                    <span className="flex items-center gap-2">
                      <Banknote className="w-4 h-4" />
                      <span>Cash On Delivery</span>
                    </span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50 transition w-full justify-start">
                    <RadioGroupItem value="bank" id="bank" />
                    <span className="flex items-center gap-2">
                      <WalletCards className="w-4 h-4" />
                      <span>Midtrans</span>
                    </span>
                  </label>
                </RadioGroup>
              </div>

              <p className="text-xs text-gray-500 text-center mt-2">
                🔒 Secure Checkout — SSL Encrypted
              </p>
              <Button type="submit" className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                Pay Now
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
