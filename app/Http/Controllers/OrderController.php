<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\Payment;
use Midtrans\Config;
use Midtrans\Snap;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'cart_items' => 'required|array',
            'cart_items.*' => 'exists:cart_items,id',
            'shipping_type' => 'required|in:DELIVERY,PICKUP',
            'shipping_address' => 'nullable|string',
            'total_amount' => 'required|numeric',
            'shipping_fee' => 'required|numeric',
            'payment_method' => 'required|in:cod,bank',
        ]);

        DB::beginTransaction();

        try {
            $user = Auth::user();

            // Create the order
            $order = Order::create([
                'user_id' => $user->id,
                'invoice' => 'INV-' . strtoupper(Str::random(10)),
                'total_amount' => $request->total_amount,
                'shipping_type' => $request->shipping_type,
                'shipping_fee' => $request->shipping_fee,
                'shipping_address' => $request->shipping_address,
                'payment_status' => 'AWAITING_PAYMENT', // Default status
                'delivery_status' => 'PROCESSING', // Default status
            ]);

            $cartItems = CartItem::with('product')->whereIn('id', $request->cart_items)->get();

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price_at_purchase' => $cartItem->product->price,
                ]);
            }

            // Create Payment Record
            $paymentMethod = $request->payment_method === 'cod' ? 'COD' : 'MIDTRANS';
            
            $payment = Payment::create([
                'order_id' => $order->id,
                'invoice_number' => $order->invoice,
                'amount' => $order->total_amount,
                'payment_method' => $paymentMethod,
                'status' => 'PENDING',
            ]);

            $snapToken = null;

            if ($paymentMethod === 'MIDTRANS') {
                // Configure Midtrans
                Config::$serverKey = config('services.midtrans.server_key');
                Config::$isProduction = config('services.midtrans.is_production');
                Config::$isSanitized = true;
                Config::$is3ds = true;

                $params = [
                    'transaction_details' => [
                        'order_id' => $payment->invoice_number, // Use invoice number as order_id for Midtrans
                        'gross_amount' => (int) $order->total_amount,
                    ],
                    'customer_details' => [
                        'first_name' => $user->name,
                        'email' => $user->email, 
                        'phone' => $user->phone ?? '', 
                    ],
                ];

                $snapToken = Snap::getSnapToken($params);
                
                // Update implementation plan to just save the snap token if needed, or just return it. 
                // We don't save snap token in DB currently, but we return it.
                // Optionally save check $payment->transaction_id = $snapToken.
            }

            // Clear the cart items that have been ordered
            CartItem::whereIn('id', $request->cart_items)->where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Order placed successfully!',
                'order_id' => $order->id,
                'snap_token' => $snapToken,
                'payment_method' => $request->payment_method
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to place order: ' . $e->getMessage()
            ], 500);
        }
    }
}
