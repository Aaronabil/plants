import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function AccessDenied() {
    return (
        <GuestLayout>
            <Head title="Access Denied" />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        You do not have permission to access this page.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Go to Homepage
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
