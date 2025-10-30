import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from "sonner";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Category } from '../Category/Columns';

interface CreateProductFormProps {
    categories: Category[];
    onSuccess: () => void;
}

export default function CreateProductForm({ categories, onSuccess }: CreateProductFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_name: '',
        slug: '',
        category_id: '',
        description: '',
        detail_description: '',
        price: '',
        stock: '',
        weight_in_kilograms: '',
        images: [] as File[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.product.store'), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                onSuccess();
                toast.success('Category created successfully');
            },
            onError: (errors) => {
                toast.error(errors.error || 'Failed to create category');
                console.error("Error saving category:", errors);
            }
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
            <div>
                <Label htmlFor="category_id">Category</Label>
                <Select onValueChange={(value) => setData('category_id', value)} value={data.category_id}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.parent?.category_name} - {category.category_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
            </div>

            <div>
                <Label htmlFor="product_name">Product Name</Label>
                <Input
                    id="product_name"
                    value={data.product_name}
                    onChange={(e) => setData('product_name', e.target.value)}
                    required
                />
                {errors.product_name && <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>}
            </div>

            <div>
                <Label htmlFor="price">Price (Rp)</Label>
                <Input
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    required
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                    id="stock"
                    type="number"
                    value={data.stock}
                    onChange={(e) => setData('stock', e.target.value)}
                    required
                />
                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
            </div>

            <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={data.weight_in_kilograms}
                    onChange={(e) => setData('weight_in_kilograms', e.target.value)}
                    required
                />
                {errors.weight_in_kilograms && (
                    <p className="text-red-500 text-xs mt-1">{errors.weight_in_kilograms}</p>
                )}
            </div>

            <div>
                <Label htmlFor="detail_description">Short Description</Label>
                <Textarea
                    id="detail_description"
                    value={data.detail_description}
                    onChange={(e) => setData('detail_description', e.target.value)}
                    required
                />
                {errors.detail_description && <p className="text-red-500 text-xs mt-1">{errors.detail_description}</p>}
            </div>

            <div>
                <Label htmlFor="description">Detail Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
            </div>

            <div>
                <Label htmlFor="images">Product Images</Label>
                <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setData('images', e.target.files ? Array.from(e.target.files) : [])}
                />
                {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
            </div>

            <Button type="submit" disabled={processing}>
                {processing ? 'Creating...' : 'Create Product'}
            </Button>
        </form>
    );
}
