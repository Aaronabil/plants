import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Header from '@/Pages/Layouts/Header';
import FooterSection from '@/Pages/Layouts/Footer';
import { Toaster } from "sonner";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow">
                {children}
                <Toaster richColors position="top-center" />
            </main>

            <FooterSection />
        </div>
    );
}
