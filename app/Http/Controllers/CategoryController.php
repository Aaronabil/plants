<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $categories = Category::with('parent')
            ->whereNotIn('category_name', ['Indoor', 'Outdoor'])
            ->latest()
            ->paginate($perPage);

        $parentCategories = Category::whereIn('category_name', ['Indoor', 'Outdoor'])
            ->orderBy('category_name')
            ->get();

        return Inertia::render('Admin/Category/Page', [
            'categories' => $categories,
            'parentCategories' => $parentCategories,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        if (isset($input['parent_id']) && $input['parent_id'] === '') {
            $input['parent_id'] = null;
        }
        $request->replace($input);

        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories',
            'slug' => 'required|string|max:255|unique:categories',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/category', 'public');
            $imagePath = '/storage/' . $imagePath;
        }

        Category::create([
            'category_name' => $validated['category_name'],
            'slug' => $validated['slug'],
            'parent_id' => $validated['parent_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function show(string $parent_slug, string $child_slug)
    {
        $category = Category::where('slug', $child_slug)->firstOrFail();
        $products = Product::where('category_id', $category->id)
        ->with('primaryImage')
        ->paginate(10);

        return Inertia::render('Category/Show', [
            'category' => $category,
            'products' => $products,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories,category_name,' . $category->id,
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $category->image_url;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/category', 'public');
        }

        $category->update([
            'category_name' => $validated['category_name'],
            'slug' => $validated['slug'],
            'parent_id' => $validated['parent_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
