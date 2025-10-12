<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/login-2', function () {
//     return Inertia::render('Auth/Login-2');
// })->name('login-2');


require __DIR__.'/auth.php';

Route::get('/category', function () {
    return Inertia::render('Category/Index');
});

// Indoor Plants
Route::get('/Category/Indoor/{plant}', function ($plant) {
    return Inertia::render("Category/Indoor/" . ucfirst($plant));
})->where('plant', 'Succulent|Monstera|Cactus|Calathea|Spathithyllum');

// Outdoor Plants
Route::get('/Category/Outdoor/{plant}', function ($plant) {
    return Inertia::render("Category/Outdoor/" . ucfirst($plant));
})->where('plant', 'Palm|Aglaonema|Anthurium|Alocasia|Caladium');

Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');