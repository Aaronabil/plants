
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import Header from '@/Pages/Layouts/Header';
import HeroSection from "@/Components/HeroSection";
import FooterSection from './Layouts/Footer';
import WhyShopSection from '@/Components/WhyShop';
import FeaturedPlants from '@/Components/FeaturedPlant';
import OurFavoritePlants from '@/Components/OurFavoritePlants';
import PromoBanner from '@/Components/PromoBanner';
import Marquee3D from '@/Components/ReviewCustomer';

export default function Home({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (    
        <>
            {/* Title */}
            <Head title="Home" />
            <Header />
            <HeroSection />
            <WhyShopSection/>
            <FeaturedPlants />
            <OurFavoritePlants />
            <PromoBanner />
            <Marquee3D />
            <FooterSection />
        </>
    );
}
