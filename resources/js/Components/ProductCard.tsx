import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    categoryName: string;
}

export default function ProductCard({ product, categoryName }: ProductCardProps) {
    const imageUrl = product.primary_image?.image_url || '/images/hero/halo.jpg';

    return (
        <div className="group">
            <Link href={`/product/${product.slug}`}>
                <div className="overflow-hidden rounded-lg bg-card shadow-sm transition-shadow hover:shadow-md">
                    <div className="aspect-square">
                        <img
                            src={imageUrl}
                            alt={product.product_name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{categoryName}</span>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">4.9</span>
                        </div>
                    </div>
                    <h3 className="font-semibold text-lg truncate">{product.product_name}</h3>
                    <p className="font-bold text-lg">
                        Rp{Number(product.price).toLocaleString('id-ID')}
                    </p>
                </div>
            </Link>
        </div>
    );
}