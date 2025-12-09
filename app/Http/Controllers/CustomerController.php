<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $customers = User::with('orders')->orderBy('id', 'ASC')->paginate($perPage);

        return Inertia::render('Admin/Customer/Page', [
            'customers' => $customers,
        ]);
    }

    public function destroy(User $customer)
    {
        $customer->delete();

        return redirect()->back()->with('success', 'Customer deleted permanently.');
    }
}
