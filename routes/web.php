<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Auth\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Index', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


// Route User
Route::get('/', [HomeController::class, 'index'])->name('home');
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::post('/cart/destroy-multiple', [CartController::class, 'destroyMultiple'])->name('cart.destroy-multiple');
});
require __DIR__.'/auth.php';
Route::get('/category', function () {
    return Inertia::render('Category/Index');
});
Route::get('/category/{parent_slug}/{child_slug}', [CategoryController::class, 'show'])
    ->name('category.show');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/product/{product:slug}', [ProductController::class, 'show'])->name('product.show');
Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');
Route::get('/checkout', function () {
    return Inertia::render('Checkout/Show');
})->name('checkout');

Route::get('/access-denied', function () {
    return Inertia::render('AccessDenied');
})->name('access-denied');


// Route Admin
Route::prefix('admin')->group(function () {
    Route::get('login', [AdminController::class, 'create'])->name('admin.login');
    Route::post('login', [AdminController::class, 'store']);
    Route::post('logout', [AdminController::class, 'destroy'])->name('admin.logout');

    Route::middleware(['auth:admin'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('Admin/Dashboard/Page');
        })->name('admin.dashboard');
        Route::get('category', [CategoryController::class, 'index'])->name('admin.category');
        Route::post('category/store', [CategoryController::class, 'store'])->name('admin.category.store');
        Route::patch('category/{category}', [CategoryController::class, 'update'])->name('admin.category.update');
        Route::delete('category/{category}', [CategoryController::class, 'destroy'])->name('admin.category.destroy');
        Route::get('product', [ProductController::class, 'index'])->name('admin.product');
        Route::post('product/store', [ProductController::class, 'store'])->name('admin.product.store');
        Route::patch('product/{product}', [ProductController::class, 'update'])->name('admin.product.update');
        Route::delete('product/{product}', [ProductController::class, 'destroy'])->name('admin.product.destroy');
        Route::get('inventory', function () {
            return Inertia::render('Admin/Inventory/Page');
        })->name('admin.inventory');
        Route::get('customer', function () {
            return Inertia::render('Admin/Customer/Page');
        })->name('admin.customer');
        Route::get('recent', function () {
            return Inertia::render('Admin/Recent/Page');
        })->name('admin.recent');
        Route::get('orders', function () {
            return Inertia::render('Admin/Orders/Page');
        })->name('admin.orders');
        Route::get('profile', function () { 
            return Inertia::render('Admin/Profile/Edit');
        })->name('admin.profile.edit');
    });
});
