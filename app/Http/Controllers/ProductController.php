<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $products = Product::with(['category.parent', 'primaryImage'])
            ->orderBy('id', 'ASC')
            ->paginate($perPage);

        $categories = Category::with('parent')
            ->whereNotIn('category_name', ['Indoor', 'Outdoor'])
            ->orderBy('category_name')
            ->get();

        return Inertia::render('Admin/Product/Page', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255|unique:products',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'detail_description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'weight_in_kilograms' => 'required|numeric|min:0',
            'images' => 'required|array|min:1',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $product = Product::create([
            'product_name' => $validated['product_name'],
            'slug' => Str::slug($validated['product_name']),
            'category_id' => $validated['category_id'],
            'description' => $validated['description'],
            'detail_description' => $validated['detail_description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'weight_in_kilograms' => $validated['weight_in_kilograms'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('images/product', 'public');
                $imageUrl = '/storage/' . $path;

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $imageUrl,
                    'is_primary' => $index == 0, 
                ]);
            }
        }

        return redirect()->back()->with('success', 'Product created successfully');
    }

    public function show(Product $product)
    {
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

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255|unique:products,product_name,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'detail_description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'weight_in_kilograms' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $product->update([
            'product_name' => $validated['product_name'],
            'slug' => Str::slug($validated['product_name']),
            'category_id' => $validated['category_id'],
            'description' => $validated['description'],
            'detail_description' => $validated['detail_description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'weight_in_kilograms' => $validated['weight_in_kilograms'],
        ]);

        if ($request->hasFile('images')) {
            // Delete old images if necessary (optional, depending on desired behavior)
            // $product->images()->delete();

            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('images/product', 'public');
                $imageUrl = '/storage/' . $path;

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $imageUrl,
                    'is_primary' => $index == 0,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->forceDelete();

        return redirect()->back()->with('success', 'Product deleted permanently.');
    }
}
