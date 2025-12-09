<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class RajaongkirController extends Controller
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.rajaongkir.key');
        $this->baseUrl = 'https://rajaongkir.komerce.id/api/v1';
    }
    /**
     * Direct Search Method: Search Destinations
     */
    public function searchDestinations(Request $request)
    {
        $request->validate([
            'search' => 'required|string|min:2',
            'limit' => 'nullable|integer|max:999',
            'offset' => 'nullable|integer'
        ]);

        $search = $request->input('search');
        $limit = $request->input('limit', 50);
        $offset = $request->input('offset', 0);

        $cacheKey = "rajaongkir_destinations_{$search}_{$limit}_{$offset}";

        try {
            $cachedResult = Cache::get($cacheKey);

            if ($cachedResult) {
                return response()->json($cachedResult);
            }

            $response = Http::withHeaders([
                'Key' => $this->apiKey,
            ])->get("{$this->baseUrl}/destination/domestic-destination", [
                'search' => $search,
                'limit' => $limit,
                'offset' => $offset
            ]);

            if ($response->successful()) {
                $data = $response->json();
                Cache::put($cacheKey, $data, now()->addMinutes(60)); // Cache for 60 minutes
                return response()->json($data);
            }

            return response()->json([
                'meta' => [
                    'message' => 'Failed to search destinations',
                    'code' => $response->status(),
                    'status' => 'error'
                ],
                'data' => null
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('RajaOngkir Search Destinations Error: ' . $e->getMessage());
            return response()->json([
                'meta' => [
                    'message' => 'Server error',
                    'code' => 500,
                    'status' => 'error'
                ],
                'data' => null
            ], 500);
        }
    }

    /**
     * Direct Search Method: Calculate Shipping Cost
     */
    public function calculateDirectCost(Request $request)
    {
        $request->validate([
            'origin' => 'required|integer',
            'destination' => 'required|integer',
            'weight' => 'required|integer|min:1',
            'courier' => 'required|string',
            'price' => 'nullable|in:lowest,highest'
        ]);

        $origin = $request->input('origin');
        $destination = $request->input('destination');
        $weight = $request->input('weight');
        $courier = $request->input('courier');
        $price = $request->input('price', 'lowest');

        $cacheKey = "rajaongkir_cost_{$origin}_{$destination}_{$weight}_{$courier}_{$price}";


        try {
            $cachedResult = Cache::get($cacheKey);

            if ($cachedResult) {
                return response()->json($cachedResult);
            }

            $response = Http::withHeaders([
                'Key' => $this->apiKey,
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->asForm()->post("{$this->baseUrl}/calculate/domestic-cost", [
                'origin' => $origin,
                'destination' => $destination,
                'weight' => $weight,
                'courier' => $courier,
                'price' => $price
            ]);

            if ($response->successful()) {
                $data = $response->json();
                Cache::put($cacheKey, $data, now()->addMinutes(60)); // Cache for 60 minutes
                return response()->json($data);
            }

            return response()->json([
                'meta' => [
                    'message' => 'Failed to calculate shipping cost',
                    'code' => $response->status(),
                    'status' => 'error'
                ],
                'data' => null
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('RajaOngkir Calculate Direct Cost Error: ' . $e->getMessage());
            return response()->json([
                'meta' => [
                    'message' => 'Server error',
                    'code' => 500,
                    'status' => 'error'
                ],
                'data' => null
            ], 500);
        }
    }
}
