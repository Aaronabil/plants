import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <>
            <Head title="Page Not Found" />
            <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
                <img src="/images/404.png" alt="404 Not Found" className="absolute inset-0 w-full h-full object-cover z-0" />
                <div className="absolute inset-0 bg-white/10 lg:bg-black/20"></div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="relative z-10 text-center bg-opacity-80 ">
                    <h1 className="text-4xl font-bold text-white mb-4">The page you were looking for doesn't exist</h1>
                    <Link href="/">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-medium shadow-md transition">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
