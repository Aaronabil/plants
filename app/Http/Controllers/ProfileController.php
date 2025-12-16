<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'orders' => Order::with('items.product.images')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function completeOrder(Request $request, Order $order): RedirectResponse
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        $order->update([
            'delivery_status' => 'COMPLETED',
            // 'payment_status' => 'PAID', // Payment status should ideally be PAID before delivery/completion usually, but re-confirming here is fine or just rely on existing status.
        ]);

        return Redirect::back()->with('success', 'Order marked as completed.');
    }

    public function cancelOrder(Request $request, Order $order): RedirectResponse
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($order->delivery_status !== 'PROCESSING') {
             return Redirect::back()->withErrors(['message' => 'Order cannot be cancelled at this stage.']);
        }

        $order->update([
            'payment_status' => 'CANCELLED',
            // We don't change delivery_status to CANCELLED per se if the enum doesn't support it or if 'PROCESSING' stops having meaning.
            // However, usually we should have a status for it. The user requirement implied seeing it as cancelled.
            // If delivery_status enum has no CANCELLED, we rely on payment_status or we need to add it.
            // Looking at the enum in index.d.ts: delivery_status: 'PROCESSING' | 'SHIPPING' | 'DELIVERED' | 'COMPLETED'.
            // So we can't set delivery_status to CANCELLED unless we alter DB enum. 
            // We will trust payment_status = 'CANCELLED' is enough for Admin logic to show it as cancelled (as seen in Admin/OrderController).
        ]);
        
        // Restore stock
        foreach ($order->items as $item) {
             $item->product->increment('stock', $item->quantity);
        }

        return Redirect::back()->with('success', 'Order cancelled successfully.');
    }
}
