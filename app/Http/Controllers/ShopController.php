<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index() {
        $products = Product::with(['primaryImage', 'category'])->latest()->get();
        $categories = Category::whereNotNull('parent_id')
        ->with('parent')
        ->get();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}