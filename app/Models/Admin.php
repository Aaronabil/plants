<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Tentukan guard yang digunakan model ini (opsional tapi baik)
     *
     * @var string
     */
    protected $guard = 'admin';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Atribut yang harus disembunyikan.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Atribut yang harus di-cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime', 
        'password' => 'hashed',
    ];
}