import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Pages/Layouts/Header';
import { SlashIcon } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"

// Mendefinisikan tipe data untuk props yang dikirim dari Controller
interface Category {
    id: number;
    category_name: string;
    description?: string;
    image_url?: string;
}

interface Product {
    id: number;
    product_name: string;
    description: string;
    price: string;
    stock: number;
    weight_in_kilograms: number;
}

export default function Show({ category, products }: PageProps<{ category: Category, products: Product[] }>) {
    return (
        <>
            <Header />
            <Head title={category.category_name} />
            {/* <div className="container mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold mb-6">{category.category_name}</h1>
                <div className="">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold truncate">{product.product_name}</h2>
                                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                                        Rp {Number(product.price).toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-lg truncate">{product.description}</p>
                                    <p className="text-sm text-gray-500 mt-1">Stok: {product.stock}</p>
                                    <p className="text-sm text-gray-500">Berat: {product.weight_in_kilograms} kg</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-gray-500">
                            Tidak ada produk yang ditemukan di kategori ini.
                        </p>
                    )}
                </div>
            </div> */}
            <Head title={category.category_name} />

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
                                        <BreadcrumbPage>Indoor - {category.category_name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <h1 className="text-5xl font-bold mb-4">{category.category_name}</h1>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold truncate">{product.product_name}</h2>
                                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                                        Rp {Number(product.price).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-gray-500">
                            Tidak ada produk yang ditemukan di kategori ini.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}