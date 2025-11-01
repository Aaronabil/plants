import { Head, router } from '@inertiajs/react';
import { columns } from './Columns';
import { DataTable } from './DataTable';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { toast } from 'sonner';
import CreateProductForm from './CreateProductForm';
import EditProductForm from './EditProductForm';
import DeleteProductModal from './DeleteProductModal';
import { Category } from '../Category/Columns';
import { Product } from '@/types';

interface PageProps {
    products: {
        data: Product[];
        current_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
}

export default function PageProduct({ products, categories }: PageProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedProduct) {
            router.delete(route('admin.product.destroy', { product: selectedProduct.id }), {
                onSuccess: () => {
                    toast.success('Product deleted successfully');
                    setIsDeleteModalOpen(false);
                    setSelectedProduct(null);
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Failed to delete product');
                }
            });
        }
    };

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const columnsWithActions = columns.map(col => {
        if (col.id === 'actions') {
            return {
                ...col,
                cell: ({ row }: { row: { original: Product } }) => {
                    const product = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEdit(product)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDelete(product)}
                                    className="text-red-600"
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            };
        }
        return col;
    });

    return (
        <>
            <AdminLayout>
                <Head title="Product Page" />
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Archived
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 gap-1"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Filter by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Active
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Draft
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Archived
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="h-8 gap-1">
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Add Product
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Add New Product</DialogTitle>
                                    </DialogHeader>
                                    <CreateProductForm
                                        categories={categories}
                                        onSuccess={() => setIsCreateModalOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Product</CardTitle>
                                <CardDescription>
                                    Manage your product and view their sales performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columnsWithActions}
                                    data={products.data}
                                    serverSide={true}
                                    total={products.total}
                                    page={products.current_page}
                                    perPage={products.per_page}
                                    onPageChange={(newPage, newPerPage) => {
                                        router.get(route('admin.product'), { page: newPage, per_page: newPerPage }, { preserveState: true, preserveScroll: true })
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {selectedProduct && (
                    <>
                        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                            <DialogContent className="max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                </DialogHeader>
                                <EditProductForm
                                    product={selectedProduct}
                                    categories={categories}
                                    onSuccess={() => setIsEditModalOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>

                        <DeleteProductModal
                            product={selectedProduct}
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={confirmDelete}
                        />
                    </>
                )}
            </AdminLayout>
        </>
    )
}
