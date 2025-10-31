import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Product } from '@/types';
import ProductCard from '@/Components/ProductCard';
import { NumberField, NumberFieldScrubArea } from "@/Components/ui/base-number-field";
import { useState } from "react";
import { Badge } from "@/Components/ui/badge"
import ReviewSection from '@/Components/ReviewSection';
import { toast } from "sonner"

export default function Show({ product, auth, relatedProducts }: PageProps<{ product: Product, relatedProducts: Product[] }>) {
    const mainImage = product.images.find(img => img.is_primary) || product.images[0];
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['cart'] });
                toast.success("The plant has gone into the basket", {
                    description: `${product.product_name} has been added to cart.`,
                    duration: 3000,
                });
            },
            onError: (errors) => {
                toast.error("Failed to add to basket.", {
                    description: Object.values(errors).join('\n'),
                });
            }
        });
    };

    return (
        <GuestLayout>
            <Head title={product.product_name} />
            <section className="max-w-6xl mx-auto py-16 px-6 lg:px-12 grid md:grid-cols-2 gap-10 items-start">
                {/* Left - Image */}
                <div className="aspect-squarer rounded-lg bg-card shadow-sm overflow-hidden">
                    <img
                        src={mainImage?.image_url || 'https://via.placeholder.com/600'}
                        alt={product.product_name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                </div>

                {/* Right - Info */}
                <div>
                    <p className="text-green-700 font-medium text-sm mb-2">
                        {product.category?.parent?.category_name} / {product.category?.category_name}
                    </p>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {product.product_name}
                        </h1>
                        {product.stock > 0 && (
                            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                                In Stock
                            </Badge>
                        )}
                        {product.stock <= 0 && (
                            <Badge variant="destructive">Out of Stock</Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <p className="text-2xl font-semibold text-green-700">
                            Rp{Number(product.price).toLocaleString('id-ID')}
                        </p>
                    </div>

                    <p className="text-gray-600 mb-6">{product.detail_description}</p>

                    <div className="space-y-2 mt-6">
                        <div>
                            <p className="text-gray-700 font-medium text-sm">Stock</p>
                            <p className="text-gray-600">
                                {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium text-sm">Weight</p>
                            <p className="text-gray-600">
                                {product.weight_in_kilograms} kg
                            </p>
                        </div>
                    </div>

                    {/* Product Options */}
                    <div className="space-y-4 mt-2">
                        {/* Plant Size */}
                        <div>
                            <p className="text-gray-700 font-medium text-sm mb-2">Plant Size</p>
                            <div className="flex gap-3">
                                <button className="px-3 py-1.5 rounded-full border border-yellow-400 bg-yellow-400 text-black font-medium text-sm cursor-default">
                                    Medium
                                </button>
                            </div>
                        </div>

                        {/* Pot Material */}
                        <div>
                            <p className="text-gray-700 font-medium text-sm mb-2">Pot Material</p>
                            <div className="flex gap-3">
                                <button className="px-3 py-1.5 rounded-full border border-yellow-400 bg-yellow-400 text-black font-medium text-sm cursor-default">
                                    Ceramic
                                </button>
                            </div>
                        </div>

                        {/* Pot Color */}
                        <div>
                            <p className="text-gray-700 font-medium text-sm mb-2">
                                Pot Color: <span className="text-gray-500 text-sm">White</span>
                            </p>
                            <div className="flex gap-3">
                                <button
                                    className="w-5 h-5 rounded-full border border-gray-300 bg-white cursor-default shadow-sm"
                                    aria-label="White"
                                ></button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <NumberField
                            className="w-120"
                            value={quantity}
                            onValueChange={(value: number | null) => setQuantity(value || 1)}
                            min={1}
                            max={100}
                        >
                            <NumberFieldScrubArea />
                        </NumberField>


                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="flex-1 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition">
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button className="flex-1 border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 transition">
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Description Section */}
                <div className="md:col-span-2 mt-12 text-gray-700 leading-relaxed space-y-8">
                    {/* Description */}
                    <div>
                        <h1 className="text-2xl font-semibold text-green-700 mb-3 text-center">
                            Description
                        </h1>
                        <hr className="mb-2" />
                        <p>
                            {product.description}
                        </p>
                    </div>

                    {/* Review Section */}
                    <div>
                        <h1 className="text-2xl font-semibold text-green-700 mb-3 text-center ">
                            Review
                        </h1>
                        <hr className="mb-2" />
                        <ReviewSection />
                    </div>
                </div>

            </section>
            <section className="max-w-6xl mx-auto py-16 px-6 lg:px-12">
                <h3 className=" text-center text-gray-600 mb-2">Related Plants</h3>
                <h1 className="text-3xl font-bold text-center">Explore <span className="text-green-700">Related Plants</span></h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
                    {relatedProducts.map((relatedProduct) => (
                        <ProductCard
                            key={relatedProduct.id}
                            product={relatedProduct}
                            categoryName={relatedProduct.category?.category_name || 'Uncategorized'}
                        />
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
