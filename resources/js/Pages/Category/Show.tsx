import { Head, Link } from '@inertiajs/react';
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

export default function Show({ category, products }: PageProps<{ category: Category, products: Product[] }>) {
    return (
        <>
            <Head title={category.category_name} />
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
                                            <BreadcrumbLink asChild>
                                                <Link href="/shop">Shop</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <SlashIcon />
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="text-green-600">{category.category_name}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <h1 className="text-5xl font-bold mb-4 text-green-700">{category.category_name}</h1>
                            <p className="text-lg text-gray-600">
                                {category.description || 'Deskripsi untuk kategori ini belum tersedia.'}
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            {category.image_url ? (
                                <img
                                    src={category.image_url}
                                    alt={category.category_name}
                                    className="rounded-lg object-cover w-full max-w-md h-auto"
                                />
                            ) : (
                                <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400">Gambar tidak tersedia</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="my-12" />

                    <h2 className="text-3xl font-bold mb-1 text-center">Bring Life to Every Corner of the Room</h2>
                    <p className="text-sm text-gray-600 text-center mb-5">Discover a curated collection of plants that will transform your space into something more vibrant, fresh, and full of positive energy.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.data.length > 0 ? (
                            products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    categoryName={category.parent ? category.parent.category_name : category.category_name}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                <img src="/images/category/jerapah.png" className="h-60 w-60 block mx-auto" alt="" />
                                No products were found in this category.
                            </p>
                        )}
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}
