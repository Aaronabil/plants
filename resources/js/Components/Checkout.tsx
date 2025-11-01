import { useEffect, useState } from "react";
import {
  Truck,
  Box,
  Banknote,
  WalletCards,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/Components/ui/command";

// ==================== INTERFACE =====================
interface Wilayah {
  id: string;
  name: string;
}

// ==================== MAIN FUNCTION =====================
export default function Checkout() {
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Indonesia",
    province: "",
    city: "",
    district: "",
    village: "",
    zip: "",
    agree: false,
  });

  const countries = ["Indonesia", "Malaysia", "Singapore"];

  // ==================== STATE UNTUK DATA API =====================
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [cities, setCities] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);
  const [villages, setVillages] = useState<Wilayah[]>([]);

  // ==================== LOAD PROVINSI =====================
  useEffect(() => {
    if (formData.country === "Indonesia") {
      fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
        .then((res) => res.json())
        .then((data: Wilayah[]) => setProvinces(data))
        .catch((err) => console.error("Error fetching provinces:", err));
    }
  }, [formData.country]);

  // ==================== LOAD KOTA =====================
  useEffect(() => {
    if (!formData.province) return;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${formData.province}.json`
    )
      .then((res) => res.json())
      .then((data: Wilayah[]) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));

    setDistricts([]);
    setVillages([]);
    setFormData((prev) => ({
      ...prev,
      city: "",
      district: "",
      village: "",
      zip: "",
    }));
  }, [formData.province]);

  // ==================== LOAD KECAMATAN =====================
  useEffect(() => {
    if (!formData.city) return;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${formData.city}.json`
    )
      .then((res) => res.json())
      .then((data: Wilayah[]) => setDistricts(data))
      .catch((err) => console.error("Error fetching districts:", err));

    setVillages([]);
    setFormData((prev) => ({
      ...prev,
      district: "",
      village: "",
      zip: "",
    }));
  }, [formData.city]);

  // ==================== LOAD KELURAHAN =====================
  useEffect(() => {
    if (!formData.district) return;
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${formData.district}.json`
    )
      .then((res) => res.json())
      .then((data: Wilayah[]) => setVillages(data))
      .catch((err) => console.error("Error fetching villages:", err));

    setFormData((prev) => ({
      ...prev,
      village: "",
      zip: "",
    }));
  }, [formData.district]);

  // ==================== HANDLE INPUT =====================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==================== HANDLE SUBMIT =====================
  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, phone, country, province, city, district, village, zip, agree } =
      formData;

    if (!fullName || !email || !phone || !country) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    if (country === "Indonesia" && (!province || !city || !district || !village)) {
      alert("⚠️ Please select your complete address.");
      return;
    }

    if (!agree) {
      alert("⚠️ Please agree to the Terms and Conditions.");
      return;
    }

    alert(`✅ Payment successful via ${paymentMethod.toUpperCase()}!`);
  };

  // ==================== CART DUMMY =====================
  const cartItems = [
    { id: 1, name: "Peace Lily", price: 20, quantity: 1, image: "/images/product/peace_lily.png" },
    { id: 2, name: "King Palm", price: 25, quantity: 1, image: "/images/product/king_palm.jpg" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5;
  const discount = 10;
  const total = subtotal + shipping - discount;

  // ==================== UI =====================
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-8 border-r">
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

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

          {/* FORM */}
          <form className="grid gap-4" onSubmit={handlePayNow}>
            <div>
              <label className="block font-medium">Full name</label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
            </div>

            <div>
              <label className="block font-medium">Email address</label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            </div>

            <div>
              <label className="block font-medium">Phone number</label>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
            </div>

            {/* WILAYAH INDONESIA */}
            {formData.country === "Indonesia" && (
              <>
            {/* Province & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">Province</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                >
                  <option value="">Select Province</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium">City</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!formData.province}
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

             {/* Village & ZIP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium">District / Kecamatan</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, district: e.target.value }))
                    }
                    disabled={!formData.city}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Village / Kelurahan</label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    disabled={!formData.district}
                  >
                    <option value="">Select Village</option>
                    {villages.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                  <label className="block font-medium">ZIP Code</label>
                  <Input
                    name="zip"
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="ZIP"
                    
                  />
                </div>
              </>
            )}

            <label className="flex items-center gap-2 text-sm mt-2">
              <input
                name="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleChange}
              />
              I have read and agree to the Terms and Conditions.
            </label>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Review your cart</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity}x</p>
                  </div>
                </div>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}

            <div className="flex justify-between text-sm text-gray-500 pt-3">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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
               <RadioGroupItem value="credit" id="credit" />
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
      </div>
    </div>
  );
}
