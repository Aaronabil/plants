<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('invoice', 100)->unique();
            $table->decimal('total_amount', 15, 2);
            $table->enum('shipping_type', ['DELIVERY', 'PICKUP'])->default('DELIVERY');
            $table->decimal('shipping_fee', 15, 2)->default(0);
            $table->text('shipping_address')->nullable();
            $table->enum('payment_status', ['AWAITING_PAYMENT', 'PAID', 'FAILED', 'CANCELLED', 'EXPIRED'])->default('AWAITING_PAYMENT');
            $table->enum('delivery_status', ['PROCESSING', 'SHIPPING', 'DELIVERED', 'COMPLETED'])->default('PROCESSING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
