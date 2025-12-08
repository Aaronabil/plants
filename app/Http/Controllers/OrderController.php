<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

            // Clear the cart items that have been ordered
            CartItem::whereIn('id', $request->cart_items)->where('user_id', $user->id)->delete();

            DB::commit();

            return redirect()->route('home')->with('success', 'Order placed successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to place order. Please try again.');
        }
    }
}
