import { PageProps, Category, Product } from '@/types';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import HeroSection from "@/Components/HeroSection";
import WhyShopSection from '@/Components/WhyShop';
import FeaturedPlants from '@/Components/FeaturedPlant';
import OurFavoritePlants from '@/Components/OurFavoritePlants';
import PromoBanner from '@/Components/PromoBanner';
import Marquee3D from '@/Components/ReviewCustomer';


export default function Index(props: PageProps<{ 
    ourFavoriteProducts: Product[], 
    categories: Category[] 
}>) {
    const { auth, ourFavoriteProducts, categories } = props;

    return (
        <>
            {/* Title */}
            <Head title="Home" />
            <GuestLayout>
                <HeroSection />
                <WhyShopSection />
                <FeaturedPlants />
                <OurFavoritePlants products={ourFavoriteProducts} />
                <PromoBanner />
                <Marquee3D />
            </GuestLayout>
        </>
    );
}
