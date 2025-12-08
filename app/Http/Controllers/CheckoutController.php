<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RajaongkirController;
use Illuminate\Support\Facades\Http;

class CheckoutController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();
        $itemIds = $request->query('items', []);

        if (empty($itemIds)) {
            return redirect()->route('home')->with('error', 'No items selected for checkout.');
        }

        $cartItems = CartItem::with(['product.images', 'product.category'])
            ->whereIn('id', $itemIds)
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('home')->with('error', 'Selected items not found in your cart.');
        }
        
        $isProduction = config('services.midtrans.is_production');
        $snapUrl = $isProduction 
            ? 'https://app.midtrans.com/snap/snap.js' 
            : 'https://app.sandbox.midtrans.com/snap/snap.js';

        return Inertia::render('Checkout', [
            'cartItems' => $cartItems,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
            ],
            'midtrans_client_key' => config('services.midtrans.client_key'),
            'midtrans_snap_url' => $snapUrl,
            // 'provinces' => $provinces,
        ]);
    }
}
