<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request){
        $perPage = $request->input('per_page', 20);

        $products = Product::with(['category.parent', 'primaryImage'])
            ->latest()
            ->paginate($perPage);

        return Inertia::render('Admin/Product/Page', [
            'products' => $products
        ]);
    }


    public function show(Product $product){
        $product->load('images', 'category.parent');

        $rootCategory = $product->category->parent ?? $product->category;

        $relatedProducts = Product::whereHas('category', function ($query) use ($rootCategory) {
            $query->where('parent_id', $rootCategory->id);
        })
            ->where('id', '!=', $product->id)
            ->with(['primaryImage', 'category'])
            ->inRandomOrder()
            ->limit(20)
            ->get();

        return Inertia::render('Product/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
