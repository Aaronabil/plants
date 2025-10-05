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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('invoice_number', 100);
            $table->decimal('amount', 15, 2);
            $table->enum('payment_method', ['MIDTRANS', 'COD']);
            $table->string('payment_type', 50)->nullable(); // e.g., 'gopay', 'bca_va'
            $table->enum('status', ['PENDING', 'PAID', 'FAILED', 'EXPIRED'])->default('PENDING');
            $table->string('transaction_id')->nullable()->unique(); // ID dari payment gateway
            $table->text('redirect_url')->nullable(); // URL pembayaran dari payment gateway
            $table->json('provider_response')->nullable(); // Untuk menyimpan response lengkap dari gateway
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
