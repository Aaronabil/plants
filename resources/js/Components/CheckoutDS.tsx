import React, { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

interface Destination {
    id: number;
    label: string;
    province_name: string;
    city_name: string;
    district_name: string;
    subdistrict_name: string;
    zip_code: string;
}

interface ShippingResult {
    name: string;
    code: string;
    service: string;
    description: string;
    cost: number;
    etd: string;
}

interface ApiResponse<T> {
    meta: {
        message: string;
        code: number;
        status: string;
    };
    data: T;
}

export default function DirectSearch() {
    // const [originSearch, setOriginSearch] = useState('');
    const [destSearch, setDestSearch] = useState('');
    const [originResults, setOriginResults] = useState<Destination[]>([]);
    const [destResults, setDestResults] = useState<Destination[]>([]);
    const [selectedOrigin, setSelectedOrigin] = useState<Destination | null>(null);
    const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
    const [weight, setWeight] = useState('1000');
    const [courier, setCourier] = useState('jne:sicepat:jnt');

    // const [showOriginDropdown, setShowOriginDropdown] = useState(false);
    const staticOrigin: Destination = {
        id: 6175, // Replace with your actual origin ID
        label: "Tangerang",
        province_name: "Banten",
        city_name: "Tangerang",
        district_name: "Curug",
        subdistrict_name: "Curug Kulon",
        zip_code: "15810"
    };
    const [showDestDropdown, setShowDestDropdown] = useState(false);
    const [searching, setSearching] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [results, setResults] = useState<ShippingResult[]>([]);
    const [error, setError] = useState('');

    // Debounce search for destination
    useEffect(() => {
        if (destSearch.length < 2) {
            setDestResults([]);
            return;
        }

        const timer = setTimeout(() => {
            searchDestinationAddress(destSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [destSearch]);

    const searchDestinationAddress = async (query: string) => {
        try {
            setSearching(true);
            const response = await axios.get<ApiResponse<Destination[]>>('/rajaongkir/search/destinations', {
                params: {
                    search: query,
                    limit: 50
                }
            });

            if (response.data.meta.status === 'success') {
                setDestResults(response.data.data || []);
                setShowDestDropdown(true);
            }
        } catch (err) {
            console.error('Search destination failed:', err);
            setDestResults([]);
        } finally {
            setSearching(false);
        }
    };

    // Move handleCalculate logic to a separate function
    const calculateShipping = useCallback(async () => {
        if (!selectedDest || !weight) {
            setError('Please select destination and enter weight');
            return;
        }

        try {
            setCalculating(true);
            setError('');
            const response = await axios.post<ApiResponse<ShippingResult[]>>('/rajaongkir/search/calculate-cost', {
                origin: staticOrigin.id,
                destination: selectedDest.id,
                weight: parseInt(weight),
                courier: courier,
                price: 'lowest'
            });

            if (response.data.meta.status === 'success') {
                setResults(response.data.data);
            } else {
                setError(response.data.meta.message);
            }
        } catch (err: any) {
            setError(err.response?.data?.meta?.message || 'Failed to calculate shipping cost');
        } finally {
            setCalculating(false);
        }
    }, [selectedDest, weight, courier]);

    // Add useEffect to trigger calculation when destination changes
    useEffect(() => {
        if (selectedDest) {
            calculateShipping();
        }
    }, [selectedDest, weight]); // Will recalculate when destination or weight changes

    // Modify handleSelectDest
    const handleSelectDest = (destination: Destination) => {
        setSelectedDest(destination);
        setDestSearch(destination.label);
        setShowDestDropdown(false);
        setDestResults([]);
        // Calculation will be triggered by useEffect
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ?
                <span key={index} className="bg-yellow-200 font-semibold">{part}</span> : part
        );
    };

    return (
        <>
            <Head title="Shipping Calculator - Direct Search" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Shipping Calculator</h1>
                        <p className="mt-2 text-sm text-gray-600">Direct Search Method - Search by city, district, subdistrict, or postal code</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
                            {/* Origin Section */}
                            <div className="border-b pb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Origin Address</h2>
                                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                    <div>
                                        <p className="text-sm font-medium text-green-900">Store Location:</p>
                                        <p className="text-sm text-green-700">{staticOrigin.label}</p>
                                        <p className="text-xs text-green-600 mt-1">
                                            {staticOrigin.subdistrict_name}, {staticOrigin.district_name}, {staticOrigin.city_name}, {staticOrigin.province_name} {staticOrigin.zip_code && ` - ${staticOrigin.zip_code}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Destination Section */}
                            <div className="border-b pb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Destination Address</h2>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Destination
                                    </label>
                                    <input
                                        type="text"
                                        value={destSearch}
                                        onChange={(e) => {
                                            setDestSearch(e.target.value);
                                            setSelectedDest(null);
                                        }}
                                        onFocus={() => destResults.length > 0 && setShowDestDropdown(true)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Type city, district, or postal code..."
                                    />

                                    {showDestDropdown && destResults.length > 0 && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {destResults.map((dest) => (
                                                <div
                                                    key={dest.id}
                                                    onClick={() => handleSelectDest(dest)}
                                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="font-medium text-gray-900">
                                                        {highlightText(dest.label, destSearch)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {dest.subdistrict_name && `${dest.subdistrict_name}, `}
                                                        {dest.district_name}, {dest.city_name}, {dest.province_name}
                                                        {dest.zip_code && ` - ${dest.zip_code}`}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {selectedDest && (
                                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-green-900">Selected:</p>
                                                    <p className="text-sm text-green-700">{selectedDest.label}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDest(null);
                                                        setDestSearch('');
                                                    }}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Package Details */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weight (grams)
                                        </label>
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div>
                                        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Courier
                                        </label> */}
                                        <input
                                            type="hidden"
                                            value={courier}
                                            onChange={(e) => setCourier(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="jne:sicepat:jnt"
                                            required
                                        />
                                        {/* <p className="mt-1 text-xs text-gray-500">
                                            Separate multiple couriers with colon (:)
                                        </p> */}
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}

                            {calculating && (
                                <div className="w-full text-center py-3 text-gray-500">
                                    Calculating shipping costs...
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Results */}
                    {results.length > 0 && (
                        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Options</h2>
                            <div className="space-y-3">
                                {results.map((result, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold text-gray-900">{result.name}</span>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                                        {result.service}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                                                {result.etd && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Estimated: {result.etd}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-xl font-bold text-gray-900">
                                                    {formatCurrency(result.cost)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}