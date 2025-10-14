import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Category, Product } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';
import { SlashIcon } from "lucide-react"
import ProductCard from '@/Components/ProductCard';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import CategoryCarousel from '@/Components/CategoryCarousel';
import ShadcnPagination from '@/Components/Pagination';

type ShopIndexProps = {
    products: {
        data: Product[];
        total: number;
        links: any[];
    };
    categories: Category[];
    filters: {
        sort?: string;
    };
};

export default function Index({ products, categories, filters }: PageProps<ShopIndexProps>) {
    const [sortBy, setSortBy] = useState(filters?.sort || 'latest');
    const sortOptions = [
        { value: 'latest', label: 'Latest' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A-Z' },
        { value: 'name-desc', label: 'Name: Z-A' },
    ];
    useEffect(() => {
        if (sortBy !== (filters?.sort || 'latest')) {
            router.get(route('shop'), { sort: sortBy }, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }
    }, [sortBy]);
    return (
        <>
            <Head title="Shop" />
            <GuestLayout >
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                        <div>
                            <div className="text-sm text-gray-500 mb-2">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href="/">Home</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <SlashIcon />
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="text-green-600">Shop</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <h1 className="text-5xl font-bold mb-4 text-green-700">All Products</h1>
                            <p className="text-lg text-gray-600">
                                Bring nature closer with simple gardening—grow flowers, herbs, or greens and enjoy peace, color, and fresh air every day. Gardening isn't just a hobby, it's therapy. Nurture plants, reduce stress, and create your own green sanctuary.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-end">

                            <img
                                src="/images/category/all.jpg"
                                alt="all"
                                className="rounded-lg object-cover w-full max-w-md h-auto"
                            />
                            {/* <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">Gambar tidak tersedia</span>
                        </div> */}
                        </div>
                    </div>
                    <hr className="my-12" />

                    <h2 className="text-3xl font-bold mb-1 text-center">Beauty, <span className="text-green-700">Your</span> <span className="text-green-600">Way</span></h2>
                    <p className="text-sm text-gray-600 text-center mb-12">Whether you're keeping it natural or going full glam, find your perfect match in every category.</p>
                    <div className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto mb-12">
                        <CategoryCarousel categories={categories} />
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <div className="text-sm text-gray-600">
                            <span className="font-bold">{products.total}</span> products found
                        </div>
                        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <h2 className="text-2xl font-bold mb-8 text-center">Our Collection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                        {products.data.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                categoryName={product.category?.category_name || 'Uncategorized'}
                            />
                        ))}
                        <ShadcnPagination links={products.links} />
                    </div>
                </div>
            </GuestLayout >
        </>
    );
}