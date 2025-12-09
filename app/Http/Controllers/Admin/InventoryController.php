<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category; // Make sure to import Category model if it's used directly or for relationships
use Inertia\Inertia;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $allProducts = Product::all();

        $totalInventoryValue = $allProducts->sum(function ($product) {
            return ($product->purchase_price ?? $product->price) * $product->stock;
        });

        $lowStockCount = $allProducts->where('stock', '>', 0)->where('stock', '<=', 10)->count();

        $outOfStockCount = $allProducts->where('stock', 0)->count();

        $products = Product::with(['category.parent', 'primaryImage'])
            ->orderBy('id', 'ASC')
            ->paginate($perPage);

        $categories = Category::with('parent')
            ->whereNotIn('category_name', ['Indoor', 'Outdoor'])
            ->orderBy('category_name')
            ->get();

        return Inertia::render('Admin/Inventory/Page', [
            'products' => $products,
            'categories' => $categories,
            'totalInventoryValue' => $totalInventoryValue,
            'lowStockCount' => $lowStockCount,
            'outOfStockCount' => $outOfStockCount,
        ]);
    }
}
