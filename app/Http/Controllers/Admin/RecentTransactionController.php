<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecentTransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('order_id', 'like', "%{$search}%")
                  ->orWhere('transaction_id', 'like', "%{$search}%")
                  ->orWhere('payment_method', 'like', "%{$search}%");
            });
        }

        $payments = $query->orderBy('id', 'ASC')
            ->paginate($request->per_page ?? 10);

        return Inertia::render('Admin/Recent/Page', [
            'payments' => $payments
        ]);
    }
}
