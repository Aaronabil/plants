import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Header from '@/Pages/Layouts/Header';
import FooterSection from '@/Pages/Layouts/Footer';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow">
                {children}
            </main>

            <FooterSection />
        </div>
    );
}
