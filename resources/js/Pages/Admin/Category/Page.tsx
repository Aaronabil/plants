import { Head, router } from '@inertiajs/react';
import { Category, columns } from './Columns';
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
import CreateCategoryForm from './CreateCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import DeleteCategoryModal from './DeleteCategoryModal';
import { toast } from 'sonner';

interface PageProps {
    categories: {
        data: Category[];
        current_page: number;
        per_page: number;
        total: number;
    };
    parentCategories: Category[];
}

export default function PageCategory({ categories, parentCategories }: PageProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = (categoryId: number) => {
        router.delete(route('admin.category.destroy', { category: categoryId }), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                toast.success('Category deleted successfully');
            },
            onError: (errors) => {
                toast.error(errors.error || 'Failed to delete category');
            },
        });
    };

    const columnsWithActions = columns.map(col => {
        if (col.id === 'actions') {
            return {
                ...col,
                cell: ({ row }: { row: { original: Category } }) => {
                    const category = row.original;
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
                                <DropdownMenuItem onClick={() => handleEdit(category)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(category)} className="text-red-600">
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
                <Head title="Category Page" />
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
                                            Add Category
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                    </DialogHeader>
                                    <CreateCategoryForm parentCategories={parentCategories} onSuccess={() => setIsCreateModalOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                                <CardDescription>
                                    Manage your product categories and view their sales performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columnsWithActions}
                                    data={categories.data}
                                    serverSide={true}
                                    total={categories.total}
                                    page={categories.current_page}
                                    perPage={categories.per_page}
                                    onPageChange={(newPage, newPerPage) => {
                                        router.get(route('admin.category'), { page: newPage, per_page: newPerPage }, { preserveState: true, preserveScroll: true })
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {selectedCategory && (
                    <>
                        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Category</DialogTitle>
                                </DialogHeader>
                                <EditCategoryForm
                                    category={selectedCategory}
                                    parentCategories={parentCategories}
                                    onSuccess={() => setIsEditModalOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>

                        <DeleteCategoryModal
                            category={selectedCategory}
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={confirmDelete}
                        />
                    </>
                )}
            </AdminLayout>
        </>
    );
}
