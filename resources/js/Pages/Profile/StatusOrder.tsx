import { useState } from "react";
import { Order } from "@/types";
import { router } from "@inertiajs/react";
import { CheckCircle, Clock, Truck, Package, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";

interface StatusOrderProps {
  orders?: Order[];
}

export default function StatusOrder({ orders = [] }: StatusOrderProps) {
  const [loading, setLoading] = useState(false);

  const handleComplete = (orderId: number) => {
    if (loading) return;
    setLoading(true);
    router.patch(route('profile.orders.complete', orderId), {}, {
      onSuccess: () => {
        toast.success("Order marked as completed!");
        setLoading(false);
      },
      onError: () => {
        toast.error("Failed to update order status.");
        setLoading(false);
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Status Order
      </h3>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No orders found.</div>
        ) : (
          orders.map((order) => {
            // Calculate progress based on delivery_status
            let progress = 1;
            if (order.delivery_status === 'SHIPPING') progress = 2;
            if (order.delivery_status === 'DELIVERED') progress = 3;
            if (order.delivery_status === 'COMPLETED') progress = 4;

            return (
              <div key={order.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-medium text-gray-800">{order.invoice}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${order.delivery_status === "PROCESSING"
                        ? "text-yellow-600"
                        : order.delivery_status === "SHIPPING"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                  >
                    {order.delivery_status}
                  </span>
                </div>

                {/* Progress bar horizontal */}
                <div className="relative flex justify-between items-center mt-6 mb-2">
                  {/* Progress line */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200" />
                  <div
                    className="absolute top-1/2 left-0 h-[2px] bg-blue-500 transition-all duration-500"
                    style={{ width: `${((progress - 1) / 3) * 100}%` }}
                  />

                  {/* Steps */}
                  {[1, 2, 3, 4].map((step, i) => {
                    const active = step <= progress;
                    const icons = [Clock, Truck, Package, CheckCircle];
                    const Icon = icons[i];
                    return (
                      <div
                        key={step}
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-500 mb-2">
                  <span>Processing</span>
                  <span>Shipping</span>
                  <span>Delivered</span>
                  <span>Completed</span>
                </div>

                {/* Action Button for Delivered Orders */}
                {order.delivery_status === 'DELIVERED' && (
                  <div className="flex justify-end mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleComplete(order.id)}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 h-8 text-xs"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Complete Order
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <button className="mt-6 text-sm text-blue-500 hover:underline">
        View all transactions
      </button>
    </div>
  );
}
