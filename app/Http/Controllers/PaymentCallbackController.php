<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Notification;

class PaymentCallbackController extends Controller
{
    public function receive(Request $request)
    {
        // Set Midtrans Configuration
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        try {
            $notification = new Notification();

            $transactionStatus = $notification->transaction_status;
            $type = $notification->payment_type;
            $orderId = $notification->order_id;
            $fraud = $notification->fraud_status;

            // Find payment by invoice number (which we used as order_id in Midtrans)
            $payment = Payment::where('invoice_number', $orderId)->first();

            if (!$payment) {
                return response()->json(['message' => 'Payment not found'], 404);
            }

            $order = $payment->order;

            if ($transactionStatus == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        $payment->update(['status' => 'PENDING']);
                        $order->update(['payment_status' => 'AWAITING_PAYMENT']);
                    } else {
                        $payment->update(['status' => 'PAID', 'paid_at' => now()]);
                        $order->update(['payment_status' => 'PAID', 'delivery_status' => 'PROCESSING']);
                    }
                }
            } else if ($transactionStatus == 'settlement') {
                $payment->update(['status' => 'PAID', 'paid_at' => now()]);
                $order->update(['payment_status' => 'PAID', 'delivery_status' => 'PROCESSING']);
            } else if ($transactionStatus == 'pending') {
                $payment->update(['status' => 'PENDING']);
                $order->update(['payment_status' => 'AWAITING_PAYMENT']);
            } else if ($transactionStatus == 'deny') {
                $payment->update(['status' => 'FAILED']);
                $order->update(['payment_status' => 'FAILED']);
            } else if ($transactionStatus == 'expire') {
                $payment->update(['status' => 'EXPIRED']);
                $order->update(['payment_status' => 'EXPIRED']);
            } else if ($transactionStatus == 'cancel') {
                $payment->update(['status' => 'FAILED']);
                $order->update(['payment_status' => 'CANCELLED']);
            }

            // Save full response for debugging/audit
            $payment->update([
                'provider_response' => json_encode($notification->getResponse()),
                'transaction_id' => $notification->transaction_id,
                'payment_type' => $type
            ]);

            return response()->json(['message' => 'Notification processed completely']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to process notification: ' . $e->getMessage()], 500);
        }
    }
}
