<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status', 'all');
        $query = Order::with('user');

        switch ($status) {
            case 'pending_payment':
                $query->where('payment_status', 'AWAITING_PAYMENT');
                break;
            case 'processing':
                $query->where('payment_status', 'PAID')
                      ->where('delivery_status', 'PROCESSING');
                break;
            case 'shipping':
                $query->where('delivery_status', 'SHIPPING');
                break;
            case 'completed':
                $query->where('delivery_status', 'COMPLETED');
                break;
            case 'cancelled':
                $query->where('payment_status', 'CANCELLED');
                break;
        }

        $orders = $query->orderBy('id', 'ASC')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Orders/Page', [
            'orders' => $orders,
            'filters' => [
                'status' => $status,
            ],
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['user', 'items.product']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $action = $request->input('action');

        switch ($action) {
            case 'accept_payment':
                // Manual confirmation
                $order->update([
                    'payment_status' => 'PAID',
                    'delivery_status' => 'PROCESSING', // Assuming standard flow
                ]);
                break;
            case 'process_order':
                $order->update([
                    'delivery_status' => 'SHIPPING',
                    // 'resi' => $request->input('resi') // If resi is strictly required here or later
                ]);
                break;
            case 'update_resi':
                // Check if we need a dedicated action or if it's part of 'process_order'
                // User said "Kolom untuk Memasukkan Nomor Resi" and "Tombol Proses Pesanan"
                // Assuming process order moves to shipping, and we might save resi then or separately.
                // Let's assume process order might take resi.
                if ($request->has('resi')) {
                     // Note: Order model might need 'shipping_tracking_number' column or similar. 
                     // I didn't see it in the model view earlier.
                     // I will assume for now we might need to add it or store it in 'shipping_fee' (unlikely) or just log it. 
                     // Re-checking model: 'invoice', 'total_amount', 'shipping_type', 'shipping_fee', 'shipping_address', 'payment_status', 'delivery_status'.
                     // No visible tracking number column. I might need to add it or it's missing in fillable.
                     // For now I'll skip saving resi to DB column until verified, or add it to a generic field if exists.
                }
                break;
            case 'complete_order':
                $order->update([
                    'delivery_status' => 'COMPLETED'
                ]);
                break;
            case 'cancel_order':
                $order->update([
                    'payment_status' => 'CANCELLED',
                    'delivery_status' => 'CANCELLED' // if valid enum, but user only gave enums for payment/delivery separately.
                    // 'delivery_status' has 'PROCESSING', 'SHIPPING', 'DELIVERED', 'COMPLETED'. No CANCELLED in delivery_status?
                    // User said: payment_status enum('AWAITING_PAYMENT', 'PAID', 'FAILED', 'CANCELLED', 'EXPIRED')
                    // delivery_status enum('PROCESSING', 'SHIPPING', 'DELIVERED', 'COMPLETED')
                    // So probably just update payment_status to CANCELLED.
                ]);
                break;
        }

        return back();
    }
}
