<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'invoice',
        'total_amount',
        'shipping_type',
        'shipping_fee',
        'shipping_address',
        'payment_status',
        'delivery_status',
    ];
}