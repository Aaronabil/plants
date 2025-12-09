import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { DataTable } from './DataTable';
import { columns } from './Columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

export default function Page({ orders, filters }: { orders: any, filters: any }) {

    // Function to handle tab change
    const onTabChange = (value: string) => {
        router.get(route('admin.orders'), { status: value }, { preserveState: true, preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Orders" />
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                </div>

                <Tabs defaultValue={filters.status || 'all'} className="space-y-4" onValueChange={onTabChange}>
                    <TabsList>
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending_payment">Pending Payment</TabsTrigger>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>

                    <TabsContent value={filters.status || 'all'} className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Orders List</CardTitle>
                                <CardDescription>
                                    Manage all orders from your customers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columns}
                                    data={orders.data}
                                    meta={orders} // Passing full paging object as meta
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
