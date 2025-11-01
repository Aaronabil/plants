import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Header from '@/Pages/Layouts/Header';
import FooterSection from '@/Pages/Layouts/Footer';
import { Toaster } from "sonner";

interface GuestProps extends PropsWithChildren {
    hideFooter?: boolean;
}

export default function Guest({ children, hideFooter = false }: GuestProps) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow">
                {children}
                <Toaster richColors position="top-center" />
            </main>

            {!hideFooter && <FooterSection />}
        </div>
    );
}
