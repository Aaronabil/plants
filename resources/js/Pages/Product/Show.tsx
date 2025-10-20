import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { PageProps, Product } from '@/types';
import { Button } from '@/components/ui/button';
import DetailCart from '@/Components/DetailProduct';

export default function Show({ product }: PageProps<{ product: Product }>) {
    const mainImage = product.images.find(img => img.is_primary) || product.images[0];

    return (
        <GuestLayout>
            <Head title={product.product_name} />

            {/* <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <img
                            src={mainImage?.image_url || 'https://via.placeholder.com/600'}
                            alt={product.product_name}
                            className="w-full rounded-lg shadow-lg aspect-square object-cover"
                        />
                    </div>

                    <div>
                        <span>{product.category.parent.category_name} / {product.category?.category_name}</span>
                        <h1 className="text-4xl font-bold tracking-tight text-primary">{product.product_name}</h1>
                        <p className="text-3xl font-semibold my-4">
                            Rp{Number(product.price).toLocaleString('id-ID')}
                        </p>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium">Stock</h3>
                            <p className="text-gray-600">{product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium">Description</h3>
                            <p className="text-gray-600 leading-relaxed mt-2">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium">Weight</h3>
                            <p className="text-gray-600 leading-relaxed mt-2">
                                {product.weight_in_kilograms} kg
                            </p>
                        </div>

                        <Button className="mt-8 w-full" size="lg" disabled={product.stock === 0}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div> */}
        <DetailCart />
        </GuestLayout>
    );
}