<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ShippingController extends Controller
{
    public function calculateCost(Request $request)
    {
        $validated = $request->validate([
            'origin_district_id' => 'required|integer',
            'destination_district_id' => 'required|integer',
            'weight' => 'required|integer|min:1', 
            'courier' => 'required|string', 
        ]);

        $apiKey = config('rajaongkir.api_key');
        $baseUrl = config('rajaongkir.base_url');

        $response = Http::withHeaders([
            'key' => $apiKey 
        ])
        ->asForm()
        ->post("{$baseUrl}/calculate/district/domestic-cost", [
            'origin' => $validated['origin_district_id'],
            'destination' => $validated['destination_district_id'],
            'weight' => $validated['weight'],
            'courier' => $validated['courier'],
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to calculate cost'], 500);
        }
        
        return $response->json();
    }
}
