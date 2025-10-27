import { CheckCircle, Clock, Truck, Package } from "lucide-react"

export default function TransactionHistory() {
  const orders = [
    {
      id: "#INV-1023",
      date: "23 Oct 2025",
      status: "Pending",
      progress: 1,
    },
    {
      id: "#INV-1024",
      date: "25 Oct 2025",
      status: "Shipped",
      progress: 2,
    },
    {
      id: "#INV-1025",
      date: "27 Oct 2025",
      status: "Delivered",
      progress: 4,
    },
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Transaction History
      </h3>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-medium text-gray-800">{order.id}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
              <span
                className={`text-sm font-medium ${
                  order.status === "Pending"
                    ? "text-yellow-600"
                    : order.status === "Shipped"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Progress bar horizontal */}
            <div className="relative flex justify-between items-center">
              {/* Progress line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200" />
              <div
                className="absolute top-1/2 left-0 h-[2px] bg-blue-500 transition-all duration-500"
                style={{ width: `${(order.progress / 4) * 100}%` }}
              />

              {/* Steps */}
              {[1, 2, 3, 4].map((step, i) => {
                const active = step <= order.progress
                const icons = [Clock, Truck, Package, CheckCircle]
                const Icon = icons[i]
                return (
                  <div
                    key={step}
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                      active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Pending</span>
              <span>Shipped</span>
              <span>In Transit</span>
              <span>Delivered</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-blue-500 hover:underline">
        View all transactions
      </button>
    </div>
  )
}
