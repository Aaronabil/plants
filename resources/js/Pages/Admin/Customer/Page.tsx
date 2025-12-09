import AdminLayout from "@/Layouts/AdminLayout"
import { Head, router } from "@inertiajs/react"
import { User } from "@/types";
import { columns } from "./Column";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { MoreHorizontal, ListFilter, File } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { DataTable } from './DataTable';
import { Input } from '@/Components/ui/input';
import { useState } from 'react';
import CustomerDetailsForm from './CustomerDetailsForm';
import DeleteCustomerModal from './DeleteCustomerModal';
import { toast } from 'sonner';

interface PageProps {
    customers: {
        data: User[];
        current_page: number;
        per_page: number;
        total: number;
    };
}

export default function PageCustomer({ customers }: PageProps) {
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
    const [search, setSearch] = useState('');

    const handleCustomer = (user: User) => {
        setSelectedCustomer(user);
        setIsCustomerModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedCustomer) {
            router.delete(route('admin.customer.destroy', { customer: selectedCustomer.id }), {
                onSuccess: () => {
                    toast.success('Customer deleted successfully');
                    setIsDeleteModalOpen(false);
                    setSelectedCustomer(null);
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Failed to delete product');
                }
            });
        }
    };

    const handleDelete = (user: User) => {
        setSelectedCustomer(user);
        setIsDeleteModalOpen(true);
    };

    const columnsWithActions = columns.map(col => {
        if (col.id === 'actions') {
            return {
                ...col,
                cell: ({ row }: { row: { original: User } }) => {
                    const user = row.original;
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
                                <DropdownMenuItem
                                    className="text-green-700"
                                    onClick={() => handleCustomer(user)}
                                >
                                    Customer Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDelete(user)}
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
                <Head title="Customer Page" />
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
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Customer</CardTitle>
                                <CardDescription>
                                    Manage your customers here.
                                </CardDescription>
                                <Input
                                    type="search"
                                    placeholder="Filter by name, email, etc..."
                                    className="w-full appearance-none bg-background shadow-none md:w-2/3 lg:w-1/3"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columnsWithActions}
                                    data={customers.data}
                                    globalFilter={search}
                                    serverSide={false}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {selectedCustomer && (
                    <>
                        <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
                            <DialogContent className="max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Customer Details</DialogTitle>
                                </DialogHeader>
                                <CustomerDetailsForm
                                    user={selectedCustomer}
                                    onSuccess={() => setIsCustomerModalOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>

                        <DeleteCustomerModal
                            user={selectedCustomer}
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
