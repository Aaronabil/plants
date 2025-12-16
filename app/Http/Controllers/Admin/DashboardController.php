<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Revenue (Total Amount of PAID orders)
        $revenueToday = Order::whereDate('created_at', Carbon::today())
            ->where('payment_status', 'PAID')
            ->sum('total_amount');
            
        $revenueMonth = Order::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->where('payment_status', 'PAID')
            ->sum('total_amount');

        $revenueTotal = Order::where('payment_status', 'PAID')
            ->sum('total_amount');

        // 2. Orders (Count of PAID/COMPLETED/PROCESSING/SHIPPING/DELIVERED orders - basically successful transactions)
        // Adjust filter based on what "Successful" means. Usually all except CANCELLED/FAILED/EXPIRED
        $validStatuses = ['PAID', 'SETTLEMENT']; // Adjust based on your payment_status enum
        // If payment_status includes PAID, then we count those.
        // Let's assume any order with payment_status = PAID is a valid order for "Orders" count.
        
        $ordersToday = Order::whereDate('created_at', Carbon::today())
             ->where('payment_status', 'PAID')
             ->count();

        $ordersMonth = Order::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->where('payment_status', 'PAID')
            ->count();

        $ordersTotal = Order::where('payment_status', 'PAID')->count();

        // 3. Profit (Placeholder: 20% of Revenue for now, since cost_price is missing)
        $profitMargin = 0.20;
        $profitToday = $revenueToday * $profitMargin;
        $profitMonth = $revenueMonth * $profitMargin;
        $profitTotal = $revenueTotal * $profitMargin;

        // 4. Visitors (Placeholder: Count of Users, or 0 if tracking not enabled)
        // For now, let's use Total Users as a proxy for "Visitors" or minimal base
        $visitorsToday = User::whereDate('created_at', Carbon::today())->count();
        $visitorsMonth = User::whereMonth('created_at', Carbon::now()->month)->count();
        $visitorsTotal = User::count();

        // 5. Conversion Rate (Orders / Visitors) - here considering Total Orders / Total Users
        $conversionRate = $visitorsTotal > 0 ? ($ordersTotal / $visitorsTotal) * 100 : 0;

        // 6. Monthly Sales Chart Data (Last 12 months)
        // 6. Monthly Sales Chart Data (Last 12 months)
        $salesData = Order::where('payment_status', 'PAID')
            ->whereYear('created_at', Carbon::now()->year)
            ->get()
            ->groupBy(function($val) {
                return Carbon::parse($val->created_at)->format('M');
            });

        $monthlySales = [];
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        foreach ($months as $month) {
            $total = 0;
            if (isset($salesData[$month])) {
                $total = $salesData[$month]->sum('total_amount');
            }
            $monthlySales[] = [
                'name' => $month,
                'total' => $total
            ];
        }

        // Ensure all months are represented if needed, or just send what we have. 
        // For simplicity, sending what we have. The UI maps it.

        // 7. Recent Sales (Last 5 Paid Orders)
        $recentOrders = Order::with('user')
            ->where('payment_status', 'PAID')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard/Page', [
            'revenue' => [
                'today' => $revenueToday,
                'month' => $revenueMonth,
                'total' => $revenueTotal
            ],
            'orders' => [
                'today' => $ordersToday,
                'month' => $ordersMonth,
                'total' => $ordersTotal
            ],
            'profit' => [
                'today' => $profitToday,
                'month' => $profitMonth,
                'total' => $profitTotal
            ],
            'visitors' => [
                'today' => $visitorsToday,
                'month' => $visitorsMonth,
                'total' => $visitorsTotal
            ],
            'conversion_rate' => round($conversionRate, 2),
            'monthly_sales' => $monthlySales,
            'recent_orders' => $recentOrders,
        ]);
    }
}
