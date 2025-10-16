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
    // 2. Tambahkan console.log di sini untuk melihat semua data yang masuk
    console.log("Data yang diterima dari Laravel:", props);

    // 3. Ambil variabel yang Anda butuhkan dari props
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
