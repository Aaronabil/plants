<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        $product->load('images', 'category.parent');
        
        return Inertia::render('Product/Show', [
            'product' => $product
        ]);
    }
}