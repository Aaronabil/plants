<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request) {
        $query = Product::with(['primaryImage', 'category']);
        $query->orderBy(
            match ($request->input('sort', 'latest')) {
                'price-asc' => 'price',
                'price-desc' => 'price',
                'name-asc' => 'product_name',
                'name-desc' => 'product_name',
                default => 'created_at',
            },
            match ($request->input('sort', 'latest')) {
                'price-desc', 'name-desc' => 'desc',
                default => 'asc',
            }
        );

        $categories = Category::whereNotNull('parent_id')
        ->with('parent')
        ->get();

        return Inertia::render('Shop/Index', [
            'products' => $query->paginate(10)->withQueryString(),
            'categories' => $categories,
            'filters' => $request->all(['sort']),
        ]);
    }
}