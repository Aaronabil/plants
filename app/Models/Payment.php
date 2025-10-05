<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'invoice_number',
        'amount',
        'payment_method',
        'payment_type',
        'status',
        'transaction_id',
        'redirect_url',
        'provider_response',
        'paid_at',
    ];
}