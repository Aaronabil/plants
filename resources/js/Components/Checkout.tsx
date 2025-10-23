import { useState } from "react";
import { Truck, Box, Banknote, WalletCards, Check, ChevronsUpDown, ShoppingCart } from "lucide-react";
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

export default function Checkout() {
  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    agree: false,
  });

  // Daftar negara
  const countries = [
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Thailand",
    "Vietnam",
    "Philippines",
    "Japan",
    "South Korea",
    "China",
    "Australia",
    "United States",
    "United Kingdom",
  ];

  // Dummy cart data
  const cartItems = [
    { id: 1, name: "Peace Lily", price: 20, quantity: 1, image: "/images/product/peace_lily.png" },
    { id: 2, name: "King Palm", price: 25, quantity: 1, image: "/images/product/king_palm.jpg" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5;
  const discount = 10;
  const total = subtotal + shipping - discount;

  // Validasi sebelum bayar
  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, phone, country, city, state, zip, agree } = formData;

    if (!fullName || !email || !phone || !country || !city || !state || !zip) {
      alert("⚠️ Please fill in all fields before proceeding.");
      return;
    }

    if (!agree) {
      alert("⚠️ Please agree to the Terms and Conditions before proceeding.");
      return;
    }

    alert(`✅ Payment successful via ${paymentMethod.toUpperCase()}! Your order has been placed.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* LEFT SIDE - Shipping */}
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

          {/* Form */}
          <form className="grid gap-4" onSubmit={handlePayNow}>
            <div>
              <label className="block font-medium">Full name</label>
              <Input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block font-medium">Email address</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block font-medium">Phone number</label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter phone number"
              />
            </div>

            {/* Country Selector */}
            <div>
              <label className="block font-medium mb-1">Country</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {formData.country ? formData.country : "Select country"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[250px] p-0 mt-1 border border-gray-200 shadow-md rounded-md bg-white" 
                  align="start"
                  side="bottom"
                  sideOffset={4}
                  avoidCollisions={false}
                >
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country}
                            onSelect={() =>
                              setFormData((prev) => ({ ...prev, country }))
                            }
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                formData.country === country
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-medium">City</label>
                <Input
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block font-medium">State</label>
                <Input
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block font-medium">ZIP Code</label>
                <Input
                  name="zip"
                  type="text"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="ZIP"
                />
              </div>
            </div>

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

        {/* RIGHT SIDE - Review Cart */}
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
            <div className="flex justify-between text-sm text-gray-500">
              <span>Discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Payment Method</h3>
              <RadioGroup
                defaultValue={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value)}
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

            <button
              onClick={handlePayNow}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
