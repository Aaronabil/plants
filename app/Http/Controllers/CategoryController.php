<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show(string $parent_slug, string $child_slug)
    {
        // 1. Cari kategori anak berdasarkan slug-nya
        // firstOrFail() akan otomatis menampilkan halaman 404 jika tidak ditemukan
        $category = Category::where('slug', $child_slug)->firstOrFail();

        // 2. Cari semua produk yang termasuk dalam kategori tersebut
        $products = Product::where('category_id', $category->id)->get();

        // 3. Kirim data kategori dan produk ke komponen React 'Category/Show'
        return Inertia::render('Category/Show', [
            'category' => $category,
            'products' => $products,
        ]);
    }
}