<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::whereNotNull('parent_id')->with('parent')->get();

        $ourFavoriteProducts = Product::with('primaryImage', 'category')
            ->whereIn('id', [10, 2, 4, 20])
            ->get();

        return Inertia::render('Index', [
            'categories' => $categories,
            'ourFavoriteProducts' => $ourFavoriteProducts,
        ]);
    }
}