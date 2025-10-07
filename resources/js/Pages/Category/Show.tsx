import GuestLayout from '@/Layouts/GuestLayout'; // Pastikan nama Layout Anda benar
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Pages/Layouts/Header';

// Mendefinisikan tipe data untuk props yang dikirim dari Controller
interface Category {
    id: number;
    category_name: string;
    // tambahkan slug jika Anda mengirimnya dari controller
}

interface Product {
    id: number;
    product_name: string;
    description: string;
    price: string;
    stock: number;
    weight_in_kilograms: number;
}

// Komponen ini akan menerima props 'category' dan 'products' dari CategoryController
export default function Show({ category, products }: PageProps<{ category: Category, products: Product[] }>) {
    return (
        <>
            <Header />
            <GuestLayout>
                {/* Mengatur judul tab browser secara dinamis */}
                <Head title={category.category_name} />

                <div className="container mx-auto py-12 px-4">
                    {/* Judul Halaman Dinamis */}
                    <h1 className="text-4xl font-bold mb-6">{category.category_name}</h1>

                    {/* Grid untuk Daftar Produk */}
                    <div className="">
                        {/* Logika untuk menampilkan produk jika ada */}
                        {products.length > 0 ? (
                            products.map((product) => (
                                // Card untuk setiap produk
                                <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    {/* Anda bisa tambahkan gambar di sini nanti */}
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
                            // Pesan jika tidak ada produk dalam kategori ini
                            <p className="col-span-full text-gray-500">
                                Tidak ada produk yang ditemukan di kategori ini.
                            </p>
                        )}
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}