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
        
        return Inertia::render('Checkout/Show', [
            'cartItems' => $cartItems,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            // 'provinces' => $provinces,
        ]);
    }
}
