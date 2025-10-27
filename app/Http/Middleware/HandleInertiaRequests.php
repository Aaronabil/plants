<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $categories = Category::query()
            ->whereNull('parent_id')
            ->with('children')
            ->get();
            
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'navigationCategories' => $categories,
            'cart' => fn () => $request->user()
                ? CartItem::where('user_id', $request->user()->id)->with([
                    'product' => function ($query) {
                        $query->select('id', 'product_name', 'price', 'slug');
                    },
                    'product.images' => function ($query) {
                        $query->where('is_primary', true);
                    }
                ])->get()
                : null,
        ];
    }
}
