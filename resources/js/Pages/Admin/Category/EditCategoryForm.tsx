import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
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
import { Category } from './Columns';

interface EditCategoryFormProps {
    category: Category;
    parentCategories: Category[];
    onSuccess: () => void;
}

export default function EditCategoryForm({ category, parentCategories, onSuccess }: EditCategoryFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_name: category.category_name || '',
        slug: category.slug || '',
        parent_id: category.parent?.id?.toString() || '',
        description: category.description || '',
        image: null as File | null,
        _method: 'patch',
    });

    useEffect(() => {
        setData({
            category_name: category.category_name || '',
            slug: category.slug || '',
            parent_id: category.parent?.id?.toString() || '',
            description: category.description || '',
            image: null,
            _method: 'patch',
        });
    }, [category]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.category.update', { category: category.id }), {
            preserveScroll: true,
            onSuccess: () => {
                onSuccess();
                toast.success('Category updated successfully');
            },
            onError: (errors) => {
                toast.error(errors.error || 'Failed to update category');
                console.error("Error updating category:", errors);
            }
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
            <div>
                <Label htmlFor="parent_id">Parent Category</Label>
                <Select onValueChange={(value) => setData('parent_id', value)} value={data.parent_id}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a parent category" />
                    </SelectTrigger>
                    <SelectContent>
                        {parentCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.category_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="category_name">Category Name</Label>
                <Input
                    id="category_name"
                    name="category_name"
                    value={data.category_name}
                    onChange={(e) => setData('category_name', e.target.value)}
                    required
                />
                {errors.category_name && <p className="text-red-500 text-xs mt-1">{errors.category_name}</p>}
            </div>
            <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    name="slug"
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                    required
                />
                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="image">New Image</Label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                />
                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>
            <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    );
}
